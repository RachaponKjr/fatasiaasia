import TourCard from "@/components/tour-card";
import React from "react";

const WishList = () => {
  return (
    <div className="flex flex-col gap-10">
      <h5 className="text-4xl font-bold text-[#333333]">Wishlist</h5>
      <div className="grid grid-cols-3 gap-20 items-center">
        <TourCard />
        <TourCard />
        <TourCard />
      </div>
    </div>
  );
};

export default WishList;
