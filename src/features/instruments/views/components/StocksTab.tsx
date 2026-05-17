import { useState } from "react";
import { Plus } from "lucide-react";
import { useStocks } from "../../hooks/useStocks";
import type { CreateStockPayload, UpdateStockPayload } from "../../types";
import { formatPrice, formatPercent } from "../../utils/format";
import StockModal from "./StockModal";

type ModalState =
  | { open: false }
  | { open: true; mode: "add" };

export default function StocksTab() {
  const { stocks, loading, error, createStock, updateStock } = useStocks();
  const [modal, setModal] = useState<ModalState>({ open: false });

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-zinc-500">
          Listed stocks and simulation parameters.
        </p>
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-md bg-zinc-900 text-white hover:bg-zinc-700 transition-colors cursor-pointer"
        >
          <Plus size={14} />
          Add Stock
        </button>
      </div>

      {error && (
        <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="rounded-lg border border-zinc-200 bg-white overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-100 bg-zinc-50">
              <Th>Ticker</Th>
              <Th>Name</Th>
              <Th>Sector</Th>
              <Th>Price</Th>
              <Th>Volatility</Th>
              <Th>Trend Bias</Th>
              <Th>Momentum</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {loading && (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-10 text-center text-sm text-zinc-400"
                >
                  Loading…
                </td>
              </tr>
            )}
            {!loading && stocks.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-10 text-center text-sm text-zinc-400"
                >
                  No stocks listed yet.
                </td>
              </tr>
            )}
            {!loading && stocks.map((stock) => (
              <tr key={stock.ticker} className="hover:bg-zinc-50 transition-colors">
                <td className="px-4 py-3">
                  <span className="inline-block px-2 py-0.5 rounded bg-zinc-100 text-xs font-semibold text-zinc-700">
                    {stock.ticker}
                  </span>
                </td>
                <td className="px-4 py-3 text-zinc-700">{stock.name}</td>
                <td className="px-4 py-3 text-zinc-500">{stock.sector}</td>
                <td className="px-4 py-3 font-medium text-zinc-900">${formatPrice(stock.current_price)}</td>
                <td className="px-4 py-3 text-zinc-500">{formatPercent(stock.volatility)}</td>
                <td className="px-4 py-3 text-zinc-500">
                  {stock.trend_bias > 0 ? `+${stock.trend_bias}` : stock.trend_bias}
                </td>
                <td className="px-4 py-3 text-zinc-500">{stock.momentum}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <StockModal
          mode="add"
          onClose={() => setModal({ open: false })}
          onCreate={async (payload: CreateStockPayload) => {
            const ok = await createStock(payload);
            if (ok) setModalOpen(false);
          }}
        />
      )}
    </>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="text-left px-4 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wide">
      {children}
    </th>
  );
}
