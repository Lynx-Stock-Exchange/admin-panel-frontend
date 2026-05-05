import { EventRepository } from "./EventRepository";
import type { EventDefinition, TriggeredEvent, EventTriggerRequest } from "../types";

export const EventManager = {
  async list(): Promise<EventDefinition[]> {
    return EventRepository.list();
  },

  async trigger(payload: EventTriggerRequest): Promise<void> {
    return EventRepository.trigger(payload);
  },

  async listHistory(): Promise<TriggeredEvent[]> {
    return EventRepository.listHistory();
  },
};
