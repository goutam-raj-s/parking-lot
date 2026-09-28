import { Router } from "express";
import { parkingSpotsController } from "./ParkingSpots.controller.js";
import { validateBody } from "../../utils/validate.js";
import { updateSpotStatusSchema } from "./ParkingSpots.validator.js";

const router = Router();

router.get("/", parkingSpotsController.getSpots);
router.patch("/:spotId/status", validateBody(updateSpotStatusSchema), parkingSpotsController.updateStatus);

export default router;
