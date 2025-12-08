import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WishlistStore {
  wishlist: string[]; // Package IDs
  addToWishlist: (packageId: string) => void;
  removeFromWishlist: (packageId: string) => void;
  isInWishlist: (packageId: string) => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      wishlist: [],

      addToWishlist: (packageId: string) => {
        set((state) => ({
          wishlist: [...state.wishlist, packageId],
        }));
      },

      removeFromWishlist: (packageId: string) => {
        set((state) => ({
          wishlist: state.wishlist.filter((id) => id !== packageId),
        }));
      },

      isInWishlist: (packageId: string) => {
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
