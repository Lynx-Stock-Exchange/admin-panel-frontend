import { useEventHistory } from "../hooks/useEventHistory";
import EventDefinitionTable from "./components/EventDefinitionTable";
import TriggeredEventHistory from "./components/TriggeredEventHistory";

export default function EventManagementPage() {
  const { history, loading, error, reload } = useEventHistory();

  return (
    <div className="space-y-4">
      <EventDefinitionTable onEventTriggered={reload} />
      <TriggeredEventHistory
        history={history}
        loading={loading}
        error={error}
        onReload={reload}
      />
    </div>
  );
}
