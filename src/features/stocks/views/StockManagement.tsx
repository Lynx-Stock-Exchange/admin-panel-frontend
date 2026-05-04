export default function StockManagement() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-zinc-500">Listed stocks and simulation parameters.</p>
        <button className="px-4 py-2 text-sm font-medium rounded-md bg-zinc-900 text-white hover:bg-zinc-700 transition-colors cursor-pointer">
          Add Stock
        </button>
      </div>

      <div className="rounded-lg border border-zinc-200 bg-white overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-100">
              <th className="text-left px-4 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wide">Ticker</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wide">Name</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wide">Sector</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wide">Price</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wide">Volatility</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={6} className="px-4 py-8 text-center text-sm text-zinc-400">
                No stocks listed yet.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
