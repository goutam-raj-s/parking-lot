import type { Request, Response } from "express";
import { ok } from "../../utils/http-response.js";
import { parkingFloorsHelper } from "./ParkingFloors.helper.js";

export class ParkingFloorsController {
  getFloors(_request: Request, response: Response) {
    ok(response, parkingFloorsHelper.getFloors());
  }
}

export const parkingFloorsController = new ParkingFloorsController();
