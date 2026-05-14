import { RefreshCw } from "lucide-react";
import { Link } from "react-router";
import { useEffect, useMemo, useState } from "react";
import type { MarketStatus } from "../types/market";

interface Props {
  status: MarketStatus | null;
  loading: boolean;
  onRefresh: () => void;
  linkTo?: string;
}

function formatDateTime(date: Date) {
  return date.toLocaleString("en-GB", {
    dateStyle: "medium",
    timeStyle: "medium",
  });
}

export default function MarketStatusCard({ status, loading, onRefresh, linkTo }: Props) {
  // useMemo runs synchronously during the same render that receives the new status,
  // so the baseline is always in sync — no one-frame flash of stale values.
  const baseline = useMemo(
    () =>
      status
        ? {
            marketMs: new Date(status.market_time).getTime(),
            realMs: new Date(status.real_time).getTime(),
            at: performance.now(),
          }
        : null,
    [status],
  );

  // Tick counter just triggers re-renders; rate scales with multiplier.
  const [, setTick] = useState(0);
  useEffect(() => {
    if (!status) return;
    const tickMs = Math.max(16, Math.round(1_000 / status.speed_multiplier));
    const id = setInterval(() => setTick((n) => n + 1), tickMs);
    return () => clearInterval(id);
  }, [status]);

  const elapsedMs = baseline ? performance.now() - baseline.at : 0;
  const localRealTime = baseline ? new Date(baseline.realMs + elapsedMs) : null;
  const localMarketTime =
    baseline && status
      ? new Date(baseline.marketMs + elapsedMs * status.speed_multiplier)
      : null;

  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-sm font-medium text-zinc-900">Market Status</h2>
          <p className="text-xs text-zinc-400 mt-0.5">Current state of the exchange.</p>
        </div>
        <div className="flex items-center gap-2">
          {linkTo && (
            <Link
              to={linkTo}
              className="text-xs text-zinc-400 hover:text-zinc-700 transition-colors"
            >
              Go to market →
            </Link>
          )}
          <button
            onClick={onRefresh}
            disabled={loading}
            className="p-1.5 rounded-md text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors cursor-pointer disabled:opacity-40"
            title="Refresh"
          >
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          </button>
        </div>
      </div>

      {loading && (
        <div className="flex items-center gap-2 text-sm text-zinc-400">
          <RefreshCw size={13} className="animate-spin" />
          Loading…
        </div>
      )}

      {!loading && status && localMarketTime && localRealTime && (
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                status.is_open ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  status.is_open ? "bg-green-500" : "bg-red-500"
                }`}
              />
              {status.is_open ? "OPEN" : "CLOSED"}
            </span>
            <span className="text-xs text-zinc-400">
              Speed:{" "}
              <span className="font-medium text-zinc-700">{status.speed_multiplier}x</span>
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs text-zinc-500">
            <div>
              <span className="block text-zinc-400 mb-0.5">Market Time</span>
              <span className="font-medium text-zinc-700 tabular-nums">
                {formatDateTime(localMarketTime)}
              </span>
            </div>
            <div>
              <span className="block text-zinc-400 mb-0.5">Real Time</span>
              <span className="font-medium text-zinc-700 tabular-nums">
                {formatDateTime(localRealTime)}
              </span>
            </div>
            {status.active_event && (
              <div className="col-span-2">
                <span className="block text-zinc-400 mb-0.5">Active Event</span>
                <span className="font-medium text-zinc-700">{status.active_event}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
