import JoinNewSletter from "@/components/join-newsletter";
import Image from "next/image";
import HeroSection from "./_components/hero-section";
import Trending from "./_components/trending";
import Adventure from "./_components/adventure";
import Packages from "./_components/packages";
import WhyChoose from "./_components/why-choose";
import Client from "./_components/client";
import BaseService from "./_components/base-service";
import FollowFantasiaasia from "./_components/follow-fantasiaasia";
import BeachPackages from "./_components/beach-packages";

export default function Home() {
  return (
    <div className="overflow-hidden">
      <HeroSection />
      <div className="container mx-auto py-10 xl:py-20 flex flex-col gap-10 xl:gap-32 2xl:px-20">
        <Trending />
        <Adventure />
        <Packages />
        <WhyChoose />
        <BaseService />
        <BeachPackages />
        <FollowFantasiaasia />
        <Client />
      </div>
      <JoinNewSletter />
    </div>
  );
}
