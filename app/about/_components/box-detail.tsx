import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

const BoxDetail = ({
  className,
  image,
  title,
  detail,
}: {
  className?: string;
  image: string;
  title: string;
  detail: string;
}) => {
  return (
    <div
      className={cn(
        `flex flex-col xl:flex-row items-start xl:items-center gap-4 xl:gap-12`,
        className
      )}
    >
      <div className="w-[225px] h-[200px] xl:w-[625px] xl:h-[500px] shrink-0 relative overflow-hidden rounded-tr-[60%]">
        <Image
          src={image}
          alt=""
          fill
          className="object-cover object-bottom"
          unoptimized={image.startsWith("http")}
        />
      </div>
      <div className="max-w-xl flex flex-col gap-4 xl:gap-6">
        <h2 className="text-xl xl:text-4xl font-bold text-blacks">{title}</h2>
        <p className="text-base xl:text-xl text-[#333333]">{detail}</p>
      </div>
    </div>
  );
};

export default BoxDetail;
