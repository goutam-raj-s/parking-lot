import type { Request, Response } from "express";
import { ok } from "../../utils/http-response.js";
import { parkingSpotsService } from "./ParkingSpots.service.js";
import type { UpdateSpotStatusRequest } from "./ParkingSpots.validator.js";

export class ParkingSpotsController {
  getSpots(_request: Request, response: Response) {
    ok(response, parkingSpotsService.getSpots());
  }

  updateStatus(request: Request<{ spotId: string }, object, UpdateSpotStatusRequest>, response: Response) {
    ok(response, parkingSpotsService.setSpotStatus(request.params.spotId, request.body.status));
  }
}

export const parkingSpotsController = new ParkingSpotsController();
