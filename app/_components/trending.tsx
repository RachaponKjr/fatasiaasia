"use client";
import React from "react";
import LayoutSection from "./layout-section";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import ArrowLeft from "@/assets/icons/arrow-left";
import ArrowRight from "@/assets/icons/arrow-right";

import thai from "@/assets/images/trending/thai.jpg";
import laos from "@/assets/images/trending/laos.jpg";
import vietnam from "@/assets/images/trending/vietnam.jpg";
import india from "@/assets/images/trending/india.jpg";
import { Tour } from "@/types/tour.type";

const Trending = () => {
  const infoTrending = [
    {
      name: "Thailand",
      detail: "Railway Market & Damnoensaduak Floating Market",
      image: thai.src,
    },
    {
      name: "Vietnam",
      detail: "Hill Tribes of Northern Vietnam",
      image: vietnam.src,
    },
    {
      name: "Laos",
      detail: "The New & The Ancient Capital",
      image: laos.src,
    },
    {
      name: "India",
      detail: "Golden Triangle",
      image: india.src,
    },
  ];
  return (
    <LayoutSection link="/destinations" title="Trending Destinations">
      <div className="w-full h-max relative">
        <Swiper
          slidesPerView={4}
          spaceBetween={36}
          breakpoints={{
            320: {
              slidesPerView: 1.5,
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
              spaceBetween: 32,
            },
            1280: {
              slidesPerView: 4,
              spaceBetween: 36,
            },
          }}
          className="w-full"
        >
          {infoTrending.map((item, i) => (
            <SwiperSlide key={i}>
              <div
                className="bg-gray-200 aspect-[12/16] w-full relative overflow-hidden rounded-2xl p-8 flex bg-cover bg-center items-end"
                style={{
                  backgroundImage: `url(${item.image})`,
                }}
              >
                <div className="bg-gradient-to-b from-transparent to-black/80 from-60% w-full h-full absolute top-0 left-0" />
                <div className="text-white flex flex-col gap-1 z-10">
                  <h6 className="font-medium text-lg">{item.name}</h6>
                  <span className="font-light text-xs">{item.detail}</span>
                </div>
              </div>
            </SwiperSlide>
          ))}

          {/* {tour.map((item, i) => (
            <SwiperSlide key={i}>
              <div
                className="bg-gray-200 aspect-[12/16] w-full relative overflow-hidden rounded-2xl p-8 flex bg-cover bg-center items-end"
                style={{
                  backgroundImage: `url(${item.thumbnail})`,
                }}
              >
                <div className="bg-gradient-to-b from-transparent to-black/80 from-60% w-full h-full absolute top-0 left-0" />
                <div className="text-white flex flex-col gap-1 z-10">
                  <h6 className="font-medium text-lg">{item.country}</h6>
                  <span className="font-light text-xs">{item.title}</span>
                </div>
              </div>
            </SwiperSlide>
          ))} */}
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
