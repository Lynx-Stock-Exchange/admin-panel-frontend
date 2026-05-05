import { SeedRepository } from "./SeedRepository";
import type { SeedResult } from "../types";

export const SeedManager = {
  async run(payload: unknown): Promise<SeedResult> {
    return SeedRepository.run(payload);
  },
};
