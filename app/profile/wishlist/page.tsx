export const dynamic = "force-dynamic";

import React from "react";
import WishList from "../_components/wishlist";
import api from "@/server";

const page = async () => {
  const { data } = await api.wistlist.getTourWishlist();
  return (
    <div className="container mx-auto max-w-7xl  pt-[72px] flex flex-col gap-20">
      <WishList wishlist={data}/>
    </div>
  );
};

export default page;
