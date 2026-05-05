import { apiClient } from "../../../shared/services/apiClient";
import type { MarketStatus, MarketActionResponse } from "../types";

export const MarketRepository = {
  async getStatus(): Promise<MarketStatus> {
    const { data } = await apiClient.get("/api/admin/market/status");
    return data;
  },

  async open(): Promise<MarketActionResponse> {
    const { data } = await apiClient.post("/api/admin/market/open");
    return data;
  },

  async close(): Promise<MarketActionResponse> {
    const { data } = await apiClient.post("/api/admin/market/close");
    return data;
  },

  async setSpeed(multiplier: number): Promise<MarketActionResponse> {
    const { data } = await apiClient.put("/api/admin/market/speed", { multiplier });
    return data;
  },
};
