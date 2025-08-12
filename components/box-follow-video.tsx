import React from "react";

const BoxFollowVideo = () => {
  return (
    <div className="w-full flex gap-4">
      <div className="bg-neutral-300 w-2/5  aspect-video" />
      <div className="flex flex-col gap-1.5 leading-none">
        <h6 className="font-semibold text-sm">Lorem ipsum dolor sit.</h6>
        <span className="text-[#777777] text-xs font-medium">5/15/2024</span>
        <p className="text-xs">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit.
        </p>
        {/* view like comments */}
        <span className="text-[#777777] text-xs font-medium">
          1.9K Views • 9 Likes • 0 Comments
        </span>
      </div>
    </div>
  );
};

export default BoxFollowVideo;
