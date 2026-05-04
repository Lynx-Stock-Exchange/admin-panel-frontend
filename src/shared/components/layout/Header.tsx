import { useLocation } from "react-router-dom";

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
  const title = pageTitles[pathname] ?? "Admin Panel";

  return (
    <header className="h-14 shrink-0 border-b border-zinc-200 bg-white flex items-center px-6">
      <h1 className="text-sm font-medium text-zinc-900">{title}</h1>
    </header>
  );
}
