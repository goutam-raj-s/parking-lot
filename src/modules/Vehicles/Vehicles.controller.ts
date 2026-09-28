import type { Request, Response } from "express";
import { ok } from "../../utils/http-response.js";
import { vehiclesHelper } from "./Vehicles.helper.js";

export class VehiclesController {
  list(_request: Request, response: Response) {
    ok(response, vehiclesHelper.list());
  }

  getByPlate(request: Request<{ plateNumber: string }>, response: Response) {
    ok(response, vehiclesHelper.getByPlate(request.params.plateNumber));
  }
}

export const vehiclesController = new VehiclesController();
