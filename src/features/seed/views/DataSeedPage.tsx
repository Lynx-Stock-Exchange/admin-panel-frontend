import { useSeed } from "../hooks/useSeed";
import SeedInputCard from "./components/SeedInputCard";
import SeedResultCard from "./components/SeedResultCard";

export default function DataSeedPage() {
  const { input, setInput, loading, error, result, handleFileLoad, runSeed } = useSeed();

  return (
    <div className="space-y-4">
      <SeedInputCard
        value={input}
        loading={loading}
        onChange={setInput}
        onFileLoad={handleFileLoad}
        onRun={runSeed}
      />

      {error && (
        <div className="rounded-md bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {result && <SeedResultCard result={result} />}
    </div>
  );
}
