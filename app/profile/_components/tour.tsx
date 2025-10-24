'use client'
import React from "react";
import TourItem from "./tour-item";
import tour from "@/assets/icons/menu/tour.png";
import Image from "next/image";
import { MyBooking } from "@/types/booking.type";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";

type Props = {
  myBooking?: MyBooking[];
};

const Tour = ({ myBooking = [] }: Props) => {
  if (!myBooking || myBooking.length === 0) {
    return (
      <div className="flex flex-col gap-10">
        {/* Header */}
        <div className="flex gap-2 items-center">
          <Image src={tour} alt="tour icon" width={40} height={40} />
          <h5 className="text-2xl md:text-4xl font-bold text-[#333333]">Tour</h5>
        </div>
        <div className="text-center py-10 text-gray-500 text-lg">
          ไม่พบข้อมูลทัวร์ของคุณ
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10">
      {/* Header */}
      <div className="flex gap-2 items-center">
        <Image src={tour} alt="tour icon" width={40} height={40} />
        <h5 className="text-2xl md:text-4xl font-bold text-[#333333]">Tour</h5>
      </div>

      {/* Desktop grid */}
      <div className="hidden md:grid grid-cols-3 gap-20 items-start">
        {myBooking.map((item, index) => (
          <TourItem key={index} booking={item} />
        ))}
      </div>

      {/* Mobile Swiper */}
      <div className="block md:hidden">
        <Swiper
          spaceBetween={20}
          slidesPerView={2}
          breakpoints={{
            0: { slidesPerView: 1.2, spaceBetween: 12 },
            480: { slidesPerView: 1.5, spaceBetween: 16 },
            768: { slidesPerView: 2, spaceBetween: 20 },
          }}
        >
          {myBooking.map((item, index) => (
            <SwiperSlide key={index}>
              <TourItem booking={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Tour;
