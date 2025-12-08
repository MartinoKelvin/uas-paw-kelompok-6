import axios from "axios";
import { logger } from "@/lib/logger";
import { toast } from "sonner";

// API Base URL - will be configured from environment variables
export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:6543";

// Create axios instance with default config
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds
});

// Request interceptor - add auth token if available
apiClient.interceptors.request.use(
  (config) => {
    // Get token from localStorage (will be set after backend integration)
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handle errors globally
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;

      switch (status) {
        case 401:
          // Unauthorized - clear auth and redirect to login
          localStorage.removeItem("auth_token");
          toast.error("Session expired. Please login again.");
          window.location.href = "/sign-in";
          break;
        case 403:
          // Forbidden
          logger.error("Access forbidden:", data.message);
          toast.error("Access forbidden");
          break;
        case 404:
          // Not found
          logger.error("Resource not found:", data.message);
          toast.error("Resource not found");
          break;
        case 500:
          // Server error
          logger.error("Server error:", data.message);
          toast.error("Server error. Please try again later.");
          break;
        default:
          logger.error("API Error:", data.message);
          toast.error(data.message || "An error occurred");
      }
    } else if (error.request) {
      // Request made but no response
      logger.error("Network error: No response from server");
      toast.error("Network error. Please check your connection.");
    } else {
      // Error in request setup
      logger.error("Error:", error.message);
      toast.error("An unexpected error occurred");
    }

    return Promise.reject(error);
  }
);

export default apiClient;
