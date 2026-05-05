interface Props {
  value: number;
  loading: boolean;
  onChange: (value: number) => void;
  onApply: () => void;
}

export default function SimulationSpeedCard({ value, loading, onChange, onApply }: Props) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-5">
      <h2 className="text-sm font-medium text-zinc-900 mb-1">Simulation Speed</h2>
      <p className="text-xs text-zinc-400 mb-4">
        Set the time speed multiplier. 60x = 1 simulated minute per second.
      </p>
      <div className="flex items-center gap-3">
        <input
          type="number"
          min={1}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-28 rounded-md border border-zinc-200 px-3 py-2 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900"
        />
        <button
          onClick={onApply}
          disabled={loading || value < 1}
          className="px-4 py-2 text-sm font-medium rounded-md bg-zinc-900 text-white hover:bg-zinc-700 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {loading ? "Applying…" : "Apply"}
        </button>
      </div>
    </div>
  );
}
