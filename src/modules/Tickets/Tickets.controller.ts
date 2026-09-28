import type { Request, Response } from "express";
import { ok } from "../../utils/http-response.js";
import { ticketsHelper } from "./Tickets.helper.js";

export class TicketsController {
  list(_request: Request, response: Response) {
    ok(response, ticketsHelper.list());
  }

  getById(request: Request<{ ticketId: string }>, response: Response) {
    ok(response, ticketsHelper.getById(request.params.ticketId));
  }
}

export const ticketsController = new TicketsController();
