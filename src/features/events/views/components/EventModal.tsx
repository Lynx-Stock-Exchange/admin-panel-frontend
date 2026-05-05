import { useState } from "react";
import { X } from "lucide-react";
import type { EventDefinition, CreateEventDefinitionPayload, EventType, EventScope } from "../../types";
import { EVENT_TYPE_LABELS, EVENT_TYPES, SCOPE_LABELS, EVENT_SCOPES } from "../../utils/format";

interface Props {
  mode: "add" | "edit";
  definition?: EventDefinition;
  onClose: () => void;
  onCreate: (payload: CreateEventDefinitionPayload) => Promise<void>;
  onUpdate: (eventId: string, payload: Partial<CreateEventDefinitionPayload>) => Promise<void>;
}

type FormData = {
  event_type: EventType;
  scope: EventScope;
  target: string;
  magnitude: string;
  duration_ticks: string;
  headline: string;
};

function initForm(def?: EventDefinition): FormData {
  return {
    event_type: def?.event_type ?? "BULL_RUN",
    scope: def?.scope ?? "MARKET",
    target: def?.target ?? "",
    magnitude: def ? String(def.magnitude) : "1.5",
    duration_ticks: def ? String(def.duration_ticks) : "20",
    headline: def?.headline ?? "",
  };
}

const inputCls =
  "w-full rounded-md border border-zinc-200 px-3 py-2 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900";

export default function EventModal({ mode, definition, onClose, onCreate, onUpdate }: Props) {
  const [form, setForm] = useState<FormData>(() => initForm(definition));
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function set<K extends keyof FormData>(field: K, value: FormData[K]) {
    setForm((prev) => {
      const next = { ...prev, [field]: value };
      if (field === "scope" && value === "MARKET") next.target = "";
      return next;
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const payload: CreateEventDefinitionPayload = {
      event_type: form.event_type,
      scope: form.scope,
      target: form.scope === "MARKET" ? null : form.target.trim() || null,
      magnitude: parseFloat(form.magnitude),
      duration_ticks: parseInt(form.duration_ticks, 10),
      headline: form.headline.trim(),
    };
    try {
      if (mode === "add") {
        await onCreate(payload);
      } else {
        await onUpdate(definition!.event_id, payload);
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
            {mode === "add" ? "New Event Definition" : "Edit Event Definition"}
          </h3>
          <button onClick={onClose} className="text-zinc-400 hover:text-zinc-700 cursor-pointer">
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Event Type" required>
              <select
                value={form.event_type}
                onChange={(e) => set("event_type", e.target.value as EventType)}
                className={inputCls}
              >
                {EVENT_TYPES.map((t) => (
                  <option key={t} value={t}>{EVENT_TYPE_LABELS[t]}</option>
                ))}
              </select>
            </Field>

            <Field label="Scope" required>
              <select
                value={form.scope}
                onChange={(e) => set("scope", e.target.value as EventScope)}
                className={inputCls}
              >
                {EVENT_SCOPES.map((s) => (
                  <option key={s} value={s}>{SCOPE_LABELS[s]}</option>
                ))}
              </select>
            </Field>
          </div>

          {form.scope !== "MARKET" && (
            <Field
              label={form.scope === "SECTOR" ? "Sector Name" : "Ticker"}
              required
            >
              <input
                type="text"
                required
                placeholder={form.scope === "SECTOR" ? "e.g. Tech" : "e.g. ARKA"}
                value={form.target}
                onChange={(e) => set("target", e.target.value)}
                className={inputCls}
              />
            </Field>
          )}

          <div className="grid grid-cols-2 gap-4">
            <Field label="Magnitude" hint="price impact multiplier" required>
              <input
                type="number"
                required
                min={1}
                step={0.1}
                placeholder="1.5"
                value={form.magnitude}
                onChange={(e) => set("magnitude", e.target.value)}
                className={inputCls}
              />
            </Field>

            <Field label="Duration" hint="ticks" required>
              <input
                type="number"
                required
                min={1}
                step={1}
                placeholder="20"
                value={form.duration_ticks}
                onChange={(e) => set("duration_ticks", e.target.value)}
                className={inputCls}
              />
            </Field>
          </div>

          <Field label="Headline" required>
            <textarea
              required
              rows={2}
              placeholder="e.g. Regulatory concerns shake the Tech sector"
              value={form.headline}
              onChange={(e) => set("headline", e.target.value)}
              className={`${inputCls} resize-none`}
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
              {submitting ? "Saving…" : mode === "add" ? "Create" : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({
  label,
  hint,
  required,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-zinc-600 mb-1">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
        {hint && <span className="ml-1 font-normal text-zinc-400">({hint})</span>}
      </label>
      {children}
    </div>
  );
}
