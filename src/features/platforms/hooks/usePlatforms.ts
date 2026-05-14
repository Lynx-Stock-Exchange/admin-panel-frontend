import { useEffect, useState } from "react";
import { PlatformManager } from "../services/PlatformManager";
import type { Platform, CreatedPlatformResult, CreatePlatformPayload } from "../types";

export function usePlatforms() {
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [revokingId, setRevokingId] = useState<string | null>(null);

  async function loadPlatforms() {
    setIsLoading(true);
    try {
      setPlatforms(await PlatformManager.list());
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadPlatforms();
  }, []);

  async function createPlatform(
    payload: CreatePlatformPayload,
  ): Promise<CreatedPlatformResult> {
    const result = await PlatformManager.create(payload);
    setPlatforms((prev) => [result.platform, ...prev]);
    return result;
  }

  async function revokePlatform(platformId: string): Promise<boolean> {
    setRevokingId(platformId);
    try {
      const updated = await PlatformManager.revoke(platformId);
      setPlatforms((prev) => prev.map((platform) => (
        platform.id === updated.id ? updated : platform
      )));
      return true;
    } finally {
      setRevokingId(null);
    }
  }

  return {
    platforms,
    isLoading,
    revokingId,
    loadPlatforms,
    createPlatform,
    revokePlatform,
  };
}
