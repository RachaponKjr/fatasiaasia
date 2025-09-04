"use client";
import Image from "next/image";
import React, { useState } from "react";

// Type สำหรับข้อมูลรูปภาพ
type Photo = {
  id: string | number;
  src: string;
  alt: string;
  caption?: string;
};

type PolaroidGalleryProps = {
  photos: Photo[];
  className?: string;
  maxPhotos?: number;
};

const PolaroidGallery = ({
  photos,
  className = "",
  maxPhotos = 4,
}: PolaroidGalleryProps) => {
  const [hoveredPhoto, setHoveredPhoto] = useState<string | number | null>(
    null
  );

  // จำกัดจำนวนรูปที่แสดง
  const displayPhotos = photos.slice(0, maxPhotos);

  // สร้าง rotation angles แบบสุ่มสำหรับแต่ละรูป
  const getRotation = (index: number) => {
    const rotations = [-8, 5, -3, 7, -5, 4, -6, 3];
    return rotations[index % rotations.length];
  };

  return (
    <div
      className={`flex flex-wrap justify-center items-center gap-0 ${className}`}
    >
      {displayPhotos.map((photo, index) => (
        <div
          key={photo.id}
          className="relative group cursor-pointer"
          style={{
            transform:
              hoveredPhoto === photo.id
                ? "rotate(0deg) scale(1.05)"
                : `rotate(${getRotation(index)}deg)`,
            transition: "transform 0.3s ease-in-out",
            zIndex: hoveredPhoto === photo.id ? 10 : 1,
          }}
          onMouseEnter={() => setHoveredPhoto(photo.id)}
          onMouseLeave={() => setHoveredPhoto(null)}
        >
          {/* Polaroid Frame */}
          <div className="bg-white p-2 xl:p-5 pb-6 xl:pb-10 shadow-lg rounded-[10px] xl:rounded-[20px] border border-gray-200 hover:shadow-xl transition-shadow duration-300">
            {/* Photo Container */}
            <div className="w-[180px] xl:w-[265px] aspect-square overflow-hidden bg-gray-100 rounded-sm">
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PolaroidGallery;
