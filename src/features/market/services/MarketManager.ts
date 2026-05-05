import { MarketRepository } from "./MarketRepository";
import type { MarketStatus, MarketActionResponse } from "../types";

export const MarketManager = {
  async getStatus(): Promise<MarketStatus> {
    return MarketRepository.getStatus();
  },

  async open(): Promise<MarketActionResponse> {
    return MarketRepository.open();
  },

  async close(): Promise<MarketActionResponse> {
    return MarketRepository.close();
  },

  async setSpeed(multiplier: number): Promise<MarketActionResponse> {
    return MarketRepository.setSpeed(multiplier);
  },
};
