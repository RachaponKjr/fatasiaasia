"use client";
import BoxFollowVideo from "@/components/box-follow-video";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";

import youtube from "@/assets/images/youtube.png";

// Fantasiaasia YouTube Channel ID
const CHANNEL_ID = "UC3mLCHCq_A99BKjGz-5EYLQ";
const API_KEY = "AIzaSyALWMBSjkV5xo_qT3ZpZz9gXrBjFoacBbU";

interface VideoItem {
  videoId: string;
  url: string;
}

const FollowFantasiaasia = () => {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [mainVideo, setMainVideo] = useState<string>(
    "https://www.youtube.com/watch?v=AhneBfQjRg4"
  );

  useEffect(() => {
    const fetchLatestVideos = async () => {
      try {
        // Fetch latest 5 videos from the channel
        const res = await fetch(
          `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet&order=date&maxResults=5&type=video`
        );
        const data = await res.json();

        if (data.items && data.items.length > 0) {
          const videoList: VideoItem[] = data.items.map(
            (item: { id: { videoId: string } }) => ({
              videoId: item.id.videoId,
              url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
            })
          );

          // Set main video as the latest one
          setMainVideo(videoList[0].url);
          // Set the rest as side videos (next 4)
          setVideos(videoList.slice(1, 5));
        }
      } catch (error) {
        console.error("Error fetching YouTube videos:", error);
        // Fallback to hardcoded videos on error
        setVideos([
          {
            videoId: "YC3UtNPVL5Q",
            url: "https://www.youtube.com/watch?v=YC3UtNPVL5Q",
          },
          {
            videoId: "t0pafVU3EhY",
            url: "https://www.youtube.com/watch?v=t0pafVU3EhY",
          },
          {
            videoId: "3-UBBZwjn1M",
            url: "https://www.youtube.com/watch?v=3-UBBZwjn1M",
          },
          {
            videoId: "5iIIE04DDhU",
            url: "https://www.youtube.com/watch?v=5iIIE04DDhU",
          },
        ]);
      }
    };

    fetchLatestVideos();
  }, []);

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
              {videos.length > 0 ? (
                videos.map((video, index) => (
                  <BoxFollowVideo
                    key={video.videoId || index}
                    youtube={video.url}
                  />
                ))
              ) : (
                // Fallback while loading
                <>
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
                </>
              )}
            </div>
            <div className="w-full xl:w-7/12 aspect-video xl:aspect-[16/9] overflow-hidden shrink-0 bg-neutral-100 rounded-[10px] xl:rounded-[20px]">
              <ReactPlayer
                width={"100%"}
                height={"100%"}
                src={mainVideo}
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
