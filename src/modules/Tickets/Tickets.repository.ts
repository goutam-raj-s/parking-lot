import { clone, inMemoryStore } from "../../helpers/in-memory-store.js";
import { TicketStatus, type ParkingTicket } from "../../models/index.js";

export class TicketsRepository {
  create(ticket: ParkingTicket) {
    inMemoryStore.tickets.set(ticket.id, clone(ticket));
    return clone(ticket);
  }

  update(ticket: ParkingTicket) {
    inMemoryStore.tickets.set(ticket.id, clone(ticket));
    return clone(ticket);
  }

  findById(ticketId: string) {
    const ticket = inMemoryStore.tickets.get(ticketId);
    return ticket ? clone(ticket) : undefined;
  }

  findActiveByPlate(plateNumber: string) {
    const normalizedPlate = plateNumber.trim().toUpperCase();
    const ticket = Array.from(inMemoryStore.tickets.values()).find(
      (currentTicket) =>
        currentTicket.vehicle.plateNumber === normalizedPlate &&
        (currentTicket.status === TicketStatus.Active || currentTicket.status === TicketStatus.CheckedOut),
    );

    return ticket ? clone(ticket) : undefined;
  }

  list() {
    return Array.from(inMemoryStore.tickets.values()).map((ticket) => clone(ticket));
  }
}

export const ticketsRepository = new TicketsRepository();
