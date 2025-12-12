"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useTours } from "@/hooks/userTour";

const ContryCard = ({ country, image }: { country: string; image: string }) => {
  const router = useRouter();
  const { tours, loading } = useTours();
  const [tourCount, setTourCount] = useState<number>(0);

  useEffect(() => {
    if (!loading && tours.length > 0) {
      // Count tours for this country
      const countryTours = tours.filter((tour) => {
        // Check if tour's country matches (case-insensitive)
        return tour.country?.toLowerCase() === country.toLowerCase();
      });
      setTourCount(countryTours.length);
    }
  }, [tours, loading, country]);

  return (
    <div
      onClick={() => router.push(`/destinations/country?country=${country}`)}
      className="w-full cursor-pointer aspect-[13/16] bg-center bg-cover bg-neutral-300 rounded-xl xl:rounded-3xl px-2 py-6 xl:p-8 flex items-end relative overflow-hidden group"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_top,_#100C08CC_0%,_transparent_20%)] group-hover:bg-[linear-gradient(to_top,_#100C08DD_0%,_transparent_30%)] transition-all"></div>

      {/* Tour count badge - only show if there are tours */}
      {tourCount > 0 && (
        <div className="bg-gradient-to-r from-[#FFBA0A] to-[#DF6951] rounded-full absolute px-3 py-0.5 flex items-center top-5 right-5">
          <span className="font-medium text-sm text-white">
            {tourCount} {tourCount === 1 ? "Tour" : "Tours"}
          </span>
        </div>
      )}

      {/* Loading state */}
      {loading && (
        <div className="bg-gray-500/50 rounded-full absolute px-3 py-0.5 flex items-center top-5 right-5 animate-pulse">
          <span className="font-medium text-sm text-white">...</span>
        </div>
      )}

      <div className="flex flex-col z-10">
        <span className="text-[#EFB933] font-medium text-sm xl:text-lg leading-none">
          Travel To
        </span>
        <h4 className="font-medium text-2xl xl:text-4xl text-[#FFFFFF] leading-none">
          {country}
        </h4>
      </div>
    </div>
  );
};

export default ContryCard;
