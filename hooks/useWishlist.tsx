"use client";
import { useState, useEffect, useCallback } from "react";
import api from "@/server";
import { Tour } from "@/types/tour.type";
import { useProfile } from "./useProfile";

export const useWishlist = () => {
  const [wishlist, setWishlist] = useState<Tour[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { authStatus } = useProfile();

  // โหลด wishlist
  const fetchWishlist = useCallback(async () => {
    if (!authStatus) return;
    setIsLoading(true);
    setError(null);
    try {
      const res = await api.wistlist.getTourWishlist();
      setWishlist(res.data);
    } catch (err: any) {
      setError(err.message || "Failed to fetch wishlist");
    } finally {
      setIsLoading(false);
    }
  }, [authStatus]);

  // เพิ่ม item
  const addToWishlist = async (tourId: number) => {
    try {
      await api.wistlist.wishlist({ tourId });
      // รีเฟรช wishlist อัตโนมัติหลังเพิ่ม
      await fetchWishlist();
    } catch (err: any) {
      setError(err.message || "Failed to add to wishlist");
    }
  };

  // ลบ item
  const removeFromWishlist = async (tourId: number) => {
    try {
      await api.wistlist.delwishlist({ tourId });
      // รีเฟรช wishlist อัตโนมัติหลังลบ
      await fetchWishlist();
    } catch (err: any) {
      setError(err.message || "Failed to remove from wishlist");
    }
  };

  useEffect(() => {
    if (authStatus === "true") {
      fetchWishlist();
    }
  }, [authStatus, fetchWishlist]);

  return {
    wishlist,
    isLoading,
    error,
    fetchWishlist,
    addToWishlist,
    removeFromWishlist,
  };
};
