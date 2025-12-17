import { create } from "zustand";
import api from "@/server";
import { Tour } from "@/types/tour.type";

interface WishlistState {
    wishlist: Tour[];
    isLoading: boolean;
    error: string | null;
    isInitialized: boolean;

    fetchWishlist: () => Promise<void>;
    addToWishlist: (tour: Tour) => Promise<void>;
    removeFromWishlist: (tourId: number) => Promise<void>;
    clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>((set, get) => ({
    wishlist: [],
    isLoading: false,
    error: null,
    isInitialized: false,

    clearWishlist: () => set({ wishlist: [], isInitialized: false }),

    fetchWishlist: async () => {
        if (get().isLoading) return; // Prevent concurrent fetches

        set({ isLoading: true, error: null });
        try {
            const res = await api.wistlist.getTourWishlist();
            set({ wishlist: res.data || [], isInitialized: true });
        } catch (err: any) {
            set({ error: err.message || "Failed to fetch wishlist" });
        } finally {
            set({ isLoading: false });
        }
    },

    addToWishlist: async (tour: Tour) => {
        // Optimistic update
        const currentWishlist = get().wishlist;
        // Avoid duplicates
        if (currentWishlist.some(w => w.tourId === tour.tourId)) return;

        set({ wishlist: [...currentWishlist, tour] });

        try {
            await api.wistlist.wishlist({ tourId: tour.tourId });
        } catch (err: any) {
            // Revert on error
            set({
                wishlist: currentWishlist,
                error: err.message || "Failed to add to wishlist"
            });
        }
    },

    removeFromWishlist: async (tourId: number) => {
        // Optimistic update
        const currentWishlist = get().wishlist;
        set({ wishlist: currentWishlist.filter((w) => w.tourId !== tourId) });

        try {
            await api.wistlist.delwishlist({ tourId });
        } catch (err: any) {
            // Revert on error
            set({
                wishlist: currentWishlist,
                error: err.message || "Failed to remove from wishlist"
            });
        }
    },
}));
