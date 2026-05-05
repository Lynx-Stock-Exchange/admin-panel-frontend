import { createBrowserRouter } from "react-router-dom";
import Layout from "../shared/components/layout/Layout";
import LoginPage from "../features/auth/views/LoginPage";
import Dashboard from "../features/dashboard/views/Dashboard";
import MarketControlPage from "../features/market/views/MarketControlPage";
import PlatformManagement from "../features/platforms/views/PlatformManagement";
import StockManagement from "../features/stocks/views/StockManagement";
import DataSeed from "../features/seed/views/DataSeed";
import EventManagement from "../features/events/views/EventManagement";
import OptionsManagement from "../features/options/views/OptionsManagement";
import FeeConfiguration from "../features/fees/views/FeeConfiguration";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "market", element: <MarketControlPage /> },
      { path: "platforms", element: <PlatformManagement /> },
      { path: "stocks", element: <StockManagement /> },
      { path: "seed", element: <DataSeed /> },
      { path: "events", element: <EventManagement /> },
      { path: "options", element: <OptionsManagement /> },
      { path: "fees", element: <FeeConfiguration /> },
    ],
  },
]);
