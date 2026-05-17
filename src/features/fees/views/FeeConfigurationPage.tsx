import { useFeeConfig } from "../hooks/useFeeConfig";
import { useFeeRevenue } from "../hooks/useFeeRevenue";
import FeeRateCard from "./components/FeeRateCard";
import RevenueStatCard from "./components/RevenueStatCard";
import OptionFeeRulesCard from "./components/OptionFeeRulesCard";

export default function FeeConfigurationPage() {
  const {
    config,
    loading,
    updateLoading,
    error: configError,
    feedback,
    setFeedback,
    updateRate,
  } = useFeeConfig();
  const { revenue, loading: revLoading } = useFeeRevenue();

  return (
    <div className="space-y-4">
      <RevenueStatCard revenue={revenue} loading={revLoading} />
      <FeeRateCard
        config={config}
        loading={loading}
        updateLoading={updateLoading}
        onUpdate={updateRate}
      />
      <OptionFeeRulesCard />

      {configError && (
        <div className="rounded-md bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          {configError}
        </div>
      )}
      {feedback && !configError && (
        <div
          className="rounded-md bg-emerald-50 border border-emerald-200 px-4 py-3 text-sm text-emerald-700 cursor-pointer"
          onClick={() => setFeedback(null)}
        >
          {feedback}
        </div>
      )}
    </div>
  );
}
