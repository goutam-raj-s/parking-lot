import type { Request, Response } from "express";
import { ok } from "../../utils/http-response.js";
import { parkingFloorsService } from "./ParkingFloors.service.js";

export class ParkingFloorsController {
  getFloors(_request: Request, response: Response) {
    ok(response, parkingFloorsService.getFloors());
  }
}

export const parkingFloorsController = new ParkingFloorsController();
