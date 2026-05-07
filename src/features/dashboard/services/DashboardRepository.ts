import { apiClient } from "../../../shared/services/apiClient";

export const DashboardRepository = {
  async getPlatformCount(): Promise<number> {
    const { data } = await apiClient.get("/api/admin/platforms/total");
    return data.count as number;
  },

  async getInstrumentCounts(): Promise<{
    stockCount: number;
    optionCount: number;
  }> {
    const [stocksRes, optionsRes] = await Promise.all([
      apiClient.get("/api/admin/stocks/total"),
      apiClient.get("/api/admin/options/total"),
    ]);
    return {
      stockCount: stocksRes.data.count as number,
      optionCount: optionsRes.data.count as number,
    };
  },

  async getTotalFeeRevenue(): Promise<number> {
    const { data } = await apiClient.get("/api/admin/fees/revenue");
    return data.total_revenue as number;
  },
};
