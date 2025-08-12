"use client";
import React from "react";
import LayoutSection from "./layout-section";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import ArrowLeft from "@/assets/icons/arrow-left";
import ArrowRight from "@/assets/icons/arrow-right";
import { Heart, Star } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import LocationIcon from "@/assets/icons/location";
import { Button } from "@/components/ui/button";
const BeachPackages = () => {
  return (
    <LayoutSection link="#" title="Trending Destinations">
      <div className="w-full h-max relative">
        <Swiper slidesPerView={4} spaceBetween={36} className="w-full">
          {Array.from({ length: 5 }).map((_, i) => (
            <SwiperSlide key={i}>
              <div className="bg-white h-max w-full rounded-3xl flex flex-col items-start overflow-hidden">
                {/* Image */}
                <div className="bg-neutral-200 w-full aspect-[16/14] rounded-3xl relative">
                  <Heart
                    className="absolute top-6 right-6 cursor-pointer"
                    size={34}
                    color="white"
                  />
                  <Avatar className="size-18 ring-4 ring-white absolute -bottom-6 left-8">
                    <AvatarFallback>M</AvatarFallback>
                  </Avatar>
                </div>
                <div className="py-10 px-6">
                  <div className="flex flex-col items-start gap-4">
                    <div className="flex items-center gap-1 text-[#7D7D7D]">
                      <LocationIcon size={24} />
                      <span className="text-xs font-normal">Thailand</span>
                    </div>
                    <h2 className="font-bold text-[#2F2F2F]">
                      Unveiled Bangkok and Northern Thailand
                    </h2>
                    <div className="text-[#7D7D7D] font-normal text-[13px] flex items-center gap-4 mt-2">
                      <h6>From</h6>
                      <span className="text-sm font-medium text-[#2F2F2F]">
                        $771
                      </span>
                      <h6>Ratings 13</h6>
                      <div className="flex items-center">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star color="#FFBA0A" fill="#FFBA0A" size={14} />
                        ))}
                      </div>
                    </div>
                    <Button className="text-white text-xs bg-gradient-to-r py-6 px-12 rounded-full from-[#FFBA0A] to-[#DF6951] cursor-pointer mt-2">
                      Available
                    </Button>
                  </div>
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

export default BeachPackages;
