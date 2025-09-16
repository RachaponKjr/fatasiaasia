"use client";
import React from "react";
import HeroLayout from "../../about/_components/hero-about";
import JoinNewSletter from "@/components/join-newsletter";
import ListTour from "./_components/list-tour";
import { useSearchParams } from "next/navigation";
const page = () => {
  const param = useSearchParams();
  const country = param.get("country");
  return (
    <div>
      <HeroLayout className="!bg-[left_0px_top_-130px]" />
      <div className="container mx-auto pt-24 pb-32 flex h-screen flex-col items-center gap-32">
        {country === "Thailand" && (
          <>
            <div className="flex flex-col items-center">
              <h3 className="font-bold text-4xl mb-9">
                Explore Thailand famous places
              </h3>
              <p className="font-light text-2xl text-[#585858] leading-relaxed">
                Thailand, known as the "Land of Smiles," offers a captivating
                blend of rich cultural heritage, historical landmarks,
                <br /> and vibrant tourism. Bangkok, the bustling
                capital,features attractions like the Grand Palace and Wat Pho,
                <br /> alongside lively markets, street food, and nightlife.
                Chiang Mai, in the north, is famous for its ancient temples,
                <br /> traditionalcrafts, and the scenic Wat Phra That Doi
                Suthep.
                <br />
                Phuket and Krabi's islands offer stunning beaches and
                crystal-clear waters, ideal for snorkeling and diving.
                <br /> Historical sites like Ayutthaya and
                <br /> Sukhothai showcase Thailand's rich heritage with
                impressive ruins and temples. Cultural festivals such as
                Songkran andLoy Krathong, along with Thailand's renowned
                cuisine, add to
                <br /> the country's allure. Nature enthusiasts can explore lush
                national parks and experience hill tribe cultures in the north,
                making Thailand an enriching travel destination.
              </p>
            </div>
            <ListTour />
          </>
        )}
      </div>
      <JoinNewSletter />
    </div>
  );
};

export default page;
