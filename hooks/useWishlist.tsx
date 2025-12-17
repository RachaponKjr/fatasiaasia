"use client";
import { useEffect, useState } from "react";
import { Tour } from "@/types/tour.type";
import { useProfile } from "./useProfile";
import { useWishlistStore } from "@/store/wishlist-store";

export const useWishlist = () => {
  const [mounted, setMounted] = useState(false);
  const store = useWishlistStore();
  const { authStatus } = useProfile();

  // Handle SSR - only run on client
  useEffect(() => {
    setMounted(true);
  }, []);

  // Initial fetch when user logs in (only on client)
  useEffect(() => {
    if (mounted && authStatus === "true" && !store.isInitialized && !store.isLoading) {
      store.fetchWishlist();
    }
  }, [mounted, authStatus, store.isInitialized, store.isLoading, store.fetchWishlist]);

  return {
    wishlist: mounted ? store.wishlist : [],
    isLoading: store.isLoading,
    error: store.error,
    fetchWishlist: store.fetchWishlist,
    addToWishlist: store.addToWishlist,
    removeFromWishlist: store.removeFromWishlist,
  };
};
