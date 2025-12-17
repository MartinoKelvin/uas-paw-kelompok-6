import { useState, useEffect, useCallback } from "react";
import {
  getAllDestinations,
  getDestinationById,
  createDestination,
} from "@/services/destination.service";

/**
 * Hook untuk mengambil semua destinations
 */
export function useDestinations() {
  const [destinations, setDestinations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDestinations = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getAllDestinations();
      setDestinations(data);
    } catch (err) {
      setError(err.message || "Gagal mengambil data destinations");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDestinations();
  }, [fetchDestinations]);

  return { destinations, isLoading, error, refetch: fetchDestinations };
}

/**
 * Hook untuk mengambil destination berdasarkan ID
 */
export function useDestination(id) {
  const [destination, setDestination] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDestination = useCallback(async () => {
    if (!id) return;
    setIsLoading(true);
    setError(null);
    try {
      const data = await getDestinationById(id);
      setDestination(data);
    } catch (err) {
      setError(err.message || "Gagal mengambil data destination");
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchDestination();
  }, [fetchDestination]);

  return { destination, isLoading, error, refetch: fetchDestination };
}

/**
 * Hook untuk operasi mutasi destination (create)
 * Note: Update dan delete bisa ditambahkan ketika service mendukung
 */
export function useDestinationMutation() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const create = useCallback(async (data) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await createDestination(data);
      return result;
    } catch (err) {
      setError(err.message || "Gagal membuat destination");
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { create, isLoading, error };
}
