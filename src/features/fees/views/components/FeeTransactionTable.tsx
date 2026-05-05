import { RefreshCw } from "lucide-react";
import { formatCurrency, shortenId } from "../../utils/format";
import type { FeeOrder } from "../../types";

interface Props {
  orders: FeeOrder[];
  loading: boolean;
  error: string | null;
  onReload: () => void;
}

const SIDE_BADGE: Record<FeeOrder["side"], string> = {
  BUY: "bg-emerald-50 text-emerald-700",
  SELL: "bg-red-50 text-red-700",
};

export default function FeeTransactionTable({ orders, loading, error, onReload }: Props) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-sm font-medium text-zinc-900">Fee Transactions</h2>
          <p className="text-xs text-zinc-400 mt-0.5">All filled orders that generated exchange fees.</p>
        </div>
        <button
          onClick={onReload}
          disabled={loading}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-zinc-200 text-xs text-zinc-500 hover:text-zinc-900 hover:border-zinc-300 transition-colors disabled:opacity-50 cursor-pointer"
        >
          <RefreshCw size={12} className={loading ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      {error && (
        <p className="text-xs text-red-600 mb-3">{error}</p>
      )}

      {loading ? (
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-10 animate-pulse rounded bg-zinc-100" />
          ))}
        </div>
      ) : orders.length === 0 ? (
        <div className="rounded-md border border-dashed border-zinc-200 px-4 py-8 text-center">
          <p className="text-sm text-zinc-400">No fee transactions yet.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-100">
                <th className="pb-2 text-left text-xs font-medium text-zinc-400">Order ID</th>
                <th className="pb-2 text-left text-xs font-medium text-zinc-400">Platform</th>
                <th className="pb-2 text-left text-xs font-medium text-zinc-400">Instrument</th>
                <th className="pb-2 text-left text-xs font-medium text-zinc-400">Side</th>
                <th className="pb-2 text-right text-xs font-medium text-zinc-400">Qty</th>
                <th className="pb-2 text-right text-xs font-medium text-zinc-400">Avg Price</th>
                <th className="pb-2 text-right text-xs font-medium text-zinc-400">Fee</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-50">
              {orders.map((order) => (
                <tr key={order.order_id} className="hover:bg-zinc-50 transition-colors">
                  <td className="py-2.5 font-mono text-xs text-zinc-400">{shortenId(order.order_id)}</td>
                  <td className="py-2.5 text-xs text-zinc-500">{order.platform_id}</td>
                  <td className="py-2.5 font-mono text-xs text-zinc-900">{order.instrument_id}</td>
                  <td className="py-2.5">
                    <span className={`inline-block rounded px-1.5 py-0.5 text-xs font-medium ${SIDE_BADGE[order.side]}`}>
                      {order.side}
                    </span>
                  </td>
                  <td className="py-2.5 text-right text-zinc-700">{order.filled_quantity}</td>
                  <td className="py-2.5 text-right font-mono text-zinc-700">{formatCurrency(order.average_fill_price)}</td>
                  <td className="py-2.5 text-right font-mono text-zinc-900 font-medium">{formatCurrency(order.exchange_fee)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
