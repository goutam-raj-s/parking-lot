import {
  ParkingSpotStatus,
  PaymentStatus,
  TicketStatus,
  type AvailabilitySummary,
  type ParkingLotConfig,
  type ParkingSpot,
  type ParkingTicket,
  type Payment,
} from "../../models/index.js";
import { clone, inMemoryStore } from "../../helpers/in-memory-store.js";

export class ParkingLotRepository {
  getConfig() {
    return clone(inMemoryStore.config);
  }

  getSpots() {
    return clone(inMemoryStore.config.spots);
  }

  getFloors() {
    return clone(inMemoryStore.config.floors);
  }

  getEntrances() {
    return clone(inMemoryStore.config.entrances);
  }

  getExits() {
    return clone(inMemoryStore.config.exits);
  }

  getRates() {
    return clone(inMemoryStore.config.rates);
  }

  findSpotById(spotId: string) {
    return inMemoryStore.config.spots.find((spot) => spot.id === spotId);
  }

  updateSpotStatus(spotId: string, status: ParkingSpotStatus) {
    const spot = this.findSpotById(spotId);
    if (!spot) {
      return undefined;
    }

    spot.status = status;
    if (status !== ParkingSpotStatus.Occupied) {
      delete spot.occupiedTicketId;
    }

    return clone(spot);
  }

  occupySpot(spotId: string, ticketId: string) {
    const spot = this.findSpotById(spotId);
    if (!spot) {
      return undefined;
    }

    spot.status = ParkingSpotStatus.Occupied;
    spot.occupiedTicketId = ticketId;
    return clone(spot);
  }

  releaseSpot(spotId: string) {
    const spot = this.findSpotById(spotId);
    if (!spot) {
      return undefined;
    }

    spot.status = ParkingSpotStatus.Available;
    delete spot.occupiedTicketId;
    return clone(spot);
  }

  createTicket(ticket: ParkingTicket) {
    inMemoryStore.tickets.set(ticket.id, clone(ticket));
    return clone(ticket);
  }

  updateTicket(ticket: ParkingTicket) {
    inMemoryStore.tickets.set(ticket.id, clone(ticket));
    return clone(ticket);
  }

  findTicketById(ticketId: string) {
    const ticket = inMemoryStore.tickets.get(ticketId);
    return ticket ? clone(ticket) : undefined;
  }

  findActiveTicketByPlate(plateNumber: string) {
    const normalizedPlate = plateNumber.trim().toUpperCase();
    return Array.from(inMemoryStore.tickets.values()).find(
      (ticket) =>
        ticket.vehicle.plateNumber === normalizedPlate &&
        (ticket.status === TicketStatus.Active || ticket.status === TicketStatus.CheckedOut),
    );
  }

  listTickets() {
    return Array.from(inMemoryStore.tickets.values()).map((ticket) => clone(ticket));
  }

  createPayment(payment: Payment) {
    inMemoryStore.payments.set(payment.id, clone(payment));
    return clone(payment);
  }

  findPaymentByTicketId(ticketId: string) {
    const payment = Array.from(inMemoryStore.payments.values()).find(
      (currentPayment) => currentPayment.ticketId === ticketId && currentPayment.status === PaymentStatus.Completed,
    );
    return payment ? clone(payment) : undefined;
  }

  getAvailability(): AvailabilitySummary {
    const byType = Object.values(inMemoryStore.config.spots).reduce<AvailabilitySummary["byType"]>((summary, spot) => {
      summary[spot.type] ??= { total: 0, available: 0, occupied: 0 };
      summary[spot.type].total += 1;
      if (spot.status === ParkingSpotStatus.Available) {
        summary[spot.type].available += 1;
      }
      if (spot.status === ParkingSpotStatus.Occupied) {
        summary[spot.type].occupied += 1;
      }
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
}

export const parkingLotRepository = new ParkingLotRepository();
