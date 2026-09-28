import { parkingSpotsRepository, type ParkingSpotsRepository } from "./ParkingSpots.repository.js";
import { ParkingSpotStatus } from "../../models/index.js";

export class ParkingSpotsService {
  constructor(private readonly repository: ParkingSpotsRepository) {}

  getSpots() {
    return this.repository.getSpots();
  }

  findSpotById(spotId: string) {
    return this.repository.findSpotById(spotId);
  }

  updateSpotStatus(spotId: string, status: ParkingSpotStatus) {
    return this.repository.updateSpotStatus(spotId, status);
  }

  occupySpot(spotId: string, ticketId: string) {
    return this.repository.occupySpot(spotId, ticketId);
  }

  releaseSpot(spotId: string) {
    return this.repository.releaseSpot(spotId);
  }
}

export const parkingSpotsService = new ParkingSpotsService(parkingSpotsRepository);
