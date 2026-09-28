import { ticketsRepository, type TicketsRepository } from "./Tickets.repository.js";
import type { ParkingTicket } from "../../models/index.js";

export class TicketsService {
  constructor(private readonly repository: TicketsRepository) {}

  create(ticket: ParkingTicket) {
    return this.repository.create(ticket);
  }

  update(ticket: ParkingTicket) {
    return this.repository.update(ticket);
  }

  findById(ticketId: string) {
    return this.repository.findById(ticketId);
  }

  findActiveByPlate(plateNumber: string) {
    return this.repository.findActiveByPlate(plateNumber);
  }

  list() {
    return this.repository.list();
  }
}

export const ticketsService = new TicketsService(ticketsRepository);
