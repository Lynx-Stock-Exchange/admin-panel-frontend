import { useEffect, useState } from "react";
import { OptionManager } from "../services/OptionManager";
import type { OptionContract, CreateOptionPayload, UpdateOptionPayload } from "../types";

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

  async function updateOption(optionId: string, payload: UpdateOptionPayload): Promise<boolean> {
    try {
      const updated = await OptionManager.update(optionId, payload);
      setOptions((prev) => prev.map((o) => (o.option_id === optionId ? updated : o)));
      return true;
    } catch {
      setError("Failed to update option contract.");
      return false;
    }
  }

  async function deleteOption(optionId: string): Promise<boolean> {
    try {
      await OptionManager.remove(optionId);
      setOptions((prev) => prev.filter((o) => o.option_id !== optionId));
      return true;
    } catch {
      setError("Failed to delete option contract.");
      return false;
    }
  }

  return { options, loading, error, reload: load, createOption, updateOption, deleteOption };
}
