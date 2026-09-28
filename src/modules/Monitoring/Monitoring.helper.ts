import { monitoringService, type MonitoringService } from "./Monitoring.service.js";

export class MonitoringHelper {
  constructor(private readonly service: MonitoringService) {}

  getAvailability() {
    return this.service.getAvailability();
  }

  getSnapshot() {
    const availability = this.service.getAvailability();
    const ticketCounts = this.service.getTicketCounts();

    return {
      availability,
      ...ticketCounts,
      recentTickets: this.service.listRecentTickets(),
      capacityUsagePercent: availability.total === 0 ? 0 : Math.round((availability.occupied / availability.total) * 100),
    };
  }
}

export const monitoringHelper = new MonitoringHelper(monitoringService);
