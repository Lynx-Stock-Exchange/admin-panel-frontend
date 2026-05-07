import { useState } from "react";
import { useEventHistory } from "../hooks/useEventHistory";
import TriggerEventModal from "./components/TriggerEventModal";
import TriggeredEventHistory from "./components/TriggeredEventHistory";

export default function EventManagementPage() {
  const { history, loading, error, triggerEvent } = useEventHistory();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="space-y-4">
      <TriggeredEventHistory
        history={history}
        loading={loading}
        error={error}
        onTriggerClick={() => setModalOpen(true)}
      />

      {modalOpen && (
        <TriggerEventModal
          onClose={() => setModalOpen(false)}
          onTrigger={async (payload) => {
            const ok = await triggerEvent(payload);
            if (ok) setModalOpen(false);
          }}
        />
      )}
    </div>
  );
}
