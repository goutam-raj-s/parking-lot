import type { Request, Response } from "express";
import { ok } from "../../utils/http-response.js";
import { terminalsHelper } from "./Terminals.helper.js";

export class TerminalsController {
  listEntrances(_request: Request, response: Response) {
    ok(response, terminalsHelper.listEntrances());
  }

  listExits(_request: Request, response: Response) {
    ok(response, terminalsHelper.listExits());
  }
}

export const terminalsController = new TerminalsController();
