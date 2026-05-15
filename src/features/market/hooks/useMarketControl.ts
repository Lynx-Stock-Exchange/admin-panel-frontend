import { useEffect, useState } from "react";
import { MarketManager } from "../services/MarketManager";
import type { MarketStatus } from "../types";
import { websocketService, type MarketEventPayload } from "../../../shared/services/websocketService";

export function useMarketControl() {
  const [status, setStatus] = useState<MarketStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [speedLoading, setSpeedLoading] = useState(false);
  const [speedInput, setSpeedInput] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  async function fetchStatus(silent = false) {
    if (!silent) setLoading(true);
    try {
      if (!silent) setError(null);
      const data = await MarketManager.getStatus();
      setStatus(data);
      setSpeedInput(data.speed_multiplier);
    } catch {
      if (!silent) setError("Failed to load market status.");
    } finally {
      if (!silent) setLoading(false);
    }
  }

  useEffect(() => {
    fetchStatus();

    const offEvent = websocketService.on<MarketEventPayload>("MARKET_EVENT", (payload) => {
      setStatus((prev) => {
        if (!prev) return null;
        const next = { ...prev, market_time: payload.market_time, active_event: payload.headline };
        if (payload.is_open !== undefined) next.is_open = payload.is_open;
        return next;
      });
    });

    const offConnected = websocketService.on<{ server_market_time: string }>("CONNECTED", (payload) => {
      setStatus((prev) => prev ? { ...prev, market_time: payload.server_market_time } : null);
    });

    // Fallback poll for auto open/close not triggered through the admin panel
    const interval = setInterval(() => fetchStatus(true), 30000);

    return () => {
      offEvent();
      offConnected();
      clearInterval(interval);
    };
  }, []);

  async function handleOpen() {
    setActionLoading(true);
    setError(null);
    try {
      const res = await MarketManager.open();
      setStatus(res.market);
      setSpeedInput(res.market.speed_multiplier);
      setFeedback(res.message);
    } catch {
      setError("Failed to open market.");
    } finally {
      setActionLoading(false);
    }
  }

  async function handleClose() {
    setActionLoading(true);
    setError(null);
    try {
      const res = await MarketManager.close();
      setStatus(res.market);
      setSpeedInput(res.market.speed_multiplier);
      setFeedback(res.message);
    } catch {
      setError("Failed to close market.");
    } finally {
      setActionLoading(false);
    }
  }

  async function handleSetSpeed() {
    if (speedInput < 1) return;
    setSpeedLoading(true);
    setError(null);
    try {
      const res = await MarketManager.setSpeed(speedInput);
      setStatus(res.market);
      setFeedback(res.message);
    } catch {
      setError("Failed to update speed.");
    } finally {
      setSpeedLoading(false);
    }
  }

  return {
    status,
    loading,
    actionLoading,
    speedLoading,
    speedInput,
    setSpeedInput,
    error,
    feedback,
    setFeedback,
    fetchStatus,
    handleOpen,
    handleClose,
    handleSetSpeed,
  };
}
