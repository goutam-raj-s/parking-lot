import { Router } from "express";
import { paymentsController } from "./Payments.controller.js";

const router = Router();

router.get("/", paymentsController.list);
router.get("/:paymentId", paymentsController.getById);

export default router;
