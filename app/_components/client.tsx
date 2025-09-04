"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import { Star } from "lucide-react";
import ArrowLeft from "@/assets/icons/arrow-left";
import ArrowRight from "@/assets/icons/arrow-right";
import HereHelp from "./here-help";

const Client = () => {
  return (
    <div className="container mx-auto flex flex-col items-start gap-6 px-4 sm:px-6 lg:px-8 xl:px-0">
      {/* Testimonials Badge */}
      <div className="border border-[#E4E6E8] rounded-full p-2 flex items-center gap-2">
        <div className="*:data-[slot=avatar]:ring-background *:data-[slot=avatar]:size-6 flex -space-x-2 *:data-[slot=avatar]:ring-3">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage src="https://github.com/leerob.png" alt="@leerob" />
            <AvatarFallback>LR</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage
              src="https://github.com/evilrabbit.png"
              alt="@evilrabbit"
            />
          </Avatar>
        </div>
        <span className="font-bold text-black text-[10px] sm:text-xs">
          Testimonials
        </span>
      </div>

      {/* Header Section */}
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 w-full">
        <div className="flex flex-col gap-4 lg:min-w-md">
          <h3 className="font-bold text-2xl sm:text-3xl lg:text-[40px] text-[#333333] leading-tight">
            What our clients are saying about us?
          </h3>
          <p className="text-sm sm:text-base text-gray-600 max-w-lg">
            Discover how you can offset your adventure's carbon emissions and
            support the sustainable initiatives practiced by our operators
            worldwide.
          </p>
        </div>

        {/* Testimonials Swiper */}
        <div className="w-full lg:flex-1">
          <Swiper
            loop
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 2.5,
                spaceBetween: 25,
              },
              1280: {
                slidesPerView: 2.5,
                spaceBetween: 25,
              },
            }}
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <SwiperSlide key={i} className="p-2">
                <div className="p-6 sm:p-8 bg-white rounded-3xl min-h-[240px] max-h-[280px] sm:max-h-[240px] shadow-[0px_3px_10px_0px_rgba(0,_0,_0,_0.1)]">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <Avatar className="size-10 sm:size-12">
                        <AvatarFallback className="text-sm">M</AvatarFallback>
                      </Avatar>
                      <div className="text-black leading-tight">
                        <h6 className="text-sm sm:text-base font-bold">
                          Sara Mohamed
                        </h6>
                        <span className="font-medium text-[11px] sm:text-xs text-gray-500">
                          Jakatar
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-[1px]">
                      {Array.from({ length: 5 }).map((_, starIndex) => (
                        <Star
                          key={starIndex}
                          color="#FFC700"
                          fill="#FFC700"
                          size={10}
                          className="sm:w-3 sm:h-3"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="w-full h-[1px] bg-[#E4E6E8] my-4 sm:my-6" />

                  <p className="text-xs sm:text-sm text-[#737373] leading-relaxed line-clamp-4">
                    I've been using the hotel booking system for several years
                    now, and it's become my go-to platform for planning my
                    trips. The interface is user-friendly, and I appreciate the
                    detailed information and real-time availability of hotels.
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-center sm:justify-end w-full gap-3 sm:gap-4 relative mt-4">
        {/* Prev Button */}
        <div className="w-12 sm:w-14 aspect-square rounded-full bg-[#FFF3E1] grid place-content-center cursor-pointer shadow-md hover:bg-[#FFE8CC] transition-colors">
          <ArrowLeft size={20} />
        </div>

        {/* Next Button */}
        <div className="w-12 sm:w-14 aspect-square rounded-full bg-[#FFF3E1] grid place-content-center cursor-pointer shadow-md hover:bg-[#FFE8CC] transition-colors">
          <ArrowRight size={20} />
        </div>
      </div>

      {/* Help Section */}
      <div className="w-full mt-8 sm:mt-12 lg:mt-14">
        <HereHelp />
      </div>
    </div>
  );
};

export default Client;
