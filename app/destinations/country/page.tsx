"use client";
import React, { useCallback, useEffect, useState, useMemo } from "react";
import HeroLayout from "../../about/_components/hero-about";
import JoinNewSletter from "@/components/join-newsletter";
import { useSearchParams } from "next/navigation";
import api from "@/server";
import TourCard from "@/components/tour-card";
import { Tour } from "@/types/tour.type";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  getDestinationBySlug,
  type Destination,
} from "@/lib/destinations-api";

// Slug helper kept in sync with the backend slugify so admin-created
// destination names resolve correctly when clicked from the index.
const slugify = (s: string) =>
  s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

// Region configuration for each country
const countryRegions: Record<string, { name: string; slug: string }[]> = {
  Thailand: [
    { name: "All Regions", slug: "" },
    { name: "Bangkok", slug: "Bangkok" },
    { name: "The North", slug: "The North" },
    { name: "Krabi", slug: "Krabi" },
    { name: "Phuket", slug: "Phuket" },
    { name: "Other Destinations", slug: "Other Destinations" },
  ],
  Vietnam: [
    { name: "All Regions", slug: "" },
    { name: "Hanoi and the North", slug: "Hanoi and the North" },
    { name: "Halong Bay", slug: "Halong Bay" },
    { name: "Central Vietnam", slug: "Central Vietnam" },
    { name: "Ho Chi Minh and the South", slug: "Ho Chi Minh and the South" },
    { name: "Other Destinations", slug: "Other Destinations" },
  ],
  Indonesia: [
    { name: "All Regions", slug: "" },
    { name: "Bali", slug: "Bali" },
    { name: "Java", slug: "Java" },
    { name: "Lombok", slug: "Lombok" },
    { name: "Sulawesi", slug: "Sulawesi" },
    { name: "Other Destinations", slug: "Other Destinations" },
  ],
  Laos: [
    { name: "All Regions", slug: "" },
    { name: "Luang Prabang", slug: "Luang Prabang" },
    { name: "Vientiane", slug: "Vientiane" },
    { name: "Vang Vieng", slug: "Vang Vieng" },
    { name: "Other Destinations", slug: "Other Destinations" },
  ],
  Cambodia: [
    { name: "All Regions", slug: "" },
    { name: "Siem Reap", slug: "Siem Reap" },
    { name: "Phnom Penh", slug: "Phnom Penh" },
    { name: "Sihanoukville", slug: "Sihanoukville" },
    { name: "Other Destinations", slug: "Other Destinations" },
  ],
  Malaysia: [
    { name: "All Regions", slug: "" },
    { name: "Kuala Lumpur", slug: "Kuala Lumpur" },
    { name: "Penang", slug: "Penang" },
    { name: "Langkawi", slug: "Langkawi" },
    { name: "Borneo", slug: "Borneo" },
    { name: "Other Destinations", slug: "Other Destinations" },
  ],
  Singapore: [
    { name: "All Regions", slug: "" },
    { name: "City Center", slug: "City Center" },
    { name: "Sentosa", slug: "Sentosa" },
    { name: "Other Areas", slug: "Other Areas" },
  ],
  India: [
    { name: "All Regions", slug: "" },
    { name: "Delhi and North", slug: "Delhi and North" },
    { name: "Rajasthan", slug: "Rajasthan" },
    { name: "Goa", slug: "Goa" },
    { name: "Kerala", slug: "Kerala" },
    { name: "Other Destinations", slug: "Other Destinations" },
  ],
  Myanmar: [
    { name: "All Regions", slug: "" },
    { name: "Yangon", slug: "Yangon" },
    { name: "Bagan", slug: "Bagan" },
    { name: "Mandalay", slug: "Mandalay" },
    { name: "Inle Lake", slug: "Inle Lake" },
    { name: "Other Destinations", slug: "Other Destinations" },
  ],
  Brunei: [
    { name: "All Regions", slug: "" },
    { name: "Bandar Seri Begawan", slug: "Bandar Seri Begawan" },
    { name: "Temburong", slug: "Temburong" },
    { name: "Other Areas", slug: "Other Areas" },
  ],
  Uzbekistan: [
    { name: "All Regions", slug: "" },
    { name: "Samarkand", slug: "Samarkand" },
    { name: "Bukhara", slug: "Bukhara" },
    { name: "Tashkent", slug: "Tashkent" },
    { name: "Khiva", slug: "Khiva" },
    { name: "Other Destinations", slug: "Other Destinations" },
  ],
};

