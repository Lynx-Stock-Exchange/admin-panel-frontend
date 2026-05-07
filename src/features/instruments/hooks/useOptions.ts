import { useEffect, useState } from "react";
import { OptionManager } from "../services/OptionManager";
import type { OptionContract, CreateOptionPayload } from "../types";

export function useOptions() {
  const [options, setOptions] = useState<OptionContract[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      setOptions(await OptionManager.list());
    } catch {
      setError("Failed to load option contracts.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function createOption(payload: CreateOptionPayload): Promise<boolean> {
    try {
      const option = await OptionManager.create(payload);
      setOptions((prev) => [...prev, option]);
      return true;
    } catch {
      setError("Failed to create option contract.");
      return false;
    }
  }

  return { options, loading, error, reload: load, createOption };
}
