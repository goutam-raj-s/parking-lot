import { Router } from "express";
import monitoringRouter from "./Monitoring/Monitoring.index.js";
import paymentsRouter from "./Payments/Payments.index.js";
import parkingFloorsRouter from "./ParkingFloors/ParkingFloors.index.js";
import parkingLotRouter from "./ParkingLot/ParkingLot.index.js";
import parkingSpotsRouter from "./ParkingSpots/ParkingSpots.index.js";
import ratesRouter from "./Rates/Rates.index.js";
import terminalsRouter from "./Terminals/Terminals.index.js";
import ticketsRouter from "./Tickets/Tickets.index.js";
import vehiclesRouter from "./Vehicles/Vehicles.index.js";

const router = Router();

router.use("/parking-lot", parkingLotRouter);
router.use("/parking-spots", parkingSpotsRouter);
router.use("/parking-floors", parkingFloorsRouter);
router.use("/tickets", ticketsRouter);
router.use("/payments", paymentsRouter);
router.use("/vehicles", vehiclesRouter);
router.use("/terminals", terminalsRouter);
router.use("/rates", ratesRouter);
router.use("/monitoring", monitoringRouter);

export default router;
