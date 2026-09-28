import { Router } from "express";
import { ratesController } from "./Rates.controller.js";

const router = Router();

router.get("/", ratesController.list);
router.get("/:vehicleType", ratesController.getByVehicleType);

export default router;
