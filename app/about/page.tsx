import React, { Suspense } from "react";
import JoinNewSletter from "@/components/join-newsletter";
import FollowFantasiaasia from "../_components/follow-fantasiaasia";

import BoxDetail from "./_components/box-detail";

import experienced from "@/assets/images/about/exoerienced.webp";
import anywhere from "@/assets/images/about/anywhere.webp";
import included from "@/assets/images/about/included.webp";
import showimage1 from "@/assets/images/about/showimage1.jpg";
import showimage2 from "@/assets/images/about/showimage2.jpg";
import showimage3 from "@/assets/images/about/showimage3.jpg";
import showimage4 from "@/assets/images/about/showimage4.jpg";

import HeroLayout from "./_components/hero-about";
import heroabout from "@/assets/images/banner/about.webp";
import PolaroidGallery from "@/components/polaroidgallery";
import { getSiteCms } from "@/lib/site-images";

const page = async () => {
  const { content: siteContent, images: siteImages } = await getSiteCms();
  const text = (key: string) => siteContent[key];
  const samplePhotos: any = [
    {
      id: 1,
      src: siteImages["about.gallery.image1"]?.url || showimage1.src,
      alt: "Beautiful sunset",
      caption: "สวยงามมาก! 🌅",
    },
    {
      id: 2,
      src: siteImages["about.gallery.image2"]?.url || showimage2.src,
      alt: "Mountain landscape",
      caption: "เดินทางสนุกสุด",
    },
    {
      id: 3,
      src: siteImages["about.gallery.image3"]?.url || showimage3.src,
      alt: "Beach vacation",
      caption: "วันหยุดที่ดีที่สุด ⛱️",
    },
    {
      id: 4,
      src: siteImages["about.gallery.image4"]?.url || showimage4.src,
      alt: "Group photo",
      caption: "เพื่อนๆ สุดเท่!",
    },
  ];
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeroLayout
        image={siteImages["about.hero.image"]?.url || heroabout.src}
        title={text("about.intro")?.headline || "About us"}
        aspectRatio="1620 / 1080"
      />
      <div className="w-full py-10 xl:py-20 px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-24 flex flex-col gap-8 xl:gap-32">
        <p className="text-center text-base xl:text-2xl text-[#333333] font-normal">
          {text("about.intro")?.description ||
            "Traveling is more than simply visiting attractions; it is a profound, life-changing experience. This core belief drives everything we offer at Fantasia Asia. As avid travelers ourselves, we bring over 20 years of hands-on experience exploring Asia and crafting journeys that truly reflect what travel should be."}
        </p>
        <BoxDetail
          image={siteImages["about.detail.experienced.image"]?.url || experienced.src}
          title={
            text("about.detail.experienced")?.headline ||
            "Experienced Travelers, Always Available"
          }
          detail={
            text("about.detail.experienced")?.description ||
            "Our headquarters is located in Krabi, Southern Thailand, but our dedicated team is strategically spread across Asia, including key Southeast Asian countries such as Vietnam, Cambodia, and Laos. With over 20 years of continuous travel throughout this region, we possess deep local knowledge and happily share the secrets of these incredible lands with you."
          }
        />
        <div className="flex flex-col items-center justify-center">
          <PolaroidGallery photos={samplePhotos} />
          <p className="mt-8 xl:mt-24 text-center max-w-4xl text-lg xl:text-2xl text-[#333333]">
            {text("about.gallery")?.description ||
              "We fully understand your passions, needs, and preferences. You will feel the difference the moment you join any of our tours. Our extensive experience and knowledge are entirely at your disposal."}
          </p>
        </div>
        <BoxDetail
          image={siteImages["about.detail.exclusive.image"]?.url || anywhere.src}
          className="flex-col items-end xl:flex-row-reverse"
          title={
            text("about.detail.exclusive")?.headline ||
            "Exclusive Journeys You Won't Find Anywhere Else"
          }
          detail={
            text("about.detail.exclusive")?.description ||
            "Because we know the deepest secrets of the destinations we feature, our tours are truly exclusive. We take you to places and deliver experiences that conventional itineraries simply cannot match. Our mission is to ensure every single tour offers you a life-changing experience, and that is precisely why you will enjoy traveling with us."
          }
        />
        <BoxDetail
          image={siteImages["about.detail.included.image"]?.url || included.src}
          title={
            text("about.detail.included")?.headline ||
            "Perfect Itineraries, All Services Included"
          }
          detail={
            text("about.detail.included")?.description ||
            "To ensure you have the smoothest and most exciting experience, we have meticulously designed the ideal itinerary for every tour. These routes are based on years of direct experience and valuable customer feedback. Our professional tour guides are fluent in English, highly experienced, and ready to explain everything you need to know and answer all your questions. Moreover, you will be provided with all the essential services to guarantee your safety, comfort, and ultimate enjoyment."
          }
        />
      </div>
      <FollowFantasiaasia
        iconUrl={siteImages["home.follow_youtube.icon"]?.url}
        headline={text("home.follow_youtube")?.headline}
        description={text("home.follow_youtube")?.description}
      />
      <JoinNewSletter
        imageUrl={siteImages["site.newsletter.background"]?.url}
        headline={text("site.newsletter")?.headline}
        description={text("site.newsletter")?.description}
      />
    </Suspense>
  );
};

export default page;
