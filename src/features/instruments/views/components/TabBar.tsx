export type InstrumentTab = "stocks" | "options";

interface Props {
  active: InstrumentTab;
  onChange: (tab: InstrumentTab) => void;
}

const TABS: { id: InstrumentTab; label: string }[] = [
  { id: "stocks", label: "Stocks" },
  { id: "options", label: "Option Contracts" },
];

export default function TabBar({ active, onChange }: Props) {
  return (
    <div className="flex gap-1 border-b border-zinc-200 mb-5">
      {TABS.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => onChange(id)}
          className={`px-4 py-2.5 text-sm font-medium transition-colors -mb-px cursor-pointer ${
            active === id
              ? "border-b-2 border-zinc-900 text-zinc-900"
              : "text-zinc-500 hover:text-zinc-800"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
