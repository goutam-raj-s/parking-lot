import { clone, inMemoryStore } from "../../helpers/in-memory-store.js";

export class ParkingLotRepository {
  getConfig() {
    return clone(inMemoryStore.config);
  }
}

export const parkingLotRepository = new ParkingLotRepository();
