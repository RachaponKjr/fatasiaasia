"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import LightGallery from "lightgallery/react";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import type { LightGallery as ILightGallery } from "lightgallery/lightgallery";

import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";

import gallery from "@/assets/images/gallery.png";

export default function Gallery({ galleryUrls: rawGalleryUrls }: { galleryUrls: string[] }) {
  const galleryUrls = rawGalleryUrls?.filter((url) => url && url.trim() !== "") || [];
  const lightGalleryRef = useRef<ILightGallery | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slideshow - only if more than 1 image
  useEffect(() => {
    if (galleryUrls.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % galleryUrls.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [galleryUrls.length]);

  const openGallery = (e: React.MouseEvent, index: number = 0) => {
    e.preventDefault();
    if (lightGalleryRef.current) {
      lightGalleryRef.current.openGallery(index);
    }
  };

  if (!galleryUrls || galleryUrls.length === 0) return null;

  return (
    <div className="w-full">
      <LightGallery
        onInit={(detail) => {
          if (detail) {
            lightGalleryRef.current = detail.instance;
          }
        }}
        speed={500}
        plugins={[lgThumbnail, lgZoom]}
        dynamic
        dynamicEl={galleryUrls.map((url) => ({
          src: url,
          thumb: url,
        }))}
      />

      {/* UI Display */}
      <div className="w-full">
        {/* Main Image with auto-slideshow */}
        <div className="w-full aspect-[16/12] overflow-hidden rounded-[12px] relative">
          {galleryUrls.map((url, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === currentIndex ? "opacity-100" : "opacity-0"
                }`}
            >
              <Image
                src={url}
                alt={`Gallery image ${idx + 1}`}
                fill
                className="object-cover object-center"
              />
            </div>
          ))}
          <button
            onClick={(e) => openGallery(e, currentIndex)}
            className="min-w-[140px] md:!min-w-[240px] cursor-pointer min-h-[40px] md:!min-h-[61px] flex gap-4 justify-center items-center bg-white/50 backdrop-blur-sm border border-white rounded-full absolute bottom-4 right-4 md:bottom-10 md:right-10 z-50 hover:bg-white/70 transition-all"
          >
            <Image
              src={gallery.src}
              alt=""
              width={40}
              height={40}
              className="w-8 h-8 md:w-10 md:h-10"
            />
            <span className="text-white font-semibold text-sm md:text-lg">
              View all ({galleryUrls.length})
            </span>
          </button>
          {/* Slide indicators - only show if more than 1 image */}
          {galleryUrls.length > 1 && (
            <div className="absolute bottom-4 left-4 md:bottom-10 md:left-10 flex gap-2 z-50">
              {galleryUrls.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all ${idx === currentIndex
                      ? "bg-white scale-110"
                      : "bg-white/50 hover:bg-white/70"
                    }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* 3 Thumbnail images */}
        {galleryUrls.length > 1 && (
          <div className="grid grid-cols-3 gap-2 xl:gap-4 mt-2">
            {galleryUrls.slice(1, 4).map((src, i) => (
              <button
                key={i}
                onClick={(e) => openGallery(e, i + 1)}
                className={`w-full aspect-[16/10] rounded-[12px] relative overflow-hidden cursor-pointer group ${i + 1 === currentIndex ? "ring-2 ring-[#BD3E2B]" : ""
                  }`}
              >
                <Image
                  src={src}
                  alt={`thumb-${i}`}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}