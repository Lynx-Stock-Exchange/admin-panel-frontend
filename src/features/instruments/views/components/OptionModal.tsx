import { useState } from "react";
import { X } from "lucide-react";
import type { OptionContract, CreateOptionPayload, UpdateOptionPayload } from "../../types";
import { shortenId } from "../../utils/format";

interface Props {
  mode: "add" | "edit";
  option?: OptionContract;
  onClose: () => void;
  onCreate: (payload: CreateOptionPayload) => Promise<void>;
  onUpdate: (optionId: string, payload: UpdateOptionPayload) => Promise<void>;
}

type FormData = {
  underlying_ticker: string;
  option_type: "CALL" | "PUT";
  strike_price: string;
  expiry_time: string;
  premium: string;
};

function initForm(option?: OptionContract): FormData {
  return {
    underlying_ticker: option?.underlying_ticker ?? "",
    option_type: option?.option_type ?? "CALL",
    strike_price: option ? String(option.strike_price) : "",
    expiry_time: option?.expiry_time ? option.expiry_time.slice(0, 16) : "",
    premium: option ? String(option.premium) : "",
  };
}

export default function OptionModal({ mode, option, onClose, onCreate, onUpdate }: Props) {
  const [form, setForm] = useState<FormData>(() => initForm(option));
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
      if (mode === "add") {
        await onCreate({
          underlying_ticker: form.underlying_ticker.trim().toUpperCase(),
          option_type: form.option_type,
          strike_price: parseFloat(form.strike_price),
          expiry_time: form.expiry_time,
          initial_premium: parseFloat(form.premium),
        });
      } else {
        await onUpdate(option!.option_id, {
          strike_price: parseFloat(form.strike_price),
          expiry_time: form.expiry_time,
          premium: parseFloat(form.premium),
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
      <div className="bg-white rounded-lg border border-zinc-200 shadow-lg w-full max-w-md mx-4">
        <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-100">
          <h3 className="text-sm font-semibold text-zinc-900">
            {mode === "add" ? "Add Option Contract" : `Edit ${shortenId(option!.option_id)}`}
          </h3>
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
                disabled={mode === "edit"}
                onChange={(e) => set("underlying_ticker", e.target.value)}
                className={mode === "edit" ? inputDisabledCls : inputCls}
              />
            </Field>

            <Field label="Type" required>
              <select
                value={form.option_type}
                disabled={mode === "edit"}
                onChange={(e) => set("option_type", e.target.value as "CALL" | "PUT")}
                className={mode === "edit" ? inputDisabledCls : inputCls}
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

            <Field label={mode === "add" ? "Initial Premium" : "Premium"} required>
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

          <Field label="Expiry Time" required className="col-span-2">
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
              {submitting ? "Saving…" : mode === "add" ? "Add Contract" : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const inputCls =
  "w-full rounded-md border border-zinc-200 px-3 py-2 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900";

const inputDisabledCls =
  "w-full rounded-md border border-zinc-100 bg-zinc-50 px-3 py-2 text-sm text-zinc-400 cursor-not-allowed";

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
