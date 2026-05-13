export type EventType =
  | "BULL_RUN"
  | "BEAR_CRASH"
  | "SECTOR_BOOM"
  | "SECTOR_SLUMP"
  | "STOCK_SHOCK";

export type EventScope = "MARKET" | "SECTOR" | "STOCK";

export interface EventDefinition {
  event_id: string;
  event_type: EventType;
  scope: EventScope;
  target: string | null;
  magnitude: number;
  duration_ticks: number;
  headline: string;
}

export interface TriggeredEvent {
  event_id: string;
  event_type: EventType;
  scope: EventScope;
  target: string | null;
  magnitude: number;
  duration_ticks: number;
  headline: string;
  triggered_at: string;
  triggered_by: "SYSTEM" | "ADMIN";
}

export interface CreateEventDefinitionPayload {
  event_type: EventType;
  scope: EventScope;
  target: string | null;
  magnitude: number;
  duration_ticks: number;
  headline: string;
}

export interface EventTriggerRequest {
  event_type: EventType;
  scope: EventScope;
  target: string | null;
  magnitude: number;
  duration_ticks: number;
  headline?: string;
}
