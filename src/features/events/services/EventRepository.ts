import { apiClient } from "../../../shared/services/apiClient";
import type {
  EventDefinition,
  TriggeredEvent,
  EventTriggerRequest,
} from "../types";

export const EventRepository = {
  async list(): Promise<EventDefinition[]> {
    const { data } = await apiClient.get("/api/admin/events");
    const events = data.events ?? data;
    return Array.isArray(events) ? events : [];
  },

  async trigger(payload: EventTriggerRequest): Promise<void> {
    await apiClient.post("/api/admin/events/trigger", payload);
  },

  async listHistory(): Promise<TriggeredEvent[]> {
    const { data } = await apiClient.get("/api/admin/events/history");
    const events = data.events ?? data;
    return Array.isArray(events) ? events : [];
  },
};
