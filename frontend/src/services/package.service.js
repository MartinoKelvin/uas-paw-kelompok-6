import apiClient from "./api";
// Get all packages with optional filters
export const getAllPackages = async (filters) => {
  const params = {};

  if (filters?.destination && filters.destination !== "all") {
    params.destination = filters.destination;
  }
  if (filters?.search) {
    params.q = filters.search;
  }
  if (filters?.minPrice !== undefined) {
    params.minPrice = filters.minPrice.toString();
  }
  if (filters?.maxPrice !== undefined) {
    params.maxPrice = filters.maxPrice.toString();
  }
  if (filters?.sortBy) {
    params.sortBy = filters.sortBy;
  }
  if (filters?.order) {
    params.order = filters.order;
  }

  const response = await apiClient.get("/api/packages", { params });
  return response.data;
};

// Get package by ID
export const getPackageById = async (id) => {
  const response = await apiClient.get(`/api/packages/${id}`);
  return response.data;
};

// Get packages by destination - using query parameter
export const getPackagesByDestination = async (destinationId) => {
  const response = await apiClient.get("/api/packages", {
    params: { destination: destinationId },
  });
  return response.data;
};

// Get packages by agent
export const getPackagesByAgent = async (agentId) => {
  const response = await apiClient.get(`/api/packages/agent/${agentId}`);
  return response.data;
};

// Create package (Agent only) - uses FormData for file upload
export const createPackage = async (data) => {
  const formData = new FormData();
  formData.append("destinationId", data.destinationId);
  formData.append("name", data.name);
  formData.append("duration", data.duration.toString());
  formData.append("price", data.price.toString());
  formData.append("itinerary", data.itinerary);
  formData.append("maxTravelers", data.maxTravelers.toString());
  formData.append("contactPhone", data.contactPhone);

  // Append images
  data.images.forEach((image) => {
    formData.append("images", image);
  });

  const response = await apiClient.post("/api/packages", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

// Update package (Agent only) - uses JSON
export const updatePackage = async (id, data) => {
  const response = await apiClient.put(`/api/packages/${id}`, data);
  return response.data;
};

// Delete package (Agent only)
export const deletePackage = async (id) => {
  const response = await apiClient.delete(`/api/packages/${id}`);
  return response.data;
};

// Search packages - using query parameter on main endpoint
export const searchPackages = async (query) => {
  const response = await apiClient.get("/api/packages", {
    params: { q: query },
  });
  return response.data;
};
