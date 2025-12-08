import apiClient from "./api";
import type { Destination } from "@/types";

// Get all destinations
export const getAllDestinations = async (): Promise<Destination[]> => {
  const response = await apiClient.get<Destination[]>("/api/destinations");
  return response.data;
};

// Get destination by ID
export const getDestinationById = async (id: string): Promise<Destination> => {
  const response = await apiClient.get<Destination>(`/api/destinations/${id}`);
  return response.data;
};

// Search destinations
export const searchDestinations = async (
  query: string
): Promise<Destination[]> => {
  const response = await apiClient.get<Destination[]>("/api/destinations/search", {
    params: { q: query },
  });
  return response.data;
};
