import { notFound } from "../../utils/app-error.js";
import { vehiclesService, type VehiclesService } from "./Vehicles.service.js";

export class VehiclesHelper {
  constructor(private readonly service: VehiclesService) {}

  list() {
    return this.service.list();
  }

  getByPlate(plateNumber: string) {
    const vehicle = this.service.findByPlate(plateNumber);
    if (!vehicle) {
      throw notFound("Vehicle not found");
    }

    return vehicle;
  }
}

export const vehiclesHelper = new VehiclesHelper(vehiclesService);
