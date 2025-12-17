"use client";
import React from "react";
import LayoutSection from "./layout-section";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

import "swiper/css";
import ArrowLeft from "@/assets/icons/arrow-left";
import ArrowRight from "@/assets/icons/arrow-right";
import { Tour } from "@/types/tour.type";
import TourCard from "@/components/tour-card";

const BeachPackages = ({ tours }: { tours: Tour[] }) => {
  // If no beach tours, don't show the section
  if (!tours || tours.length === 0) return null;

  // Duplicate tours to ensure enough items for looping
  const displayTours = [...tours, ...tours];

  return (
    <LayoutSection link="/beach-tours" title="Beach Tour Packages">
      <div className="w-full h-max relative group">
        <Swiper
          modules={[Autoplay, Navigation]}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          navigation={{
            nextEl: ".beach-next",
            prevEl: ".beach-prev",
          }}
          slidesPerView={3}
          spaceBetween={30}
          breakpoints={{
            320: {
              slidesPerView: 1.2,
              spaceBetween: 16,
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
              spaceBetween: 30,
            },
          }}
          className="w-full h-full relative"
        >
          {displayTours.map((item, i) => (
            <SwiperSlide key={`${item.tourId}-${i}`} className="p-3 !h-full relative">
              <TourCard wishlist={item} />
            </SwiperSlide>
          ))}
        </Swiper>
        {/* Prev Button */}
        <div className="beach-prev absolute top-1/2 -translate-y-1/2 -left-12 -translate-x-1/2 w-14 aspect-square rounded-full bg-[#FFF3E1] grid place-content-center cursor-pointer shadow-md z-10 hover:scale-110 transition-transform">
          <ArrowLeft size={28} />
        </div>

        {/* Next Button */}
        <div className="beach-next absolute top-1/2 -translate-y-1/2 -right-12 translate-x-1/2 w-14 aspect-square rounded-full bg-[#FFF3E1] grid place-content-center cursor-pointer shadow-md z-10 hover:scale-110 transition-transform">
          <ArrowRight size={28} />
        </div>
      </div>
    </LayoutSection>
  );
};

export default BeachPackages;
