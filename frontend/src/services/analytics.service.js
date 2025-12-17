import apiClient from "./api";

// Agent Statistics Response (matches backend exactly)
// Package Performance
// Tourist Statistics (matches backend exactly)
// Get agent statistics
export const getAgentStats = async () => {
  const response = await apiClient.get("/api/analytics/agent/stats");
  return response.data;
};

// Get package performance for agent
export const getPackagePerformance = async () => {
  const response = await apiClient.get("/api/analytics/agent/package-performance");
  return response.data;
};

// Get tourist statistics
export const getTouristStats = async () => {
  const response = await apiClient.get("/api/analytics/tourist/stats");
  return response.data;
};
