"use client";
import BoxFollowVideo from "@/components/box-follow-video";
import Image from "next/image";
import React from "react";
import ReactPlayer from "react-player";

import youtube from "@/assets/images/youtube.png";

const FollowFantasiaasia = () => {
  return (
    <div className="w-screen -mx-[calc((100vw-100%)/2)] bg-[#FFF3E1] ">
      <div className="container mx-auto py-20">
        <div className="bg-white !px-4 xl:px-14 py-10 xl:py-20 md:rounded-3xl flex flex-col gap-4 xl:gap-14">
          <div className="flex items-center justify-center gap-4">
            {/* YoutubeImage */}
            <Image
              src={youtube}
              alt=""
              width={70}
              height={70}
              className="w-[50px] h-[50px] md:w-[70px] md:h-[70px]"
            />
            <h3 className="text-[#333333] font-bold text-nowrap text-xl xl:text-[42px]">
              Follow Fantasiaasia on Youtube
            </h3>
          </div>
          <div className="flex flex-col-reverse xl:flex-row gap-4 ">
            <div className="flex flex-col gap-2 justify-between">
              <BoxFollowVideo
                youtube={"https://www.youtube.com/watch?v=YC3UtNPVL5Q"}
              />
              <BoxFollowVideo
                youtube={"https://www.youtube.com/watch?v=t0pafVU3EhY"}
              />
              <BoxFollowVideo
                youtube={"https://www.youtube.com/watch?v=3-UBBZwjn1M"}
              />
              <BoxFollowVideo
                youtube={"https://www.youtube.com/watch?v=5iIIE04DDhU"}
              />
            </div>
            <div className="w-full xl:w-7/12 aspect-video xl:aspect-[16/9] overflow-hidden shrink-0 bg-neutral-100 rounded-[10px] xl:rounded-[20px]">
              <ReactPlayer
                width={"100%"}
                height={"100%"}
                src={"https://www.youtube.com/watch?v=0wt2oJr3A5Y"}
                controls
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FollowFantasiaasia;
