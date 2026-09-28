import { Router } from "express";

const router = Router();

router.get("/", (_request, response) => {
  response.status(200).json({
    success: true,
    data: {
      message: "Parking lot module is ready",
    },
  });
});

export default router;
