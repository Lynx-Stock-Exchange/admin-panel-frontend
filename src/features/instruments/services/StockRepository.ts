import { apiClient } from "../../../shared/services/apiClient";
import type { Stock, CreateStockPayload, UpdateStockPayload } from "../types";

export const StockRepository = {
  async list(): Promise<Stock[]> {
    const { data } = await apiClient.get("/api/admin/stocks");
    return data.stocks ?? data;
  },

  async create(payload: CreateStockPayload): Promise<Stock> {
    const { data } = await apiClient.post("/api/admin/stocks", payload);
    return data.stock ?? data;
  },

  async update(ticker: string, payload: UpdateStockPayload): Promise<Stock> {
    const { data } = await apiClient.put(`/api/admin/stocks/${ticker}`, payload);
    return data.stock ?? data;
  },

  async remove(ticker: string): Promise<void> {
    await apiClient.delete(`/api/admin/stocks/${ticker}`);
  },
};
