import { useState, useCallback } from "react";
import { uploadPaymentProof, verifyPayment, rejectPayment } from "@/services/payment.service";

/**
 * Hook untuk operasi mutasi payment (upload, verify, reject)
 */
export function usePaymentMutation() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const upload = useCallback(async (bookingId, file) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await uploadPaymentProof(bookingId, file);
      return result;
    } catch (err) {
      setError(err.message || "Gagal mengupload bukti pembayaran");
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const verify = useCallback(async (bookingId) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await verifyPayment(bookingId);
      return result;
    } catch (err) {
      setError(err.message || "Gagal memverifikasi payment");
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const reject = useCallback(async (bookingId, reason) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await rejectPayment(bookingId, reason);
      return result;
    } catch (err) {
      setError(err.message || "Gagal menolak payment");
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { upload, verify, reject, isLoading, error };
}
