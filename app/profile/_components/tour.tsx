import React from "react";
import TourItem from "./tour-item";

import tour from "@/assets/icons/menu/tour.png";
import Image from "next/image";

const Tour = () => {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex gap-2 items-center">
        <Image src={tour} alt="" width={40} height={40} />
        <h5 className="text-4xl font-bold text-[#333333]">Tour</h5>
      </div>
      <div className="grid grid-cols-3 gap-20 items-center">
        <TourItem />
        <TourItem />
        <TourItem />
      </div>
    </div>
  );
};

export default Tour;
