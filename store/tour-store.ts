import { create } from "zustand";
import api from "@/server";
import { Tour } from "@/types/tour.type";

interface TourState {
  tours: Tour[];
  loading: boolean;
  fetchTours: () => Promise<void>;
}

export const useTourStore = create<TourState>((set) => ({
  tours: [],
  loading: false,

  fetchTours: async () => {
    set({ loading: true });
    const { data } = await api.tour.getTour();
    set({ tours: data, loading: false });
  },
}));
