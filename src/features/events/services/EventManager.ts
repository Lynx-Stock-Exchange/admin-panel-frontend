import { EventRepository } from "./EventRepository";
import type { TriggeredEvent, EventTriggerRequest } from "../types";

export const EventManager = {
  async trigger(payload: EventTriggerRequest): Promise<void> {
    return EventRepository.trigger(payload);
  },

  async listHistory(): Promise<TriggeredEvent[]> {
    return EventRepository.listHistory();
  },
};
