export interface Stock {
  ticker: string;
  name: string;
  sector: string;
  current_price: number;
  open_price: number;
  high_price: number;
  low_price: number;
  volume: number;
  volatility: number;
  trend_bias: number;
  event_weight: number;
  momentum: number;
  listed_at: string;
}

export interface CreateStockPayload {
  ticker: string;
  name: string;
  sector: string;
  start_price: number;
  volatility: number;
  trend_bias: number;
  event_weight: number;
  momentum: number;
}

export interface UpdateStockPayload {
  name?: string;
  sector?: string;
  volatility?: number;
  trend_bias?: number;
  event_weight?: number;
  momentum?: number;
}

export interface OptionContract {
  option_id: string;
  underlying_ticker: string;
  option_type: "CALL" | "PUT";
  strike_price: number;
  expiry_time: string;
  premium: number;
  is_active: boolean;
  auto_exercise: boolean;
}

export interface CreateOptionPayload {
  underlying_ticker: string;
  option_type: "CALL" | "PUT";
  strike_price: number;
  expiry_time: string;
  initial_premium: number;
}

export interface UpdateOptionPayload {
  strike_price?: number;
  expiry_time?: string;
  premium?: number;
}
