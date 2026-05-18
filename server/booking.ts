import { BaseApi } from "@/lib/base-api";
import {
  BookingReq,
  MyBooking,
  BookingDetail,
  BookingMessage,
} from "@/types/booking.type";

const booking = async ({
  tourId,
  payload,
}: {
  tourId: number;
  payload: BookingReq;
}) => {
  return BaseApi<{ bookingId: number }>(`/tour/${tourId}/booking`, {
    method: "POST",
    body: JSON.stringify(payload),
    requiresAuth: true,
  });
};

const getMyBooking = async () => {
  return BaseApi<MyBooking[]>("/tour/booking", {
    method: "GET",
    requiresAuth: true,
  });
};

const getBookingDetail = async (bookingId: number) => {
  return BaseApi<BookingDetail>(`/tour/booking/${bookingId}`, {
    method: "GET",
    requiresAuth: true,
    cache: "no-store",
  });
};

const getBookingMessages = async (bookingId: number) => {
  return BaseApi<BookingMessage[]>(`/tour/booking/${bookingId}/messages`, {
    method: "GET",
    requiresAuth: true,
    cache: "no-store",
  });
};

const sendBookingMessage = async (bookingId: number, body: string) => {
  return BaseApi<BookingMessage>(`/tour/booking/${bookingId}/messages`, {
    method: "POST",
    body: JSON.stringify({ body }),
    requiresAuth: true,
  });
};

const cancelBooking = async (bookingId: number) => {
  return BaseApi(`/tour/booking/${bookingId}`, {
    method: "DELETE",
    requiresAuth: true,
  });
};

export {
  booking,
  getMyBooking,
  getBookingDetail,
  getBookingMessages,
  sendBookingMessage,
  cancelBooking,
};
