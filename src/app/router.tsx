import { createBrowserRouter } from "react-router-dom";
import Layout from "../shared/components/layout/Layout";
import LoginPage from "../features/auth/views/LoginPage";
import Dashboard from "../features/dashboard/views/Dashboard";
import MarketControlPage from "../features/market/views/MarketControlPage";
import PlatformManagement from "../features/platforms/views/PlatformManagement";
import InstrumentManagementPage from "../features/instruments/views/InstrumentManagementPage";
import DataSeed from "../features/seed/views/DataSeed";
import EventManagement from "../features/events/views/EventManagement";
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
      { path: "instruments", element: <InstrumentManagementPage /> },
      { path: "seed", element: <DataSeed /> },
      { path: "events", element: <EventManagement /> },
      { path: "fees", element: <FeeConfiguration /> },
    ],
  },
]);
