import React from "react";
import ItemCardTour from "./_components/item-card-tour";

import tour from "@/assets/icons/menu/tour.png";
import Image from "next/image";
import api from "@/server";

export const dynamic = "force-dynamic";
const page = async () => {
  const { data: mybooking } = await api.booking.getMyBooking()
  return (
    <div className="container mx-auto px-4 md:px-0 max-w-7xl py-[72px] flex flex-col gap-20">
      <div className="flex flex-col gap-10">
        <div className="flex gap-2 items-center">
          <Image src={tour} alt="" width={40} height={40} />
          <h5 className="text-4xl font-bold text-[#333333]">Tours</h5>
        </div>
        <div className="flex flex-col gap-20">
          {mybooking.map((item, key) => (
            <ItemCardTour key={item.bookingId || key} tour={item} active={item.bookingStatus !== 'confirmed' ? false : true} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
