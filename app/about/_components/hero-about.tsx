"use client";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import React from "react";
import Image from "next/image";

// image banner contry - optimized WebP format
import los from "@/assets/images/banner-country/laos.webp";
import brunei from "@/assets/images/banner-country/brunei.webp";
import india from "@/assets/images/banner-country/india.webp";
import indonesia from "@/assets/images/banner-country/indonesia.webp";
import malaysia from "@/assets/images/banner-country/malaysia.webp";
import singapore from "@/assets/images/banner-country/singapore.webp";
import uzbekistan from "@/assets/images/banner-country/uzbekistan.webp";
import vietnam from "@/assets/images/banner-country/vietnam.webp";
import thailandhero from "@/assets/images/destination/thailand-hero.webp";

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
  Cambodia: india.src, // TODO: Replace with proper Cambodia watercolor image
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
  // Check if this is a country page (watercolor images need size constraint)
  const isCountryPage = country && countryImages[country];

  return (
    <div className={cn("w-full relative", className)}>
      {/* Image container - full width, natural aspect ratio */}
      <div className="w-full relative">
        <img
          src={banner}
          alt={title || country || "Hero banner"}
          className="w-full h-auto block"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white from-5% to-transparent" />
      </div>
      {/* Title overlay */}
      <div className="absolute inset-0 flex justify-center items-center">
        <h1 className="font-bold text-3xl xl:text-6xl text-center text-[#333333] z-10 px-4">
          {title ? title : country}
        </h1>
      </div>
    </div>
  );
};

export default HeroLayout;

