import { FeeRepository } from "./FeeRepository";
import type { FeeConfig, FeeRevenue } from "../types";

export const FeeManager = {
  async getConfig(): Promise<FeeConfig> {
    return FeeRepository.getConfig();
  },

  async updateRate(rate: number): Promise<FeeConfig> {
    return FeeRepository.updateRate(rate);
  },

  async getRevenue(): Promise<FeeRevenue> {
    return FeeRepository.getRevenue();
  },
};
