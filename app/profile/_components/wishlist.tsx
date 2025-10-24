"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import TourCard from "@/components/tour-card";
import wishlistIcon from "@/assets/icons/menu/wishlist.png";
import { Tour } from "@/types/tour.type";

import "swiper/css";

type Props = {
  wishlist?: Tour[];
};

const WishList = ({ wishlist = [] }: Props) => {
  if (!wishlist || wishlist.length === 0) {
    return (
      <div className="flex flex-col gap-10">
        {/* Header */}
        <div className="flex gap-2 items-center">
          <Image src={wishlistIcon} alt="wishlist icon" width={40} height={40} />
          <h5 className="text-2xl md:text-4xl font-bold text-[#333333]">
            Wishlist
          </h5>
        </div>
        <div className="text-center py-10 text-gray-500 text-lg">
          ไม่พบข้อมูล Wishlist ของคุณ
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10">
      {/* Header */}
      <div className="flex gap-2 items-center">
        <Image src={wishlistIcon} alt="wishlist icon" width={40} height={40} />
        <h5 className="text-2xl md:text-4xl font-bold text-[#333333]">
          Wishlist
        </h5>
      </div>

      {/* Desktop grid */}
      <div className="hidden md:grid grid-cols-3 gap-20 items-start">
        {wishlist.map((item, index) => (
          <TourCard key={index} wishlist={item} />
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
          {wishlist.map((item, index) => (
            <SwiperSlide key={index}>
              <TourCard wishlist={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default WishList;
