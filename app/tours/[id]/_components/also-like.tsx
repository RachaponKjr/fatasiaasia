"use client";
import React, { useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import ArrowLeft from "@/assets/icons/arrow-left";
import ArrowRight from "@/assets/icons/arrow-right";
import TourCard from "@/components/tour-card";
import LayoutSection from "@/app/_components/layout-section";

import "swiper/css";
import "swiper/css/navigation";

import { useTours } from "@/hooks/userTour";
import { useWishlist } from "@/hooks/useWishlist";
import { TourDetail, Tour } from "@/types/tour.type";

interface AlsoLikeProps {
  currentTour?: TourDetail;
}

const AlsoLike = ({ currentTour }: AlsoLikeProps) => {
  const { tours, loading } = useTours();
  const { wishlist } = useWishlist();

  // Intelligent recommendation algorithm
  const recommendedTours = useMemo(() => {
    if (!tours || tours.length === 0) return [];

    // Extract current tour category from META
    const getCurrentTourCategory = () => {
      const categoryMeta = currentTour?.tourDetails?.included?.find(
        item => item.text.startsWith("META_CATEGORY:")
      );
      return categoryMeta?.text.replace("META_CATEGORY:", "").toLowerCase() || "";
    };

    const currentCategory = getCurrentTourCategory();
    const currentCountry = currentTour?.country?.toLowerCase() || "";
    const currentPrice = currentTour?.estimateCostPerPerson || 0;
    const currentId = currentTour?.tourId;

    // Get wishlist tour IDs for preference learning
    const wishlistedTourIds = new Set(wishlist.map(w => w.tourId));

    // Helper to get tour category from META
    const getTourCategory = (tour: Tour) => {
      const categoryMeta = tour.tourDetails?.included?.find(
        item => item.text.startsWith("META_CATEGORY:")
      );
      return categoryMeta?.text.replace("META_CATEGORY:", "").toLowerCase() || "";
    };

    // Score each tour based on similarity and user preferences
    const scoredTours = tours
      .filter(tour => tour.tourId !== currentId) // Exclude current tour
      .map(tour => {
        let score = Math.random() * 10; // Base randomization (0-10)

        const tourCategory = getTourCategory(tour);

        // Category match (highest weight: +50 points)
        if (currentCategory && tourCategory.includes(currentCategory)) {
          score += 50;
        }

        // Same country (+30 points)
        if (currentCountry && tour.country?.toLowerCase() === currentCountry) {
          score += 30;
        }

        // Similar price range (+20 points if within 30%)
        if (currentPrice > 0) {
          const priceDiff = Math.abs(tour.estimateCostPerPerson - currentPrice) / currentPrice;
          if (priceDiff < 0.3) {
            score += 20;
          }
        }

        // User has similar tours in wishlist (+25 points)
        const wishlistedSimilar = wishlist.filter(w => {
          const wishlistCategory = getTourCategory(w);
          return wishlistCategory.includes(currentCategory) ||
            w.country?.toLowerCase() === currentCountry;
        });
        if (wishlistedSimilar.length > 0) {
          score += 25;
        }

        // Boost if already in wishlist (+15 points) - user showed interest
        if (wishlistedTourIds.has(tour.tourId)) {
          score += 15;
        }

        // Popular tours (assuming tours with lower IDs are older/more popular)
        if (tour.tourId && tour.tourId < 50) {
          score += 10;
        }

        return { tour, score };
      })
      .sort((a, b) => b.score - a.score) // Sort by score descending
      .slice(0, 12) // Get top 12
      .map(item => item.tour);

    // Shuffle the top results for variety on each visit
    return scoredTours.sort(() => Math.random() - 0.5);
  }, [tours, currentTour, wishlist]);

  if (loading || recommendedTours.length === 0) return null;

  return (
    <LayoutSection link="/tours" title="You might also like...">
      <div className="w-full h-auto relative">
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={30}
          slidesPerView={3}
          loop={recommendedTours.length > 3}
          autoHeight={false}
          watchSlidesProgress={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          navigation={{
            nextEl: ".alsolike-next",
            prevEl: ".alsolike-prev",
          }}
          breakpoints={{
            0: {
              slidesPerView: 1.2,
              spaceBetween: 16,
            },
            480: {
              slidesPerView: 1.5,
              spaceBetween: 20,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 24,
            },
            768: {
              slidesPerView: 2.5,
              spaceBetween: 28,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
          className="w-full h-full relative"
        >
          {recommendedTours.map((item, i) => (
            <SwiperSlide key={i} className="p-3 !h-full relative">
              <TourCard wishlist={item} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Prev Button (left) */}
        <div className="alsolike-prev absolute hidden top-1/2 -translate-y-1/2 -left-12 -translate-x-1/2 w-14 aspect-square rounded-full bg-[#FFF3E1] md:grid place-content-center cursor-pointer shadow-md z-10 hover:bg-[#FFE5C4] transition-colors">
          <ArrowLeft size={28} />
        </div>

        {/* Next Button (right) */}
        <div className="alsolike-next absolute hidden top-1/2 -translate-y-1/2 -right-12 translate-x-1/2 w-14 aspect-square rounded-full bg-[#FFF3E1] md:grid place-content-center cursor-pointer shadow-md z-10 hover:bg-[#FFE5C4] transition-colors">
          <ArrowRight size={28} />
        </div>
      </div>
    </LayoutSection>
  );
};

export default AlsoLike;
