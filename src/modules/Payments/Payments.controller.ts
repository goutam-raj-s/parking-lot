import type { Request, Response } from "express";
import { ok } from "../../utils/http-response.js";
import { paymentsHelper } from "./Payments.helper.js";

export class PaymentsController {
  list(_request: Request, response: Response) {
    ok(response, paymentsHelper.list());
  }

  getById(request: Request<{ paymentId: string }>, response: Response) {
    ok(response, paymentsHelper.getById(request.params.paymentId));
  }
}

export const paymentsController = new PaymentsController();
