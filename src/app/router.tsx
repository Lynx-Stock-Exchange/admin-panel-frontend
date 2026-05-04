import { createBrowserRouter } from "react-router-dom";
import Layout from "../shared/components/layout/Layout";
import Dashboard from "../features/dashboard/views/Dashboard";
import MarketControl from "../features/market/views/MarketControl";
import PlatformManagement from "../features/platforms/views/PlatformManagement";
import StockManagement from "../features/stocks/views/StockManagement";
import DataSeed from "../features/seed/views/DataSeed";
import EventManagement from "../features/events/views/EventManagement";
import OptionsManagement from "../features/options/views/OptionsManagement";
import FeeConfiguration from "../features/fees/views/FeeConfiguration";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "market", element: <MarketControl /> },
      { path: "platforms", element: <PlatformManagement /> },
      { path: "stocks", element: <StockManagement /> },
      { path: "seed", element: <DataSeed /> },
      { path: "events", element: <EventManagement /> },
      { path: "options", element: <OptionsManagement /> },
      { path: "fees", element: <FeeConfiguration /> },
    ],
  },
]);
