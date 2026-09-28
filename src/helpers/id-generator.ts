import { randomUUID } from "node:crypto";

export const createId = (prefix: string) => `${prefix}_${randomUUID()}`;

export const createTicketNumber = () => {
  const timestamp = Date.now().toString(36).toUpperCase();
  const suffix = randomUUID().slice(0, 6).toUpperCase();
  return `PK-${timestamp}-${suffix}`;
};
