import { BaseApi } from "@/lib/base-api";
import { Tour, TourDetail } from "@/types/tour.type";

const getTour = async () => {
  return BaseApi<Tour[]>("/tour", {
    method: "GET",
    requiresAuth: true,
  });
};

const getTourDetail = async ({ tourId }: { tourId: number }) => {
  return BaseApi<TourDetail>(`/tour/${tourId}`, {
    method: "GET",
  });
};

export { getTour, getTourDetail };
