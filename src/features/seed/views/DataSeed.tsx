export default function DataSeed() {
  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-zinc-200 bg-white p-5">
        <h2 className="text-sm font-medium text-zinc-900 mb-1">
          Bulk Seed Stocks
        </h2>
        <p className="text-xs text-zinc-400 mb-4">
          Upload a JSON seed file to initialize exchange state (stocks, options,
          events, fee rate).
        </p>
        <textarea
          rows={12}
          placeholder='{"exchange": {...}, "stocks": [...], "options": [...], "events": {...}}'
          className="w-full rounded-md border border-zinc-200 px-3 py-2 text-sm font-mono text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900 resize-none"
        />
        <div className="mt-3 flex gap-2">
          <button className="px-4 py-2 text-sm font-medium rounded-md bg-zinc-900 text-white hover:bg-zinc-700 transition-colors cursor-pointer">
            Load Seed
          </button>
          <button className="px-4 py-2 text-sm font-medium rounded-md border border-zinc-200 text-zinc-700 hover:bg-zinc-50 transition-colors cursor-pointer">
            Upload File
          </button>
        </div>
      </div>
    </div>
  );
}
