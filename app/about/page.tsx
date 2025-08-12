import React from "react";
import JoinNewSletter from "@/components/join-newsletter";
import FollowFantasiaasia from "../_components/follow-fantasiaasia";

import BoxDetail from "./_components/box-detail";
import experienced from "@/assets/images/about/exoerienced.jpg";
import HeroLayout from "./_components/hero-about";
import heroabout from "@/assets/images/banner/about.png";
import PolaroidGallery from "@/components/polaroidgallery";

const page = () => {
  const samplePhotos: any = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
      alt: "Beautiful sunset",
      caption: "สวยงามมาก! 🌅",
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400&h=300&fit=crop",
      alt: "Mountain landscape",
      caption: "เดินทางสนุกสุด",
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop",
      alt: "Beach vacation",
      caption: "วันหยุดที่ดีที่สุด ⛱️",
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=400&h=300&fit=crop",
      alt: "Group photo",
      caption: "เพื่อนๆ สุดเท่!",
    },
  ];
  return (
    <div>
      <HeroLayout image={heroabout.src} title="About us" />
      <div className="container mx-auto py-20 flex flex-col gap-32 2xl:px-20">
        <p className="text-center text-2xl text-[#333333] font-normal">
          Traveling is more than just visiting some attractions; we believe it
          should be a complete, life-changing
          <br /> experience. This is exactly what we offer you at Fantasia Asia,
          because we are travellers like you with more <br />
          than 20 years of experience exploring the Southeast Asia,
          <br /> and we know what traveling should be like.
        </p>
        <BoxDetail
          image={experienced.src}
          title="Experienced Travellers,At Your Disposal"
          detail="Our head quarter is in Krabi, Southern Thailand but our team is spread through other SEA countries like Vietnam,Cambodia and Laos. We have been traveling across this region for 20+ years, therefore we know all the secrets of theselands...and we will happily share them with you."
        />
        <div className="flex flex-col items-center justify-center">
          <PolaroidGallery photos={samplePhotos} />
          <p className="mt-24 text-center max-w-4xl text-2xl text-[#333333]">
            We understand your passions, your needs and preferences, and you
            will feel it once you join any of tours. All of of our experience
            and knowledge, at your disposal.
          </p>
        </div>
        <BoxDetail
          image={experienced.src}
          className="flex-row-reverse"
          title="Exclusive Tours that You Will Not Find Anywhere Else"
          detail="Since we know the secrets of the countries and cities we bring you to visit, our tours are exdive: they take you in places and make you live experiences that conventional tours don't. Take it for granted.Our mission is to offer you a life-changing experience with every single one of our tours, and that is exactly why you will enjoy them."
        />
        <BoxDetail
          image={experienced.src}
          title="Ideal Itinerary, All the Services Included"
          detail="To bring you the smoothest and most exciting experience, we have designed the perfect itinerary for each tours. We havedone it based on feedbacks and our own knowledge acquired throughout the years. All of our tour quides speak perfect English and have plenty of experience, therefore they will be able to explain everything you need to know and answer all the questions you might have. Furthermore, you will be provided with all the essential services to guarantee your safety, comfort and enjoyment."
        />
      </div>
      <FollowFantasiaasia />
      <JoinNewSletter />
    </div>
  );
};

export default page;
