import { useState } from "react";
import { X } from "lucide-react";
import type { CreateOptionPayload } from "../../types";

interface Props {
  mode: "add";
  onClose: () => void;
  onCreate: (payload: CreateOptionPayload) => Promise<void>;
}

type FormData = {
  underlying_ticker: string;
  option_type: "CALL" | "PUT";
  strike_price: string;
  expiry_time: string;
  premium: string;
};

function initForm(): FormData {
  return {
    underlying_ticker: "",
    option_type: "CALL",
    strike_price: "",
    expiry_time: "",
    premium: "",
  };
}

export default function OptionModal({ onClose, onCreate }: Props) {
  const [form, setForm] = useState<FormData>(initForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function set<K extends keyof FormData>(field: K, value: FormData[K]) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await onCreate({
        underlying_ticker: form.underlying_ticker.trim().toUpperCase(),
        option_type: form.option_type,
        strike_price: parseFloat(form.strike_price),
        expiry_time: form.expiry_time,
        initial_premium: parseFloat(form.premium),
      });
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg border border-zinc-200 shadow-lg w-full max-w-md mx-4">
        <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-100">
          <h3 className="text-sm font-semibold text-zinc-900">Add Option Contract</h3>
          <button onClick={onClose} className="text-zinc-400 hover:text-zinc-700 cursor-pointer">
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Underlying Ticker" required>
              <input
                type="text"
                required
                maxLength={5}
                placeholder="ARKA"
                value={form.underlying_ticker}
                onChange={(e) => set("underlying_ticker", e.target.value)}
                className={inputCls}
              />
            </Field>

            <Field label="Type" required>
              <select
                value={form.option_type}
                onChange={(e) => set("option_type", e.target.value as "CALL" | "PUT")}
                className={inputCls}
              >
                <option value="CALL">CALL</option>
                <option value="PUT">PUT</option>
              </select>
            </Field>

            <Field label="Strike Price" required>
              <input
                type="number"
                required
                min={0.01}
                step={0.01}
                placeholder="130.00"
                value={form.strike_price}
                onChange={(e) => set("strike_price", e.target.value)}
                className={inputCls}
              />
            </Field>

            <Field label="Initial Premium" required>
              <input
                type="number"
                required
                min={0.01}
                step={0.01}
                placeholder="5.00"
                value={form.premium}
                onChange={(e) => set("premium", e.target.value)}
                className={inputCls}
              />
            </Field>
          </div>

          <Field label="Expiry Time" required>
            <input
              type="datetime-local"
              required
              value={form.expiry_time}
              onChange={(e) => set("expiry_time", e.target.value)}
              className={inputCls}
            />
          </Field>

          {error && <p className="text-sm text-red-600">{error}</p>}

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
              {submitting ? "Saving…" : "Add Contract"}
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
  required,
  className,
  children,
}: {
  label: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label className="block text-xs font-medium text-zinc-600 mb-1">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}
