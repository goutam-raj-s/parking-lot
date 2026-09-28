import { Router } from "express";
import { parkingFloorsController } from "./ParkingFloors.controller.js";

const router = Router();

router.get("/", parkingFloorsController.getFloors);

export default router;
