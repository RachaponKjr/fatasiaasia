"use client";
import { Heart } from "lucide-react";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import LocationIcon from "@/assets/icons/location";
import Image from "next/image";
import Link from "next/link";
import { Tour } from "@/types/tour.type";
import { useWishlist } from "@/hooks/useWishlist";

const TourCard = ({ wishlist }: { wishlist: Tour }) => {
  const {
    wishlist: wishlists,
    addToWishlist,
    removeFromWishlist,
  } = useWishlist();

  // เช็คว่า tour นี้อยู่ใน wishlist หรือยัง
  const isInWishlist = wishlists.some((w) => w.tourId === wishlist.tourId);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault(); // กันไม่ให้ Link ทำงานเมื่อกด Heart
    if (isInWishlist) {
      removeFromWishlist(wishlist.tourId);
    } else {
      addToWishlist(wishlist.tourId);
    }
  };

  return (
    <Link
      href={`/tours/${wishlist.tourId}`}
      className="bg-white shadow-[0px_4px_20px_-3px_#000000]/25 h-full w-full rounded-xl xl:rounded-3xl flex flex-col items-start overflow-hidden"
    >
      {/* Image */}
      <div className="bg-neutral-200 w-full aspect-[16/14] rounded-xl xl:rounded-3xl relative">
        <Image
          src={wishlist.thumbnail || ""}
          alt={wishlist.country || "images"}
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
          className="rounded-xl xl:rounded-3xl"
        />
        <Heart
          onClick={handleWishlistToggle}
          className="absolute top-6 right-6 cursor-pointer"
          size={34}
          fill={isInWishlist ? "red" : "transparent"}
          color={isInWishlist ? "red" : "white"}
        />
        <Avatar className="size-12 xl:size-18 ring-4 ring-white absolute -bottom-2 xl:-bottom-6 left-4 xl:left-8 !shadow-lg">
          <AvatarImage src={wishlist.country} alt={wishlist.title} />
          <AvatarFallback>{wishlist.country}</AvatarFallback>
        </Avatar>
      </div>
      <div className="p-4 xl:p-10 z-10">
        <div className="flex flex-col gap-2 xl:gap-4">
          <div className="flex gap-4">
            <div className="flex items-center gap-1 text-[#7D7D7D]">
              <LocationIcon size={24} />
              <span className="text-[10px] xl:text-xs font-normal">
                {wishlist.title}
              </span>
            </div>
            <div className="flex items-center gap-1 text-[#7D7D7D]">
              <LocationIcon size={24} />
              <span className="text-[10px] xl:text-xs font-normal">
                {wishlist.itinerariesDays} Days
              </span>
            </div>
          </div>
          <h2 className="font-bold text-[#2F2F2F] text-xs xl:text-base line-clamp-2">
            {wishlist.title}
          </h2>
          <div className="text-[#7D7D7D] font-normal text-[13px] flex gap-2 mt-2">
            <h6>estimate</h6>
            <span className="text-sm font-medium text-[#2F2F2F]">
              ${wishlist.estimateCostPerPerson}
            </span>
            <h6>/person</h6>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TourCard;
