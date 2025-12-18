import apiClient from "./api";

// Get all destinations with optional filters
export const getAllDestinations = async (filters) => {
  const params = {};

  if (filters?.search) {
    params.q = filters.search;
  }

  const response = await apiClient.get("/api/destinations", { params });
  return response.data;
};

// Get destination by ID
export const getDestinationById = async (id) => {
  const response = await apiClient.get(`/api/destinations/${id}`);
  return response.data;
};

// Search destinations - uses main endpoint with query param
export const searchDestinations = async (query) => {
  const response = await apiClient.get("/api/destinations", {
    params: { q: query },
  });
  return response.data;
};

// Create destination (Agent only)
export const createDestination = async (data) => {
  const response = await apiClient.post("/api/destinations", data, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};

// Update destination by ID - JSON only
export const updateDestination = async (id, data) => {
  const response = await apiClient.put(`/api/destinations/${id}`, data);
  return response.data;
};

// Delete destination by ID
export const deleteDestination = async (id) => {
  const response = await apiClient.delete(`/api/destinations/${id}`);
  return response.data;
};