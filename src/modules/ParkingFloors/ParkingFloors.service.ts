import {
  parkingFloorsRepository,
  type ParkingFloorsRepository,
} from "./ParkingFloors.repository.js";

export class ParkingFloorsService {
  constructor(private readonly repository: ParkingFloorsRepository) {}

  getFloors() {
    return this.repository.getFloors();
  }
}

export const parkingFloorsService = new ParkingFloorsService(parkingFloorsRepository);
