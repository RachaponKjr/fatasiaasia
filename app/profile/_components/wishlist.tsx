import TourCard from "@/components/tour-card";
import Image from "next/image";
import React from "react";

import wishlist from "@/assets/icons/menu/wishlist.png";

const WishList = () => {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex gap-2 items-center">
        <Image src={wishlist} alt="" width={40} height={40} />
        <h5 className="text-4xl font-bold text-[#333333]">Wishlist</h5>
      </div>
      <div className="grid grid-cols-3 gap-20 items-center">
        <TourCard />
        <TourCard />
        <TourCard />
      </div>
    </div>
  );
};

export default WishList;
