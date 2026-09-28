import { z } from "zod";
import { ParkingSpotStatus } from "../../models/index.js";

export const updateSpotStatusSchema = z.object({
  status: z.enum([ParkingSpotStatus.Available, ParkingSpotStatus.OutOfService]),
});

export type UpdateSpotStatusRequest = z.infer<typeof updateSpotStatusSchema>;
