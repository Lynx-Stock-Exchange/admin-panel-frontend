import EventDefinitionTable from "./components/EventDefinitionTable";
import TriggeredEventHistory from "./components/TriggeredEventHistory";

export default function EventManagementPage() {
  return (
    <div className="space-y-4">
      <EventDefinitionTable />
      <TriggeredEventHistory />
    </div>
  );
}
