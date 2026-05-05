import type { EventType, EventScope } from "../types";

export const EVENT_TYPE_LABELS: Record<EventType, string> = {
  BULL_RUN: "Bull Run",
  BEAR_CRASH: "Bear Crash",
  SECTOR_BOOM: "Sector Boom",
  SECTOR_SLUMP: "Sector Slump",
  STOCK_SHOCK: "Stock Shock",
};

export const EVENT_TYPE_BADGE: Record<EventType, string> = {
  BULL_RUN: "bg-green-100 text-green-700",
  BEAR_CRASH: "bg-red-100 text-red-600",
  SECTOR_BOOM: "bg-emerald-100 text-emerald-700",
  SECTOR_SLUMP: "bg-orange-100 text-orange-600",
  STOCK_SHOCK: "bg-amber-100 text-amber-700",
};

export const SCOPE_LABELS: Record<EventScope, string> = {
  MARKET: "Market-wide",
  SECTOR: "Sector",
  STOCK: "Stock",
};

export const EVENT_TYPES: EventType[] = [
  "BULL_RUN",
  "BEAR_CRASH",
  "SECTOR_BOOM",
  "SECTOR_SLUMP",
  "STOCK_SHOCK",
];

export const EVENT_SCOPES: EventScope[] = ["MARKET", "SECTOR", "STOCK"];

export function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}
