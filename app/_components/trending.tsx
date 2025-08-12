"use client";
import React from "react";
import LayoutSection from "./layout-section";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import ArrowLeft from "@/assets/icons/arrow-left";
import ArrowRight from "@/assets/icons/arrow-right";

const Trending = () => {
  return (
    <LayoutSection link="#" title="Trending Destinations">
      <div className="w-full h-max relative">
        <Swiper slidesPerView={4} spaceBetween={36} className="w-full">
          {Array.from({ length: 5 }).map((_, i) => (
            <SwiperSlide key={i}>
              <div className="bg-gray-200 aspect-[12/16] w-full rounded-2xl p-8 flex items-end">
                <div className="text-white flex flex-col gap-1">
                  <h6 className="font-medium text-lg">Bangkok</h6>
                  <span className="font-light text-xs">
                    way Market & Damnoensaduak Floating Market
                  </span>
                </div>
              </div>
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

export default Trending;
