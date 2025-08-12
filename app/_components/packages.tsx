"use client";
import React from "react";
import LayoutSection from "./layout-section";
import { Swiper, SwiperSlide } from "swiper/react";
import ArrowLeft from "@/assets/icons/arrow-left";
import ArrowRight from "@/assets/icons/arrow-right";
import TourCard from "@/components/tour-card";

const Packages = () => {
  return (
    <LayoutSection link="#" title="Popular Tour Packages">
      <div className="w-full h-max relative">
        <Swiper slidesPerView={3} spaceBetween={102} className="w-full">
          {Array.from({ length: 5 }).map((_, i) => (
            <SwiperSlide key={i} className="p-3">
              <TourCard />
            </SwiperSlide>
          ))}
        </Swiper>
        {/* Prev Button (ซ้าย) */}
        <div className="absolute top-1/2 -translate-y-1/2 -left-12 -translate-x-1/2 w-14 aspect-square rounded-full bg-[#FFF3E1] grid place-content-center cursor-pointer shadow-md">
          <ArrowLeft size={28} />
        </div>

        {/* Next Button (ขวา) */}
        <div className="absolute top-1/2 -translate-y-1/2 -right-12 translate-x-1/2 w-14 aspect-square rounded-full bg-[#FFF3E1] grid place-content-center cursor-pointer shadow-md">
          <ArrowRight size={28} />
        </div>
      </div>
    </LayoutSection>
  );
};

export default Packages;
