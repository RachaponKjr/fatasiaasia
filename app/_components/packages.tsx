"use client";
import React from "react";
import LayoutSection from "./layout-section";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import ArrowLeft from "@/assets/icons/arrow-left";
import ArrowRight from "@/assets/icons/arrow-right";
import TourCard from "@/components/tour-card";
import { Tour } from "@/types/tour.type";

const Packages = ({ tours }: { tours: Tour[] }) => {
  // Duplicate tours to ensure enough items for looping and "add more" feel
  const displayTours = tours ? [...tours, ...tours] : [];

  return (
    <LayoutSection link="/tours?category=popular" title="Popular Tour Packages">
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
            nextEl: ".package-next",
            prevEl: ".package-prev",
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
            <SwiperSlide key={i} className="p-3 !h-full relative">
              <TourCard wishlist={item} key={i} />
            </SwiperSlide>
          ))}
        </Swiper>
        {/* Prev Button (ซ้าย) */}
        <div className="package-prev absolute top-1/2 -translate-y-1/2 -left-12 -translate-x-1/2 w-14 aspect-square rounded-full bg-[#FFF3E1] grid place-content-center cursor-pointer shadow-md z-10 hover:scale-110 transition-transform">
          <ArrowLeft size={28} />
        </div>

        {/* Next Button (ขวา) */}
        <div className="package-next absolute top-1/2 -translate-y-1/2 -right-12 translate-x-1/2 w-14 aspect-square rounded-full bg-[#FFF3E1] grid place-content-center cursor-pointer shadow-md z-10 hover:scale-110 transition-transform">
          <ArrowRight size={28} />
        </div>
      </div>
    </LayoutSection>
  );
};

export default Packages;
