import { useEffect, useState } from "react";
import { apiClient } from "../../../shared/services/apiClient";

interface DashboardStats {
  activePlatforms: number;
  listedStocks: number;
  filledOrders: number;
  totalRevenue: number;
}

export function useDashboardStats() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      const [platformsRes, stocksRes, revenueRes] = await Promise.all([
        apiClient.get("/api/admin/platforms"),
        apiClient.get("/api/admin/stocks"),
        apiClient.get("/api/admin/fees/revenue"),
      ]);

      const platforms: { is_active: boolean }[] = platformsRes.data.platforms ?? [];
      const stocks: unknown[] = stocksRes.data.stocks ?? stocksRes.data ?? [];
      const revenue = revenueRes.data;

      setStats({
        activePlatforms: platforms.filter((p) => p.is_active).length,
        listedStocks: stocks.length,
        filledOrders: revenue.filled_order_count ?? 0,
        totalRevenue: revenue.total_revenue ?? 0,
      });
    } catch {
      // leave stats null — cards will show "—"
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  return { stats, loading, reload: load };
}
