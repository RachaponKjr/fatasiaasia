import { cn } from "@/lib/utils";
import React from "react";

const HeroLayout = ({
  image,
  title,
  className,
}: {
  image: string;
  title: string;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "w-full aspect-[16/5] bg-center bg-cover flex justify-center items-center relative",
        className
      )}
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="w-full h-full bg-gradient-to-b from-white from-5% to-transparent absolute" />
      <h1 className="font-bold text-6xl text-[#333333] z-10">{title}</h1>
    </div>
  );
};

export default HeroLayout;
