import { clone, inMemoryStore } from "../../helpers/in-memory-store.js";
import type { VehicleType } from "../../models/index.js";

export class RatesRepository {
  list() {
    return clone(inMemoryStore.config.rates);
  }

  findByVehicleType(vehicleType: VehicleType) {
    const rate = inMemoryStore.config.rates.find((currentRate) => currentRate.vehicleType === vehicleType);
    return rate ? clone(rate) : undefined;
  }
}

export const ratesRepository = new RatesRepository();
