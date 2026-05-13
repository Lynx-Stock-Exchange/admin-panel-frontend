import type { TriggeredEvent } from "../../types";
import { EVENT_TYPE_LABELS, EVENT_TYPE_BADGE, SCOPE_LABELS, formatDateTime } from "../../utils/format";

interface Props {
  history: TriggeredEvent[];
  loading: boolean;
  error: string | null;
  onReload: () => void;
}

export default function TriggeredEventHistory({ history, loading, error, onReload }: Props) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-5">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-sm font-medium text-zinc-900">Triggered Event History</h2>
          <p className="text-xs text-zinc-400 mt-0.5">
            All events fired this session, including automatic ones.
          </p>
        </div>
        <button
          onClick={onReload}
          disabled={loading}
          className="text-xs text-zinc-500 hover:text-zinc-800 transition-colors disabled:opacity-40 cursor-pointer"
        >
          Refresh
        </button>
      </div>

      {error && (
        <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
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
              <Th>Triggered at</Th>
              <Th>By</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {loading && (
              <tr>
                <td colSpan={8} className="px-4 py-10 text-center text-sm text-zinc-400">
                  Loading…
                </td>
              </tr>
            )}
            {!loading && history.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-10 text-center text-sm text-zinc-400">
                  No events triggered yet this session.
                </td>
              </tr>
            )}
            {!loading && history.map((ev) => (
              <tr key={ev.event_id} className="hover:bg-zinc-50 transition-colors">
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded text-xs font-semibold ${EVENT_TYPE_BADGE[ev.event_type]}`}>
                    {EVENT_TYPE_LABELS[ev.event_type]}
                  </span>
                </td>
                <td className="px-4 py-3 text-zinc-500 text-xs">{SCOPE_LABELS[ev.scope]}</td>
                <td className="px-4 py-3 text-zinc-700 text-xs font-medium">
                  {ev.target ?? <span className="text-zinc-300">—</span>}
                </td>
                <td className="px-4 py-3 text-zinc-500 text-xs">{ev.magnitude}x</td>
                <td className="px-4 py-3 text-zinc-500 text-xs">{ev.duration_ticks} ticks</td>
                <td className="px-4 py-3 text-zinc-600 text-xs max-w-xs truncate">{ev.headline}</td>
                <td className="px-4 py-3 text-zinc-400 text-xs whitespace-nowrap">
                  {formatDateTime(ev.triggered_at)}
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                    ev.triggered_by === "ADMIN"
                      ? "bg-blue-50 text-blue-600"
                      : "bg-zinc-100 text-zinc-500"
                  }`}>
                    {ev.triggered_by}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="text-left px-4 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wide">
      {children}
    </th>
  );
}
