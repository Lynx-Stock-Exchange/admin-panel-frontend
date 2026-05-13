import { useEffect, useState } from "react";
import { MarketManager } from "../services/MarketManager";
import type { MarketStatus } from "../types";

export function useMarketControl() {
  const [status, setStatus] = useState<MarketStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [speedLoading, setSpeedLoading] = useState(false);
  const [speedInput, setSpeedInput] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  async function fetchStatus() {
    setLoading(true);
    try {
      setError(null);
      const data = await MarketManager.getStatus();
      setStatus(data);
      setSpeedInput(data.speed_multiplier);
    } catch {
      setError("Failed to load market status.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchStatus();
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
