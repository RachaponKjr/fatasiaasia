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
    <div className={cn(`flex flex-row items-center gap-12`, className)}>
      <div className="w-[625px] h-[500px] shrink-0 relative overflow-hidden rounded-tr-[60%]">
        <Image
          src={image}
          alt=""
          fill
          objectFit="cover"
          objectPosition="center"
        />
      </div>
      <div className="max-w-xl flex flex-col gap-6">
        <h2 className="text-4xl font-bold text-blacks">{title}</h2>
        <p className="text-xl text-[#333333]">{detail}</p>
      </div>
    </div>
  );
};

export default BoxDetail;
