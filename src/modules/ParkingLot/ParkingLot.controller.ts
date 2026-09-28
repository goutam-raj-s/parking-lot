import type { Request, Response } from "express";
import { parkingLotHelper } from "./ParkingLot.helper.js";
import { created, ok } from "../../utils/http-response.js";
import type { CheckInRequest, CheckOutRequest, PaymentRequest } from "./ParkingLot.validator.js";

export class ParkingLotController {
  getConfig(_request: Request, response: Response) {
    ok(response, parkingLotHelper.getConfig());
  }

  getAvailability(_request: Request, response: Response) {
    ok(response, parkingLotHelper.getAvailability());
  }

  getMonitoring(_request: Request, response: Response) {
    ok(response, parkingLotHelper.getMonitoring());
  }

  getTicket(request: Request<{ ticketId: string }>, response: Response) {
    ok(response, parkingLotHelper.getTicket(request.params.ticketId));
  }

  async checkIn(request: Request<object, object, CheckInRequest>, response: Response) {
    const result = await parkingLotHelper.checkIn(request.body);
    created(response, result);
  }

  async checkOut(request: Request<object, object, CheckOutRequest>, response: Response) {
    const result = await parkingLotHelper.checkOut(request.body);
    ok(response, result);
  }

  async pay(request: Request<object, object, PaymentRequest>, response: Response) {
    const result = await parkingLotHelper.pay(request.body);
    created(response, result);
  }
}

export const parkingLotController = new ParkingLotController();
