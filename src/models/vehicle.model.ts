export enum VehicleType {
  Motorcycle = "motorcycle",
  Car = "car",
  Bus = "bus",
  Bike = "bike",
}

export interface Vehicle {
  plateNumber: string;
  type: VehicleType;
}
