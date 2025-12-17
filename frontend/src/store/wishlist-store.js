import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useWishlistStore = create()(
  persist(
    (set, get) => ({
      wishlist: [],

      addToWishlist: (packageId) => {
        set((state) => ({
          wishlist: [...state.wishlist, packageId],
        }));
      },

      removeFromWishlist: (packageId) => {
        set((state) => ({
          wishlist: state.wishlist.filter((id) => id !== packageId),
        }));
      },

      isInWishlist: (packageId) => {
        return get().wishlist.includes(packageId);
      },

      clearWishlist: () => {
        set({ wishlist: [] });
      },
    }),
    {
      name: "wishlist-storage",
    }
  )
);
