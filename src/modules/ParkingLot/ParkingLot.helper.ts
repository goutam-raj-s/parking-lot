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
import { monitoringHelper } from "../Monitoring/Monitoring.helper.js";
import { paymentsService } from "../Payments/Payments.service.js";
import { parkingFloorsService } from "../ParkingFloors/ParkingFloors.service.js";
import { parkingSpotsHelper } from "../ParkingSpots/ParkingSpots.helper.js";
import { parkingSpotsService } from "../ParkingSpots/ParkingSpots.service.js";
import { ratesService } from "../Rates/Rates.service.js";
import { terminalsService } from "../Terminals/Terminals.service.js";
import { ticketsService } from "../Tickets/Tickets.service.js";
import { vehiclesService } from "../Vehicles/Vehicles.service.js";

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
    return monitoringHelper.getAvailability();
  }

  getMonitoring() {
    return monitoringHelper.getSnapshot();
  }

  getTicket(ticketId: string) {
    const ticket = ticketsService.findById(ticketId);
    if (!ticket) {
      throw notFound("Ticket not found");
    }

    return ticket;
  }

  async checkIn(input: CheckInInput) {
    return this.allocationMutex.runExclusive(() => {
      const entrance = terminalsService.findEntranceById(input.entranceId);
      if (!entrance) {
        throw badRequest("Entrance terminal not found");
      }

      const plateNumber = vehiclesService.normalizePlateNumber(input.vehicle.plateNumber);
      const existingTicket = ticketsService.findActiveByPlate(plateNumber);
      if (existingTicket) {
        throw conflict("Vehicle already has an active parking ticket");
      }

      const spot = this.allocationStrategy.findSpot(parkingSpotsService.getSpots(), {
        vehicleType: input.vehicle.type,
        entranceId: input.entranceId,
        preferredSpotType: input.preferredSpotType,
      });

      if (!spot) {
        throw conflict("No compatible parking spot is available");
      }

      const ticketId = createId("ticket");
      const ticket = ticketsService.create({
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

      const occupiedSpot = parkingSpotsService.occupySpot(spot.id, ticket.id);
      if (!occupiedSpot) {
        throw conflict("Unable to occupy selected parking spot");
      }

      return { ticket, spot: occupiedSpot };
    });
  }

  async checkOut(input: CheckOutInput) {
    return this.allocationMutex.runExclusive(() => {
      const exit = terminalsService.findExitById(input.exitId);
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
      const fee = new HourlyFeeCalculator(ratesService.list()).calculate(
        ticket.vehicle.type,
        new Date(ticket.entryTime),
        exitTime,
      );

      const updatedTicket = ticketsService.update({
        ...ticket,
        exitTime: exitTime.toISOString(),
        feeAmount: fee.amount,
        status: TicketStatus.CheckedOut,
      });

      parkingSpotsService.releaseSpot(ticket.spotId);

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

      const payment = paymentsService.create({
        id: createId("payment"),
        ticketId: ticket.id,
        method: input.method,
        amount: input.amount,
        status: PaymentStatus.Completed,
        paidAt: new Date().toISOString(),
      });

      const paidTicket = ticketsService.update({
        ...ticket,
        paymentId: payment.id,
        status: TicketStatus.Paid,
      });

      return { ticket: paidTicket, payment };
    });
  }

  setSpotStatus(spotId: string, status: ParkingSpotStatus) {
    return parkingSpotsHelper.setSpotStatus(spotId, status);
  }

  getSpots() {
    return parkingSpotsService.getSpots();
  }

  getFloors() {
    return parkingFloorsService.getFloors();
  }
}

export const parkingLotHelper = new ParkingLotHelper(parkingLotService);
