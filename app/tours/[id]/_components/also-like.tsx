"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import ArrowLeft from "@/assets/icons/arrow-left";
import ArrowRight from "@/assets/icons/arrow-right";
import TourCard from "@/components/tour-card";
import LayoutSection from "@/app/_components/layout-section";

import "swiper/css";

import { Tour } from "@/types/tour.type";
const AlsoLike = ({ tour }: { tour: Tour[] }) => {
  return (
    <LayoutSection link="#" title="You might also like...">
      <div className="w-full h-max relative">
        <Swiper
          spaceBetween={100}
          slidesPerView={3}
          breakpoints={{
            0: {
              slidesPerView: 1.5,
              spaceBetween: 16,
            },
            640: {
              slidesPerView: 2.2,
              spaceBetween: 24,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 50,
            },
            1440: {
              slidesPerView: 3,
              spaceBetween: 100,
            },
          }}
          className="w-full"
        >
          {tour.map((item, i) => (
            <SwiperSlide key={i} className="p-3">
              <TourCard wishlist={item} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Prev Button (ซ้าย) */}
        <div className="absolute hidden top-1/2 -translate-y-1/2 -left-12 -translate-x-1/2 w-14 aspect-square rounded-full bg-[#FFF3E1] md:grid place-content-center cursor-pointer shadow-md">
          <ArrowLeft size={28} />
        </div>

        {/* Next Button (ขวา) */}
        <div className="absolute hidden top-1/2 -translate-y-1/2 -right-12 translate-x-1/2 w-14 aspect-square rounded-full bg-[#FFF3E1] md:grid place-content-center cursor-pointer shadow-md">
          <ArrowRight size={28} />
        </div>
      </div>
    </LayoutSection>
  );
};

export default AlsoLike;
