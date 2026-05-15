import { useEffect, useState } from "react";
import { StockManager } from "../services/StockManager";
import type { Stock, CreateStockPayload, UpdateStockPayload } from "../types";
import { websocketService, type PriceUpdatePayload } from "../../../shared/services/websocketService";

export function useStocks() {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const data = await StockManager.list();
      setStocks(data);
      
      // Subscribe to price updates for all tickers
      if (data.length > 0) {
        websocketService.subscribe("PRICE_FEED", data.map(s => s.ticker));
      }
    } catch {
      setError("Failed to load stocks.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    
    // Listen for price updates
    const cleanup = websocketService.on<PriceUpdatePayload>("PRICE_UPDATE", (payload) => {
      setStocks((prev) => 
        prev.map((s) => 
          s.ticker === payload.ticker 
            ? { ...s, current_price: payload.price, volume: payload.volume } 
            : s
        )
      );
    });

    return cleanup;
  }, []);

  async function createStock(payload: CreateStockPayload): Promise<boolean> {
    try {
      const stock = await StockManager.create(payload);
      setStocks((prev) => [...prev, stock]);
      // Subscribe to the new stock
      websocketService.subscribe("PRICE_FEED", [stock.ticker]);
      return true;
    } catch {
      setError("Failed to create stock.");
      return false;
    }
  }

  async function updateStock(ticker: string, payload: UpdateStockPayload): Promise<boolean> {
    try {
      const updated = await StockManager.update(ticker, payload);
      setStocks((prev) => prev.map((s) => (s.ticker === ticker ? updated : s)));
      return true;
    } catch {
      setError("Failed to update stock.");
      return false;
    }
  }

  async function deleteStock(ticker: string): Promise<boolean> {
    try {
      await StockManager.remove(ticker);
      setStocks((prev) => prev.filter((s) => s.ticker !== ticker));
      return true;
    } catch {
      setError("Failed to delete stock.");
      return false;
    }
  }

  return { stocks, loading, error, reload: load, createStock, updateStock, deleteStock };
}
