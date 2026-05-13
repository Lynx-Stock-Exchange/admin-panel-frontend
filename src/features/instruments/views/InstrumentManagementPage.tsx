import { useState } from "react";
import TabBar, { type InstrumentTab } from "./components/TabBar";
import StocksTab from "./components/StocksTab";
import OptionsTab from "./components/OptionsTab";

export default function InstrumentManagementPage() {
  const [activeTab, setActiveTab] = useState<InstrumentTab>("stocks");

  return (
    <div>
      <TabBar active={activeTab} onChange={setActiveTab} />
      {activeTab === "stocks" ? <StocksTab /> : <OptionsTab />}
    </div>
  );
}
