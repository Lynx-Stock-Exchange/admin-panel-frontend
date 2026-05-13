import { useDashboardStats } from "../hooks/useDashboardStats";
import { useMarketControl } from "../../market/hooks/useMarketControl";
import MarketStatusCard from "../../market/views/components/MarketStatusCard";

function formatRevenue(value: number): string {
  return `$${value.toFixed(2)}`;
}

export default function Dashboard() {
  const { stats, loading } = useDashboardStats();
  const { status, loading: marketLoading, fetchStatus } = useMarketControl();

  const statCards = [
    {
      label: "Active Platforms",
      value: stats != null ? String(stats.activePlatforms) : null,
    },
    {
      label: "Listed Stocks",
      value: stats != null ? String(stats.listedStocks) : null,
    },
    {
      label: "Filled Orders",
      value: stats != null ? String(stats.filledOrders) : null,
    },
    {
      label: "Exchange Revenue",
      value: stats != null ? formatRevenue(stats.totalRevenue) : null,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {statCards.map((stat) => (
          <div
            key={stat.label}
            className="rounded-lg border border-zinc-200 bg-white p-5"
          >
            <p className="text-xs text-zinc-500 uppercase tracking-wide">
              {stat.label}
            </p>
            {loading ? (
              <div className="mt-2 h-8 w-20 animate-pulse rounded bg-zinc-100" />
            ) : (
              <p className="mt-2 text-2xl font-semibold text-zinc-900">
                {stat.value ?? "—"}
              </p>
            )}
          </div>
        ))}
      </div>

      <MarketStatusCard
        status={status}
        loading={marketLoading}
        onRefresh={fetchStatus}
      />
    </div>
  );
}
