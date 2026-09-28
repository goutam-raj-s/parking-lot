import { terminalsRepository, type TerminalsRepository } from "./Terminals.repository.js";

export class TerminalsService {
  constructor(private readonly repository: TerminalsRepository) {}

  listEntrances() {
    return this.repository.listEntrances();
  }

  listExits() {
    return this.repository.listExits();
  }

  findEntranceById(entranceId: string) {
    return this.repository.findEntranceById(entranceId);
  }

  findExitById(exitId: string) {
    return this.repository.findExitById(exitId);
  }
}

export const terminalsService = new TerminalsService(terminalsRepository);
