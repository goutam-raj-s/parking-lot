import type { Vehicle } from "./vehicle.model.js";

export enum TicketStatus {
  Active = "active",
  CheckedOut = "checked_out",
  Paid = "paid",
}

export interface ParkingTicket {
  id: string;
  ticketNumber: string;
  vehicle: Vehicle;
  spotId: string;
  entranceId: string;
  entryTime: string;
  exitTime?: string;
  status: TicketStatus;
  feeAmount?: number;
  paymentId?: string;
}
