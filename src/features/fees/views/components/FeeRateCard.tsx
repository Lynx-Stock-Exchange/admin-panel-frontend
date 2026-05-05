import { useState, useEffect, type SubmitEvent } from "react";
import { formatRate } from "../../utils/format";
import type { FeeConfig } from "../../types";

interface Props {
  config: FeeConfig | null;
  currentRate: number | null;
  loading: boolean;
  updateLoading: boolean;
  onUpdate: (rate: number) => Promise<boolean>;
}

export default function FeeRateCard({ config, currentRate, loading, updateLoading, onUpdate }: Props) {
  const [input, setInput] = useState("");

  useEffect(() => {
    const rate = currentRate ?? config?.fee_rate;
    if (rate != null) setInput(String(rate));
  }, [currentRate, config]);

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const rate = parseFloat(input);
    if (isNaN(rate) || rate <= 0 || rate >= 1) return;
    await onUpdate(rate);
  }

  const displayRate = currentRate ?? config?.fee_rate ?? null;

  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-5">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-sm font-medium text-zinc-900 mb-1">Exchange Fee Rate</h2>
          <p className="text-xs text-zinc-400">
            Applied to every executed trade:{" "}
            <span className="font-mono">execution_price × quantity × fee_rate</span>
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-zinc-400 mb-1">Current rate</p>
          {loading ? (
            <div className="h-7 w-16 animate-pulse rounded bg-zinc-100" />
          ) : (
            <p className="text-2xl font-semibold font-mono text-zinc-900">
              {displayRate != null ? formatRate(displayRate) : "—"}
            </p>
          )}
        </div>
      </div>
      <form onSubmit={handleSubmit} className="flex items-center gap-3">
        <input
          type="number"
          step="0.0001"
          min="0.0001"
          max="0.9999"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={loading || updateLoading}
          className="w-36 rounded-md border border-zinc-200 px-3 py-2 text-sm font-mono text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={loading || updateLoading}
          className="px-4 py-2 text-sm font-medium rounded-md bg-zinc-900 text-white hover:bg-zinc-700 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {updateLoading ? "Updating…" : "Update Rate"}
        </button>
      </form>
    </div>
  );
}
