import { useState } from "react";
import { Zap } from "lucide-react";
import { useEventDefinitions } from "../../hooks/useEventDefinitions";
import type { EventDefinition } from "../../types";
import { EVENT_TYPE_LABELS, EVENT_TYPE_BADGE, SCOPE_LABELS } from "../../utils/format";
import TriggerConfirmModal from "./TriggerConfirmModal";

interface Props {
  onEventTriggered?: () => void;
}

export default function EventDefinitionTable({ onEventTriggered }: Props) {
  const { definitions, loading, error, triggerEvent } = useEventDefinitions();

  const [triggerTarget, setTriggerTarget] = useState<EventDefinition | null>(null);
  const [triggerLoading, setTriggerLoading] = useState(false);
  const [triggerFeedback, setTriggerFeedback] = useState<string | null>(null);

  async function handleTrigger() {
    if (!triggerTarget) return;
    setTriggerLoading(true);
    const ok = await triggerEvent({
      event_type: triggerTarget.event_type,
      scope: triggerTarget.scope,
      target: triggerTarget.target,
      magnitude: triggerTarget.magnitude,
      duration_ticks: triggerTarget.duration_ticks,
      headline: triggerTarget.headline,
    });
    setTriggerLoading(false);
    setTriggerTarget(null);
    if (ok) {
      setTriggerFeedback(`"${EVENT_TYPE_LABELS[triggerTarget.event_type]}" triggered successfully.`);
      onEventTriggered?.();
    }
  }

  return (
    <>
      <div className="rounded-lg border border-zinc-200 bg-white p-5">
        <div className="mb-4">
          <h2 className="text-sm font-medium text-zinc-900">Event Definitions</h2>
          <p className="text-xs text-zinc-400 mt-0.5">
            Seeded event templates. Trigger any of them to broadcast immediately.
          </p>
        </div>

        {error && (
          <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {triggerFeedback && (
          <div
            className="mb-4 rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700 cursor-pointer"
            onClick={() => setTriggerFeedback(null)}
          >
            {triggerFeedback}
          </div>
        )}

        <div className="overflow-hidden rounded-md border border-zinc-100">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-100 bg-zinc-50">
                <Th>Type</Th>
                <Th>Scope</Th>
                <Th>Target</Th>
                <Th>Magnitude</Th>
                <Th>Duration</Th>
                <Th>Headline</Th>
                <th className="px-4 py-3 w-32" />
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {loading && (
                <tr>
                  <td colSpan={7} className="px-4 py-10 text-center text-sm text-zinc-400">
                    Loading…
                  </td>
                </tr>
              )}
              {!loading && definitions.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-10 text-center text-sm text-zinc-400">
                    No event definitions found.
                  </td>
                </tr>
              )}
              {!loading && definitions.map((def) => (
                <tr key={def.event_id} className="hover:bg-zinc-50 transition-colors">
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded text-xs font-semibold ${EVENT_TYPE_BADGE[def.event_type]}`}>
                      {EVENT_TYPE_LABELS[def.event_type]}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-zinc-500 text-xs">{SCOPE_LABELS[def.scope]}</td>
                  <td className="px-4 py-3 text-zinc-700 text-xs font-medium">
                    {def.target ?? <span className="text-zinc-300">—</span>}
                  </td>
                  <td className="px-4 py-3 text-zinc-500 text-xs">{def.magnitude}x</td>
                  <td className="px-4 py-3 text-zinc-500 text-xs">{def.duration_ticks} ticks</td>
                  <td className="px-4 py-3 text-zinc-600 text-xs max-w-xs truncate">{def.headline}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end">
                      <button
                        onClick={() => setTriggerTarget(def)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-zinc-900 text-white text-xs font-medium hover:bg-zinc-700 transition-colors cursor-pointer"
                      >
                        <Zap size={12} />
                        Trigger
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {triggerTarget && (
        <TriggerConfirmModal
          definition={triggerTarget}
          loading={triggerLoading}
          onConfirm={handleTrigger}
          onCancel={() => setTriggerTarget(null)}
        />
      )}
    </>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="text-left px-4 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wide">
      {children}
    </th>
  );
}
