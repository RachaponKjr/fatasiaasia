export const dynamic = "force-dynamic";

import JoinNewSletter from "@/components/join-newsletter";
import React, { Suspense } from "react";

import api from "@/server";
import HeroLayout from "../about/_components/hero-about";
import tourImage from "@/assets/images/banner/tour.webp";
import ToursClient from "./_components/tours-client";
import { getSiteCms } from "@/lib/site-images";

const page = async () => {
  const [response, siteCms] = await Promise.all([
    api.tour.getTour(),
    getSiteCms(),
  ]);
  const { content: siteContent, images: siteImages } = siteCms;
  const intro = siteContent["tours.intro"];
  const tour = response.data ?? [];
  // Fetch tour details for category filtering
  let tourDetails: any[] = [];
  if (tour.length > 0) {
    const detailPromises = tour.map(async (t) => {
      try {
        const { data } = await api.tour.getTourDetail({ tourId: t.tourId });
        return data;
      } catch {
        return null;
      }
    });
    tourDetails = await Promise.all(detailPromises);
  }
  return (
    <>
      <HeroLayout
        image={siteImages["tours.hero.image"]?.url || tourImage.src}
        title="Discover Our Handpicked Tours in Asia"
        aspectRatio="1344 / 768"
      />
      <div className="container mx-auto py-10 xl:py-20 px-4 xl:px-0 flex flex-col items-center gap-6 xl:gap-[60px] 2xl:px-20">
        <div className="text-center max-w-4xl">
          <h2 className="text-3xl xl:text-[40px] font-medium text-[#333333] mb-4">
            {intro?.headline || "Find Your Next Unforgettable Journey"}
          </h2>
          <p className="text-lg text-gray-600">
            {intro?.description ||
              "Browse our carefully curated tours by category and find your perfect Asian adventure."}
          </p>
        </div>

        <Suspense
          fallback={<div className="text-center py-20">Loading tours....</div>}
        >
          <ToursClient tours={tour} tourDetails={tourDetails} />
        </Suspense>
      </div>
      <JoinNewSletter
        imageUrl={siteImages["site.newsletter.background"]?.url}
        headline={siteContent["site.newsletter"]?.headline}
        description={siteContent["site.newsletter"]?.description}
      />
    </>
  );
};

export default page;
