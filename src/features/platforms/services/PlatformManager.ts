import { PlatformRepository } from "./PlatformRepository";
import type { Platform, CreatePlatformPayload, CreatedPlatformResult } from "../types";

export const PlatformManager = {
  async list(): Promise<Platform[]> {
    return PlatformRepository.list();
  },

  async create(payload: CreatePlatformPayload): Promise<CreatedPlatformResult> {
    return PlatformRepository.create(payload);
  },

  async revoke(platformId: string): Promise<Platform> {
    return PlatformRepository.revoke(platformId);
  },
};
