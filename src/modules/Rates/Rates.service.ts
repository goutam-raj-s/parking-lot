import type { VehicleType } from "../../models/index.js";
import { ratesRepository, type RatesRepository } from "./Rates.repository.js";

export class RatesService {
  constructor(private readonly repository: RatesRepository) {}

  list() {
    return this.repository.list();
  }

  findByVehicleType(vehicleType: VehicleType) {
    return this.repository.findByVehicleType(vehicleType);
  }
}

export const ratesService = new RatesService(ratesRepository);
