import { notFound } from "../../utils/app-error.js";
import { paymentsService, type PaymentsService } from "./Payments.service.js";

export class PaymentsHelper {
  constructor(private readonly service: PaymentsService) {}

  list() {
    return this.service.list();
  }

  getById(paymentId: string) {
    const payment = this.service.findById(paymentId);
    if (!payment) {
      throw notFound("Payment not found");
    }

    return payment;
  }
}

export const paymentsHelper = new PaymentsHelper(paymentsService);
