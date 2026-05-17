import { useEffect, useState } from "react";
import { EventManager } from "../services/EventManager";
import type { TriggeredEvent, EventTriggerRequest } from "../types";

export function useEventHistory() {
  const [history, setHistory] = useState<TriggeredEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      setHistory(await EventManager.listHistory());
    } catch {
      setHistory([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function triggerEvent(payload: EventTriggerRequest): Promise<boolean> {
    try {
      await EventManager.trigger(payload);
      await load();
      return true;
    } catch {
      setError("Failed to trigger event.");
      return false;
    }
  }

  return { history, loading, error, triggerEvent };
}
