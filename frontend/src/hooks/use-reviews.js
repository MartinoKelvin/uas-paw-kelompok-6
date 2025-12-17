import { useState, useEffect, useCallback } from "react";
import { getPackageReviews, getReviewsByTourist, createReview } from "@/services/review.service";

/**
 * Hook untuk mengambil reviews berdasarkan package
 */
export function usePackageReviews(packageId) {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchReviews = useCallback(async () => {
    if (!packageId) return;
    setIsLoading(true);
    setError(null);
    try {
      const data = await getPackageReviews(packageId);
      setReviews(data);
    } catch (err) {
      setError(err.message || "Gagal mengambil data reviews");
    } finally {
      setIsLoading(false);
    }
  }, [packageId]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  return { reviews, isLoading, error, refetch: fetchReviews };
}

/**
 * Hook untuk mengambil reviews berdasarkan tourist
 */
export function useTouristReviews(touristId) {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchReviews = useCallback(async () => {
    if (!touristId) return;
    setIsLoading(true);
    setError(null);
    try {
      const data = await getReviewsByTourist(touristId);
      setReviews(data);
    } catch (err) {
      setError(err.message || "Gagal mengambil data reviews");
    } finally {
      setIsLoading(false);
    }
  }, [touristId]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  return { reviews, isLoading, error, refetch: fetchReviews };
}

/**
 * Hook untuk operasi mutasi review (create)
 */
export function useReviewMutation() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const create = useCallback(async (data) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await createReview(data);
      return result;
    } catch (err) {
      setError(err.message || "Gagal membuat review");
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { create, isLoading, error };
}
