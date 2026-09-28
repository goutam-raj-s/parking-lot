import { clone, inMemoryStore } from "../../helpers/in-memory-store.js";

export class ParkingFloorsRepository {
  getFloors() {
    return clone(inMemoryStore.config.floors);
  }
}

export const parkingFloorsRepository = new ParkingFloorsRepository();
