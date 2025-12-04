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
import api from "@/server";
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
  const { data: tour } = await api.tour.getTour();

  return (
    <div className="overflow-hidden" suppressHydrationWarning>
      <HeroSection />
      <div className="container mx-auto py-10 xl:py-20 flex flex-col gap-10 xl:gap-32 2xl:px-20">
        <Trending />
        <Adventure />
        <Packages tours={tour} />
        <WhyChoose />
        <BaseService />
        <BeachPackages tours={tour} />
        <FollowFantasiaasia />
        <Client />
      </div>
      <JoinNewSletter />
    </div>
  );
}
