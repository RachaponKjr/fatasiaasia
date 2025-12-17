"use client";
import { useEffect } from "react";
import { Tour } from "@/types/tour.type";
import { useProfile } from "./useProfile";
import { useWishlistStore } from "@/store/wishlist-store";

export const useWishlist = () => {
  const store = useWishlistStore();
  const { authStatus } = useProfile();

  // Initial fetch when user logs in
  useEffect(() => {
    if (authStatus === "true" && !store.isInitialized && !store.isLoading) {
      store.fetchWishlist();
    }
  }, [authStatus, store.isInitialized, store.isLoading, store.fetchWishlist]);

  return {
    wishlist: store.wishlist,
    isLoading: store.isLoading,
    error: store.error,
    fetchWishlist: store.fetchWishlist,
    addToWishlist: store.addToWishlist,
    removeFromWishlist: store.removeFromWishlist,
  };
};
