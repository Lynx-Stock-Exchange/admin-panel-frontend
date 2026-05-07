import { useEffect, useState } from "react";
import { DashboardManager } from "../services/DashboardManager";
import type { DashboardStats } from "../types";

export function useDashboardStats() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchStats() {
    setLoading(true);
    try {
      setError(null);
      const data = await DashboardManager.getStats();
      setStats(data);
    } catch {
      setError("Failed to load dashboard stats.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchStats();
  }, []);

  return { stats, loading, error, refetch: fetchStats };
}
