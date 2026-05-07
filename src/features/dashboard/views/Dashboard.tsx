import { useDashboardStats } from "../hooks/useDashboardStats";
import { useMarketControl } from "../../market/hooks/useMarketControl";
import StatCard from "./components/StatCard";
import MarketStatusCard from "../../../shared/components/MarketStatusCard";

function formatRevenue(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export default function Dashboard() {
  const { stats, loading } = useDashboardStats();
  const { status, loading: marketLoading, fetchStatus } = useMarketControl();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <StatCard
          label="Platforms"
          value={stats?.platformCount ?? 0}
          loading={loading}
          linkTo="/platforms"
          linkLabel="Manage platforms"
        />
        <StatCard
          label="Instruments"
          value={stats ? stats.stockCount + stats.optionCount : 0}
          detail={stats ? `${stats.stockCount} stocks · ${stats.optionCount} options` : undefined}
          loading={loading}
          linkTo="/instruments"
          linkLabel="Manage instruments"
        />
        <StatCard
          label="Total Fee Revenue"
          value={stats ? formatRevenue(stats.totalFeeRevenue) : "—"}
          loading={loading}
          linkTo="/fees"
          linkLabel="View fees"
        />
      </div>

      <MarketStatusCard
        status={status}
        loading={marketLoading}
        onRefresh={fetchStatus}
        linkTo="/market"
      />
    </div>
  );
}
