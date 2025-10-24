import { BookingReq } from "@/types/booking.type";
import { create } from "zustand";

interface StoreState {
  booking: BookingReq;
  setBooking: (
    booking: BookingReq | ((prev: BookingReq) => BookingReq)
  ) => void;
  resetBooking: () => void;
}

export const useBooking = create<StoreState>((set) => ({
  booking: {
    startDate: 0,
    visitTime: 0,
    adultTickets: 0,
    childTickets: 0,
    infantTickets: 0,
    bookingEmail: "",
    bookingFirstname: "",
    bookingSurname: "",
    bookingPhone: "",
    bookingAddress: "",
  },
  setBooking: (booking) =>
    set((state) => ({
      booking: typeof booking === "function" ? booking(state.booking) : booking,
    })),
  resetBooking: () =>
    set({
      booking: {
        startDate: 0,
        visitTime: 0,
        adultTickets: 0,
        childTickets: 0,
        infantTickets: 0,
        bookingEmail: "",
        bookingFirstname: "",
        bookingSurname: "",
        bookingPhone: "",
        bookingAddress: "",
      },
    }),
}));
