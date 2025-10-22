import { BaseApi } from "@/lib/base-api";
import { BookingReq } from "@/types/booking.type";

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
    requiresAuth:true
  });
};

export { booking };
