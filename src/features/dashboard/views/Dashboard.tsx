const stats = [
  { label: "Active Platforms", value: "—" },
  { label: "Listed Stocks", value: "—" },
  { label: "Open Orders", value: "—" },
  { label: "Trades Today", value: "—" },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-lg border border-zinc-200 bg-white p-5"
          >
            <p className="text-xs text-zinc-500 uppercase tracking-wide">
              {stat.label}
            </p>
            <p className="mt-2 text-2xl font-semibold text-zinc-900">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div className="rounded-lg border border-zinc-200 bg-white p-5">
        <h2 className="text-sm font-medium text-zinc-900 mb-4">
          Market Status
        </h2>
        <p className="text-sm text-zinc-400">
          Market status and recent activity will be displayed here.
        </p>
      </div>
    </div>
  );
}
