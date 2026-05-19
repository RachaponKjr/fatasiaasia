import React, { Suspense } from "react";
import HeroLayout from "../about/_components/hero-about";
import destinationhero from "@/assets/images/destination/destination-hero.webp";
import JoinNewSletter from "@/components/join-newsletter";
import ContryCard from "./_components/contry-card";

// Bundled fallback images for the originally-seeded destinations. Admin can
// override any of these by uploading a card image in the tour modal's
// destination editor — `destination.cardImageUrl` from the API wins when set.
import thai from "@/assets/images/destination/Thai.webp";
import combodia from "@/assets/images/destination/Cambodia.jpg";
import india from "@/assets/images/destination/India.jpg";
import indonesia from "@/assets/images/destination/Indonesia.jpg";
import malarsia from "@/assets/images/destination/Malaysia.webp";
import singapore from "@/assets/images/destination/Singapore.webp";
import vuetnam from "@/assets/images/destination/Vietnam.webp";
import laos from "@/assets/images/destination/laos.jpg";
import brunei from "@/assets/images/destination/brunei.webp";
import Uzbekistan from "@/assets/images/destination/Uzbekistan.jpg";

import { listDestinations } from "@/lib/destinations-api";

const FALLBACK_IMAGES: Record<string, string> = {
  thailand: thai.src,
  laos: laos.src,
  vietnam: vuetnam.src,
  malaysia: malarsia.src,
  indonesia: indonesia.src,
  singapore: singapore.src,
  india: india.src,
  cambodia: combodia.src,
  brunei: brunei.src,
  uzbekistan: Uzbekistan.src,
};

// Cheap inline placeholder for destinations that don't yet have a card image
// (e.g. Myanmar in the seed, or any brand-new admin-created destination).
const PLACEHOLDER_IMAGE =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='500'><rect width='400' height='500' fill='%23e5e7eb'/><text x='50%25' y='50%25' fill='%236b7280' font-family='sans-serif' font-size='20' text-anchor='middle' dominant-baseline='middle'>No image</text></svg>";

const page = async () => {
  const destinations = await listDestinations();
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeroLayout image={destinationhero.src} title="Destinations" />
      <div className="container mx-auto xl:pt-[150px] xl:pb-[200px] py-10 px-4 xl:px-0">
        {/* Title and Description Section */}
        <div className="flex flex-col items-center mb-16">
          <h3 className="font-bold text-xl md:text-4xl mb-9 text-center">
            Explore Asia: Unforgettable Journeys Await
          </h3>
          <p className="font-light text-lg md:text-2xl text-[#585858] leading-relaxed text-center max-w-5xl">
            From the spiritual peaks of the Himalayas to the ancient wonders of Southeast Asia, your next
            incredible journey begins here. Discover our handpicked destinations and start planning your
            perfect, tailor-made adventure today.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 md:gap-8 lg:gap-12 xl:gap-16">
          {destinations.map((d) => {
            const image =
              d.cardImageUrl ||
              FALLBACK_IMAGES[d.slug] ||
              PLACEHOLDER_IMAGE;
            return (
              <ContryCard
                key={d.destinationId}
                image={image}
                country={d.name}
              />
            );
          })}
        </div>
      </div>
      <JoinNewSletter />
    </Suspense>
  );
};

export default page;
