import { apiClient } from "../../../shared/services/apiClient";
import type { FeeConfig, FeeRevenue } from "../types";

export const FeeRepository = {
  async getConfig(): Promise<FeeConfig> {
    const { data } = await apiClient.get("/api/admin/fees");
    return data;
  },

  async updateRate(rate: number): Promise<FeeConfig> {
    const { data } = await apiClient.put("/api/admin/fees", { rate });
    return data;
  },

  async getRevenue(): Promise<FeeRevenue> {
    const { data } = await apiClient.get("/api/admin/fees/revenue");
    return data;
  },
};
