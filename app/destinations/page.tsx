import React, { Suspense } from "react";
import HeroLayout from "../about/_components/hero-about";
import destinationhero from "@/assets/images/destination/destination-hero.png";
import JoinNewSletter from "@/components/join-newsletter";
import ContryCard from "./_components/contry-card";

import thai from "@/assets/images/destination/Thai.webp";
import combodia from "@/assets/images/destination/Cambodia.jpg";
import india from "@/assets/images/destination/India.jpg";
import indonesia from "@/assets/images/destination/Indonesia.jpg";
import malarsia from "@/assets/images/destination/Malaysia.webp";
import singapore from "@/assets/images/destination/Singapore.webp";
import vuetnam from "@/assets/images/destination/Vietnam.webp";
import laos from "@/assets/images/destination/laos.jpg";
import brunei from "@/assets/images/destination/brunei.webp";
import Uzbekistan from "@/assets/images/destination/Uzbekistan.jpg";

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeroLayout image={destinationhero.src} title="Destination" />
      <div className="container mx-auto xl:pt-[150px] xl:pb-[200px] py-10 px-4 xl:px-0">
        <div className="grid grid-cols-2 xl:grid-cols-3 gap-4 xl:gap-16">
          <ContryCard image={thai.src} country="Thailand" />
          <ContryCard image={laos.src} country="Laos" />
          <ContryCard image={vuetnam.src} country="Vietnam" />
          <ContryCard image={malarsia.src} country="Malaysia" />
          <ContryCard image={indonesia.src} country="Indonesia" />
          <ContryCard image={singapore.src} country="Singapore" />
          <ContryCard image={india.src} country="India" />
          <ContryCard image={combodia.src} country="Cambodia" />
        </div>
      </div>
      <JoinNewSletter />
    </Suspense>
  );
};

export default page;
