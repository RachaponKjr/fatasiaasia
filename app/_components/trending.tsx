"use client";
import React, { useState } from "react";
import Link from "next/link";
import LayoutSection from "./layout-section";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import ArrowLeft from "@/assets/icons/arrow-left";
import ArrowRight from "@/assets/icons/arrow-right";

import thai from "@/assets/images/trending/thai.webp";
import laos from "@/assets/images/trending/laos.webp";
import vietnam from "@/assets/images/trending/vietnam.webp";
import india from "@/assets/images/trending/india.webp";
import { Tour } from "@/types/tour.type";

const Trending = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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
          className="w-full !overflow-visible"
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
        >
          {infoTrending.map((item, i) => (
            <SwiperSlide key={i} className="!overflow-visible">
              <Link href={`/destinations/country?country=${item.name}`}>
                <div
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={`bg-gray-200 aspect-[12/16] w-full relative overflow-hidden rounded-2xl p-8 flex bg-cover bg-center items-end transition-all duration-500 ease-out cursor-pointer shadow-lg
                  ${hoveredIndex === i
                      ? "scale-105 shadow-2xl z-10 ring-2 ring-white/50"
                      : hoveredIndex !== null
                        ? "scale-95 blur-[2px] opacity-50 grayscale-[0.3]"
                        : "hover:scale-105 hover:shadow-xl"
                    }
                `}
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
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </LayoutSection>
  );
};

export default Trending;
