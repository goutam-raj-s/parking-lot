import type { ParkingFloor } from "./parking-floor.model.js";
import type { ParkingSpot, ParkingSpotType } from "./parking-spot.model.js";
import type { ParkingRate } from "./rate.model.js";
import type { Entrance, ExitTerminal } from "./terminal.model.js";

export interface ParkingLotConfig {
  id: string;
  name: string;
  address: string;
  floors: ParkingFloor[];
  entrances: Entrance[];
  exits: ExitTerminal[];
  spots: ParkingSpot[];
  rates: ParkingRate[];
}

export interface AvailabilitySummary {
  total: number;
  available: number;
  occupied: number;
  outOfService: number;
  byType: Record<ParkingSpotType, { total: number; available: number; occupied: number }>;
  byFloor: Record<string, { total: number; available: number; occupied: number }>;
}
