"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import TourCard from "@/components/tour-card";
import { Tour } from "@/types/tour.type";
import { Heart, ChevronRight, Compass } from "lucide-react";
import Link from "next/link";

import "swiper/css";

type Props = {
  wishlist?: Tour[];
};

const WishList = ({ wishlist = [] }: Props) => {
  return (
    <div id="wishlist" className="scroll-mt-24">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-pink-500 flex items-center justify-center">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Wishlist</h2>
            <p className="text-gray-500 text-sm">Tours you've saved for later</p>
          </div>
        </div>
        {wishlist.length > 0 && (
          <Link
            href="/profile/wishlist"
            className="text-[#BD3E2B] font-medium flex items-center gap-1 hover:underline"
          >
            View All <ChevronRight className="w-4 h-4" />
          </Link>
        )}
      </div>

      {/* Empty State */}
      {(!wishlist || wishlist.length === 0) ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-pink-50 flex items-center justify-center">
            <Heart className="w-10 h-10 text-pink-500" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Your Wishlist is Empty</h3>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            Save tours you love by clicking the heart icon. They'll appear here for easy access!
          </p>
          <Link
            href="/tours"
            className="inline-flex items-center gap-2 bg-[#BD3E2B] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#a5352a] transition-colors"
          >
            <Compass className="w-5 h-5" />
            Discover Tours
          </Link>
        </div>
      ) : (
        <>
          {/* Desktop grid */}
          <div className="hidden md:grid grid-cols-3 gap-6">
            {wishlist.slice(0, 6).map((item, index) => (
              <TourCard key={index} wishlist={item} />
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
              {wishlist.map((item, index) => (
                <SwiperSlide key={index}>
                  <TourCard wishlist={item} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </>
      )}
    </div>
  );
};

export default WishList;
