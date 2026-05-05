import { apiClient } from "../../../shared/services/apiClient";
import type { SeedResult } from "../types";

export const SeedRepository = {
  async run(payload: unknown): Promise<SeedResult> {
    const { data } = await apiClient.post("/api/admin/seed", payload);
    return data;
  },
};
