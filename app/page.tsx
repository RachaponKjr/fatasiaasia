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
import { getSiteCms } from "@/lib/site-images";
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
  const [{ data: tour }, destinations, siteCms] = await Promise.all([
    api.tour.getTour(),
    listDestinations().catch(() => []),
    getSiteCms(),
  ]);
  const { content: siteContent, images: siteImages } = siteCms;

  // Resolve admin-managed slot overrides once at the top so we don't refetch
  // for each consumer further down the tree.
  const heroSlideOverrides = [
    siteImages["home.hero.slide1"] ?? null,
    siteImages["home.hero.slide2"] ?? null,
    siteImages["home.hero.slide3"] ?? null,
  ];
  const hereHelpImage = siteImages["home.here_help.image"];
  const whyChooseImage = siteImages["home.why_choose.image"];
  const text = (key: string) => siteContent[key];

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
      <HeroSection
        slideOverrides={heroSlideOverrides}
        headline={text("home.hero")?.headline}
        description={text("home.hero")?.description}
      />
      <div className="w-full py-10 xl:py-20 flex flex-col gap-10 xl:gap-32 px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-24">
        <Trending destinations={destinations} />
        <Adventure
          headline={text("home.adventure")?.headline}
          description={text("home.adventure")?.description}
          iconOverrides={{
            beach: siteImages["home.adventure.icon.beach"]?.url,
            culture: siteImages["home.adventure.icon.culture"]?.url,
            nature: siteImages["home.adventure.icon.nature"]?.url,
            local: siteImages["home.adventure.icon.local"]?.url,
            cities: siteImages["home.adventure.icon.cities"]?.url,
            wellness: siteImages["home.adventure.icon.wellness"]?.url,
          }}
        />
        <Packages
          tours={tour}
          title={text("home.popular_packages")?.headline}
          description={text("home.popular_packages")?.description}
        />
        <WhyChoose
          imageUrl={whyChooseImage?.url}
          headline={text("home.why_choose")?.headline}
          description={text("home.why_choose")?.description}
          iconOverrides={{
            attractions: siteImages["home.why_choose.icon.attractions"]?.url,
            support: siteImages["home.why_choose.icon.support"]?.url,
            value: siteImages["home.why_choose.icon.value"]?.url,
            booking: siteImages["home.why_choose.icon.booking"]?.url,
          }}
        />
        <BaseService
          headline={text("home.base_services")?.headline}
          description={text("home.base_services")?.description}
          iconOverrides={{
            support: siteImages["home.base_services.icon.support"]?.url,
            accommodation:
              siteImages["home.base_services.icon.accommodation"]?.url,
            planning: siteImages["home.base_services.icon.planning"]?.url,
            tailorMade:
              siteImages["home.base_services.icon.tailor_made"]?.url,
          }}
        />
        <BeachPackages
          tours={beachTours}
          title={text("home.beach_packages")?.headline}
          description={text("home.beach_packages")?.description}
        />
        <FollowFantasiaasia
          iconUrl={siteImages["home.follow_youtube.icon"]?.url}
          headline={text("home.follow_youtube")?.headline}
          description={text("home.follow_youtube")?.description}
        />
        <FeaturedBlogs
          headline={text("home.featured_blogs")?.headline}
          description={text("home.featured_blogs")?.description}
        />
        <Client
          hereHelpImageUrl={hereHelpImage?.url}
          hereHelpImageAlt={hereHelpImage?.alt}
          headline={text("home.testimonials")?.headline}
          description={text("home.testimonials")?.description}
        />
      </div>
      <JoinNewSletter
        imageUrl={siteImages["site.newsletter.background"]?.url}
        headline={text("site.newsletter")?.headline}
        description={text("site.newsletter")?.description}
      />
    </div>
  );
}
