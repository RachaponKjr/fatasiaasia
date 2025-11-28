"use client";
import React from "react";
import LayoutSection from "./layout-section";
import { Swiper, SwiperSlide } from "swiper/react";
import ArrowLeft from "@/assets/icons/arrow-left";
import ArrowRight from "@/assets/icons/arrow-right";
import TourCard from "@/components/tour-card";
import { Tour } from "@/types/tour.type";
import { useTours } from "@/hooks/userTour";

const Packages = ({ tours }: { tours: Tour[] }) => {
  return (
    <LayoutSection link="#" title="Popular Tour Packages">
      <div className="w-full h-max relative">
        <Swiper
          slidesPerView={3}
          spaceBetween={102}
          breakpoints={{
            320: {
              slidesPerView: 1.2,
              spaceBetween: 4,
            },
            480: {
              slidesPerView: 1.5,
              spaceBetween: 20,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 24,
            },
            768: {
              slidesPerView: 2.5,
              spaceBetween: 28,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 102,
            },
          }}
          className="w-full h-full relative"
        >
          {tours?.map((item, i) => (
            <SwiperSlide key={i} className="p-3 !h-full relative">
              <TourCard wishlist={item} key={i} />
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
