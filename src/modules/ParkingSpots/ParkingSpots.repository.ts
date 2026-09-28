import { parkingLotRepository } from "../ParkingLot/ParkingLot.repository.js";

export class ParkingSpotsRepository {
  getSpots() {
    return parkingLotRepository.getSpots();
  }
}

export const parkingSpotsRepository = new ParkingSpotsRepository();
