import { useState, useEffect, useCallback } from "react";
import {
  getAllBookings,
  getBookingById,
  getBookingsByTourist,
  getBookingsByPackage,
  createBooking,
  updateBookingStatus,
  cancelBooking,
  getPendingPaymentBookings,
} from "@/services/booking.service";

/**
 * Hook untuk mengambil semua bookings (Admin/Agent)
 */
export function useBookings() {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBookings = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getAllBookings();
      setBookings(data);
    } catch (err) {
      setError(err.message || "Gagal mengambil data bookings");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  return { bookings, isLoading, error, refetch: fetchBookings };
}

/**
 * Hook untuk mengambil booking berdasarkan ID
 */
export function useBooking(id) {
  const [booking, setBooking] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBooking = useCallback(async () => {
    if (!id) return;
    setIsLoading(true);
    setError(null);
    try {
      const data = await getBookingById(id);
      setBooking(data);
    } catch (err) {
      setError(err.message || "Gagal mengambil data booking");
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchBooking();
  }, [fetchBooking]);

  return { booking, isLoading, error, refetch: fetchBooking };
}

/**
 * Hook untuk mengambil bookings berdasarkan tourist
 */
export function useTouristBookings(touristId) {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBookings = useCallback(async () => {
    if (!touristId) return;
    setIsLoading(true);
    setError(null);
    try {
      const data = await getBookingsByTourist(touristId);
      setBookings(data);
    } catch (err) {
      setError(err.message || "Gagal mengambil data bookings");
    } finally {
      setIsLoading(false);
    }
  }, [touristId]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  return { bookings, isLoading, error, refetch: fetchBookings };
}

/**
 * Hook untuk mengambil bookings berdasarkan package
 */
export function usePackageBookings(packageId) {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBookings = useCallback(async () => {
    if (!packageId) return;
    setIsLoading(true);
    setError(null);
    try {
      const data = await getBookingsByPackage(packageId);
      setBookings(data);
    } catch (err) {
      setError(err.message || "Gagal mengambil data bookings");
    } finally {
      setIsLoading(false);
    }
  }, [packageId]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  return { bookings, isLoading, error, refetch: fetchBookings };
}

/**
 * Hook untuk mengambil pending payment bookings (Agent)
 */
export function usePendingPayments() {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBookings = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getPendingPaymentBookings();
      setBookings(data);
    } catch (err) {
      setError(err.message || "Gagal mengambil data pending payments");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  return { bookings, isLoading, error, refetch: fetchBookings };
}

/**
 * Hook untuk operasi mutasi booking (create, update status, cancel)
 */
export function useBookingMutation() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const create = useCallback(async (data) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await createBooking(data);
      return result;
    } catch (err) {
      setError(err.message || "Gagal membuat booking");
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateStatus = useCallback(async (id, status) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await updateBookingStatus({ id, status });
      return result;
    } catch (err) {
      setError(err.message || "Gagal mengupdate status booking");
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const cancel = useCallback(async (id) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await cancelBooking(id);
      return result;
    } catch (err) {
      setError(err.message || "Gagal membatalkan booking");
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { create, updateStatus, cancel, isLoading, error };
}
