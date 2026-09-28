import {
  ParkingSpotStatus,
  ParkingSpotType,
  VehicleType,
  type ParkingLotConfig,
  type ParkingSpot,
} from "../models/index.js";

const createSpot = (
  floorId: string,
  spotNumber: string,
  type: ParkingSpotType,
  distanceByEntranceId: Record<string, number>,
): ParkingSpot => ({
  id: `${floorId}-${spotNumber}`,
  floorId,
  spotNumber,
  type,
  status: ParkingSpotStatus.Available,
  distanceByEntranceId,
});

export const defaultParkingLotConfig: ParkingLotConfig = {
  id: "urban-lot-01",
  name: "Urban Smart Parking Lot",
  address: "Central Business District",
  floors: [
    { id: "floor-1", level: 1, name: "Ground Floor" },
    { id: "floor-2", level: 2, name: "Second Floor" },
    { id: "floor-3", level: 3, name: "Third Floor" },
  ],
  entrances: [
    { id: "entry-north", name: "North Entry", floorId: "floor-1" },
    { id: "entry-south", name: "South Entry", floorId: "floor-1" },
  ],
  exits: [
    { id: "exit-north", name: "North Exit", floorId: "floor-1" },
    { id: "exit-south", name: "South Exit", floorId: "floor-1" },
  ],
  spots: [
    createSpot("floor-1", "M-01", ParkingSpotType.Motorcycle, { "entry-north": 12, "entry-south": 44 }),
    createSpot("floor-1", "M-02", ParkingSpotType.Motorcycle, { "entry-north": 16, "entry-south": 40 }),
    createSpot("floor-1", "H-01", ParkingSpotType.Handicapped, { "entry-north": 18, "entry-south": 22 }),
    createSpot("floor-1", "C-01", ParkingSpotType.Compact, { "entry-north": 24, "entry-south": 16 }),
    createSpot("floor-1", "C-02", ParkingSpotType.Compact, { "entry-north": 30, "entry-south": 12 }),
    createSpot("floor-2", "C-03", ParkingSpotType.Compact, { "entry-north": 52, "entry-south": 42 }),
    createSpot("floor-2", "C-04", ParkingSpotType.Compact, { "entry-north": 58, "entry-south": 38 }),
    createSpot("floor-2", "L-01", ParkingSpotType.Large, { "entry-north": 64, "entry-south": 48 }),
    createSpot("floor-3", "L-02", ParkingSpotType.Large, { "entry-north": 84, "entry-south": 72 }),
    createSpot("floor-3", "L-03", ParkingSpotType.Large, { "entry-north": 90, "entry-south": 68 }),
  ],
  rates: [
    { vehicleType: VehicleType.Bike, hourlyRate: 10, minimumHours: 1 },
    { vehicleType: VehicleType.Motorcycle, hourlyRate: 20, minimumHours: 1 },
    { vehicleType: VehicleType.Car, hourlyRate: 50, minimumHours: 1 },
    { vehicleType: VehicleType.Bus, hourlyRate: 120, minimumHours: 1 },
  ],
};
