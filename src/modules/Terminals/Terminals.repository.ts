import { clone, inMemoryStore } from "../../helpers/in-memory-store.js";

export class TerminalsRepository {
  listEntrances() {
    return clone(inMemoryStore.config.entrances);
  }

  listExits() {
    return clone(inMemoryStore.config.exits);
  }

  findEntranceById(entranceId: string) {
    const entrance = inMemoryStore.config.entrances.find((currentEntrance) => currentEntrance.id === entranceId);
    return entrance ? clone(entrance) : undefined;
  }

  findExitById(exitId: string) {
    const exit = inMemoryStore.config.exits.find((currentExit) => currentExit.id === exitId);
    return exit ? clone(exit) : undefined;
  }
}

export const terminalsRepository = new TerminalsRepository();
