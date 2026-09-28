import { clone, inMemoryStore } from "../../helpers/in-memory-store.js";
import { PaymentStatus, type Payment } from "../../models/index.js";

export class PaymentsRepository {
  create(payment: Payment) {
    inMemoryStore.payments.set(payment.id, clone(payment));
    return clone(payment);
  }

  findById(paymentId: string) {
    const payment = inMemoryStore.payments.get(paymentId);
    return payment ? clone(payment) : undefined;
  }

  findCompletedByTicketId(ticketId: string) {
    const payment = Array.from(inMemoryStore.payments.values()).find(
      (currentPayment) => currentPayment.ticketId === ticketId && currentPayment.status === PaymentStatus.Completed,
    );

    return payment ? clone(payment) : undefined;
  }

  list() {
    return Array.from(inMemoryStore.payments.values()).map((payment) => clone(payment));
  }
}

export const paymentsRepository = new PaymentsRepository();
