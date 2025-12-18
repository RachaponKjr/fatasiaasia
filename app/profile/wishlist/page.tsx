export const dynamic = "force-dynamic";

import React from "react";
import WishList from "../_components/wishlist";
import api from "@/server";

const page = async () => {
  let wishlistData: any[] = [];

  try {
    const { data } = await api.wistlist.getTourWishlist();
    wishlistData = data ?? [];
  } catch (error) {
    console.error("Error fetching wishlist:", error);
  }

  return (
    <div className="container mx-auto max-w-7xl  pt-[72px] flex flex-col gap-20">
      <WishList wishlist={wishlistData} />
    </div>
  );
};

export default page;
