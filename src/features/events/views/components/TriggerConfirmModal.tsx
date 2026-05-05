import type { EventDefinition } from "../../types";
import { EVENT_TYPE_LABELS, EVENT_TYPE_BADGE, SCOPE_LABELS } from "../../utils/format";

interface Props {
  definition: EventDefinition;
  loading: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function TriggerConfirmModal({ definition, loading, onConfirm, onCancel }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg border border-zinc-200 shadow-lg p-6 w-full max-w-sm mx-4">
        <h3 className="text-sm font-semibold text-zinc-900 mb-1">Trigger event?</h3>
        <p className="text-xs text-zinc-400 mb-4">
          This will be broadcast immediately to all WebSocket subscribers.
        </p>

        <div className="rounded-md border border-zinc-100 bg-zinc-50 p-3 space-y-2 mb-6">
          <div className="flex items-center gap-2">
            <span className={`px-2 py-0.5 rounded text-xs font-semibold ${EVENT_TYPE_BADGE[definition.event_type]}`}>
              {EVENT_TYPE_LABELS[definition.event_type]}
            </span>
            <span className="text-xs text-zinc-500">{SCOPE_LABELS[definition.scope]}</span>
            {definition.target && (
              <span className="text-xs font-medium text-zinc-700">{definition.target}</span>
            )}
          </div>
          {definition.headline && (
            <p className="text-xs text-zinc-600 italic">"{definition.headline}"</p>
          )}
          <p className="text-xs text-zinc-400">
            Magnitude {definition.magnitude}x · {definition.duration_ticks} ticks
          </p>
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            disabled={loading}
            className="px-4 py-2 text-sm font-medium rounded-md border border-zinc-200 text-zinc-700 hover:bg-zinc-50 transition-colors cursor-pointer disabled:opacity-40"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="px-4 py-2 text-sm font-medium rounded-md bg-zinc-900 text-white hover:bg-zinc-700 transition-colors cursor-pointer disabled:opacity-40"
          >
            {loading ? "Triggering…" : "Trigger"}
          </button>
        </div>
      </div>
    </div>
  );
}
