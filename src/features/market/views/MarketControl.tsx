export default function MarketControl() {
  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-zinc-200 bg-white p-5">
        <h2 className="text-sm font-medium text-zinc-900 mb-1">
          Market State
        </h2>
        <p className="text-xs text-zinc-400 mb-4">
          Open or close the market. Closing expires all pending limit orders.
        </p>
        <div className="flex gap-2">
          <button className="px-4 py-2 text-sm font-medium rounded-md bg-zinc-900 text-white hover:bg-zinc-700 transition-colors cursor-pointer">
            Open Market
          </button>
          <button className="px-4 py-2 text-sm font-medium rounded-md border border-zinc-200 text-zinc-700 hover:bg-zinc-50 transition-colors cursor-pointer">
            Close Market
          </button>
        </div>
      </div>

      <div className="rounded-lg border border-zinc-200 bg-white p-5">
        <h2 className="text-sm font-medium text-zinc-900 mb-1">
          Simulation Speed
        </h2>
        <p className="text-xs text-zinc-400 mb-4">
          Set the time speed multiplier. 60x = 1 tick/second.
        </p>
        <div className="flex items-center gap-3">
          <input
            type="number"
            defaultValue={60}
            className="w-28 rounded-md border border-zinc-200 px-3 py-2 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900"
          />
          <button className="px-4 py-2 text-sm font-medium rounded-md bg-zinc-900 text-white hover:bg-zinc-700 transition-colors cursor-pointer">
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
