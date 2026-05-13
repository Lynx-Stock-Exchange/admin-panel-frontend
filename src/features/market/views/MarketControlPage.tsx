import { useMarketControl } from "../hooks/useMarketControl";
import MarketStatusCard from "./components/MarketStatusCard";
import MarketStateCard from "./components/MarketStateCard";
import SimulationSpeedCard from "./components/SimulationSpeedCard";

export default function MarketControlPage() {
  const {
    status,
    loading,
    actionLoading,
    speedLoading,
    speedInput,
    setSpeedInput,
    error,
    feedback,
    setFeedback,
    fetchStatus,
    handleOpen,
    handleClose,
    handleSetSpeed,
  } = useMarketControl();

  return (
    <div className="space-y-4">
      <MarketStatusCard status={status} loading={loading} onRefresh={fetchStatus} />
      <MarketStateCard
        isOpen={status?.is_open}
        loading={actionLoading}
        onOpen={handleOpen}
        onClose={handleClose}
      />
      <SimulationSpeedCard
        value={speedInput}
        loading={speedLoading}
        onChange={setSpeedInput}
        onApply={handleSetSpeed}
      />

      {error && (
        <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}
      {feedback && !error && (
        <div
          className="rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700 cursor-pointer"
          onClick={() => setFeedback(null)}
        >
          {feedback}
        </div>
      )}
    </div>
  );
}
