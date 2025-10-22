"use client";
import React, { useCallback, useEffect, useState } from "react";
import LayoutSection from "./layout-section";
import { Swiper, SwiperSlide } from "swiper/react";
import ArrowLeft from "@/assets/icons/arrow-left";
import ArrowRight from "@/assets/icons/arrow-right";
// import TourCard, { TourCardProps } from "@/components/tour-card";

import thai from "@/assets/images/country/thai.png";
import indo from "@/assets/images/country/indo.png";

import tourthai1 from "@/assets/images/tour/tourthai1.jpg";
import tourthai2 from "@/assets/images/tour/tourthai2.jpg";
import tourindo1 from "@/assets/images/tour/tourindo1.jpg";
import api from "@/server";
import TourCard from "@/components/tour-card";
import { Tour } from "@/types/tour.type";

const Packages = () => {
  const [tour, setTour] = useState<Tour[]>()

  const getTours = useCallback(async () => {
    const res = await api.tour.getTour()
    if (res.code === 2000) {
      setTour(res.data)
      return
    } else {
      console.error('can not get tour!')
      return
    }
  }, [])

  useEffect(() => {
    void getTours()
  }, [])

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
          {tour?.map((item, i) => (
            <SwiperSlide key={i} className="p-3 relative">

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
