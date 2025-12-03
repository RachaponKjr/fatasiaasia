"use client";
import { Heart } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import LocationIcon from "@/assets/icons/location";
import Image from "next/image";
import Link from "next/link";
import { Tour } from "@/types/tour.type";
import { useWishlist } from "@/hooks/useWishlist";
import Cookies from "js-cookie";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import FormLogin from "@/app/(auth)/login/_components/form-login";

import thai from "@/assets/images/country/thai.png";
import Cambodia from "@/assets/images/country/Cambodia.svg";
import India from "@/assets/images/country/India.svg";
import Laos from "@/assets/images/country/Laos.svg";
import Malaysia from "@/assets/images/country/Malaysia.svg";
import Myanmar from "@/assets/images/country/Myanmar.svg";
import Vietnam from "@/assets/images/country/Vietnam.png";
import ingapore from "@/assets/images/country/ingapore.svg";
import indo from "@/assets/images/country/indo.png";
import { formatNumber } from "@/utils/format";

const TourCard = ({ wishlist }: { wishlist: Tour }) => {
  const {
    wishlist: wishlists,
    addToWishlist,
    removeFromWishlist,
  } = useWishlist();
  const [countryImage, setCountryImage] = useState<string>(thai.src);
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Prevent Dialog from rendering during SSR to avoid hydration errors
  useEffect(() => {
    setMounted(true);
  }, []);

  // เช็คว่า tour นี้อยู่ใน wishlist หรือยัง
  const isInWishlist = useMemo(
    () => wishlists.some((w) => w.tourId === wishlist.tourId),
    [wishlists, wishlist.tourId]
  );

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault(); // กันไม่ให้ Link ทำงานเมื่อกด Heart
    e.stopPropagation(); // ป้องกันไม่ให้ event ไปที่ parent Link

    // Check if user is logged in
    const accessToken = Cookies.get("access_token");

    if (!accessToken) {
      // Show login dialog if not authenticated
      setLoginDialogOpen(true);
      return;
    }

    // Toggle wishlist if authenticated
    if (isInWishlist) {
      removeFromWishlist(wishlist.tourId);
    } else {
      addToWishlist(wishlist.tourId);
    }
  };

  useEffect(() => {
    switch (wishlist.country?.toLowerCase()) {
      case "thailand":
        setCountryImage(thai.src);
        break;
      case "cambodia":
        setCountryImage(Cambodia.src);
        break;
      case "india":
        setCountryImage(India.src);
        break;
      case "singapore":
        setCountryImage(ingapore.src);
        break;
      case "laos":
        setCountryImage(Laos.src);
      case "malaysia":
        setCountryImage(Malaysia.src);
        break;
      case "myanmar":
        setCountryImage(Myanmar.src);
        break;
      case "vietnam":
        setCountryImage(Vietnam.src);
        break;
      case "indonesia":
        setCountryImage(indo.src);
        break;
      default:
        setCountryImage(thai.src); // default
        break;
    }
  }, [wishlist.country]);

  return (
    <>
      <Link
        href={`/tours/${wishlist.tourId}`}
        className="bg-white shadow-[0px_4px_20px_-3px_#000000]/25 w-full rounded-xl xl:rounded-3xl flex flex-col items-start overflow-hidden"
      >
        {/* Image */}
        <div className="bg-neutral-200 w-full aspect-[16/14] rounded-xl xl:rounded-3xl relative">
          {wishlist.thumbnail ? (
            <Image
              src={wishlist.thumbnail}
              alt={wishlist.country || "images"}
              fill
            />
          ) : null}
          <Heart
            onClick={handleWishlistToggle}
            className="absolute top-6 right-6 cursor-pointer"
            size={34}
            fill={isInWishlist ? "red" : "transparent"}
            color={isInWishlist ? "red" : "white"}
          />
          <Avatar className="size-12 xl:size-18 ring-4 ring-white absolute -bottom-2 xl:-bottom-6 left-4 xl:left-8 !shadow-lg">
            <AvatarImage
              src={countryImage}
              alt={wishlist.title}
              className="object-cover"
            />
            <AvatarFallback>{wishlist.country}</AvatarFallback>
          </Avatar>
        </div>
        <div className="p-4 xl:p-10 z-10">
          <div className="flex flex-col gap-2 xl:gap-4">
            <div className="flex gap-4">
              <div className="flex items-center gap-1 text-[#7D7D7D]">
                <LocationIcon size={24} />
                <span className="text-[10px] line-clamp-1 xl:text-xs font-normal">
                  {wishlist.country}
                </span>
              </div>
              <div className="flex items-center gap-1 text-[#7D7D7D]">
                <LocationIcon size={24} />
                <span className="text-[10px] text-nowrap xl:text-xs font-normal">
                  {wishlist.itinerariesDays} Days
                </span>
              </div>
            </div>
            <h2 className="font-bold flex-1 text-[#2F2F2F] text-xs xl:text-base line-clamp-2">
              {wishlist.title}
            </h2>
            <div className="text-[#7D7D7D] font-normal text-[13px] flex gap-2 mt-2">
              <h6>estimate</h6>
              <span className="text-sm font-medium text-[#2F2F2F]">
                ${formatNumber(wishlist.estimateCostPerPerson)}
              </span>
              <h6>/person</h6>
            </div>
          </div>
        </div>
      </Link>

      {/* Login Dialog - Only render on client to prevent hydration errors */}
      {mounted && (
        <Dialog open={loginDialogOpen} onOpenChange={setLoginDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-center">
                Login Required
              </DialogTitle>
              <p className="text-center text-sm text-gray-600 mt-2">
                Please login to add tours to your wishlist
              </p>
            </DialogHeader>
            <FormLogin />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default TourCard;
