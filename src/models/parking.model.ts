export enum VehicleType {
  Motorcycle = "motorcycle",
  Car = "car",
  Bus = "bus",
  Bike = "bike",
}

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

export enum TicketStatus {
  Active = "active",
  CheckedOut = "checked_out",
  Paid = "paid",
}

export enum PaymentMethod {
  Cash = "cash",
  CreditCard = "credit_card",
}

export enum PaymentStatus {
  Pending = "pending",
  Completed = "completed",
}

export interface Vehicle {
  plateNumber: string;
  type: VehicleType;
}

export interface Entrance {
  id: string;
  name: string;
  floorId: string;
}

export interface ExitTerminal {
  id: string;
  name: string;
  floorId: string;
}

export interface ParkingFloor {
  id: string;
  level: number;
  name: string;
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

export interface ParkingRate {
  vehicleType: VehicleType;
  hourlyRate: number;
  minimumHours: number;
}

export interface ParkingTicket {
  id: string;
  ticketNumber: string;
  vehicle: Vehicle;
  spotId: string;
  entranceId: string;
  entryTime: string;
  exitTime?: string;
  status: TicketStatus;
  feeAmount?: number;
  paymentId?: string;
}

export interface Payment {
  id: string;
  ticketId: string;
  method: PaymentMethod;
  amount: number;
  status: PaymentStatus;
  paidAt: string;
}

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
