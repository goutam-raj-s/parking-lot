import { Router } from "express";
import { monitoringController } from "./Monitoring.controller.js";

const router = Router();

router.get("/availability", monitoringController.getAvailability);
router.get("/snapshot", monitoringController.getSnapshot);

export default router;
