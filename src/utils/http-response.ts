import type { Response } from "express";

export const ok = <T>(response: Response, data: T) => {
  response.status(200).json({ success: true, data });
};

export const created = <T>(response: Response, data: T) => {
  response.status(201).json({ success: true, data });
};
