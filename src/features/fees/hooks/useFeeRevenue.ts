import { useState, useEffect, useCallback } from "react";
import { FeeManager } from "../services/FeeManager";
import type { FeeRevenue } from "../types";

export function useFeeRevenue() {
  const [revenue, setRevenue] = useState<FeeRevenue | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await FeeManager.getRevenue();
      setRevenue(data);
    } catch {
      setError("Failed to load revenue data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  return { revenue, loading, error, reload: load };
}
