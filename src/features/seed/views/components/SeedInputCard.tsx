import { useRef } from "react";
import { Upload, Play } from "lucide-react";

interface Props {
  value: string;
  loading: boolean;
  onChange: (value: string) => void;
  onFileLoad: (file: File) => void;
  onRun: () => void;
}

export default function SeedInputCard({ value, loading, onChange, onFileLoad, onRun }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) onFileLoad(file);
    e.target.value = "";
  }

  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-5">
      <h2 className="text-sm font-medium text-zinc-900 mb-1">Seed Payload</h2>
      <p className="text-xs text-zinc-400 mb-4">
        Paste or upload a JSON seed file. Initialises exchange config, stocks, options, and event definitions.
      </p>

      <textarea
        rows={14}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={loading}
        placeholder={'{\n  "exchange": { "fee_rate": 0.001, "speed_multiplier": 60 },\n  "stocks": [...],\n  "options": [...],\n  "events": { ... }\n}'}
        className="w-full rounded-md border border-zinc-200 px-3 py-2.5 text-sm font-mono text-zinc-900 placeholder:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-zinc-900 resize-none disabled:opacity-50"
      />

      <div className="mt-3 flex items-center gap-2">
        <button
          onClick={onRun}
          disabled={loading || !value.trim()}
          className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-md bg-zinc-900 text-white hover:bg-zinc-700 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Play size={13} />
          {loading ? "Running…" : "Run Seed"}
        </button>

        <button
          onClick={() => fileRef.current?.click()}
          disabled={loading}
          className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-md border border-zinc-200 text-zinc-700 hover:bg-zinc-50 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Upload size={13} />
          Upload File
        </button>

        {value.trim() && (
          <button
            onClick={() => onChange("")}
            disabled={loading}
            className="ml-auto text-xs text-zinc-400 hover:text-zinc-600 transition-colors cursor-pointer"
          >
            Clear
          </button>
        )}
      </div>

      <input
        ref={fileRef}
        type="file"
        accept=".json,application/json"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}
