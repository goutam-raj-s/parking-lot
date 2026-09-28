import { Router } from "express";
import { ticketsController } from "./Tickets.controller.js";

const router = Router();

router.get("/", ticketsController.list);
router.get("/:ticketId", ticketsController.getById);

export default router;
