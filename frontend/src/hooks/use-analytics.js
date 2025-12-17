import { useState, useEffect, useCallback } from "react";
import {
  getAgentStats,
  getPackagePerformance,
  getTouristStats,
} from "@/services/analytics.service";

/**
 * Hook untuk mengambil statistics agent
 */
export function useAgentStats() {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStats = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getAgentStats();
      setStats(data);
    } catch (err) {
      setError(err.message || "Gagal mengambil data statistics");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return { stats, isLoading, error, refetch: fetchStats };
}

/**
 * Hook untuk mengambil package performance
 */
export function usePackagePerformance() {
  const [performance, setPerformance] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPerformance = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getPackagePerformance();
      setPerformance(data);
    } catch (err) {
      setError(err.message || "Gagal mengambil data performance");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPerformance();
  }, [fetchPerformance]);

  return { performance, isLoading, error, refetch: fetchPerformance };
}

/**
 * Hook untuk mengambil tourist statistics
 */
export function useTouristStats() {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStats = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getTouristStats();
      setStats(data);
    } catch (err) {
      setError(err.message || "Gagal mengambil data statistics");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return { stats, isLoading, error, refetch: fetchStats };
}
