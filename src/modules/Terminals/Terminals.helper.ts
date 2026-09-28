import { notFound } from "../../utils/app-error.js";
import { terminalsService, type TerminalsService } from "./Terminals.service.js";

export class TerminalsHelper {
  constructor(private readonly service: TerminalsService) {}

  listEntrances() {
    return this.service.listEntrances();
  }

  listExits() {
    return this.service.listExits();
  }

  getEntranceById(entranceId: string) {
    const entrance = this.service.findEntranceById(entranceId);
    if (!entrance) {
      throw notFound("Entrance terminal not found");
    }

    return entrance;
  }

  getExitById(exitId: string) {
    const exit = this.service.findExitById(exitId);
    if (!exit) {
      throw notFound("Exit terminal not found");
    }

    return exit;
  }
}

export const terminalsHelper = new TerminalsHelper(terminalsService);
