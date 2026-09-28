import { Router } from "express";
import { vehiclesController } from "./Vehicles.controller.js";

const router = Router();

router.get("/", vehiclesController.list);
router.get("/:plateNumber", vehiclesController.getByPlate);

export default router;
