import { ParkingSpotStatus } from "../../models/index.js";
import { parkingLotHelper } from "../ParkingLot/ParkingLot.helper.js";
import { parkingSpotsService, type ParkingSpotsService } from "./ParkingSpots.service.js";

export class ParkingSpotsHelper {
  constructor(private readonly service: ParkingSpotsService) {}

  getSpots() {
    return this.service.getSpots();
  }

  setSpotStatus(spotId: string, status: ParkingSpotStatus) {
    return parkingLotHelper.setSpotStatus(spotId, status);
  }
}

export const parkingSpotsHelper = new ParkingSpotsHelper(parkingSpotsService);
