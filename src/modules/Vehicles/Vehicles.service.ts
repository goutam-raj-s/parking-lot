import { vehiclesRepository, type VehiclesRepository } from "./Vehicles.repository.js";

export class VehiclesService {
  constructor(private readonly repository: VehiclesRepository) {}

  normalizePlateNumber(plateNumber: string) {
    return plateNumber.trim().toUpperCase();
  }

  list() {
    return this.repository.list();
  }

  findByPlate(plateNumber: string) {
    return this.repository.findByPlate(this.normalizePlateNumber(plateNumber));
  }
}

export const vehiclesService = new VehiclesService(vehiclesRepository);
