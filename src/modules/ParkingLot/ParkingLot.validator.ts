import { z } from "zod";
import { ParkingSpotType, PaymentMethod, VehicleType } from "../../models/index.js";

const vehicleSchema = z.object({
  plateNumber: z.string().trim().min(1).max(20),
  type: z.enum(VehicleType),
});

export const checkInSchema = z.object({
  entranceId: z.string().trim().min(1),
  vehicle: vehicleSchema,
  preferredSpotType: z.enum(ParkingSpotType).optional(),
});

export const checkOutSchema = z.object({
  ticketId: z.string().trim().min(1),
  exitId: z.string().trim().min(1),
  exitTime: z.coerce.date().optional(),
});

export const paymentSchema = z.object({
  ticketId: z.string().trim().min(1),
  method: z.enum(PaymentMethod),
  amount: z.number().positive(),
});

export type CheckInRequest = z.infer<typeof checkInSchema>;
export type CheckOutRequest = z.infer<typeof checkOutSchema>;
export type PaymentRequest = z.infer<typeof paymentSchema>;
