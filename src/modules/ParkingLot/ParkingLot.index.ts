import { Router } from "express";
import { parkingLotController } from "./ParkingLot.controller.js";
import { checkInSchema, checkOutSchema, paymentSchema } from "./ParkingLot.validator.js";
import { asyncHandler } from "../../utils/async-handler.js";
import { validateBody } from "../../utils/validate.js";

const router = Router();

router.get("/config", parkingLotController.getConfig);
router.get("/availability", parkingLotController.getAvailability);
router.get("/monitoring", parkingLotController.getMonitoring);
router.get("/tickets/:ticketId", parkingLotController.getTicket);
router.post("/check-in", validateBody(checkInSchema), asyncHandler(parkingLotController.checkIn));
router.post("/check-out", validateBody(checkOutSchema), asyncHandler(parkingLotController.checkOut));
router.post("/payments", validateBody(paymentSchema), asyncHandler(parkingLotController.pay));

export default router;
