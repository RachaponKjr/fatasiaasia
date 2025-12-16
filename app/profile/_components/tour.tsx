'use client'
import React from "react";
import TourItem from "./tour-item";
import Image from "next/image";
import { MyBooking } from "@/types/booking.type";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { Plane, Calendar, ChevronRight } from "lucide-react";
import Link from "next/link";

import "swiper/css";

type Props = {
  myBooking?: MyBooking[];
};

const Tour = ({ myBooking = [] }: Props) => {
  return (
    <div id="tours" className="scroll-mt-24">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center">
            <Plane className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">My Bookings</h2>
            <p className="text-gray-500 text-sm">Your upcoming adventures</p>
          </div>
        </div>
        {myBooking.length > 0 && (
          <Link
            href="/profile/tour"
            className="text-[#BD3E2B] font-medium flex items-center gap-1 hover:underline"
          >
            View All <ChevronRight className="w-4 h-4" />
          </Link>
        )}
      </div>

      {/* Empty State */}
      {(!myBooking || myBooking.length === 0) ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-blue-50 flex items-center justify-center">
            <Plane className="w-10 h-10 text-blue-500" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Bookings Yet</h3>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            Start exploring our amazing tours and book your next adventure!
          </p>
          <Link
            href="/tours"
            className="inline-flex items-center gap-2 bg-[#BD3E2B] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#a5352a] transition-colors"
          >
            <Calendar className="w-5 h-5" />
            Explore Tours
          </Link>
        </div>
      ) : (
        <>
          {/* Desktop grid */}
          <div className="hidden md:grid grid-cols-3 gap-6">
            {myBooking.slice(0, 6).map((item, index) => (
              <TourItem key={index} booking={item} />
            ))}
          </div>

          {/* Mobile Swiper */}
          <div className="block md:hidden">
            <Swiper
              spaceBetween={16}
              slidesPerView={1.2}
              breakpoints={{
                480: { slidesPerView: 1.5, spaceBetween: 16 },
                640: { slidesPerView: 2, spaceBetween: 16 },
              }}
            >
              {myBooking.map((item, index) => (
                <SwiperSlide key={index}>
                  <TourItem booking={item} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </>
      )}
    </div>
  );
};

export default Tour;
