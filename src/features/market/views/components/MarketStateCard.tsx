interface Props {
  isOpen: boolean | undefined;
  loading: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export default function MarketStateCard({ isOpen, loading, onOpen, onClose }: Props) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-5">
      <h2 className="text-sm font-medium text-zinc-900 mb-1">Market State</h2>
      <p className="text-xs text-zinc-400 mb-4">
        Open or close the market. Closing expires all pending limit orders.
      </p>
      <div className="flex gap-2">
        <button
          onClick={onOpen}
          disabled={loading || isOpen === true}
          className="px-4 py-2 text-sm font-medium rounded-md bg-zinc-900 text-white hover:bg-zinc-700 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Open Market
        </button>
        <button
          onClick={onClose}
          disabled={loading || isOpen === false}
          className="px-4 py-2 text-sm font-medium rounded-md border border-zinc-200 text-zinc-700 hover:bg-zinc-50 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Close Market
        </button>
      </div>
    </div>
  );
}
