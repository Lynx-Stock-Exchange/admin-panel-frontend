export interface MarketStatus {
  is_open: boolean;
  market_time: string;
  real_time: string;
  speed_multiplier: number;
  active_event: string | null;
}

export interface MarketActionResponse {
  message: string;
  market: MarketStatus;
}
