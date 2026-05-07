import { TrendingUp } from "lucide-react";
import { formatCurrency } from "../../utils/format";
import type { FeeRevenue } from "../../types";

interface Props {
  revenue: FeeRevenue | null;
  loading: boolean;
}

export default function RevenueStatCard({ revenue, loading }: Props) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-zinc-400 font-medium uppercase tracking-wide">Total Revenue Earned</p>
          {loading ? (
            <div className="mt-2 h-7 w-32 animate-pulse rounded bg-zinc-100" />
          ) : (
            <p className="mt-1 text-2xl font-semibold text-zinc-900">
              {revenue ? formatCurrency(revenue.total_revenue) : "—"}
            </p>
          )}
          {!loading && revenue && revenue.filled_order_count != null && (
            <p className="mt-1 text-xs text-zinc-400">
              from {revenue.filled_order_count.toLocaleString()} filled order{revenue.filled_order_count !== 1 ? "s" : ""}
            </p>
          )}
        </div>
        <div className="rounded-md bg-zinc-100 p-2">
          <TrendingUp size={18} className="text-zinc-500" strokeWidth={1.75} />
        </div>
      </div>
    </div>
  );
}
