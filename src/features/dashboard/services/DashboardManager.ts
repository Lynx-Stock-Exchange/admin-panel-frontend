import { DashboardRepository } from "./DashboardRepository";
import type { DashboardStats } from "../types";

export const DashboardManager = {
  async getStats(): Promise<DashboardStats> {
    const [platformCount, { stockCount, optionCount }, totalFeeRevenue] = await Promise.all([
      DashboardRepository.getPlatformCount(),
      DashboardRepository.getInstrumentCounts(),
      DashboardRepository.getTotalFeeRevenue(),
    ]);
    return { platformCount, stockCount, optionCount, totalFeeRevenue };
  },
};
