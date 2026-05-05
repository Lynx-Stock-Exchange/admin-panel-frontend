import { useEffect, useState } from "react";
import { EventManager } from "../services/EventManager";
import type { TriggeredEvent } from "../types";

export function useEventHistory() {
  const [history, setHistory] = useState<TriggeredEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    EventManager.listHistory()
      .then(setHistory)
      .catch(() => {
        // endpoint not yet available — silently show empty
      })
      .finally(() => setLoading(false));
  }, []);

  return { history, loading };
}
