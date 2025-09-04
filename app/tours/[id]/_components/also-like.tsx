"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import ArrowLeft from "@/assets/icons/arrow-left";
import ArrowRight from "@/assets/icons/arrow-right";
import TourCard, { TourCardProps } from "@/components/tour-card";
import LayoutSection from "@/app/_components/layout-section";

import "swiper/css";

import thai from "@/assets/images/country/thai.png";
import indo from "@/assets/images/country/indo.png";

import tourthai1 from "@/assets/images/tour/tourthai1.jpg";
import tourthai2 from "@/assets/images/tour/tourthai2.jpg";
import tourindo1 from "@/assets/images/tour/tourindo1.jpg";
const AlsoLike = () => {
  const packagesInfo: TourCardProps[] = [
    {
      country: thai.src,
      countrytitle: "Thailand",
      image: tourthai1.src,
      price: 771,
      title: "Unveiled Bangkok and Northern Thailand",
      totalday: 10,
    },
    {
      country: indo.src,
      countrytitle: "Indonesia",
      image: tourindo1.src,
      price: 771,
      title: "Enchanting Indonesia from Ancient Temples to Pristine Islands",
      totalday: 10,
    },
    {
      country: thai.src,
      countrytitle: "Thailand",
      image: tourthai2.src,
      price: 771,
      title: "4 island tour by speed boat in krabi",
      totalday: 10,
    },
    {
      country: thai.src,
      countrytitle: "Thailand",
      image: tourthai1.src,
      price: 771,
      title: "Unveiled Bangkok and Northern Thailand",
      totalday: 10,
    },
    {
      country: indo.src,
      countrytitle: "Indonesia",
      image: tourindo1.src,
      price: 771,
      title: "Enchanting Indonesia from Ancient Temples to Pristine Islands",
      totalday: 10,
    },
    {
      country: thai.src,
      countrytitle: "Thailand",
      image: tourthai2.src,
      price: 771,
      title: "4 island tour by speed boat in krabi",
      totalday: 10,
    },
  ];
  return (
    <LayoutSection link="#" title="You might also like...">
      <div className="w-full h-max relative">
        <Swiper slidesPerView={3} spaceBetween={100} className="w-full">
          {packagesInfo.map((item, i) => (
            <SwiperSlide key={i} className="p-3">
              <TourCard
                country={item.country}
                countrytitle={item.countrytitle}
                image={item.image}
                price={item.price}
                title={item.title}
                totalday={item.totalday}
              />
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

export default AlsoLike;
