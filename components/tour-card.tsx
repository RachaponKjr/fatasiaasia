import { Heart } from "lucide-react";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import LocationIcon from "@/assets/icons/location";
import Image from "next/image";

export interface TourCardProps {
  image: string;
  country: string;
  countrytitle: string;
  totalday: number;
  title: string;
  price: number;
}

const TourCard = ({
  image,
  country,
  countrytitle,
  totalday,
  title,
  price,
}: Partial<TourCardProps>) => {
  return (
    <div className="bg-white shadow-[0px_4px_20px_-3px_#000000]/25 h-full w-full rounded-3xl flex flex-col items-start overflow-hidden">
      {/* Image */}
      <div className="bg-neutral-200 w-full aspect-[16/14] rounded-3xl relative">
        <Image
          src={image || ""}
          alt={countrytitle || "images"}
          fill
          objectFit="cover"
          objectPosition="center"
          className="rounded-3xl"
        />
        <Heart
          className="absolute top-6 right-6 cursor-pointer"
          size={34}
          color="white"
        />
        <Avatar className="size-18 ring-4 ring-white absolute -bottom-6 left-8 !shadow-lg">
          <AvatarImage src={country} alt={countrytitle} />
          <AvatarFallback>{countrytitle}</AvatarFallback>
        </Avatar>
      </div>
      <div className="p-10 z-10">
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <div className="flex items-center gap-1 text-[#7D7D7D]">
              <LocationIcon size={24} />
              <span className="text-xs font-normal">{countrytitle}</span>
            </div>
            <div className="flex items-center gap-1 text-[#7D7D7D]">
              <LocationIcon size={24} />
              <span className="text-xs font-normal">{totalday} Days</span>
            </div>
          </div>
          <h2 className="font-bold text-[#2F2F2F] line-clamp-2">{title}</h2>
          <div className="text-[#7D7D7D] font-normal text-[13px] flex gap-2 mt-2">
            <h6>estimate</h6>
            <span className="text-sm font-medium text-[#2F2F2F]">${price}</span>
            <h6>/person</h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourCard;
