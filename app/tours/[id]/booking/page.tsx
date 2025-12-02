import React from "react";
import BookingPage from "./_components/booking";
import api from "@/server";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const { data: tourDetail } = await api.tour.getTourDetail({
    tourId: Number(id),
  });
  return (
    <div className="container mx-auto max-w-7xl flex flex-col gap-32 my-12 lg:my-32">
      <div className="w-full">
        <BookingPage tourDetail={tourDetail} />
      </div>
    </div>
  );
};

export default page;
