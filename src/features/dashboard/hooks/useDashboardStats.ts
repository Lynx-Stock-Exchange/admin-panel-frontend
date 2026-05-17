import { useEffect, useState } from "react";
import { DashboardManager } from "../services/DashboardManager";
import type { DashboardStats } from "../types";

export function useDashboardStats() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      setStats(await DashboardManager.getStats());
    } catch {
      // leave stats null — cards will show "—"
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return { stats, loading, reload: load };
}
