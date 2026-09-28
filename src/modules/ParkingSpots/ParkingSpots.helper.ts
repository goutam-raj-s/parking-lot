import { ParkingSpotStatus } from "../../models/index.js";
import { badRequest, conflict, notFound } from "../../utils/app-error.js";
import { parkingSpotsService, type ParkingSpotsService } from "./ParkingSpots.service.js";

export class ParkingSpotsHelper {
  constructor(private readonly service: ParkingSpotsService) {}

  getSpots() {
    return this.service.getSpots();
  }

  setSpotStatus(spotId: string, status: ParkingSpotStatus) {
    if (status === ParkingSpotStatus.Occupied) {
      throw badRequest("Use check-in to occupy a parking spot");
    }

    const spot = this.service.findSpotById(spotId);
    if (!spot) {
      throw notFound("Parking spot not found");
    }

    if (spot.status === ParkingSpotStatus.Occupied) {
      throw conflict("Cannot update status for an occupied parking spot");
    }

    const updatedSpot = this.service.updateSpotStatus(spotId, status);
    if (!updatedSpot) {
      throw notFound("Parking spot not found");
    }

    return updatedSpot;
  }
}

export const parkingSpotsHelper = new ParkingSpotsHelper(parkingSpotsService);
