import { BaseApi } from "@/lib/base-api";
import { Tour, TourDetail } from "@/types/tour.type";

const getTour = async ({ country }: { country?: string } = {}) => {
  const url = country ? `/tour?country=${country}` : "/tour";
  return BaseApi<Tour[]>(url, { method: "GET", requiresAuth: false });
};
const getTourDetail = async ({ tourId }: { tourId: number }) => {
  return BaseApi<TourDetail>(`/tour/${tourId}`, {
    method: "GET",
    requiresAuth: false,
  });
};

export { getTour, getTourDetail };
