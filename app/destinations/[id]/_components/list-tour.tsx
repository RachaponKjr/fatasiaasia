import TourCard from "@/components/tour-card";
import React from "react";

const ListTour = () => {
  return (
    <div className="grid grid-cols-3 gap-28">
      <TourCard />
      <TourCard />
      <TourCard />
      <TourCard />
      <TourCard />
    </div>
  );
};

export default ListTour;
