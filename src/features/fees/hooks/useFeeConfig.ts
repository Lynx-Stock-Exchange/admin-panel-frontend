import { useState, useEffect, useCallback } from "react";
import { FeeManager } from "../services/FeeManager";
import type { FeeConfig } from "../types";

export function useFeeConfig() {
  const [config, setConfig] = useState<FeeConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await FeeManager.getConfig();
      setConfig(data);
    } catch {
      setError("Failed to load fee configuration.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  async function updateRate(rate: number): Promise<boolean> {
    setUpdateLoading(true);
    setError(null);
    try {
      const data = await FeeManager.updateRate(rate);
      setConfig(data);
      setFeedback("Fee rate updated successfully.");
      return true;
    } catch {
      setError("Failed to update fee rate.");
      return false;
    } finally {
      setUpdateLoading(false);
    }
  }

  return { config, loading, updateLoading, error, feedback, setFeedback, updateRate };
}
