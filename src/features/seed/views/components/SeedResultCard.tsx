import { CheckCircle } from "lucide-react";
import type { SeedResult } from "../../types";

interface Props {
  result: SeedResult;
}

const stats: { label: string; key: keyof SeedResult }[] = [
  { label: "Stocks seeded", key: "stocks_seeded" },
  { label: "Options seeded", key: "options_seeded" },
  { label: "Event definitions loaded", key: "event_definitions_loaded" },
  { label: "Fee rate", key: "fee_rate" },
  { label: "Speed multiplier", key: "speed_multiplier" },
];

export default function SeedResultCard({ result }: Props) {
  return (
    <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-5">
      <div className="flex items-center gap-2 mb-4">
        <CheckCircle size={16} className="text-emerald-600" strokeWidth={2} />
        <p className="text-sm font-medium text-emerald-800">{result.message}</p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {stats.map(({ label, key }) => (
          <div key={key} className="rounded-md bg-white border border-emerald-100 px-3 py-2.5">
            <p className="text-xs text-zinc-400">{label}</p>
            <p className="mt-0.5 text-sm font-semibold font-mono text-zinc-900">
              {result[key]}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
