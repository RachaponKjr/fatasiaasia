import TourCard from "@/components/tour-card";
import Image from "next/image";
import React from "react";

import wishlistIcon from "@/assets/icons/menu/wishlist.png";
import { Tour } from "@/types/tour.type";

const WishList = ({ wishlist }: { wishlist: Tour[] }) => {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex gap-2 items-center">
        <Image src={wishlistIcon} alt="" width={40} height={40} />
        <h5 className="text-4xl font-bold text-[#333333]">Wishlist</h5>
      </div>
      <div className="grid grid-cols-3 gap-20 items-center">
        {wishlist.map((item, index) => (
          <TourCard key={index} wishlist={item} />
        ))}
      </div>
    </div>
  );
};

export default WishList;
