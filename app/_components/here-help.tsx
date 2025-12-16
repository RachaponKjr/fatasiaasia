import Image from "next/image";
import React from "react";

const HereHelp = () => {
  return (
    <div className="container mx-auto px-4 xl:px-0">
      <div className="w-full overflow-hidden rounded-2xl">
        <Image
          src="/NewATT2.png"
          alt="Transportation Services"
          width={1600}
          height={500}
          className="w-full h-auto object-cover"
        />
      </div>
    </div>
  );
};

export default HereHelp;

