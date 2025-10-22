"use client";

import React, { useRef } from "react";
import Image from "next/image";
import LightGallery from "lightgallery/react";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";

import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";

import Link from "next/link";

import gallery from "@/assets/images/gallery.png";

export default function Gallery({ galleryUrls }: { galleryUrls: string[] }) {
  const lgRef = useRef<any>(null);

  const openAll = (e: React.MouseEvent) => {
    e.preventDefault();
    if (lgRef.current) {
      lgRef.current.openGallery(0); // เริ่มจากรูปแรก
    }
  };
  return (
    <div className="w-full">
      <LightGallery
        onInit={(ref) => (lgRef.current = ref)}
        speed={500}
        plugins={[lgThumbnail, lgZoom]}
      >
        {/* รูปใหญ่ */}
        <div
          // href={images[0]}
          className="w-full aspect-[16/12] overflow-hidden rounded-[12px] relative block"
        >
          <Image
            src={galleryUrls[0] as string}
            alt="main"
            fill
            className="object-cover object-center"
          />
          <Link
            href={galleryUrls[0] as string}
            onClick={openAll}
            className="!min-w-[240px] cursor-pointer !min-h-[61px] flex gap-4 justify-center items-center bg-white/50 border border-white rounded-full absolute bottom-10 right-10 z-50"
          >
            <Image src={gallery.src} alt="" width={40} height={40} />
            <span className="text-white font-semibold text-lg">View all</span>
          </Link>
        </div>

        {/* 3 รูปเล็ก */}
        <div className="grid grid-cols-3 gap-2 xl:gap-4 mt-2">
          {galleryUrls.slice(1, 4).map((src, i) => (
            <a
              key={i}
              href={src}
              className="w-full aspect-[16/10] rounded-[12px] relative overflow-hidden block"
            >
              <Image
                src={src}
                alt={`thumb-${i}`}
                fill
                className="object-cover object-center"
              />
            </a>
          ))}
        </div>

        {/* ซ่อนรูปอื่นๆ แต่ให้ดูได้ใน LightGallery */}
        {galleryUrls.slice(5).map((src, i) => (
          <Link key={i} href={src} style={{ display: "none" }}>
            <Image src={src} alt={`image-${i}`} width={200} height={150} />
          </Link>
        ))}
      </LightGallery>
    </div>
  );
}
