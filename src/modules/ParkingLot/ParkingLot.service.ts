import { parkingLotRepository, type ParkingLotRepository } from "./ParkingLot.repository.js";

export class ParkingLotService {
  constructor(private readonly repository: ParkingLotRepository) {}

  getConfig() {
    return this.repository.getConfig();
  }

}

export const parkingLotService = new ParkingLotService(parkingLotRepository);
