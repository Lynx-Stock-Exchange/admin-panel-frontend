import { apiClient } from "../../../shared/services/apiClient";

export const DashboardRepository = {
  async getPlatformCount(): Promise<number> {
    const { data } = await apiClient.get("/api/admin/platforms");
    return (data.platforms as unknown[]).length;
  },

  async getInstrumentCount(): Promise<number> {
    const [stocksRes, optionsRes] = await Promise.all([
      apiClient.get("/api/admin/stocks"),
      apiClient.get("/api/admin/options"),
    ]);
    const stocks: unknown[] = stocksRes.data.stocks ?? stocksRes.data;
    const options: unknown[] = optionsRes.data.options ?? optionsRes.data;
    return stocks.length + options.length;
  },

  async getTotalFeeRevenue(): Promise<number> {
    const { data } = await apiClient.get("/api/admin/fees/revenue");
    return data.total_revenue as number;
  },
};
