import type { Request, Response } from "express";
import { ok } from "../../utils/http-response.js";
import { ratesHelper } from "./Rates.helper.js";
import type { VehicleType } from "../../models/index.js";

export class RatesController {
  list(_request: Request, response: Response) {
    ok(response, ratesHelper.list());
  }

  getByVehicleType(request: Request<{ vehicleType: VehicleType }>, response: Response) {
    ok(response, ratesHelper.getByVehicleType(request.params.vehicleType));
  }
}

export const ratesController = new RatesController();
