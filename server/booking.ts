import { BaseApi } from "@/lib/base-api";
import { BookingReq, MyBooking } from "@/types/booking.type";

const booking = async ({
  tourId,
  payload,
}: {
  tourId: number;
  payload: BookingReq;
}) => {
  return BaseApi(`/tour/${tourId}/booking`, {
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

const cancelBooking = async (bookingId: number) => {
  return BaseApi(`/tour/booking/${bookingId}`, {
    method: "DELETE",
    requiresAuth: true,
  });
};

export { booking, getMyBooking, cancelBooking };
