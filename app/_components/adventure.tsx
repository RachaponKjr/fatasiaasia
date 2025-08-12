import React from "react";
import LayoutSection from "./layout-section";

const Adventure = () => {
  return (
    <LayoutSection title="Adventure & Activity">
      <div className="grid grid-cols-5 gap-10">
        {Array.from({ length: 5 }).map((_, i) => (
          <div className="bg-white rounded-3xl grow py-16 flex flex-col items-center justify-center gap-4 shadow-lg">
            <div className="w-[130px] aspect-square bg-neutral-100" />
            <span className="text-[#333333] font-semibold text-sm">
              Adventure
            </span>
          </div>
        ))}
      </div>
    </LayoutSection>
  );
};

export default Adventure;
