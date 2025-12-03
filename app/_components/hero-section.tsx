"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import banner from "@/assets/images/banner/herobanner.jpg";
import halong from "@/assets/images/banner/halong.jpg";
import tajmahal from "@/assets/images/banner/tajmahal.jpg";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus } from "lucide-react";

const images = [banner, halong, tajmahal];

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full min-h-[876px] px-4 xl:px-0 flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        {images.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
          >
            <Image
              src={img}
              alt={`Hero Banner ${index + 1}`}
              fill
              priority={index === 0}
              className="object-cover object-center"
              placeholder="blur"
            />
            <div className="absolute inset-0 bg-black/20" />
          </div>
        ))}
      </div>
      <div className="max-w-6xl flex flex-col items-center gap-9 z-10">
        <h2 className="text-white text-2xl xl:text-7xl font-bold text-center">
          No matter where you’re going to, we’ll take you there
        </h2>

        {/* Search */}
        {/* <SearchComponent /> */}

        {/* Avatar */}
        <div className="text-white flex flex-col xl:flex-row items-center font-medium gap-6">
          <div className="*:data-[slot=avatar]:ring-background *:data-[slot=avatar]:size-10 flex -space-x-2 *:data-[slot=avatar]:ring-3">
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
            <Avatar>
              <AvatarFallback className="!bg-[#BD3E2B]">
                <Plus color="white" size={18} />
              </AvatarFallback>
            </Avatar>
          </div>
          <span>200 people booked Tour in last 24 hours</span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
