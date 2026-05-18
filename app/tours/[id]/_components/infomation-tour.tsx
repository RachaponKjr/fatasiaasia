"use client";
import React, { useCallback, useEffect, useState } from "react";

import table from "@/assets/images/table-test.png";

import { Check, X } from "lucide-react";

import Image from "next/image";

import duration from "@/assets/images/calendar.png";
import tour from "@/assets/images/trekking.png";
import ages from "@/assets/icons/svg/ages.svg";
import group from "@/assets/icons/svg/group-size.svg";
import languages from "@/assets/icons/svg/languages.svg";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Gallery from "./images-show";
import Booking from "./booking";
import Reviews from "./reviews";
import { TourDetail } from "@/types/tour.type";
import Link from "next/link";
import { Star } from "lucide-react";
import { parseTourMeta } from "@/utils/tour-meta";
const InfomationTour = ({
  tourDetail,
  id,
}: {
  tourDetail: TourDetail;
  id: string;
}) => {
  const included = tourDetail?.tourDetails?.included || [];
  const tourMeta = parseTourMeta(included);
  const hotels = tourMeta.hotels || [];
  let durationVal = "Half-Day";
  let groupSizeVal = "Max 10 people";
  let agesVal = "18-65 yrs";
  let languagesVal = "en";
  let tourCategoryVal = "Adventure";

  // Language to country code mapping for flag images
  const languageToCountry: Record<string, { code: string; name: string }> = {
    en: { code: "gb", name: "English" },
    th: { code: "th", name: "Thai" },
    zh: { code: "cn", name: "Chinese" },
    ja: { code: "jp", name: "Japanese" },
    ko: { code: "kr", name: "Korean" },
    vi: { code: "vn", name: "Vietnamese" },
    fr: { code: "fr", name: "French" },
    de: { code: "de", name: "German" },
    es: { code: "es", name: "Spanish" },
    it: { code: "it", name: "Italian" },
    ru: { code: "ru", name: "Russian" },
    ar: { code: "sa", name: "Arabic" },
    hi: { code: "in", name: "Hindi" },
    // Legacy text support
    english: { code: "gb", name: "English" },
    thai: { code: "th", name: "Thai" },
    chinese: { code: "cn", name: "Chinese" },
    japanese: { code: "jp", name: "Japanese" },
    korean: { code: "kr", name: "Korean" },
    vietnamese: { code: "vn", name: "Vietnamese" },
    french: { code: "fr", name: "French" },
    german: { code: "de", name: "German" },
    spanish: { code: "es", name: "Spanish" },
    italian: { code: "it", name: "Italian" },
    italiano: { code: "it", name: "Italian" },
    russian: { code: "ru", name: "Russian" },
    arabic: { code: "sa", name: "Arabic" },
    hindi: { code: "in", name: "Hindi" },
  };

  const filteredIncluded = included.filter((item) => {
    if (item.text.startsWith("META_DURATION:")) {
      durationVal = item.text.replace("META_DURATION:", "");
      return false;
    }
    if (item.text.startsWith("META_GROUPSIZE:")) {
      groupSizeVal = item.text.replace("META_GROUPSIZE:", "");
      return false;
    }
    if (item.text.startsWith("META_AGES:")) {
      agesVal = item.text.replace("META_AGES:", "");
      return false;
    }
    if (item.text.startsWith("META_LANGUAGES:")) {
      languagesVal = item.text.replace("META_LANGUAGES:", "");
      return false;
    }
    if (item.text.startsWith("META_CATEGORY:")) {
      tourCategoryVal = item.text.replace("META_CATEGORY:", "");
      return false;
    }
    // Filter out META_BEACHTOUR - don't display it
    if (item.text.startsWith("META_BEACHTOUR:")) {
      return false;
    }
    // Filter out META_REGION - don't display it
    if (item.text.startsWith("META_REGION:")) {
      return false;
    }
    // Catch-all: hide any other META_* markers (CHILDPRICE, WEEKDAYS, HOTELS_JSON, etc.)
    if (item.text.startsWith("META_")) {
      return false;
    }
    return true;
  });

  return (
    <div className="flex flex-col xl:flex-row gap-8 xl:gap-16">
      {/* ข้อมูล booking */}
      <div className="w-full max-w-4xl flex flex-col items-start gap-2 xl:gap-5">
        <h1 className="font-bold text-xl xl:text-4xl text-[#333333]">
          {tourDetail?.title}
        </h1>
        <div className="grid grid-cols-2 gap-x-2 gap-y-3 sm:gap-x-4 sm:gap-y-4 xl:gap-8 xl:grid-cols-4">
          <div className="flex gap-2 items-center">
            <Image src={duration} alt="" width={59} height={59} />
            <div>
              <h6 className="text-[#333333] font-normal text-xs xl:text-xs">
                Duration
              </h6>
              <span className="text-xs xl:text-sm font-normal text-nowrap text-[#717171]">
                {durationVal}
              </span>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <Image src={ages} alt="" width={40} height={40} />
            <div>
              <h6 className="text-[#333333] font-normal text-xs xl:text-sm text-nowrap">
                Suitable For
              </h6>
              <span className="text-xs xl:text-sm font-normal text-nowrap text-[#717171]">
                {agesVal}
              </span>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <Image src={languages} alt="" width={35} height={35} />
            <div>
              <h6 className="text-[#333333] font-normal text-xs xl:text-sm text-nowrap">
                Guide Language
              </h6>
              <div className="flex gap-2 items-center flex-wrap">
                {/* Deduplicate languages by country code */}
                {(() => {
                  const seen = new Set<string>();
                  return languagesVal.split(",").map((lang, idx) => {
                    const langKey = lang.trim().toLowerCase();
                    const langData = languageToCountry[langKey];
                    if (langData) {
                      // Skip if we already showed this country's flag
                      if (seen.has(langData.code)) return null;
                      seen.add(langData.code);
                      return (
                        <img
                          key={idx}
                          src={`https://flagcdn.com/24x18/${langData.code}.png`}
                          srcSet={`https://flagcdn.com/48x36/${langData.code}.png 2x`}
                          width="24"
                          height="18"
                          alt={langData.name}
                          title={langData.name}
                          className="rounded-sm shadow-sm"
                        />
                      );
                    }
                    // Fallback for unrecognized languages (also dedupe)
                    if (seen.has(langKey)) return null;
                    seen.add(langKey);
                    return (
                      <span key={idx} className="text-xs text-[#717171] bg-gray-100 px-2 py-0.5 rounded">
                        {lang.trim()}
                      </span>
                    );
                  });
                })()}
              </div>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <Image src={tour} alt="" width={50} height={50} />
            <div>
              <h6 className="text-[#333333] font-normal text-xs xl:text-sm text-nowrap">
                Tour Category
              </h6>
              <Link
                href={`/tours?category=${tourCategoryVal?.toLowerCase().includes("beach") ? "beach" : tourCategoryVal?.toLowerCase().includes("culture") ? "culture" : tourCategoryVal?.toLowerCase().includes("nature") ? "nature" : tourCategoryVal?.toLowerCase().includes("local") ? "local" : tourCategoryVal?.toLowerCase().includes("cities") ? "cities" : tourCategoryVal?.toLowerCase().includes("wellness") ? "wellness" : ""}`}
                className="text-xs xl:text-sm font-normal text-nowrap text-[#BD3E2B] hover:underline"
              >
                {tourCategoryVal}
              </Link>
            </div>
          </div>
        </div>
        {/* Images */}
        {tourDetail && <Gallery galleryUrls={tourDetail?.galleryUrls} />}
        <div className="flex flex-col gap-4 xl:gap-14 xl:my-14">
          {/* Tour Overview */}
          <div className="flex flex-col gap-2 xl:gap-6 text-[#333333]">
            <h4 className="font-bold text-xl xl:text-3xl">Tour Overview</h4>
            <div
              className="font-normal text-xs xl:text-sm leading-loose"
              dangerouslySetInnerHTML={{ __html: tourDetail?.overview || "" }}
            />
          </div>
          {/* Tour Highlights */}
          <div className="flex flex-col gap-2 xl:gap-6 text-[#333333]">
            <h4 className="font-bold text-xl xl:text-3xl">Tour Highlights</h4>
            <div
              className="font-normal text-xs xl:text-sm leading-loose"
              dangerouslySetInnerHTML={{ __html: tourDetail?.highlight || "" }}
            />
          </div>
        </div>
        {/* Itinerary */}
        <div className="flex flex-col gap-2 xl:gap-6 text-[#333333] w-full">
          <h4 className="font-bold text-xl xl:text-3xl">Itinerary</h4>
          <div className="w-full ">
            <Accordion type="multiple" className="gap-5 flex flex-col w-full">
              {tourDetail?.itineraries.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={`itineraries-${index}`}
                  className="cursor-pointer"
                >
                  <AccordionTrigger>
                    Day {index + 1}: {item.title.replace(/^Day\s*\d+[:\s-]*\s*/i, "")}
                  </AccordionTrigger>
                  <AccordionContent className="space-y-4">
                    <div dangerouslySetInnerHTML={{ __html: item.detail }} />
                    {item.images && item.images.length > 0 && (
                      <div>
                        {item.images.filter((img) => img && img.trim() !== "").map((image, imgIndex) => (
                          <Image
                            key={imgIndex}
                            src={`${image}`}
                            alt={`Day ${index + 1} itinerary photo ${imgIndex + 1}`}
                            width={500}
                            height={500}
                          />
                        ))}
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>

        <div className="flex flex-col xl:flex-row gap-8 xl:gap-16">
          <div className="flex flex-col gap-6 flex-1">
            <h4 className="text-2xl xl:text-[30px] text-[#319E8B] font-bold">
              Included
            </h4>
            <div className="flex flex-col gap-4">
              {filteredIncluded.map((item, index) => (
                <div key={index} className="flex gap-4 items-center">
                  <div className="w-6 h-6 rounded-full bg-[#319E8B] flex items-center justify-center flex-shrink-0">
                    <Check color="white" size={14} />
                  </div>
                  <span className="text-[#333333] text-sm xl:text-base">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-10">
            <div className="flex flex-col gap-6">
              <h6 className="font-bold text-2xl xl:text-[30px] text-[#ED021A]">Not Included</h6>
              <div className="flex flex-col gap-4">
                {tourDetail?.tourDetails.notIncluded.map((item, index) => (
                  <div key={index} className="flex gap-4 items-center">
                    <div className="w-6 h-6 rounded-full bg-[#ED021A] flex items-center justify-center flex-shrink-0">
                      <X color="white" size={14} />
                    </div>
                    <span className="text-[#333333] text-sm xl:text-base">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <h6 className="font-bold text-xl text-[#319E8B]">
                What to bring
              </h6>
              <div className="flex gap-6 items-center">
                <div className="px-2 rounded-full bg-[#319E8B]">
                  <Check color="white" size={18} />
                </div>
                <p className="text-[#333333]">
                  {tourDetail?.tourDetails.whatToBring}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Accommodation */}
        {hotels.length > 0 && (
          <div className="flex flex-col gap-6 text-[#333333] w-full">
            <div className="flex flex-col gap-2">
              <h4 className="font-bold text-xl xl:text-3xl">Where You&apos;ll Stay</h4>
              <p className="text-sm xl:text-base text-[#555555]">
                These are the hotels we&apos;ve hand-picked for this tour. Pricing
                varies by date and room type &mdash; please contact us and we&apos;ll
                arrange the perfect stay for you.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 xl:gap-6">
              {hotels.map((h, i) => (
                <div
                  key={h.id ?? `${h.name}-${i}`}
                  className="flex flex-col rounded-2xl overflow-hidden bg-white border border-[#E5E7EB] shadow-sm"
                >
                  {h.image ? (
                    <div className="relative w-full aspect-[4/3] bg-neutral-100">
                      <Image
                        src={h.image}
                        alt={h.name}
                        fill
                        className="object-cover"
                        sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                      />
                    </div>
                  ) : null}
                  <div className="flex flex-col gap-3 p-4 xl:p-5 flex-1">
                    <div className="flex flex-col gap-1">
                      <h5 className="font-bold text-lg xl:text-xl text-[#111827]">
                        {h.name}
                      </h5>
                      {h.locationName || h.location ? (
                        <p className="text-sm text-[#6B7280]">
                          {h.locationName || h.location}
                        </p>
                      ) : null}
                      {h.stars ? (
                        <div className="flex items-center gap-0.5 mt-1">
                          {Array.from({ length: Math.min(5, Number(h.stars) || 0) }).map((_, idx) => (
                            <Star
                              key={idx}
                              size={16}
                              className="fill-[#F5B301] text-[#F5B301]"
                            />
                          ))}
                        </div>
                      ) : null}
                    </div>
                    {h.description ? (
                      <p className="text-sm text-[#4B5563] line-clamp-3">
                        {h.description}
                      </p>
                    ) : null}
                    <div className="mt-auto pt-2">
                      <Link href="/contact" className="inline-block w-full">
                        <Button className="w-full bg-[#319E8B] hover:bg-[#27806f] text-white">
                          Contact us to arrange your stay
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tour Map */}
        {/* <div className="flex flex-col gap-6 text-[#333333] w-full">
              <h4 className="font-bold text-2xl xl:text-3xl">Tour Map</h4>
              <div className="w-full aspect-[16/10] bg-neutral-100 rounded-3xl relative overflow-hidden">
                <Image
                  src={map}
                  alt=""
                  fill
                  objectFit="cover"
                  className="bg-contain"
                />
              </div>
            </div> */}

        {/* ---- v2 invoice scope: FAQs, Travel Tips, Packing List, Map, Reviews ---- */}
        {Array.isArray(tourDetail?.tourDetails?.travelTips) &&
          tourDetail.tourDetails.travelTips.length > 0 && (
            <div className="flex flex-col gap-4 text-[#333333] w-full">
              <h4 className="font-bold text-2xl xl:text-3xl">Travel Tips</h4>
              <ul className="list-disc pl-6 flex flex-col gap-2">
                {tourDetail.tourDetails.travelTips.map((t, i) => (
                  <li key={i}>{t}</li>
                ))}
              </ul>
            </div>
          )}

        {Array.isArray(tourDetail?.tourDetails?.packingList) &&
          tourDetail.tourDetails.packingList.length > 0 && (
            <div className="flex flex-col gap-4 text-[#333333] w-full">
              <h4 className="font-bold text-2xl xl:text-3xl">What to Pack</h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {tourDetail.tourDetails.packingList.map((item, i) => (
                  <li key={i} className="flex gap-2 items-start">
                    <Check className="w-5 h-5 text-[#319E8B] mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

        {Array.isArray(tourDetail?.tourDetails?.faqs) &&
          tourDetail.tourDetails.faqs.length > 0 && (
            <div className="flex flex-col gap-4 text-[#333333] w-full">
              <h4 className="font-bold text-2xl xl:text-3xl">FAQs</h4>
              <Accordion type="multiple" className="gap-3 flex flex-col w-full">
                {tourDetail.tourDetails.faqs.map((faq, i) => (
                  <AccordionItem
                    key={i}
                    value={`faq-${i}`}
                    className="border rounded-2xl px-4"
                  >
                    <AccordionTrigger className="font-semibold">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent>{faq.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          )}

        {tourDetail?.tourDetails?.coordinates &&
          typeof tourDetail.tourDetails.coordinates.lat === "number" &&
          typeof tourDetail.tourDetails.coordinates.lng === "number" && (
            <div className="flex flex-col gap-4 text-[#333333] w-full">
              <h4 className="font-bold text-2xl xl:text-3xl">Tour Map</h4>
              <div className="w-full aspect-[16/10] rounded-3xl overflow-hidden border">
                <iframe
                  title="Tour location"
                  width="100%"
                  height="100%"
                  loading="lazy"
                  src={`https://www.openstreetmap.org/export/embed.html?bbox=${
                    tourDetail.tourDetails.coordinates.lng - 0.05
                  }%2C${tourDetail.tourDetails.coordinates.lat - 0.05}%2C${
                    tourDetail.tourDetails.coordinates.lng + 0.05
                  }%2C${tourDetail.tourDetails.coordinates.lat + 0.05}&layer=mapnik&marker=${
                    tourDetail.tourDetails.coordinates.lat
                  }%2C${tourDetail.tourDetails.coordinates.lng}`}
                />
              </div>
            </div>
          )}

        <Reviews tourId={Number(id)} />
      </div>
      {/* booking */}
      <Booking tourId={Number(id)} tourdetail={tourDetail as TourDetail} />
    </div>
  );
};

export default InfomationTour;
