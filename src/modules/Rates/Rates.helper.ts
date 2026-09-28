import type { VehicleType } from "../../models/index.js";
import { notFound } from "../../utils/app-error.js";
import { ratesService, type RatesService } from "./Rates.service.js";

export class RatesHelper {
  constructor(private readonly service: RatesService) {}

  list() {
    return this.service.list();
  }

  getByVehicleType(vehicleType: VehicleType) {
    const rate = this.service.findByVehicleType(vehicleType);
    if (!rate) {
      throw notFound("Parking rate not found");
    }

    return rate;
  }
}

export const ratesHelper = new RatesHelper(ratesService);
