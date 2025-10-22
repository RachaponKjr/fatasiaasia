import { BaseApi } from "@/lib/base-api";
import { Tour } from "@/types/tour.type";

const getTourWishlist = async () => {
  return BaseApi<Tour[]>("/tour/wishlist", {
    method: "GET",
    requiresAuth: true,
  });
};

const wishlist = async ({ tourId }: { tourId: number }) => {
  return BaseApi(`/tour/${tourId}/wishlist`, {
    method: "POST",
    requiresAuth: true,
  });
};

const delwishlist = async ({ tourId }: { tourId: number }) => {
  return BaseApi(`/tour/${tourId}/wishlist`, {
    method: "DELETE",
    requiresAuth: true
  });
};

export { getTourWishlist, wishlist, delwishlist };
