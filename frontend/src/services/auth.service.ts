import apiClient from "./api";
import type { User } from "@/types";

export interface LoginRequest {
  email: string;
  password: string;
  role: "tourist" | "agent";
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role: "tourist" | "agent";
}

export interface AuthResponse {
  user: User;
  token: string;
}

// Login user
export const login = async (data: LoginRequest): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>("/api/auth/login", data);
  return response.data;
};

// Register user
export const register = async (
  data: RegisterRequest
): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>(
    "/api/auth/register",
    data
  );
  return response.data;
};

// Logout user
export const logout = async (): Promise<void> => {
  await apiClient.post("/api/auth/logout");
  localStorage.removeItem("auth_token");
};

// Get current user profile
export const getCurrentUser = async (): Promise<User> => {
  const response = await apiClient.get<User>("/api/auth/me");
  return response.data;
};

// Update user profile
export const updateProfile = async (data: Partial<User>): Promise<User> => {
  const response = await apiClient.put<User>("/api/auth/profile", data);
  return response.data;
};

// Change password
export const changePassword = async (data: {
  currentPassword: string;
  newPassword: string;
}): Promise<void> => {
  await apiClient.post("/api/auth/change-password", data);
};
