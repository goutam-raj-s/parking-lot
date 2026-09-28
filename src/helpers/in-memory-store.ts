import { defaultParkingLotConfig } from "./parking-lot-config.js";
import type { ParkingLotConfig, ParkingTicket, Payment } from "../models/index.js";

export interface InMemoryStore {
  config: ParkingLotConfig;
  tickets: Map<string, ParkingTicket>;
  payments: Map<string, Payment>;
}

export const clone = <T>(value: T): T => structuredClone(value);

export const inMemoryStore: InMemoryStore = {
  config: clone(defaultParkingLotConfig),
  tickets: new Map<string, ParkingTicket>(),
  payments: new Map<string, Payment>(),
};
