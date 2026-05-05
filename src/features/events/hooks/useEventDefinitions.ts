import { useEffect, useState } from "react";
import { EventManager } from "../services/EventManager";
import type { EventDefinition, EventTriggerRequest } from "../types";

export function useEventDefinitions() {
  const [definitions, setDefinitions] = useState<EventDefinition[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      setDefinitions(await EventManager.list());
    } catch {
      setError("Failed to load event definitions.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function triggerEvent(payload: EventTriggerRequest): Promise<boolean> {
    try {
      await EventManager.trigger(payload);
      return true;
    } catch {
      setError("Failed to trigger event.");
      return false;
    }
  }

  return { definitions, loading, error, reload: load, triggerEvent };
}
