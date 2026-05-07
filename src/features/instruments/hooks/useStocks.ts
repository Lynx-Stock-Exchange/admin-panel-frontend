import { useEffect, useState } from "react";
import { StockManager } from "../services/StockManager";
import type { Stock, CreateStockPayload } from "../types";

export function useStocks() {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      setStocks(await StockManager.list());
    } catch {
      setError("Failed to load stocks.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function createStock(payload: CreateStockPayload): Promise<boolean> {
    try {
      const stock = await StockManager.create(payload);
      setStocks((prev) => [...prev, stock]);
      return true;
    } catch {
      setError("Failed to create stock.");
      return false;
    }
  }

  return { stocks, loading, error, reload: load, createStock };
}
