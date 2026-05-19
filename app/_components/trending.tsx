"use client";
import React, { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import LayoutSection from "./layout-section";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperClass } from "swiper";

import "swiper/css";
import "swiper/css/autoplay";

import thai from "@/assets/images/trending/thai.webp";
import laos from "@/assets/images/trending/laos.webp";
import vietnam from "@/assets/images/trending/vietnam.webp";
import india from "@/assets/images/trending/india.webp";

type TrendingItem = {
  name: string;
  detail: string;
  image: string;
};

const FALLBACK_ITEMS: TrendingItem[] = [
  { name: "Thailand", detail: "Railway Market & Damnoensaduak Floating Market", image: thai.src },
  { name: "Vietnam", detail: "Hill Tribes of Northern Vietnam", image: vietnam.src },
  { name: "Laos", detail: "The New & The Ancient Capital", image: laos.src },
  { name: "India", detail: "Golden Triangle", image: india.src },
];

type AdminDestination = {
  name: string;
  title?: string;
  description?: string;
  cardImageUrl?: string;
  coverImageUrl?: string;
};

interface TrendingProps {
  destinations?: AdminDestination[];
}

type TransitionState = {
  item: TrendingItem;
  rect: { top: number; left: number; width: number; height: number };
  href: string;
};

const Trending = ({ destinations }: TrendingProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const swiperRef = useRef<SwiperClass | null>(null);
  const router = useRouter();
  const [transition, setTransition] = useState<TransitionState | null>(null);
  const [phase, setPhase] = useState<"start" | "full">("start");

  const items: TrendingItem[] = useMemo(() => {
    if (!destinations || destinations.length === 0) return FALLBACK_ITEMS;
    const mapped = destinations
      .map((d) => ({
        name: d.name,
        detail: d.title || d.description || "",
        image: d.cardImageUrl || d.coverImageUrl || "",
      }))
      .filter((d) => d.image);
    return mapped.length > 0 ? mapped : FALLBACK_ITEMS;
  }, [destinations]);

  // Marquee needs enough slides to look continuous when looping. Duplicate
  // small lists so the autoplay scroll doesn't visibly snap.
  const marqueeItems = useMemo(() => {
    if (items.length >= 8) return items;
    const copies = Math.ceil(8 / items.length);
    return Array.from({ length: copies }, () => items).flat();
  }, [items]);

  // Pause Swiper smoothly on hover: stop the in-flight transition by freezing
  // translate, then halt autoplay. Resume on leave.
  const pauseMarquee = () => {
    const s = swiperRef.current;
    if (!s || s.destroyed) return;
    try {
      const t = s.getTranslate();
      s.setTransition(0);
      s.setTranslate(t);
      s.autoplay?.stop();
    } catch {
      /* ignore */
    }
  };
  const resumeMarquee = () => {
    const s = swiperRef.current;
    if (!s || s.destroyed) return;
    try {
      s.autoplay?.start();
    } catch {
      /* ignore */
    }
  };

  // Lock body scroll while the immersive transition plays. Compensate for
  // the removed scrollbar so the page doesn't shift horizontally at the
  // exact moment the zoom starts.
  useEffect(() => {
    if (!transition) return;
    const prevOverflow = document.body.style.overflow;
    const prevPadding = document.body.style.paddingRight;
    const scrollbarW = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbarW > 0) {
      document.body.style.paddingRight = `${scrollbarW}px`;
    }
    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPadding;
    };
  }, [transition]);

  const handleCardClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    item: TrendingItem
  ) => {
    // Allow modifier clicks / middle click to behave normally.
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    const target = e.currentTarget.querySelector<HTMLElement>("[data-card]");
    if (!target) return;
    const r = target.getBoundingClientRect();
    const href = `/destinations/country?country=${encodeURIComponent(item.name)}`;
    // Prefetch so router.push is instantaneous when the zoom finishes.
    try { router.prefetch(href); } catch { /* ignore */ }
    setPhase("start");
    setTransition({
      item,
      href,
      rect: { top: r.top, left: r.left, width: r.width, height: r.height },
    });
    pauseMarquee();
    // Trigger expand on next frame so initial styles paint first.
    requestAnimationFrame(() =>
      requestAnimationFrame(() => setPhase("full"))
    );
    // Navigate after the zoom completes.
    window.setTimeout(() => {
      router.push(href);
    }, 820);
  };

  return (
    <LayoutSection link="/destinations" title="Trending Destinations">
      <div
        className="w-full h-max relative"
        onMouseEnter={pauseMarquee}
        onMouseLeave={resumeMarquee}
      >
        <Swiper
          onSwiper={(s) => (swiperRef.current = s)}
          modules={[Autoplay]}
          slidesPerView={4}
          spaceBetween={36}
          loop={true}
          speed={6000}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          allowTouchMove={true}
          className="w-full !overflow-visible trending-marquee"
          breakpoints={{
            320: { slidesPerView: 1.5, spaceBetween: 16 },
            480: { slidesPerView: 1.5, spaceBetween: 20 },
            640: { slidesPerView: 2, spaceBetween: 24 },
            768: { slidesPerView: 2.5, spaceBetween: 28 },
            1024: { slidesPerView: 3, spaceBetween: 32 },
            1280: { slidesPerView: 4, spaceBetween: 36 },
          }}
        >
          {marqueeItems.map((item, i) => (
            <SwiperSlide key={i} className="!overflow-visible">
              <Link
                href={`/destinations/country?country=${encodeURIComponent(item.name)}`}
                onClick={(e) => handleCardClick(e, item)}
              >
                <div
                  data-card
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={`bg-gray-200 aspect-[12/16] w-full relative overflow-hidden rounded-2xl p-8 flex bg-cover bg-center items-end transition-all duration-500 ease-out cursor-pointer shadow-lg
                  ${hoveredIndex === i
                      ? "scale-105 shadow-2xl z-10 ring-2 ring-white/50"
                      : hoveredIndex !== null
                        ? "scale-95 blur-[2px] opacity-50 grayscale-[0.3]"
                        : "hover:scale-105 hover:shadow-xl"
                    }
                `}
                  style={{ backgroundImage: `url(${item.image})` }}
                >
                  <div className="bg-gradient-to-b from-transparent to-black/80 from-60% w-full h-full absolute top-0 left-0" />
                  <div className="text-white flex flex-col gap-1 z-10">
                    <h6 className="font-medium text-lg">{item.name}</h6>
                    {item.detail && (
                      <span className="font-light text-xs line-clamp-2">{item.detail}</span>
                    )}
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
        <style jsx global>{`
          .trending-marquee .swiper-wrapper {
            transition-timing-function: linear !important;
          }
        `}</style>
      </div>

      {transition && (
        <div
          aria-hidden="true"
          className="fixed inset-0 z-[9999] pointer-events-none"
        >
          {/* Fade everything to black */}
          <div
            className="absolute inset-0 bg-black transition-opacity duration-700 ease-out"
            style={{ opacity: phase === "full" ? 1 : 0 }}
          />
          {/* The card itself expanding to fill viewport */}
          <div
            className="absolute bg-cover bg-center shadow-2xl overflow-hidden"
            style={{
              top: phase === "full" ? 0 : transition.rect.top,
              left: phase === "full" ? 0 : transition.rect.left,
              width: phase === "full" ? "100vw" : transition.rect.width,
              height: phase === "full" ? "100vh" : transition.rect.height,
              borderRadius: phase === "full" ? 0 : 16,
              backgroundImage: `url(${transition.item.image})`,
              transition:
                "top 800ms cubic-bezier(.7,0,.2,1), left 800ms cubic-bezier(.7,0,.2,1), width 800ms cubic-bezier(.7,0,.2,1), height 800ms cubic-bezier(.7,0,.2,1), border-radius 800ms cubic-bezier(.7,0,.2,1)",
            }}
          >
            <div className="bg-gradient-to-b from-transparent to-black/80 from-50% w-full h-full absolute top-0 left-0" />
          </div>
          {/* Headline lives OUTSIDE the scaled card so the text isn't stretched
              by the transform. It fades in once the zoom is past the midpoint. */}
          <div
            className="absolute left-8 md:left-16 right-8 md:right-16 bottom-16 md:bottom-24 text-white"
            style={{
              opacity: phase === "full" ? 1 : 0,
              transform: phase === "full" ? "translateY(0)" : "translateY(24px)",
              transition:
                "opacity 500ms ease-out 350ms, transform 500ms ease-out 350ms",
            }}
          >
            <h1 className="font-medium text-3xl md:text-6xl lg:text-7xl mb-2 md:mb-4">
              {transition.item.name}
            </h1>
            {transition.item.detail && (
              <p className="font-light text-base md:text-2xl max-w-2xl">
                {transition.item.detail}
              </p>
            )}
          </div>
        </div>
      )}
    </LayoutSection>
  );
};

export default Trending;
