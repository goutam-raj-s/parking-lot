import { Router } from "express";
import { terminalsController } from "./Terminals.controller.js";

const router = Router();

router.get("/entrances", terminalsController.listEntrances);
router.get("/exits", terminalsController.listExits);

export default router;
