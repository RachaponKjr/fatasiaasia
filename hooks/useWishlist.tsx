"use client";
import { useState, useEffect } from "react";
import api from "@/server";
import { Tour } from "@/types/tour.type";

export const useWishlist = () => {
  const [wishlist, setWishlist] = useState<Tour[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // โหลด wishlist
  const fetchWishlist = async () => {
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
  };

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
    fetchWishlist();
  }, []);

  return {
    wishlist,
    isLoading,
    error,
    fetchWishlist,
    addToWishlist,
    removeFromWishlist,
  };
};
