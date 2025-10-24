import React from "react";
import TourItem from "./tour-item";
import past from "@/assets/icons/menu/past.png";
import Image from "next/image";

const PastTours = ({ tour }: { tour: any[] }) => {
  // ถ้าไม่มีข้อมูล
  if (!tour || tour.length === 0) {
    return (
      <div className="flex flex-col gap-10">
        <div className="flex gap-2 items-center">
          <Image src={past} alt="" width={40} height={40} />
          <h5 className="text-2xl md:text-4xl font-bold text-[#333333]">Past Tours</h5>
        </div>
        <div className="text-center py-10 text-gray-500 text-lg">
          ไม่พบข้อมูลทัวร์ของคุณ
        </div>
      </div>
    );
  }

  // ถ้ามีข้อมูล
  return (
    <div className="flex flex-col gap-10">
      <div className="flex gap-2 items-center">
        <Image src={past} alt="" width={40} height={40} />
        <h5 className="text-4xl font-bold text-[#333333]">Past Tours</h5>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 items-center">
        {tour.map((item, index) => (
          <TourItem key={index} booking={item} />
        ))}
      </div>
    </div>
  );
};

export default PastTours;
