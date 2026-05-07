import { DashboardRepository } from "./DashboardRepository";
import type { DashboardStats } from "../types";

export const DashboardManager = {
  async getStats(): Promise<DashboardStats> {
    const [platformCount, instrumentCount, totalFeeRevenue] = await Promise.all([
      DashboardRepository.getPlatformCount(),
      DashboardRepository.getInstrumentCount(),
      DashboardRepository.getTotalFeeRevenue(),
    ]);
    return { platformCount, instrumentCount, totalFeeRevenue };
  },
};
