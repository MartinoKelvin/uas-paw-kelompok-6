import apiClient from "./api";
import type { Review } from "@/types";

export interface CreateReviewRequest {
  packageId: string;
  rating: number;
  comment: string;
}

export interface UpdateReviewRequest {
  id: string;
  rating?: number;
  comment?: string;
}

// Get all reviews for a package
export const getPackageReviews = async (packageId: string): Promise<Review[]> => {
  const response = await apiClient.get<Review[]>(
    `/api/reviews/package/${packageId}`
  );
  return response.data;
};

// Get review by ID
export const getReviewById = async (id: string): Promise<Review> => {
  const response = await apiClient.get<Review>(`/api/reviews/${id}`);
  return response.data;
};

// Get reviews by tourist
export const getReviewsByTourist = async (
  touristId: string
): Promise<Review[]> => {
  const response = await apiClient.get<Review[]>(
    `/api/reviews/tourist/${touristId}`
  );
  return response.data;
};

// Create review (Tourist only, after completing trip)
export const createReview = async (
  data: CreateReviewRequest
): Promise<Review> => {
  const response = await apiClient.post<Review>("/api/reviews", data);
  return response.data;
};

// Update review (Tourist can edit their own review)
export const updateReview = async (
  data: UpdateReviewRequest
): Promise<Review> => {
  const { id, ...updateData } = data;
  const response = await apiClient.put<Review>(
    `/api/reviews/${id}`,
    updateData
  );
  return response.data;
};

// Delete review (Tourist can delete their own review)
export const deleteReview = async (id: string): Promise<void> => {
  await apiClient.delete(`/api/reviews/${id}`);
};

// Get average rating for a package
export const getPackageRating = async (
  packageId: string
): Promise<{ average: number; count: number }> => {
  const response = await apiClient.get(`/api/reviews/package/${packageId}/rating`);
  return response.data;
};
