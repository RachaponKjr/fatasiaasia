import { BaseApi } from "@/lib/base-api";
import { Tour, TourDetail } from "@/types/tour.type";

const getTour = async ({ country, isBeachTour }: { country?: string; isBeachTour?: boolean } = {}) => {
  let url = "/tour";
  const params = new URLSearchParams();

  if (country) params.append("country", country);
  if (isBeachTour !== undefined) params.append("isBeachTour", String(isBeachTour));

  if (params.toString()) url += `?${params.toString()}`;

  return BaseApi<Tour[]>(url, { method: "GET", requiresAuth: false });
};
const getTourDetail = async ({ tourId }: { tourId: number }) => {
  return BaseApi<TourDetail>(`/tour/${tourId}`, {
    method: "GET",
    requiresAuth: false,
  });
};

export { getTour, getTourDetail };
