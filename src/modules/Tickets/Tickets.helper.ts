import { notFound } from "../../utils/app-error.js";
import { ticketsService, type TicketsService } from "./Tickets.service.js";

export class TicketsHelper {
  constructor(private readonly service: TicketsService) {}

  list() {
    return this.service.list();
  }

  getById(ticketId: string) {
    const ticket = this.service.findById(ticketId);
    if (!ticket) {
      throw notFound("Ticket not found");
    }

    return ticket;
  }
}

export const ticketsHelper = new TicketsHelper(ticketsService);
