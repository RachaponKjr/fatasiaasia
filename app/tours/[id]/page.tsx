import React from "react";
import Backstep from "./_components/backstep";
import JoinNewSletter from "@/components/join-newsletter";

import HereHelp from "@/app/_components/here-help";
import AlsoLike from "./_components/also-like";
import InfomationTour from "./_components/infomation-tour";
import api from "@/server";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const { data: tour } = await api.tour.getTourDetail({
    tourId: Number(id),
  });
  return (
    <>
      <div className="container mx-auto px-4 xl:px-0 py-10 xl:py-20 flex gap-4 xl:gap-8 flex-col 2xl:px-20">
        <Backstep />
        <InfomationTour tourDetail={tour} id={id} />
        <div className="my-10 xl:my-[100px]">
          <HereHelp />
        </div>
        <div className="mb-28">
          <AlsoLike />
        </div>
      </div>
      <JoinNewSletter />
    </>
  );
};

export default page;
