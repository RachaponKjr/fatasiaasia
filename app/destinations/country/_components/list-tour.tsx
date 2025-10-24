import TourCard from "@/components/tour-card";

import React, { useCallback, useEffect, useState } from "react";
import { Tour } from "@/types/tour.type";
import api from "@/server";

const ListTour = () => {
  const [tour, setTour] = useState<Tour[]>()

  const getTours = useCallback(async () => {
    const res = await api.tour.getTour()
    if (res.code === 2000) {
      setTour(res.data)
      return
    } else {
      console.error('can not get tour!')
      return
    }
  }, [])

  useEffect(() => {
    void getTours()
  }, [])

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-28">
      {tour?.map((item, i) => (
        <TourCard
          wishlist={item}
          key={i}
        />
      ))}
    </div>
  );
};

export default ListTour;
