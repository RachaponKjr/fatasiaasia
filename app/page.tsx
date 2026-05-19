import JoinNewSletter from "@/components/join-newsletter";
import HeroSection from "./_components/hero-section";
import Trending from "./_components/trending";
import Adventure from "./_components/adventure";
import Packages from "./_components/packages";
import WhyChoose from "./_components/why-choose";
import Client from "./_components/client";
import BaseService from "./_components/base-service";
import FollowFantasiaasia from "./_components/follow-fantasiaasia";
import BeachPackages from "./_components/beach-packages";
import FeaturedBlogs from "./_components/featured-blogs";
import api from "@/server";
import { listDestinations } from "@/lib/destinations-api";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fantasia Asia | Discover Premium Asian Travel Experiences",
  description: "Explore Asia's wonders with Fantasia Asia. Exclusive tour packages, personalized itineraries, and unforgettable journeys across Thailand, Vietnam, Laos, India, and beyond. Book your dream adventure today!",
  keywords: ["Asia tours", "Thailand travel", "Vietnam tours", "Laos adventures", "India travel packages", "Asian vacation", "tour packages", "travel agency"],
  openGraph: {
    title: "Fantasia Asia | Premium Asian Tours & Travel",
    description: "Discover the magic of Asia with expertly curated tours and personalized travel experiences.",
    type: "website",
    locale: "en_US",
    siteName: "Fantasia Asia",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fantasia Asia | Premium Asian Tours",
    description: "Explore Asia's wonders with exclusive tour packages and personalized itineraries.",
  },
};

export default async function Home() {
  const [{ data: tour }, destinations] = await Promise.all([
    api.tour.getTour(),
    listDestinations().catch(() => []),
  ]);

  // Fetch beach tours server-side (no CORS issues)
  let beachTours: typeof tour = [];
  if (tour && tour.length > 0) {
    try {
      // Fetch details for all tours in parallel
      const detailPromises = tour.map(async (t) => {
        try {
          const { data } = await api.tour.getTourDetail({ tourId: t.tourId });
          return data;
        } catch {
          return null;
        }
      });

      const tourDetails = await Promise.all(detailPromises);

      // Filter for beach tours
      beachTours = tour.filter((t, index) => {
        const detail = tourDetails[index];
        if (!detail || !detail.tourDetails?.included) return false;
        return detail.tourDetails.included.some(
          (item) => item.text === "META_BEACHTOUR:true"
        );
      });
    } catch (error) {
      console.error("Error fetching beach tours:", error);
    }
  }

  return (
    <div className="overflow-hidden" suppressHydrationWarning>
      <HeroSection />
      <div className="w-full py-10 xl:py-20 flex flex-col gap-10 xl:gap-32 px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-24">
        <Trending destinations={destinations} />
        <Adventure />
        <Packages tours={tour} />
        <WhyChoose />
        <BaseService />
        <BeachPackages tours={beachTours} />
        <FollowFantasiaasia />
        <FeaturedBlogs />
        <Client />
      </div>
      <JoinNewSletter />
    </div>
  );
}
