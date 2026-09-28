import { ParkingSpotStatus, ParkingSpotType, VehicleType, type ParkingSpot } from "../../../models/index.js";

const compatibleSpotTypes: Record<VehicleType, ParkingSpotType[]> = {
  [VehicleType.Bike]: [ParkingSpotType.Motorcycle, ParkingSpotType.Compact, ParkingSpotType.Large],
  [VehicleType.Motorcycle]: [ParkingSpotType.Motorcycle, ParkingSpotType.Compact, ParkingSpotType.Large],
  [VehicleType.Car]: [ParkingSpotType.Compact, ParkingSpotType.Large],
  [VehicleType.Bus]: [ParkingSpotType.Large],
};

export interface SpotAllocationRequest {
  vehicleType: VehicleType;
  entranceId: string;
  preferredSpotType?: ParkingSpotType | undefined;
}

export class NearestSpotAllocationStrategy {
  findSpot(spots: ParkingSpot[], request: SpotAllocationRequest): ParkingSpot | undefined {
    const allowedTypes = request.preferredSpotType
      ? [request.preferredSpotType]
      : compatibleSpotTypes[request.vehicleType];

    return spots
      .filter((spot) => spot.status === ParkingSpotStatus.Available)
      .filter((spot) => allowedTypes.includes(spot.type))
      .sort((left, right) => {
        const leftDistance = left.distanceByEntranceId[request.entranceId] ?? Number.MAX_SAFE_INTEGER;
        const rightDistance = right.distanceByEntranceId[request.entranceId] ?? Number.MAX_SAFE_INTEGER;
        return leftDistance - rightDistance || left.spotNumber.localeCompare(right.spotNumber);
      })[0];
  }
}
