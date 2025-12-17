"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import ArrowLeft from "@/assets/icons/arrow-left";
import ArrowRight from "@/assets/icons/arrow-right";
import TourCard from "@/components/tour-card";
import LayoutSection from "@/app/_components/layout-section";

import "swiper/css";
import "swiper/css/navigation";

import { useTours } from "@/hooks/userTour";

const AlsoLike = () => {
  const { tours, loading } = useTours();
  if (loading) return null;

  return (
    <LayoutSection link="/tours" title="You might also like...">
      <div className="w-full h-auto relative">
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={30}
          slidesPerView={3}
          loop={tours.length > 3}
          autoHeight={false}
          watchSlidesProgress={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          navigation={{
            nextEl: ".alsolike-next",
            prevEl: ".alsolike-prev",
          }}
          breakpoints={{
            0: {
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
          {tours.map((item, i) => (
            <SwiperSlide key={i} className="p-3 !h-full relative">
              <TourCard wishlist={item} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Prev Button (left) */}
        <div className="alsolike-prev absolute hidden top-1/2 -translate-y-1/2 -left-12 -translate-x-1/2 w-14 aspect-square rounded-full bg-[#FFF3E1] md:grid place-content-center cursor-pointer shadow-md z-10 hover:bg-[#FFE5C4] transition-colors">
          <ArrowLeft size={28} />
        </div>

        {/* Next Button (right) */}
        <div className="alsolike-next absolute hidden top-1/2 -translate-y-1/2 -right-12 translate-x-1/2 w-14 aspect-square rounded-full bg-[#FFF3E1] md:grid place-content-center cursor-pointer shadow-md z-10 hover:bg-[#FFE5C4] transition-colors">
          <ArrowRight size={28} />
        </div>
      </div>
    </LayoutSection>
  );
};

export default AlsoLike;
