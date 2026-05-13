export interface FeeConfig {
  fee_rate: number;
}

export interface FeeOrder {
  order_id: string;
  platform_id: string;
  instrument_id: string;
  side: "BUY" | "SELL";
  filled_quantity: number;
  average_fill_price: number;
  exchange_fee: number;
}

export interface FeeRevenue {
  fee_rate: number;
  total_revenue: number;
  filled_order_count: number;
  orders: FeeOrder[];
}
