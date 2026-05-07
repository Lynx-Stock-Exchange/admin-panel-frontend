import { Link } from "react-router";

interface Props {
  label: string;
  value: string | number;
  detail?: string;
  loading?: boolean;
  linkTo: string;
  linkLabel: string;
}

export default function StatCard({ label, value, detail, loading, linkTo, linkLabel }: Props) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-5 flex flex-col gap-3">
      <p className="text-xs text-zinc-500 uppercase tracking-wide">{label}</p>
      <div>
        <p className="text-2xl font-semibold text-zinc-900">{loading ? "—" : value}</p>
        {detail && !loading && (
          <p className="text-xs text-zinc-400 mt-1">{detail}</p>
        )}
      </div>
      <Link
        to={linkTo}
        className="text-xs text-zinc-400 hover:text-zinc-700 transition-colors self-start"
      >
        {linkLabel} →
      </Link>
    </div>
  );
}
