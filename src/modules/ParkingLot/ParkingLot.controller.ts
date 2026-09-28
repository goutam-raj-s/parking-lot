import type { Request, Response } from "express";
import { parkingLotService } from "./ParkingLot.service.js";
import { created, ok } from "../../utils/http-response.js";
import type { CheckInRequest, CheckOutRequest, PaymentRequest } from "./ParkingLot.validator.js";

export class ParkingLotController {
  getConfig(_request: Request, response: Response) {
    ok(response, parkingLotService.getConfig());
  }

  getAvailability(_request: Request, response: Response) {
    ok(response, parkingLotService.getAvailability());
  }

  getMonitoring(_request: Request, response: Response) {
    ok(response, parkingLotService.getMonitoring());
  }

  getTicket(request: Request<{ ticketId: string }>, response: Response) {
    ok(response, parkingLotService.getTicket(request.params.ticketId));
  }

  async checkIn(request: Request<object, object, CheckInRequest>, response: Response) {
    const result = await parkingLotService.checkIn(request.body);
    created(response, result);
  }

  async checkOut(request: Request<object, object, CheckOutRequest>, response: Response) {
    const result = await parkingLotService.checkOut(request.body);
    ok(response, result);
  }

  async pay(request: Request<object, object, PaymentRequest>, response: Response) {
    const result = await parkingLotService.pay(request.body);
    created(response, result);
  }
}

export const parkingLotController = new ParkingLotController();
