import React from "react";
import HeroLayout from "../about/_components/hero-about";
import destinationhero from "@/assets/images/destination/destination-hero.png";
import JoinNewSletter from "@/components/join-newsletter";
import ContryCard from "./_components/contry-card";
const page = () => {
  return (
    <div>
      <HeroLayout image={destinationhero.src} title="Destination" />
      <div className="container mx-auto pt-[150px] pb-[200px]">
        <div className="grid grid-cols-3 gap-16">
          <ContryCard />
          <ContryCard />
          <ContryCard />
          <ContryCard />
          <ContryCard />
        </div>
      </div>
      <JoinNewSletter />
    </div>
  );
};

export default page;
