import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Review } from "@/types";

interface ReviewState {
  reviews: Review[];
  setReviews: (reviews: Review[]) => void;
  addReview: (review: Review) => void;
  updateReview: (id: string, updates: Partial<Review>) => void;
  deleteReview: (id: string) => void;
  getReviewsByPackage: (packageId: string) => Review[];
  getReviewsByTourist: (touristId: string) => Review[];
  getPackageAverageRating: (packageId: string) => { average: number; count: number };
  hasUserReviewedPackage: (touristId: string, packageId: string) => boolean;
}

export const useReviewStore = create<ReviewState>()(
  persist(
    (set, get) => ({
      reviews: [],

      setReviews: (reviews) => set({ reviews }),

      addReview: (review) =>
        set((state) => ({
          reviews: [...state.reviews, review],
        })),

      updateReview: (id, updates) =>
        set((state) => ({
          reviews: state.reviews.map((review) =>
            review.id === id ? { ...review, ...updates } : review
          ),
        })),

      deleteReview: (id) =>
        set((state) => ({
          reviews: state.reviews.filter((review) => review.id !== id),
        })),

      getReviewsByPackage: (packageId) => {
        return get().reviews.filter((review) => review.packageId === packageId);
      },

      getReviewsByTourist: (touristId) => {
        return get().reviews.filter((review) => review.touristId === touristId);
      },

      getPackageAverageRating: (packageId) => {
        const packageReviews = get().reviews.filter(
          (review) => review.packageId === packageId
        );

        if (packageReviews.length === 0) {
          return { average: 0, count: 0 };
        }

        const sum = packageReviews.reduce((acc, review) => acc + review.rating, 0);
        const average = sum / packageReviews.length;

        return {
          average: Math.round(average * 10) / 10, // Round to 1 decimal
          count: packageReviews.length,
        };
      },

      hasUserReviewedPackage: (touristId, packageId) => {
        const reviews = get().reviews;
        return reviews.some(
          (review) => review.touristId === touristId && review.packageId === packageId
        );
      },
    }),
    {
      name: "review-storage",
    }
  )
);
