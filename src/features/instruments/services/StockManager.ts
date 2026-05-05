import { StockRepository } from "./StockRepository";
import type { Stock, CreateStockPayload, UpdateStockPayload } from "../types";

export const StockManager = {
  async list(): Promise<Stock[]> {
    return StockRepository.list();
  },

  async create(payload: CreateStockPayload): Promise<Stock> {
    return StockRepository.create(payload);
  },

  async update(ticker: string, payload: UpdateStockPayload): Promise<Stock> {
    return StockRepository.update(ticker, payload);
  },

  async remove(ticker: string): Promise<void> {
    return StockRepository.remove(ticker);
  },
};
