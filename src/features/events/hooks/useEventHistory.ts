import { useCallback, useEffect, useState } from "react";
import { EventManager } from "../services/EventManager";
import type { TriggeredEvent } from "../types";

export function useEventHistory() {
  const [history, setHistory] = useState<TriggeredEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setHistory(await EventManager.listHistory());
    } catch {
      setError("Failed to load event history.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  return { history, loading, error, reload: load };
}
