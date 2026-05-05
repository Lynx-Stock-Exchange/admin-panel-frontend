import { useState } from "react";
import { SeedManager } from "../services/SeedManager";
import type { SeedResult } from "../types";

export function useSeed() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<SeedResult | null>(null);

  function handleFileLoad(file: File) {
    const reader = new FileReader();
    reader.onload = (e) => {
      setInput((e.target?.result as string) ?? "");
      setError(null);
      setResult(null);
    };
    reader.readAsText(file);
  }

  async function runSeed(): Promise<void> {
    setError(null);
    setResult(null);

    let parsed: unknown;
    try {
      parsed = JSON.parse(input);
    } catch {
      setError("Invalid JSON — please check the seed payload.");
      return;
    }

    setLoading(true);
    try {
      const data = await SeedManager.run(parsed);
      setResult(data);
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { error?: string } } })?.response?.data?.error ??
        "Seed failed. Check the payload and try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return { input, setInput, loading, error, result, handleFileLoad, runSeed };
}
