import { monitoringRepository, type MonitoringRepository } from "./Monitoring.repository.js";

export class MonitoringService {
  constructor(private readonly repository: MonitoringRepository) {}

  getAvailability() {
    return this.repository.getAvailability();
  }

  getTicketCounts() {
    return this.repository.getTicketCounts();
  }

  listRecentTickets(limit?: number) {
    return this.repository.listRecentTickets(limit);
  }
}

export const monitoringService = new MonitoringService(monitoringRepository);
