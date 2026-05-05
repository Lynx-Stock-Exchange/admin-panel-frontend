import { apiClient } from "../../../shared/services/apiClient";
import type { Platform, CreatePlatformPayload, CreatedPlatformResult } from "../types";

export const PlatformRepository = {
  async list(): Promise<Platform[]> {
    const { data } = await apiClient.get("/api/admin/platforms");
    return data.platforms;
  },

  async create(payload: CreatePlatformPayload): Promise<CreatedPlatformResult> {
    const { data } = await apiClient.post("/api/admin/platforms", payload);
    return { platform: data.platform, api_secret: data.api_secret };
  },

  async revoke(platformId: string): Promise<Platform> {
    const { data } = await apiClient.delete(`/api/admin/platforms/${platformId}`);
    return data.platform;
  },
};
