"use client";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import React from "react";

// image banner contry
import los from "@/assets/images/banner-country/laos.png";
import brunei from "@/assets/images/banner-country/brunei.png";
import india from "@/assets/images/banner-country/india.png";
import indonesia from "@/assets/images/banner-country/indonesia.png";
import malaysia from "@/assets/images/banner-country/malaysia.png";
import singapore from "@/assets/images/banner-country/singapore.png";
import uzbekistan from "@/assets/images/banner-country/uzbekistan.png";
import vietnam from "@/assets/images/banner-country/vietnam.png";
import thailandhero from "@/assets/images/destination/thailand-hero.png";

const countryImages: Record<string, string> = {
  Laos: los.src,
  Brunei: brunei.src,
  India: india.src,
  Indonesia: indonesia.src,
  Malaysia: malaysia.src,
  Singapore: singapore.src,
  Uzbekistan: uzbekistan.src,
  Vietnam: vietnam.src,
  Thailand: thailandhero.src,
  // Cambodia:
};

const HeroLayout = ({
  image,
  title,
  className,
}: {
  image?: string;
  title?: string;
  className?: string;
}) => {
  const param = useSearchParams();
  const country = param.get("country");
  const banner =
    country && countryImages[country] ? countryImages[country] : image;
  return (
    <div
      className={cn(
        "w-full aspect-[16/8] xl:aspect-[16/5] bg-center bg-cover flex justify-center items-center relative",
        className
      )}
      style={{ backgroundImage: `url(${banner})` }}
    >
      <div className="w-full h-full bg-gradient-to-b from-white from-5% to-transparent absolute" />
      <h1 className="font-bold text-3xl xl:text-6xl text-center text-[#333333] z-10">
        {title ? title : `${country} Tour & Trips`}
      </h1>
    </div>
  );
};

export default HeroLayout;
