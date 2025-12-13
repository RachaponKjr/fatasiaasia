"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

import gallery from "@/assets/images/gallery.png";

export default function Gallery({ galleryUrls: rawGalleryUrls }: { galleryUrls: string[] }) {
  const galleryUrls = rawGalleryUrls?.filter((url) => url && url.trim() !== "") || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);

  // Auto-slideshow - only if more than 1 image and modal is closed
  useEffect(() => {
    if (galleryUrls.length <= 1 || isModalOpen) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % galleryUrls.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [galleryUrls.length, isModalOpen]);

  // Handle keyboard navigation in modal
  useEffect(() => {
    if (!isModalOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsModalOpen(false);
      if (e.key === "ArrowLeft") setModalIndex((prev) => (prev - 1 + galleryUrls.length) % galleryUrls.length);
      if (e.key === "ArrowRight") setModalIndex((prev) => (prev + 1) % galleryUrls.length);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen, galleryUrls.length]);

  const openModal = useCallback((index: number) => {
    setModalIndex(index);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  if (!galleryUrls || galleryUrls.length === 0) return null;

  return (
    <div className="w-full">
      {/* Fullscreen Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/95 z-[9999] flex items-center justify-center"
          onClick={closeModal}
        >
          {/* Close button */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
          >
            <X size={32} />
          </button>

          {/* Previous button */}
          {galleryUrls.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setModalIndex((prev) => (prev - 1 + galleryUrls.length) % galleryUrls.length);
              }}
              className="absolute left-4 text-white hover:text-gray-300 z-10 p-2 bg-black/50 rounded-full"
            >
              <ChevronLeft size={32} />
            </button>
          )}

          {/* Image */}
          <div
            className="relative max-w-[90vw] max-h-[90vh] w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={galleryUrls[modalIndex]}
              alt={`Image ${modalIndex + 1}`}
              fill
              className="object-contain"
              sizes="90vw"
            />
          </div>

          {/* Next button */}
          {galleryUrls.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setModalIndex((prev) => (prev + 1) % galleryUrls.length);
              }}
              className="absolute right-4 text-white hover:text-gray-300 z-10 p-2 bg-black/50 rounded-full"
            >
              <ChevronRight size={32} />
            </button>
          )}

          {/* Image counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm bg-black/50 px-4 py-2 rounded-full">
            {modalIndex + 1} / {galleryUrls.length}
          </div>

          {/* Thumbnails */}
          {galleryUrls.length > 1 && (
            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-2">
              {galleryUrls.map((url, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setModalIndex(idx);
                  }}
                  className={`w-16 h-12 rounded overflow-hidden relative ${idx === modalIndex ? "ring-2 ring-white" : "opacity-60 hover:opacity-100"
                    }`}
                >
                  <Image
                    src={url}
                    alt={`Thumb ${idx + 1}`}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* UI Display */}
      <div className="w-full">
        {/* Main image with slideshow */}
        <div className="w-full aspect-[16/12] overflow-hidden rounded-[12px] relative">
          {galleryUrls.map((url, idx) => (
            <div
              key={idx}
              onClick={() => openModal(idx)}
              className={`absolute inset-0 transition-opacity duration-1000 cursor-pointer ${idx === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
            >
              <Image
                src={url}
                alt={`Gallery ${idx + 1}`}
                fill
                className="object-cover object-center"
              />
            </div>
          ))}
          <button
            onClick={() => openModal(currentIndex)}
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
          {/* Slide indicators */}
          {galleryUrls.length > 1 && (
            <div className="absolute bottom-4 left-4 md:bottom-10 md:left-10 flex gap-2 z-40">
              {galleryUrls.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentIndex(idx);
                  }}
                  className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all ${idx === currentIndex ? "bg-white" : "bg-white/50"
                    }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Thumbnails */}
        {galleryUrls.length > 1 && (
          <div className="grid grid-cols-3 gap-2 xl:gap-4 mt-2">
            {galleryUrls.slice(1, 4).map((src, i) => (
              <button
                key={i}
                onClick={() => openModal(i + 1)}
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