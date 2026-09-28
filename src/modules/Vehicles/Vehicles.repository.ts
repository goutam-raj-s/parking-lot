import { clone, inMemoryStore } from "../../helpers/in-memory-store.js";

export class VehiclesRepository {
  list() {
    const vehiclesByPlate = new Map(
      Array.from(inMemoryStore.tickets.values()).map((ticket) => [ticket.vehicle.plateNumber, ticket.vehicle]),
    );

    return Array.from(vehiclesByPlate.values()).map((vehicle) => clone(vehicle));
  }

  findByPlate(plateNumber: string) {
    const normalizedPlate = plateNumber.trim().toUpperCase();
    const ticket = Array.from(inMemoryStore.tickets.values()).find(
      (currentTicket) => currentTicket.vehicle.plateNumber === normalizedPlate,
    );

    return ticket ? clone(ticket.vehicle) : undefined;
  }
}

export const vehiclesRepository = new VehiclesRepository();
