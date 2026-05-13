import { useState } from "react";
import { X } from "lucide-react";
import type { Stock, CreateStockPayload, UpdateStockPayload } from "../../types";

interface Props {
  mode: "add" | "edit";
  stock?: Stock;
  onClose: () => void;
  onCreate: (payload: CreateStockPayload) => Promise<void>;
  onUpdate: (ticker: string, payload: UpdateStockPayload) => Promise<void>;
}

type FormData = {
  ticker: string;
  name: string;
  sector: string;
  start_price: string;
  volatility: string;
  trend_bias: string;
  event_weight: string;
  momentum: string;
};

function initForm(stock?: Stock): FormData {
  return {
    ticker: stock?.ticker ?? "",
    name: stock?.name ?? "",
    sector: stock?.sector ?? "",
    start_price: "",
    volatility: stock ? String(stock.volatility) : "",
    trend_bias: stock ? String(stock.trend_bias) : "",
    event_weight: stock ? String(stock.event_weight) : "",
    momentum: stock ? String(stock.momentum) : "",
  };
}

export default function StockModal({ mode, stock, onClose, onCreate, onUpdate }: Props) {
  const [form, setForm] = useState<FormData>(() => initForm(stock));
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function set(field: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      if (mode === "add") {
        await onCreate({
          ticker: form.ticker.trim().toUpperCase(),
          name: form.name.trim(),
          sector: form.sector.trim(),
          start_price: parseFloat(form.start_price),
          volatility: parseFloat(form.volatility),
          trend_bias: parseFloat(form.trend_bias),
          event_weight: parseFloat(form.event_weight),
          momentum: parseFloat(form.momentum),
        });
      } else {
        await onUpdate(stock!.ticker, {
          name: form.name.trim(),
          sector: form.sector.trim(),
          volatility: parseFloat(form.volatility),
          trend_bias: parseFloat(form.trend_bias),
          event_weight: parseFloat(form.event_weight),
          momentum: parseFloat(form.momentum),
        });
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg border border-zinc-200 shadow-lg w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-100">
          <h3 className="text-sm font-semibold text-zinc-900">
            {mode === "add" ? "Add Stock" : `Edit ${stock?.ticker}`}
          </h3>
          <button onClick={onClose} className="text-zinc-400 hover:text-zinc-700 cursor-pointer">
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {mode === "add" && (
            <Field label="Ticker" required>
              <input
                type="text"
                required
                maxLength={5}
                placeholder="e.g. ARKA"
                value={form.ticker}
                onChange={(e) => set("ticker", e.target.value)}
                className={inputCls}
              />
            </Field>
          )}

          <div className="grid grid-cols-2 gap-4">
            <Field label="Name" required className="col-span-2">
              <input
                type="text"
                required
                placeholder="e.g. Arkadia Technologies"
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                className={inputCls}
              />
            </Field>

            <Field label="Sector" required>
              <input
                type="text"
                required
                placeholder="e.g. Tech"
                value={form.sector}
                onChange={(e) => set("sector", e.target.value)}
                className={inputCls}
              />
            </Field>

            {mode === "add" && (
              <Field label="Start Price" required>
                <input
                  type="number"
                  required
                  min={0.01}
                  step={0.01}
                  placeholder="120.00"
                  value={form.start_price}
                  onChange={(e) => set("start_price", e.target.value)}
                  className={inputCls}
                />
              </Field>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Volatility" hint="0.0 – 1.0" required>
              <input
                type="number"
                required
                min={0}
                max={1}
                step={0.001}
                placeholder="0.03"
                value={form.volatility}
                onChange={(e) => set("volatility", e.target.value)}
                className={inputCls}
              />
            </Field>

            <Field label="Trend Bias" hint="per tick drift" required>
              <input
                type="number"
                required
                step={0.0001}
                placeholder="0.001"
                value={form.trend_bias}
                onChange={(e) => set("trend_bias", e.target.value)}
                className={inputCls}
              />
            </Field>

            <Field label="Event Weight" hint="event impact multiplier" required>
              <input
                type="number"
                required
                min={0}
                step={0.1}
                placeholder="1.5"
                value={form.event_weight}
                onChange={(e) => set("event_weight", e.target.value)}
                className={inputCls}
              />
            </Field>

            <Field label="Momentum" hint="0.0 – 1.0" required>
              <input
                type="number"
                required
                min={0}
                max={1}
                step={0.01}
                placeholder="0.6"
                value={form.momentum}
                onChange={(e) => set("momentum", e.target.value)}
                className={inputCls}
              />
            </Field>
          </div>

          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}

          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="px-4 py-2 text-sm font-medium rounded-md border border-zinc-200 text-zinc-700 hover:bg-zinc-50 transition-colors cursor-pointer disabled:opacity-40"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-2 text-sm font-medium rounded-md bg-zinc-900 text-white hover:bg-zinc-700 transition-colors cursor-pointer disabled:opacity-40"
            >
              {submitting ? "Saving…" : mode === "add" ? "Add Stock" : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const inputCls =
  "w-full rounded-md border border-zinc-200 px-3 py-2 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900";

function Field({
  label,
  hint,
  required,
  className,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label className="block text-xs font-medium text-zinc-600 mb-1">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
        {hint && <span className="ml-1 font-normal text-zinc-400">({hint})</span>}
      </label>
      {children}
    </div>
  );
}
