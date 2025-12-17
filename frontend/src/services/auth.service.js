import apiClient from "./api";
import { clearAuthStorage } from "@/lib/auth-storage";

// Login request - backend only needs email and password
// Register request
// Login response - backend returns token
// Register response - backend does NOT return token
// Login user
export const login = async (data) => {
  const response = await apiClient.post("/api/auth/login", data);
  return response.data;
};

// Register user - returns user but NO token
export const register = async (data) => {
  const response = await apiClient.post("/api/auth/register", data);
  return response.data;
};

// Logout user - clear all auth data from localStorage
export const logout = () => {
  clearAuthStorage();
};

// Get current user profile
export const getCurrentUser = async () => {
  const response = await apiClient.get("/api/auth/me");
  return response.data;
};

// Update profile request
// Update profile response
// Update user profile
export const updateProfile = async (data) => {
  const response = await apiClient.put("/api/auth/profile", data);
  return response.data;
};

// Change password request
// Change password response
// Change password
export const changePassword = async (data) => {
  const response = await apiClient.post("/api/auth/change-password", data);
  return response.data;
};
