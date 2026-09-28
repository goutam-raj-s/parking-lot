import { ParkingSpotStatus } from "../../models/index.js";
import { clone, inMemoryStore } from "../../helpers/in-memory-store.js";

export class ParkingSpotsRepository {
  getSpots() {
    return clone(inMemoryStore.config.spots);
  }

  findSpotById(spotId: string) {
    return inMemoryStore.config.spots.find((spot) => spot.id === spotId);
  }

  updateSpotStatus(spotId: string, status: ParkingSpotStatus) {
    const spot = this.findSpotById(spotId);
    if (!spot) {
      return undefined;
    }

    spot.status = status;
    if (status !== ParkingSpotStatus.Occupied) {
      delete spot.occupiedTicketId;
    }

    return clone(spot);
  }

  occupySpot(spotId: string, ticketId: string) {
    const spot = this.findSpotById(spotId);
    if (!spot) {
      return undefined;
    }

    spot.status = ParkingSpotStatus.Occupied;
    spot.occupiedTicketId = ticketId;
    return clone(spot);
  }

  releaseSpot(spotId: string) {
    const spot = this.findSpotById(spotId);
    if (!spot) {
      return undefined;
    }

    spot.status = ParkingSpotStatus.Available;
    delete spot.occupiedTicketId;
    return clone(spot);
  }
}

export const parkingSpotsRepository = new ParkingSpotsRepository();
