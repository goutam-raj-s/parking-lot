import { Router } from "express";
import parkingFloorsRouter from "./ParkingFloors/ParkingFloors.index.js";
import parkingLotRouter from "./ParkingLot/ParkingLot.index.js";
import parkingSpotsRouter from "./ParkingSpots/ParkingSpots.index.js";

const router = Router();

router.use("/parking-lot", parkingLotRouter);
router.use("/parking-spots", parkingSpotsRouter);
router.use("/parking-floors", parkingFloorsRouter);

export default router;
