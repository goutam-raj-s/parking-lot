import {
  parkingFloorsService,
  type ParkingFloorsService,
} from "./ParkingFloors.service.js";

export class ParkingFloorsHelper {
  constructor(private readonly service: ParkingFloorsService) {}

  getFloors() {
    return this.service.getFloors();
  }
}

export const parkingFloorsHelper = new ParkingFloorsHelper(parkingFloorsService);
