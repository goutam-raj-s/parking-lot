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
import { defaultParkingLotConfig } from "../../helpers/parking-lot-config.js";

const clone = <T>(value: T): T => structuredClone(value);

export class ParkingLotRepository {
  private readonly config: ParkingLotConfig = clone(defaultParkingLotConfig);
  private readonly tickets = new Map<string, ParkingTicket>();
  private readonly payments = new Map<string, Payment>();

  getConfig() {
    return clone(this.config);
  }

  getSpots() {
    return clone(this.config.spots);
  }

  getFloors() {
    return clone(this.config.floors);
  }

  getEntrances() {
    return clone(this.config.entrances);
  }

  getExits() {
    return clone(this.config.exits);
  }

  getRates() {
    return clone(this.config.rates);
  }

  findSpotById(spotId: string) {
    return this.config.spots.find((spot) => spot.id === spotId);
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
    this.tickets.set(ticket.id, clone(ticket));
    return clone(ticket);
  }

  updateTicket(ticket: ParkingTicket) {
    this.tickets.set(ticket.id, clone(ticket));
    return clone(ticket);
  }

  findTicketById(ticketId: string) {
    const ticket = this.tickets.get(ticketId);
    return ticket ? clone(ticket) : undefined;
  }

  findActiveTicketByPlate(plateNumber: string) {
    const normalizedPlate = plateNumber.trim().toUpperCase();
    return Array.from(this.tickets.values()).find(
      (ticket) =>
        ticket.vehicle.plateNumber === normalizedPlate &&
        (ticket.status === TicketStatus.Active || ticket.status === TicketStatus.CheckedOut),
    );
  }

  listTickets() {
    return Array.from(this.tickets.values()).map((ticket) => clone(ticket));
  }

  createPayment(payment: Payment) {
    this.payments.set(payment.id, clone(payment));
    return clone(payment);
  }

  findPaymentByTicketId(ticketId: string) {
    const payment = Array.from(this.payments.values()).find(
      (currentPayment) => currentPayment.ticketId === ticketId && currentPayment.status === PaymentStatus.Completed,
    );
    return payment ? clone(payment) : undefined;
  }

  getAvailability(): AvailabilitySummary {
    const byType = Object.values(this.config.spots).reduce<AvailabilitySummary["byType"]>((summary, spot) => {
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

    const byFloor = this.config.spots.reduce<AvailabilitySummary["byFloor"]>((summary, spot) => {
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

    const total = this.config.spots.length;
    const available = this.config.spots.filter((spot) => spot.status === ParkingSpotStatus.Available).length;
    const occupied = this.config.spots.filter((spot) => spot.status === ParkingSpotStatus.Occupied).length;
    const outOfService = this.config.spots.filter((spot) => spot.status === ParkingSpotStatus.OutOfService).length;

    return { total, available, occupied, outOfService, byType, byFloor };
  }
}

export const parkingLotRepository = new ParkingLotRepository();
