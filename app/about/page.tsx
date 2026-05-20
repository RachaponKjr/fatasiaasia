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
import { getSiteImage } from "@/lib/site-images";

const page = async () => {
  const heroOverride = await getSiteImage("about.hero.image");
  const samplePhotos: any = [
    {
      id: 1,
      src: showimage1.src,
      alt: "Beautiful sunset",
      caption: "สวยงามมาก! 🌅",
    },
    {
      id: 2,
      src: showimage2.src,
      alt: "Mountain landscape",
      caption: "เดินทางสนุกสุด",
    },
    {
      id: 3,
      src: showimage3.src,
      alt: "Beach vacation",
      caption: "วันหยุดที่ดีที่สุด ⛱️",
    },
    {
      id: 4,
      src: showimage4.src,
      alt: "Group photo",
      caption: "เพื่อนๆ สุดเท่!",
    },
  ];
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeroLayout image={heroOverride?.url || heroabout.src} title="About us" />
      <div className="w-full py-10 xl:py-20 px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-24 flex flex-col gap-8 xl:gap-32">
        <p className="text-center text-base xl:text-2xl text-[#333333] font-normal">
          Traveling is more than simply visiting attractions; it is a profound, life-changing experience. This
          <br /> core belief drives everything we offer at Fantasia Asia. As avid travelers ourselves, we bring over 20
          <br /> years of hands-on experience exploring Asia and crafting journeys that truly reflect what travel
          <br /> should be.
        </p>
        <BoxDetail
          image={experienced.src}
          title="Experienced Travelers, Always Available"
          detail="Our headquarters is located in Krabi, Southern Thailand, but our dedicated team is strategically spread across Asia, including key Southeast Asian countries such as Vietnam, Cambodia, and Laos. With over 20 years of continuous travel throughout this region, we possess deep local knowledge and happily share the secrets of these incredible lands with you."
        />
        <div className="flex flex-col items-center justify-center">
          <PolaroidGallery photos={samplePhotos} />
          <p className="mt-8 xl:mt-24 text-center max-w-4xl text-lg xl:text-2xl text-[#333333]">
            We fully understand your passions, needs, and preferences. You will feel the difference the moment
            you join any of our tours. Our extensive experience and knowledge are entirely at your disposal.
          </p>
        </div>
        <BoxDetail
          image={anywhere.src}
          className="flex-col items-end xl:flex-row-reverse"
          title="Exclusive Journeys You Won't Find Anywhere Else"
          detail="Because we know the deepest secrets of the destinations we feature, our tours are truly exclusive. We take you to places and deliver experiences that conventional itineraries simply cannot match. Our mission is to ensure every single tour offers you a life-changing experience, and that is precisely why you will enjoy traveling with us."
        />
        <BoxDetail
          image={included.src}
          title="Perfect Itineraries, All Services Included"
          detail="To ensure you have the smoothest and most exciting experience, we have meticulously designed the ideal itinerary for every tour. These routes are based on years of direct experience and valuable customer feedback. Our professional tour guides are fluent in English, highly experienced, and ready to explain everything you need to know and answer all your questions. Moreover, you will be provided with all the essential services to guarantee your safety, comfort, and ultimate enjoyment."
        />
      </div>
      <FollowFantasiaasia />
      <JoinNewSletter />
    </Suspense>
  );
};

export default page;
