export default function OptionFeeRulesCard() {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-5">
      <h2 className="text-sm font-medium text-zinc-900 mb-1">Option Fee Rules</h2>
      <div className="mt-3 divide-y divide-zinc-100 text-sm">
        <div className="flex justify-between py-2">
          <span className="text-zinc-500">On purchase</span>
          <span className="text-zinc-900 font-mono text-xs">premium × quantity × fee_rate</span>
        </div>
        <div className="flex justify-between py-2">
          <span className="text-zinc-500">On auto-exercise (CALL)</span>
          <span className="text-zinc-900 font-mono text-xs">(current_price − strike) × qty × fee_rate</span>
        </div>
        <div className="flex justify-between py-2">
          <span className="text-zinc-500">On auto-exercise (PUT)</span>
          <span className="text-zinc-900 font-mono text-xs">(strike − current_price) × qty × fee_rate</span>
        </div>
        <div className="flex justify-between py-2">
          <span className="text-zinc-500">On expiry (out of money)</span>
          <span className="text-zinc-900">No fee</span>
        </div>
      </div>
    </div>
  );
}
