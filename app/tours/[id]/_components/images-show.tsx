"use client";

import React, { useRef } from "react";
import Image from "next/image";
import LightGallery from "lightgallery/react";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import type { LightGallery as ILightGallery } from "lightgallery/lightgallery";

import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";

import gallery from "@/assets/images/gallery.png";

export default function Gallery({ galleryUrls }: { galleryUrls: string[] }) {
  const lightGalleryRef = useRef<ILightGallery | null>(null);
  
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
        {/* รูปใหญ่ */}
        <div className="w-full aspect-[16/12] overflow-hidden rounded-[12px] relative">
          {galleryUrls?.[0] && (
            <>
              <Image
                src={galleryUrls[0]}
                alt="main"
                fill
                className="object-cover object-center"
              />
              <button
                onClick={(e) => openGallery(e, 0)}
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
            </>
          )}
        </div>

        {/* 3 รูปเล็ก */}
        {galleryUrls.length > 1 && (
          <div className="grid grid-cols-3 gap-2 xl:gap-4 mt-2">
            {galleryUrls.slice(1, 4).map((src, i) => (
              <button
                key={i}
                onClick={(e) => openGallery(e, i + 1)}
                className="w-full aspect-[16/10] rounded-[12px] relative overflow-hidden cursor-pointer group"
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