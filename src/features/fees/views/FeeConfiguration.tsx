export default function FeeConfiguration() {
  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-zinc-200 bg-white p-5">
        <h2 className="text-sm font-medium text-zinc-900 mb-1">
          Exchange Fee Rate
        </h2>
        <p className="text-xs text-zinc-400 mb-4">
          Applied to every executed trade:{" "}
          <span className="font-mono">execution_price × quantity × fee_rate</span>.
          Default is 0.1% (0.001).
        </p>
        <div className="flex items-center gap-3">
          <input
            type="number"
            step="0.0001"
            defaultValue={0.001}
            className="w-36 rounded-md border border-zinc-200 px-3 py-2 text-sm font-mono text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900"
          />
          <button className="px-4 py-2 text-sm font-medium rounded-md bg-zinc-900 text-white hover:bg-zinc-700 transition-colors cursor-pointer">
            Update Rate
          </button>
        </div>
      </div>

      <div className="rounded-lg border border-zinc-200 bg-white p-5">
        <h2 className="text-sm font-medium text-zinc-900 mb-1">
          Option Fee Rules
        </h2>
        <div className="mt-3 divide-y divide-zinc-100 text-sm">
          <div className="flex justify-between py-2">
            <span className="text-zinc-500">On purchase</span>
            <span className="text-zinc-900 font-mono text-xs">premium × quantity × fee_rate</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-zinc-500">On auto-exercise (CALL)</span>
            <span className="text-zinc-900 font-mono text-xs">(current_price − strike) × qty × fee_rate</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-zinc-500">On auto-exercise (PUT)</span>
            <span className="text-zinc-900 font-mono text-xs">(strike − current_price) × qty × fee_rate</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-zinc-500">On expiry (out of money)</span>
            <span className="text-zinc-900">No fee</span>
          </div>
        </div>
      </div>
    </div>
  );
}
