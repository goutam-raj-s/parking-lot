import type { NextFunction, Request, Response } from "express";
import type { ZodSchema } from "zod";
import { badRequest } from "./app-error.js";

export const validateBody =
  <T>(schema: ZodSchema<T>) =>
  (request: Request, _response: Response, next: NextFunction) => {
    const result = schema.safeParse(request.body);

    if (!result.success) {
      next(badRequest("Invalid request body", result.error.flatten()));
      return;
    }

    request.body = result.data;
    next();
  };
