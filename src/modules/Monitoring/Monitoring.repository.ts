import { ParkingSpotStatus, TicketStatus, type AvailabilitySummary } from "../../models/index.js";
import { clone, inMemoryStore } from "../../helpers/in-memory-store.js";

export class MonitoringRepository {
  getAvailability(): AvailabilitySummary {
    const byType = inMemoryStore.config.spots.reduce<AvailabilitySummary["byType"]>((summary, spot) => {
      const typeSummary = summary[spot.type] ?? { total: 0, available: 0, occupied: 0 };
      typeSummary.total += 1;
      if (spot.status === ParkingSpotStatus.Available) {
        typeSummary.available += 1;
      }
      if (spot.status === ParkingSpotStatus.Occupied) {
        typeSummary.occupied += 1;
      }
      summary[spot.type] = typeSummary;
      return summary;
    }, {} as AvailabilitySummary["byType"]);

    const byFloor = inMemoryStore.config.spots.reduce<AvailabilitySummary["byFloor"]>((summary, spot) => {
      const floorSummary = summary[spot.floorId] ?? { total: 0, available: 0, occupied: 0 };
      floorSummary.total += 1;
      if (spot.status === ParkingSpotStatus.Available) {
        floorSummary.available += 1;
      }
      if (spot.status === ParkingSpotStatus.Occupied) {
        floorSummary.occupied += 1;
      }
      summary[spot.floorId] = floorSummary;
      return summary;
    }, {});

    const total = inMemoryStore.config.spots.length;
    const available = inMemoryStore.config.spots.filter((spot) => spot.status === ParkingSpotStatus.Available).length;
    const occupied = inMemoryStore.config.spots.filter((spot) => spot.status === ParkingSpotStatus.Occupied).length;
    const outOfService = inMemoryStore.config.spots.filter((spot) => spot.status === ParkingSpotStatus.OutOfService).length;

    return { total, available, occupied, outOfService, byType, byFloor };
  }

  getTicketCounts() {
    const tickets = Array.from(inMemoryStore.tickets.values());
    return {
      activeTickets: tickets.filter((ticket) => ticket.status === TicketStatus.Active).length,
      checkedOutAwaitingPayment: tickets.filter((ticket) => ticket.status === TicketStatus.CheckedOut).length,
      paidTickets: tickets.filter((ticket) => ticket.status === TicketStatus.Paid).length,
    };
  }

  listRecentTickets(limit = 10) {
    return Array.from(inMemoryStore.tickets.values())
      .sort((left, right) => right.entryTime.localeCompare(left.entryTime))
      .slice(0, limit)
      .map((ticket) => clone(ticket));
  }
}

export const monitoringRepository = new MonitoringRepository();
