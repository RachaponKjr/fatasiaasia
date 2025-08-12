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
    <div className="container mx-auto flex flex-col items-start gap-4">
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
        <span className="font-bold text-black text-[10px]">Testimonials</span>
      </div>
      <div className="flex gap-12 w-full">
        <div className="min-w-md flex flex-col gap-4 ">
          <h3 className="font-bold text-[40px] text-[#333333] leading-tight">
            What our clients are saying about us?
          </h3>
          <p>
            Discover how you can offset your adventure's carbon emissions and
            support the sustainable initiatives practiced by our operators
            worldwide.
          </p>
        </div>
        <div className="w-full">
          <Swiper slidesPerView={3} loop spaceBetween={25}>
            {Array.from({ length: 5 }).map((_, i) => (
              <SwiperSlide className="p-2">
                <div className="p-8 bg-white rounded-3xl min-h-[240px] max-h-[240px] shadow-[0px_3px_10px_0px_rgba(0,_0,_0,_0.1)]">
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar className="size-13">
                        <AvatarFallback>M</AvatarFallback>
                      </Avatar>
                      <div className="text-black leading-none">
                        <h6 className="text-sm font-bold">Sara Mohamed</h6>
                        <span className="font-medium text-[11px]">Jakatar</span>
                      </div>
                    </div>
                    <div className="flex items-end gap-[1px]">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star color="#FFC700" fill="#FFC700" size={10} />
                      ))}
                    </div>
                  </div>
                  {/* Divider */}
                  <div className="w-full h-[1px] bg-[#E4E6E8] my-6" />
                  <p className="text-xs text-[#737373] leading-relaxed">
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
      <div className="flex justify-end w-full gap-4 relative mt-4">
        {/* Prev Button (ซ้าย) */}
        <div className="w-14 aspect-square rounded-full bg-[#FFF3E1] grid place-content-center cursor-pointer shadow-md">
          <ArrowLeft size={28} />
        </div>

        {/* Next Button (ขวา) */}
        <div className="w-14 aspect-square rounded-full bg-[#FFF3E1] grid place-content-center cursor-pointer shadow-md">
          <ArrowRight size={28} />
        </div>
      </div>
      <div className="w-full mt-14">
        <HereHelp />
      </div>
    </div>
  );
};

export default Client;
