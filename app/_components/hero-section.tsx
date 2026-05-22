"use client";
import React, { useState, useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import banner from "@/assets/images/banner/herobanner.webp";
import halong2 from "@/assets/images/banner/halong2.webp";
import tajmahal from "@/assets/images/banner/tajmahal.webp";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, Users } from "lucide-react";

// Default bundled images. Admin overrides (from /site-images slot keys
// home.hero.slide1 … slide3) replace these one-for-one when provided.
const defaultImages: StaticImageData[] = [banner, halong2, tajmahal];

export type HeroSlideOverride = { url: string; alt?: string } | null;

const quotes = [
  "Explore hidden gems and iconic landmarks.",
  "Premium experiences tailored to your dreams.",
  "Your gateway to authentic Asian culture.",
  "Expert-Led Tours, Seamless Adventures.",
  "Discover the extraordinary in every destination.",
  "Travel with Confidence. Book with Style.",
  "Crafting perfect holidays just for you.",
  "Experience the magic of Asia with us.",
  "Curated journeys for the modern traveler.",
  "Create Your Unforgettable Asian Memory.",
];

type Props = {
  /** Optional admin overrides — one entry per default slide, same length. */
  slideOverrides?: HeroSlideOverride[];
  headline?: string;
  description?: string;
};

const HeroSection = ({ slideOverrides, headline, description }: Props = {}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [quoteIndex, setQuoteIndex] = useState(0);

  // Build the effective slide list: each entry is either an admin override
  // URL or the bundled StaticImageData default.
  const slides = defaultImages.map((def, i) => {
    const override = slideOverrides?.[i];
    return override?.url
      ? { kind: "remote" as const, src: override.url, alt: override.alt || `Hero Banner ${i + 1}` }
      : { kind: "static" as const, src: def, alt: `Hero Banner ${i + 1}` };
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [slides.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 4000); // Change quote every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full min-h-[876px] px-4 xl:px-0 flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
          >
            {slide.kind === "static" ? (
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority={index === 0}
                className="object-cover object-center"
                placeholder="blur"
              />
            ) : (
              // Remote (admin-uploaded) image: no static blur placeholder available.
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority={index === 0}
                className="object-cover object-center"
                unoptimized
              />
            )}
            <div className="absolute inset-0 bg-black/20" />
          </div>
        ))}
      </div>
      <div className="max-w-6xl flex flex-col items-center gap-6 md:gap-9 z-10 px-4">
        {/* Main Slogan - H1 for SEO */}
        <h1 className="text-white text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-center leading-tight">
          {headline || "No matter where you're going, we'll take you there."}
        </h1>

        {/* Social Proof */}
        <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 md:px-6 py-2 md:py-3 flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
          <div className="flex items-center">
            <Users className="w-4 h-4 md:w-5 md:h-5 text-white mr-2" />
            <span className="text-white font-semibold text-sm md:text-base">200+ travelers</span>
          </div>
          <span className="text-white/80 text-xs md:text-sm text-center sm:text-left">
            {description || "booked a tour in the last 24 hours."}
          </span>
        </div>

        {/* Avatar */}
        <div className="text-white flex flex-col lg:flex-row items-center font-medium gap-4 md:gap-6">
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
          <span
            key={quoteIndex}
            className="animate-in fade-in slide-in-from-bottom-2 duration-500 text-center xl:text-left"
          >
            {quotes[quoteIndex]}
          </span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
