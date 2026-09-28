import { VehicleType, type ParkingRate } from "../../../models/index.js";
import { badRequest } from "../../../utils/app-error.js";

export interface FeeBreakdown {
  vehicleType: VehicleType;
  hourlyRate: number;
  billableHours: number;
  durationMinutes: number;
  amount: number;
}

export class HourlyFeeCalculator {
  constructor(private readonly rates: ParkingRate[]) {}

  calculate(vehicleType: VehicleType, entryTime: Date, exitTime: Date): FeeBreakdown {
    if (exitTime < entryTime) {
      throw badRequest("Exit time cannot be before entry time");
    }

    const rate = this.rates.find((currentRate) => currentRate.vehicleType === vehicleType);
    if (!rate) {
      throw badRequest(`No parking rate configured for ${vehicleType}`);
    }

    const durationMs = exitTime.getTime() - entryTime.getTime();
    const durationMinutes = Math.max(1, Math.ceil(durationMs / 60000));
    const roundedHours = Math.ceil(durationMinutes / 60);
    const billableHours = Math.max(rate.minimumHours, roundedHours);

    return {
      vehicleType,
      hourlyRate: rate.hourlyRate,
      billableHours,
      durationMinutes,
      amount: billableHours * rate.hourlyRate,
    };
  }
}
