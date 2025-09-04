import BoxFollowVideo from "@/components/box-follow-video";
import Image from "next/image";
import React from "react";

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
          <div className="flex flex-col-reverse xl:flex-row gap-4 xl:gap-14">
            <div className="grow shrink-0 flex flex-col gap-4 justify-between">
              <BoxFollowVideo />
              <BoxFollowVideo />
              <BoxFollowVideo />
              <BoxFollowVideo />
            </div>
            <div className="w-full xl:w-7/12 aspect-video xl:aspect-[16/9] shrink-0 bg-neutral-100 rounded-[10px] xl:rounded-[20px]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FollowFantasiaasia;
