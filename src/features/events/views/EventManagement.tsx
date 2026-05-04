const eventTypes = [
  { type: "BULL_RUN", scope: "Market-wide", description: "All stocks trend strongly upward." },
  { type: "BEAR_CRASH", scope: "Market-wide", description: "All stocks trend strongly downward." },
  { type: "SECTOR_BOOM", scope: "Sector", description: "All stocks in a sector trend upward." },
  { type: "SECTOR_SLUMP", scope: "Sector", description: "All stocks in a sector trend downward." },
  { type: "STOCK_SHOCK", scope: "Single stock", description: "Extreme volatility spike on one stock." },
];

export default function EventManagement() {
  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-zinc-200 bg-white p-5">
        <h2 className="text-sm font-medium text-zinc-900 mb-1">
          Trigger Market Event
        </h2>
        <p className="text-xs text-zinc-400 mb-4">
          Manually trigger an event. It will be broadcast to all WebSocket
          subscribers immediately.
        </p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {eventTypes.map(({ type, scope, description }) => (
            <div
              key={type}
              className="rounded-md border border-zinc-200 p-4 flex flex-col gap-2"
            >
              <div>
                <p className="text-sm font-medium text-zinc-900">{type}</p>
                <p className="text-xs text-zinc-400">{scope}</p>
              </div>
              <p className="text-xs text-zinc-500 flex-1">{description}</p>
              <button className="mt-1 px-3 py-1.5 text-xs font-medium rounded-md bg-zinc-900 text-white hover:bg-zinc-700 transition-colors cursor-pointer self-start">
                Trigger
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-zinc-200 bg-white p-5">
        <h2 className="text-sm font-medium text-zinc-900 mb-4">
          Recent Events
        </h2>
        <p className="text-sm text-zinc-400">No events triggered yet.</p>
      </div>
    </div>
  );
}
