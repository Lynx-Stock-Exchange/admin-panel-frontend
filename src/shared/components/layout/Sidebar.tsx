import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Activity,
  Building2,
  Layers,
  Database,
  Zap,
  DollarSign,
} from "lucide-react";
import { EXCHANGE_NAME } from "../../constants/config";

const navItems = [
  { label: "Dashboard", to: "/", icon: LayoutDashboard },
  { label: "Market Control", to: "/market", icon: Activity },
  { label: "Platform Management", to: "/platforms", icon: Building2 },
  { label: "Instrument Management", to: "/instruments", icon: Layers },
  { label: "Event Management", to: "/events", icon: Zap },
  { label: "Fee Configuration", to: "/fees", icon: DollarSign },
  { label: "Data Seed", to: "/seed", icon: Database },
];

export default function Sidebar() {
  return (
    <aside className="w-60 shrink-0 bg-zinc-950 flex flex-col h-full">
      <div className="px-5 py-6 border-b border-zinc-800">
        <span className="text-white text-lg font-semibold tracking-tight">
          {EXCHANGE_NAME}
        </span>
        <p className="text-zinc-500 text-xs mt-0.5">Admin Panel</p>
      </div>

      <nav className="flex-1 py-4 overflow-y-auto">
        <ul className="space-y-0.5 px-2">
          {navItems.map(({ label, to, icon: Icon }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === "/"}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                    isActive
                      ? "bg-zinc-800 text-white"
                      : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900"
                  }`
                }
              >
                <Icon size={16} strokeWidth={1.75} />
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="px-5 py-4 border-t border-zinc-800">
        <span className="text-zinc-600 text-xs">v1.0.0</span>
      </div>
    </aside>
  );
}
