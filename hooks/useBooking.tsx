"use client";

import { useState } from "react";
import api from "@/server";
import { BookingReq, BookingReqSchema } from "@/types/booking.type";
import { toast } from "sonner";

export const useBooking = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [bookings, setBookings] = useState<BookingReq[]>([]);
  const [booking, setBooking] = useState<BookingReq>({
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
  });

  const createBooking = async (tourId: number, data: BookingReq) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Validate data
      const validatedData = BookingReqSchema.parse(data);

      // ส่งไป API จริง
      const res = await api.booking.booking({
        tourId: tourId,
        payload: validatedData,
      });
      // สมมติว่า res.data เป็น BookingReq หรือ object booking

      if (res.code !== 2000) {
        toast.error("จองไม่สำเร็จ", { className: "!text-red-500" });
      }

      // เพิ่ม booking ที่สร้างแล้วลง state
      setBookings((prev) => [...prev, validatedData]);

      setSuccess(true);
      toast.success("จองสำเร็จ", { className: "!text-green-500" });
    } catch (err: any) {
      if (err?.errors) {
        setError(err.errors.map((e: any) => e.message).join(", "));
      } else {
        setError(err.message || "Failed to create booking");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const resetBooking = () => {
    setBooking({
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
    });
    setError(null);
    setSuccess(false);
    setIsLoading(false);
  };

  return {
    isLoading,
    error,
    success,
    bookings,
    createBooking,
    setBooking,
    booking,
    resetBooking
  };
};
