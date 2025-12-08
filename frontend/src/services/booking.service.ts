import apiClient from "./api";
import type { Booking } from "@/types";

export interface CreateBookingRequest {
  packageId: string;
  travelDate: string;
  travelersCount: number;
  totalPrice: number;
}

export interface UpdateBookingStatusRequest {
  id: string;
  status: "pending" | "confirmed" | "cancelled";
}

// Get all bookings (Admin/Agent)
export const getAllBookings = async (): Promise<Booking[]> => {
  const response = await apiClient.get<Booking[]>("/api/bookings");
  return response.data;
};

// Get booking by ID
export const getBookingById = async (id: string): Promise<Booking> => {
  const response = await apiClient.get<Booking>(`/api/bookings/${id}`);
  return response.data;
};

// Get bookings by tourist
export const getBookingsByTourist = async (
  touristId: string
): Promise<Booking[]> => {
  const response = await apiClient.get<Booking[]>(
    `/api/bookings/tourist/${touristId}`
  );
  return response.data;
};

// Get bookings by package
export const getBookingsByPackage = async (
  packageId: string
): Promise<Booking[]> => {
  const response = await apiClient.get<Booking[]>(
    `/api/bookings/package/${packageId}`
  );
  return response.data;
};

// Create booking (Tourist only)
export const createBooking = async (
  data: CreateBookingRequest
): Promise<Booking> => {
  const response = await apiClient.post<Booking>("/api/bookings", data);
  return response.data;
};

// Update booking status (Agent only)
export const updateBookingStatus = async (
  data: UpdateBookingStatusRequest
): Promise<Booking> => {
  const { id, status } = data;
  const response = await apiClient.patch<Booking>(`/api/bookings/${id}`, {
    status,
  });
  return response.data;
};

// Cancel booking (Tourist can cancel their own)
export const cancelBooking = async (id: string): Promise<Booking> => {
  const response = await apiClient.patch<Booking>(`/api/bookings/${id}`, {
    status: "cancelled",
  });
  return response.data;
};

// Get booking statistics (Agent)
export const getBookingStatistics = async (agentId: string) => {
  const response = await apiClient.get(`/api/bookings/stats/${agentId}`);
  return response.data;
};
