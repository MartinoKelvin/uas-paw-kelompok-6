import apiClient from "./api";
import type { Package } from "@/types";

export interface CreatePackageRequest {
  destinationId: string;
  name: string;
  duration: number;
  price: number;
  itinerary: string;
  maxTravelers: number;
  images: string[];
}

export interface UpdatePackageRequest extends Partial<CreatePackageRequest> {
  id: string;
}

// Get all packages
export const getAllPackages = async (): Promise<Package[]> => {
  const response = await apiClient.get<Package[]>("/api/packages");
  return response.data;
};

// Get package by ID
export const getPackageById = async (id: string): Promise<Package> => {
  const response = await apiClient.get<Package>(`/api/packages/${id}`);
  return response.data;
};

// Get packages by destination
export const getPackagesByDestination = async (
  destinationId: string
): Promise<Package[]> => {
  const response = await apiClient.get<Package[]>(
    `/api/packages/destination/${destinationId}`
  );
  return response.data;
};

// Get packages by agent
export const getPackagesByAgent = async (agentId: string): Promise<Package[]> => {
  const response = await apiClient.get<Package[]>(
    `/api/packages/agent/${agentId}`
  );
  return response.data;
};

// Create package (Agent only)
export const createPackage = async (
  data: CreatePackageRequest
): Promise<Package> => {
  const response = await apiClient.post<Package>("/api/packages", data);
  return response.data;
};

// Update package (Agent only)
export const updatePackage = async (
  data: UpdatePackageRequest
): Promise<Package> => {
  const { id, ...updateData } = data;
  const response = await apiClient.put<Package>(
    `/api/packages/${id}`,
    updateData
  );
  return response.data;
};

// Delete package (Agent only)
export const deletePackage = async (id: string): Promise<void> => {
  await apiClient.delete(`/api/packages/${id}`);
};

// Search packages
export const searchPackages = async (query: string): Promise<Package[]> => {
  const response = await apiClient.get<Package[]>("/api/packages/search", {
    params: { q: query },
  });
  return response.data;
};
