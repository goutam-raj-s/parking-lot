export enum PaymentMethod {
  Cash = "cash",
  CreditCard = "credit_card",
}

export enum PaymentStatus {
  Pending = "pending",
  Completed = "completed",
}

export interface Payment {
  id: string;
  ticketId: string;
  method: PaymentMethod;
  amount: number;
  status: PaymentStatus;
  paidAt: string;
}
