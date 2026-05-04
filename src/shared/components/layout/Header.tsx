import { useLocation } from "react-router-dom";
import { LogOut } from "lucide-react";
import { useAuth } from "../../../features/auth/hooks/useAuth";

const pageTitles: Record<string, string> = {
  "/": "Dashboard",
  "/market": "Market Control",
  "/platforms": "Platform Management",
  "/stocks": "Stock Management",
  "/seed": "Data Seed",
  "/events": "Event Management",
  "/options": "Options Management",
  "/fees": "Fee Configuration",
};

export default function Header() {
  const { pathname } = useLocation();
  const { user, signOut } = useAuth();
  const title = pageTitles[pathname] ?? "Admin Panel";

  return (
    <header className="h-14 shrink-0 border-b border-zinc-200 bg-white flex items-center justify-between px-6">
      <h1 className="text-sm font-medium text-zinc-900">{title}</h1>
      <div className="flex items-center gap-3">
        <span className="text-xs text-zinc-400">{user?.username}</span>
        <button
          onClick={signOut}
          className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-900 transition-colors cursor-pointer"
        >
          <LogOut size={14} strokeWidth={1.75} />
          Sign out
        </button>
      </div>
    </header>
  );
}
