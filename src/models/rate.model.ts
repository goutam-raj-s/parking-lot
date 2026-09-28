import type { VehicleType } from "./vehicle.model.js";

export interface ParkingRate {
  vehicleType: VehicleType;
  hourlyRate: number;
  minimumHours: number;
}
