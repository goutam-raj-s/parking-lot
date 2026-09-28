import { parkingLotRepository, type ParkingLotRepository } from "./ParkingLot.repository.js";
import { ParkingSpotStatus, type ParkingTicket, type Payment } from "../../models/index.js";

export class ParkingLotService {
  constructor(private readonly repository: ParkingLotRepository) {}

  getConfig() {
    return this.repository.getConfig();
  }

  getAvailability() {
    return this.repository.getAvailability();
  }

  getSpots() {
    return this.repository.getSpots();
  }

  getFloors() {
    return this.repository.getFloors();
  }

  getEntrances() {
    return this.repository.getEntrances();
  }

  getExits() {
    return this.repository.getExits();
  }

  getRates() {
    return this.repository.getRates();
  }

  findSpotById(spotId: string) {
    return this.repository.findSpotById(spotId);
  }

  updateSpotStatus(spotId: string, status: ParkingSpotStatus) {
    return this.repository.updateSpotStatus(spotId, status);
  }

  occupySpot(spotId: string, ticketId: string) {
    return this.repository.occupySpot(spotId, ticketId);
  }

  releaseSpot(spotId: string) {
    return this.repository.releaseSpot(spotId);
  }

  createTicket(ticket: ParkingTicket) {
    return this.repository.createTicket(ticket);
  }

  updateTicket(ticket: ParkingTicket) {
    return this.repository.updateTicket(ticket);
  }

  findTicketById(ticketId: string) {
    return this.repository.findTicketById(ticketId);
  }

  findActiveTicketByPlate(plateNumber: string) {
    return this.repository.findActiveTicketByPlate(plateNumber);
  }

  listTickets() {
    return this.repository.listTickets();
  }

  createPayment(payment: Payment) {
    return this.repository.createPayment(payment);
  }
}

export const parkingLotService = new ParkingLotService(parkingLotRepository);
