import { apiClient } from "../../../shared/services/apiClient";
import type {
  EventDefinition,
  TriggeredEvent,
  EventTriggerRequest,
} from "../types";

export const EventRepository = {
  async list(): Promise<EventDefinition[]> {
    const { data } = await apiClient.get("/api/admin/events");
    return data.events ?? data;
  },

  async trigger(payload: EventTriggerRequest): Promise<void> {
    await apiClient.post("/api/admin/events/trigger", payload);
  },

  async listHistory(): Promise<TriggeredEvent[]> {
    const { data } = await apiClient.get("/api/admin/events");
    return data.events ?? data;
  },
};
