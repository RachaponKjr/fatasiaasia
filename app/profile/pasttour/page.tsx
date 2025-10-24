import React from "react";
import PastTours from "../_components/pasttours";

const page = () => {
  return (
    <div className="container p-4 md:p-0 mx-auto max-w-7xl pt-[72px] flex flex-col gap-20">
      <PastTours tour={[]} />
    </div>
  );
};

export default page;
