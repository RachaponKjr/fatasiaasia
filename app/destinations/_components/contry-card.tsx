"use client";
import { useRouter } from "next/navigation";
import React from "react";

const ContryCard = ({ country, image }: { country: string; image: string }) => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/destinations/country?country=${country}`)}
      className="w-full cursor-pointer aspect-[13/16] bg-center bg-cover bg-neutral-300 rounded-xl xl:rounded-3xl px-2 py-6 xl:p-8 flex items-end relative overflow-hidden"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_top,_#100C08CC_0%,_transparent_20%)]"></div>
      <div className="bg-gradient-to-r from-[#FFBA0A] to-[#DF6951] rounded-full absolute px-3 py-0.5 flex items-center top-5 right-5">
        <span className="font-medium text-sm text-white">21 Tour</span>
      </div>
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
