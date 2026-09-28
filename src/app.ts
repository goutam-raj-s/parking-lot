import express, { type ErrorRequestHandler } from "express";
import apiRouter from "./modules/api.js";
import { AppError } from "./utils/app-error.js";

const app = express();

app.use(express.json());

app.get("/health", (_request, response) => {
  response.status(200).json({ success: true, data: { status: "ok" } });
});

app.use("/api", apiRouter);

app.use((_request, response) => {
  response.status(404).json({ success: false, error: { message: "Route not found" } });
});

const errorHandler: ErrorRequestHandler = (error, _request, response, _next) => {
  if (error instanceof AppError) {
    response.status(error.statusCode).json({
      success: false,
      error: {
        message: error.message,
        details: error.details,
      },
    });
    return;
  }

  response.status(500).json({
    success: false,
    error: {
      message: "Internal server error",
    },
  });
};

app.use(errorHandler);

export default app;
