import { parkingLotRepository } from "../ParkingLot/ParkingLot.repository.js";

export class ParkingFloorsRepository {
  getFloors() {
    return parkingLotRepository.getFloors();
  }
}

export const parkingFloorsRepository = new ParkingFloorsRepository();
