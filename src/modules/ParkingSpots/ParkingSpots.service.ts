import { ParkingSpotStatus } from "../../models/index.js";
import { parkingLotService } from "../ParkingLot/ParkingLot.service.js";
import { parkingSpotsRepository, type ParkingSpotsRepository } from "./ParkingSpots.repository.js";

export class ParkingSpotsService {
  constructor(private readonly repository: ParkingSpotsRepository) {}

  getSpots() {
    return this.repository.getSpots();
  }

  setSpotStatus(spotId: string, status: ParkingSpotStatus) {
    return parkingLotService.setSpotStatus(spotId, status);
  }
}

export const parkingSpotsService = new ParkingSpotsService(parkingSpotsRepository);
