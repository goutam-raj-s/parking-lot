export enum ParkingSpotType {
  Motorcycle = "motorcycle",
  Compact = "compact",
  Large = "large",
  Handicapped = "handicapped",
}

export enum ParkingSpotStatus {
  Available = "available",
  Occupied = "occupied",
  OutOfService = "out_of_service",
}

export interface ParkingSpot {
  id: string;
  floorId: string;
  spotNumber: string;
  type: ParkingSpotType;
  status: ParkingSpotStatus;
  occupiedTicketId?: string;
  distanceByEntranceId: Record<string, number>;
}