const page = () => {
  const param = useSearchParams();
  const country = param.get("country");
  const regionParam = param.get("region") || "";
  const [countryItem, setCountryItem] = useState<Tour[]>();
  const [tourDetails, setTourDetails] = useState<any[]>([]);
  const [selectedRegion, setSelectedRegion] = useState(regionParam);
  const [loading, setLoading] = useState(true);
  // Destination record fetched from the admin API. Used to populate the hero
  // title/description for admin-created destinations that aren't in the
  // hardcoded `content` map below.
  const [destination, setDestination] = useState<Destination | null>(null);

  useEffect(() => {
    if (!country) {
      setDestination(null);
      return;
    }
    let cancelled = false;
    getDestinationBySlug(slugify(country)).then((d) => {
      if (!cancelled) setDestination(d);
    });
    return () => {
      cancelled = true;
    };
  }, [country]);

  const content: Record<string, { title: string; description: string }> = {
    Thailand: {
      title: "Explore Thailand famous places",
      description: `Thailand, known as the "Land of Smiles," offers a captivating
      blend of rich cultural heritage, historical landmarks, and vibrant tourism.
      Bangkok features attractions like the Grand Palace and Wat Pho, alongside
      lively markets, street food, and nightlife. Chiang Mai is famous for its ancient
      temples, traditional crafts, and Wat Phra That Doi Suthep. Phuket and Krabi offer
      stunning beaches ideal for snorkeling and diving.`,
    },
    Brunei: {
      title: "Brunei: Where Serenity Meets Ancient Tradition",
      description: `Brunei is a small sultanate on the island of Borneo, known for its wealth, history, and deep
religious devotion that permeates every aspect of daily life. Despite its modest size, the country
holds cultural treasures and natural landscapes that surprise travelers: from lush rainforests to
calm rivers winding through traditional stilted villages.`,
    },
    Cambodia: {
      title: "Cambodia: Where Ancient Glory Meets the Resilient Soul",
      description: `Cambodia is a land that seems to hold the breath of time, where history intertwines with
spirituality and nature offers scenes of rare intensity. It is a country that strikes the heart with the
strength of its contrasts: the grandeur of Angkor's ruins, which still recount the ancient
magnificence of the Khmer Empire, and the simplicity of rural life flowing slowly along rice fields
and rivers.`,
    },
    India: {
      title: "India: A Land of Millennial Wonders and Vibrant Contrasts",
      description: `India is a land of contrasts and wonders, where the past coexists with the present in a unique
and captivating blend. A land of millennia-old empires, from the majestic Rajputs to the
Mughals, it preserves monuments that are true masterpieces of architecture and history.`,
    },
    Indonesia: {
      title: "Indonesia: An Infinite Archipelago of Wonders and Traditions",
      description: `Indonesia stretches like an endless archipelago between Asia and Oceania, with over 17,000
islands that hold an unparalleled natural and cultural wealth. Each island tells a different story:
Bali, with its temples perched between rice fields and volcanoes, enchants visitors with ancient
rituals and artistic traditions passed down through generations.`,
    },
    Laos: {
      title: "Laos: Where Time Flows Slowly and Silence Speaks",
      description: `Laos is like a river flowing slowly, silently, and deeply, far from the frenzy that characterizes
much of Southeast Asia. It is a country that seems to live outside of time, where Buddhist
spirituality permeates daily life and the rhythms of nature still dictate the pace of the days.`,
    },
    Malaysia: {
      title: "Malaysia: A Fusion of Cultures, Nature, and Modernity",
      description: `Malaysia is a fascinating mosaic of cultures, landscapes, and traditions coexisting in harmony,
creating a country with a unique character. It is a land that unites modernity and authenticity: on
one hand, the sparkling skyscrapers of Kuala Lumpur, dominated by the iconic Petronas Twin
Towers; on the other, rural villages, ancient rainforests, and dreamlike islands.`,
    },
    Uzbekistan: {
      title: "Uzbekistan: Treasures of the Silk Road",
      description: `Uzbekistan is a land that tells ancient stories, where each city seems to guard the secrets of a
grand past. At the heart of the Silk Road, this land has seen empires, merchants, and cultures
flourish, intertwining East and West.`,
    },
    Vietnam: {
      title: "Vietnam: A Mosaic of Landscapes and Living History",
      description: `Vietnam is a country that surprises with its vital energy and the contrasts that define it. It is a
long and narrow land, suspended between the South China Sea and the mountain ranges,
revealing itself as a mosaic of landscapes, cultures, and traditions.`,
    },
    Singapore: {
      title: "Singapore: Where Futuristic Vision Meets Rich Heritage",
      description: `Singapore is a dazzling city-state where modernity meets tradition in perfect harmony. Known as 
the "Lion City," this island nation has transformed from a humble fishing village into one of the 
world's most dynamic financial and cultural hubs.`,
    },
  };

  const getCountry = useCallback(async () => {
    try {
      if (!country) {
        return;
      }
      setLoading(true);
      const countryRes = await api.tour.getTour({ country });
      if (countryRes.code === 2000) {
        setCountryItem(countryRes.data);

        // Fetch tour details for region filtering
        if (countryRes.data && countryRes.data.length > 0) {
          const detailPromises = countryRes.data.map(async (t: Tour) => {
            try {
              const { data } = await api.tour.getTourDetail({ tourId: t.tourId });
              return data;
            } catch {
              return null;
            }
          });
          const details = await Promise.all(detailPromises);
          setTourDetails(details);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [country]);

  useEffect(() => {
    void getCountry();
  }, [getCountry]);

  useEffect(() => {
    setSelectedRegion(regionParam);
  }, [regionParam]);

  // Filter tours by region
  const filteredTours = useMemo(() => {
    if (!countryItem || !selectedRegion) return countryItem || [];

    return countryItem.filter((tour, index) => {
      const detail = tourDetails[index];
      if (!detail || !detail.tourDetails?.included) return false;

      const regionItem = detail.tourDetails.included.find(
        (item: { text: string }) => item.text?.startsWith("META_REGION:")
      );

      if (!regionItem) return false;

      const tourRegions = regionItem.text.replace("META_REGION:", "").split(",");
      return tourRegions.includes(selectedRegion);
    });
  }, [countryItem, tourDetails, selectedRegion]);

  const regions = useMemo(() => {
    if (!country) return [];
    const base = countryRegions[country] || [
      { name: "All Regions", slug: "" },
    ];
    // Collect every META_REGION value present on tours actually returned for
    // this country so custom locations added by admin (e.g. "Pai") show up as
    // filter pills automatically without needing a code change here.
    const dynamic = new Set<string>();
    tourDetails.forEach((detail) => {
      const item = detail?.tourDetails?.included?.find(
        (i: { text: string }) => i.text?.startsWith("META_REGION:")
      );
      if (!item) return;
      item.text
        .replace("META_REGION:", "")
        .split(",")
        .map((s: string) => s.trim())
        .filter(Boolean)
        .forEach((r: string) => dynamic.add(r));
    });
    const baseSlugs = new Set(base.map((r) => r.slug).filter(Boolean));
    const extras = Array.from(dynamic)
      .filter((r) => !baseSlugs.has(r))
      .sort((a, b) => a.localeCompare(b))
      .map((r) => ({ name: r, slug: r }));
    return [...base, ...extras];
  }, [country, tourDetails]);
  const data = country
    ? content[country] ||
      (destination
        ? { title: destination.title || country, description: destination.description || "" }
        : null)
    : null;

  return (
    <div>
      <HeroLayout
        className="!bg-[left_0px_top_-130px]"
        image={destination?.coverImageUrl || undefined}
      />
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-24 py-8 md:pt-24 md:pb-32 flex h-max flex-col items-center gap-16">
        {data ? (
          <>
            <div className="flex flex-col items-center text-center">
              <h3 className="font-bold text-xl md:text-4xl mb-9">{data.title}</h3>
              <p className="font-light text-lg md:text-2xl text-[#585858] leading-relaxed max-w-5xl">
                {data.description}
              </p>
            </div>

            {/* Region Filter Tabs */}
            {regions.length > 1 && (
              <div className="flex flex-wrap justify-center gap-3">
                {regions.map((region) => (
                  <Link
                    key={region.slug}
                    href={
                      region.slug
                        ? `/destinations/country?country=${country}&region=${encodeURIComponent(region.slug)}`
                        : `/destinations/country?country=${country}`
                    }
                    className={cn(
                      "px-5 py-2.5 rounded-full text-sm font-medium transition-all border",
                      selectedRegion === region.slug
                        ? "bg-[#BD3E2B] text-white border-[#BD3E2B]"
                        : "bg-white text-gray-700 border-gray-300 hover:border-[#BD3E2B] hover:text-[#BD3E2B]"
                    )}
                  >
                    {region.name}
                  </Link>
                ))}
              </div>
            )}

            {/* Tour Count */}
            <div className="text-center">
              <p className="text-gray-500">
                {selectedRegion ? (
                  <>
                    Showing <span className="font-semibold text-[#333]">{filteredTours.length}</span> tours in{" "}
                    <span className="font-semibold text-[#BD3E2B]">{selectedRegion}</span>
                  </>
                ) : (
                  <>
                    Showing <span className="font-semibold text-[#333]">{countryItem?.length || 0}</span> tours in{" "}
                    <span className="font-semibold text-[#BD3E2B]">{country}</span>
                  </>
                )}
              </p>
            </div>

            {/* Tours Grid */}
            {loading ? (
              <div className="text-center py-10">
                <p className="text-lg text-gray-500">Loading tours...</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-28">
                {(selectedRegion ? filteredTours : countryItem)?.length ? (
                  (selectedRegion ? filteredTours : countryItem)?.map((item, i) => (
                    <TourCard wishlist={item} key={i} />
                  ))
                ) : (
                  <div className="col-span-3 text-center py-10">
                    <p className="text-lg text-gray-500">
                      {selectedRegion
                        ? `No tours available in ${selectedRegion}. Try selecting a different region.`
                        : "No tours available for this destination."}
                    </p>
                  </div>
                )}
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center">
            <h3 className="font-bold text-3xl mb-6 text-gray-600">
              Select a country to explore
            </h3>
          </div>
        )}
      </div>
      <JoinNewSletter />
    </div>
  );
};

export default page;
