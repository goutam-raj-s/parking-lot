import { parkingSpotsRepository, type ParkingSpotsRepository } from "./ParkingSpots.repository.js";

export class ParkingSpotsService {
  constructor(private readonly repository: ParkingSpotsRepository) {}

  getSpots() {
    return this.repository.getSpots();
  }

}

export const parkingSpotsService = new ParkingSpotsService(parkingSpotsRepository);
