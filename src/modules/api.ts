import { Router } from "express";
import parkingLotRouter from "./ParkingLot/ParkingLot.index.js";

const router = Router();

router.use("/parking-lot", parkingLotRouter);

export default router;
