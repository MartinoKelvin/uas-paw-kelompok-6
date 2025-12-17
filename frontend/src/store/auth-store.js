import { create } from "zustand";
import { persist } from "zustand/middleware";
import { clearAuthStorage } from "@/lib/auth-storage";

export const useAuthStore = create()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      login: (userData) => set({ user: userData, isAuthenticated: true }),
      logout: () => {
        // Clear all auth data using helper
        clearAuthStorage();
        // Reset state
        set({ user: null, isAuthenticated: false });
      },
      register: (userData) => set({ user: userData, isAuthenticated: true }),
      setLoading: (loading) => set({ isLoading: loading }),
      setUser: (userData) => set({ user: userData }),
    }),
    {
      name: "auth-storage",
    }
  )
);
