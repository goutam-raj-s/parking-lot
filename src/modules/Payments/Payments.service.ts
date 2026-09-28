import type { Payment } from "../../models/index.js";
import { paymentsRepository, type PaymentsRepository } from "./Payments.repository.js";

export class PaymentsService {
  constructor(private readonly repository: PaymentsRepository) {}

  create(payment: Payment) {
    return this.repository.create(payment);
  }

  findById(paymentId: string) {
    return this.repository.findById(paymentId);
  }

  findCompletedByTicketId(ticketId: string) {
    return this.repository.findCompletedByTicketId(ticketId);
  }

  list() {
    return this.repository.list();
  }
}

export const paymentsService = new PaymentsService(paymentsRepository);
