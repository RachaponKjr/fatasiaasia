"use client";

import { useTourStore } from "@/store/tour-store";
import { useEffect } from "react";

export function useTours() {
  const { tours, loading, fetchTours } = useTourStore();

  useEffect(() => {
    if (tours.length === 0) {
      fetchTours();
    }
  }, []);

  return { tours, loading };
}
