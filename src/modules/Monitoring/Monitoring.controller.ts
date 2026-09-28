import type { Request, Response } from "express";
import { ok } from "../../utils/http-response.js";
import { monitoringHelper } from "./Monitoring.helper.js";

export class MonitoringController {
  getAvailability(_request: Request, response: Response) {
    ok(response, monitoringHelper.getAvailability());
  }

  getSnapshot(_request: Request, response: Response) {
    ok(response, monitoringHelper.getSnapshot());
  }
}

export const monitoringController = new MonitoringController();
