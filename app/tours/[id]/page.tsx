import React from "react";
import Backstep from "./_components/backstep";
import JoinNewSletter from "@/components/join-newsletter";

import HereHelp from "@/app/_components/here-help";
import AlsoLike from "./_components/also-like";
import InfomationTour from "./_components/infomation-tour";
import api from "@/server";
import { getSiteCms } from "@/lib/site-images";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const [{ data: tour }, siteCms] = await Promise.all([
    api.tour.getTourDetail({ tourId: Number(id) }),
    getSiteCms(),
  ]);
  const { content: siteContent, images: siteImages } = siteCms;
  const hereHelpImage = siteImages["home.here_help.image"];
  return (
    <>
      <div className="container mx-auto px-4 xl:px-0 py-10 xl:py-20 flex gap-4 xl:gap-8 flex-col 2xl:px-20">
        <Backstep />
        <InfomationTour tourDetail={tour} id={id} />
        <div className="my-10 xl:my-[100px]">
          <HereHelp imageUrl={hereHelpImage?.url} imageAlt={hereHelpImage?.alt} />
        </div>
        <div className="mb-28">
          <AlsoLike currentTour={tour} />
        </div>
      </div>
      <JoinNewSletter
        imageUrl={siteImages["site.newsletter.background"]?.url}
        headline={siteContent["site.newsletter"]?.headline}
        description={siteContent["site.newsletter"]?.description}
      />
    </>
  );
};

export default page;
