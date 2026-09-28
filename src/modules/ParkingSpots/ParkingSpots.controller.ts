import type { Request, Response } from "express";
import { ok } from "../../utils/http-response.js";
import { parkingSpotsHelper } from "./ParkingSpots.helper.js";
import type { UpdateSpotStatusRequest } from "./ParkingSpots.validator.js";

export class ParkingSpotsController {
  getSpots(_request: Request, response: Response) {
    ok(response, parkingSpotsHelper.getSpots());
  }

  updateStatus(request: Request<{ spotId: string }, object, UpdateSpotStatusRequest>, response: Response) {
    ok(response, parkingSpotsHelper.setSpotStatus(request.params.spotId, request.body.status));
  }
}

export const parkingSpotsController = new ParkingSpotsController();
