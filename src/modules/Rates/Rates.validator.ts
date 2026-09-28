import { z } from "zod";
import { VehicleType } from "../../models/index.js";

export const vehicleTypeParamSchema = z.object({
  vehicleType: z.enum(VehicleType),
});
