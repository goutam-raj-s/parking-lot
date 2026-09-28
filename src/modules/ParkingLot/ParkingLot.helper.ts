import {
  ParkingSpotStatus,
  PaymentMethod,
  PaymentStatus,
  TicketStatus,
  type ParkingSpotType,
  type Vehicle,
} from "../../models/index.js";
import { createId, createTicketNumber } from "../../helpers/id-generator.js";
import { Mutex } from "../../helpers/mutex.js";
import { badRequest, conflict, notFound } from "../../utils/app-error.js";
import { parkingLotService, type ParkingLotService } from "./ParkingLot.service.js";
import { HourlyFeeCalculator } from "./utils/fee-calculator.js";
import { NearestSpotAllocationStrategy } from "./utils/spot-allocation.js";

export interface CheckInInput {
  entranceId: string;
  vehicle: Vehicle;
  preferredSpotType?: ParkingSpotType | undefined;
}

export interface CheckOutInput {
  ticketId: string;
  exitId: string;
  exitTime?: Date | undefined;
}

export interface PaymentInput {
  ticketId: string;
  method: PaymentMethod;
  amount: number;
}

export class ParkingLotHelper {
  private readonly allocationMutex = new Mutex();
  private readonly allocationStrategy = new NearestSpotAllocationStrategy();

  constructor(private readonly service: ParkingLotService) {}

  getConfig() {
    return this.service.getConfig();
  }

  getAvailability() {
    return this.service.getAvailability();
  }

  getMonitoring() {
    const tickets = this.service.listTickets();
    const availability = this.service.getAvailability();
    const activeTickets = tickets.filter((ticket) => ticket.status === TicketStatus.Active).length;
    const checkedOutAwaitingPayment = tickets.filter((ticket) => ticket.status === TicketStatus.CheckedOut).length;
    const paidTickets = tickets.filter((ticket) => ticket.status === TicketStatus.Paid).length;

    return {
      availability,
      activeTickets,
      checkedOutAwaitingPayment,
      paidTickets,
      capacityUsagePercent: availability.total === 0 ? 0 : Math.round((availability.occupied / availability.total) * 100),
    };
  }

  getTicket(ticketId: string) {
    const ticket = this.service.findTicketById(ticketId);
    if (!ticket) {
      throw notFound("Ticket not found");
    }

    return ticket;
  }

  async checkIn(input: CheckInInput) {
    return this.allocationMutex.runExclusive(() => {
      const entrance = this.service.getEntrances().find((currentEntrance) => currentEntrance.id === input.entranceId);
      if (!entrance) {
        throw badRequest("Entrance terminal not found");
      }

      const plateNumber = input.vehicle.plateNumber.trim().toUpperCase();
      const existingTicket = this.service.findActiveTicketByPlate(plateNumber);
      if (existingTicket) {
        throw conflict("Vehicle already has an active parking ticket");
      }

      const spot = this.allocationStrategy.findSpot(this.service.getSpots(), {
        vehicleType: input.vehicle.type,
        entranceId: input.entranceId,
        preferredSpotType: input.preferredSpotType,
      });

      if (!spot) {
        throw conflict("No compatible parking spot is available");
      }

      const ticketId = createId("ticket");
      const ticket = this.service.createTicket({
        id: ticketId,
        ticketNumber: createTicketNumber(),
        vehicle: {
          plateNumber,
          type: input.vehicle.type,
        },
        spotId: spot.id,
        entranceId: input.entranceId,
        entryTime: new Date().toISOString(),
        status: TicketStatus.Active,
      });

      const occupiedSpot = this.service.occupySpot(spot.id, ticket.id);
      if (!occupiedSpot) {
        throw conflict("Unable to occupy selected parking spot");
      }

      return { ticket, spot: occupiedSpot };
    });
  }

  async checkOut(input: CheckOutInput) {
    return this.allocationMutex.runExclusive(() => {
      const exit = this.service.getExits().find((currentExit) => currentExit.id === input.exitId);
      if (!exit) {
        throw badRequest("Exit terminal not found");
      }

      const ticket = this.getTicket(input.ticketId);
      if (ticket.status === TicketStatus.Paid) {
        throw conflict("Ticket is already paid");
      }

      if (ticket.status === TicketStatus.CheckedOut) {
        return {
          ticket,
          fee: {
            amount: ticket.feeAmount ?? 0,
          },
        };
      }

      const exitTime = input.exitTime ?? new Date();
      const fee = new HourlyFeeCalculator(this.service.getRates()).calculate(
        ticket.vehicle.type,
        new Date(ticket.entryTime),
        exitTime,
      );

      const updatedTicket = this.service.updateTicket({
        ...ticket,
        exitTime: exitTime.toISOString(),
        feeAmount: fee.amount,
        status: TicketStatus.CheckedOut,
      });

      this.service.releaseSpot(ticket.spotId);

      return { ticket: updatedTicket, fee };
    });
  }

  async pay(input: PaymentInput) {
    return this.allocationMutex.runExclusive(() => {
      const ticket = this.getTicket(input.ticketId);
      if (ticket.status === TicketStatus.Active) {
        throw conflict("Ticket must be checked out before payment");
      }

      if (ticket.status === TicketStatus.Paid) {
        throw conflict("Ticket is already paid");
      }

      const requiredAmount = ticket.feeAmount ?? 0;
      if (input.amount < requiredAmount) {
        throw badRequest(`Payment amount must be at least ${requiredAmount}`);
      }

      const payment = this.service.createPayment({
        id: createId("payment"),
        ticketId: ticket.id,
        method: input.method,
        amount: input.amount,
        status: PaymentStatus.Completed,
        paidAt: new Date().toISOString(),
      });

      const paidTicket = this.service.updateTicket({
        ...ticket,
        paymentId: payment.id,
        status: TicketStatus.Paid,
      });

      return { ticket: paidTicket, payment };
    });
  }

  setSpotStatus(spotId: string, status: ParkingSpotStatus) {
    if (status === ParkingSpotStatus.Occupied) {
      throw badRequest("Use check-in to occupy a parking spot");
    }

    const spot = this.service.findSpotById(spotId);
    if (!spot) {
      throw notFound("Parking spot not found");
    }

    if (spot.status === ParkingSpotStatus.Occupied) {
      throw conflict("Cannot update status for an occupied parking spot");
    }

    const updatedSpot = this.service.updateSpotStatus(spotId, status);
    if (!updatedSpot) {
      throw notFound("Parking spot not found");
    }

    return updatedSpot;
  }

  getSpots() {
    return this.service.getSpots();
  }

  getFloors() {
    return this.service.getFloors();
  }
}

export const parkingLotHelper = new ParkingLotHelper(parkingLotService);
