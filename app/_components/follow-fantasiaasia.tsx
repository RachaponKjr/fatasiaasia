"use client";
import BoxFollowVideo from "@/components/box-follow-video";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import youtube from "@/assets/images/youtube.png";

// Use the channel handle to search for videos
const CHANNEL_HANDLE = "withfantasiaasia";
const API_KEY = "AIzaSyBHklPpmmfthTbESyX6zTbwCKzNDMVf71Q";

interface VideoItem {
  videoId: string;
  url: string;
}

const FollowFantasiaasia = () => {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [mainVideo, setMainVideo] = useState<string>("AhneBfQjRg4");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLatestVideos = async () => {
      try {
        setLoading(true);
        setError(null);

        // First, get the channel ID from the handle
        const channelRes = await fetch(
          `https://www.googleapis.com/youtube/v3/channels?key=${API_KEY}&forHandle=${CHANNEL_HANDLE}&part=contentDetails`,
          { cache: "no-store" }
        );

        const channelData = await channelRes.json();

        if (channelData.error) {
          console.error("Channel API Error:", channelData.error);
          setError(channelData.error.message);
          setFallbackVideos();
          return;
        }

        if (!channelData.items || channelData.items.length === 0) {
          console.error("Channel not found");
          setError("Channel not found");
          setFallbackVideos();
          return;
        }

        // Get the uploads playlist ID
        const uploadsPlaylistId =
          channelData.items[0].contentDetails.relatedPlaylists.uploads;

        // Now get the videos from the uploads playlist
        const videosRes = await fetch(
          `https://www.googleapis.com/youtube/v3/playlistItems?key=${API_KEY}&playlistId=${uploadsPlaylistId}&part=snippet&maxResults=5`,
          { cache: "no-store" }
        );

        const videosData = await videosRes.json();

        if (videosData.error) {
          console.error("Videos API Error:", videosData.error);
          setError(videosData.error.message);
          setFallbackVideos();
          return;
        }

        if (videosData.items && videosData.items.length > 0) {
          const videoList: VideoItem[] = videosData.items.map(
            (item: { snippet: { resourceId: { videoId: string } } }) => ({
              videoId: item.snippet.resourceId.videoId,
              url: `https://www.youtube.com/watch?v=${item.snippet.resourceId.videoId}`,
            })
          );

          setMainVideo(videoList[0].videoId);
          setVideos(videoList.slice(1, 5));
        } else {
          setFallbackVideos();
        }
      } catch (err) {
        console.error("Error fetching YouTube videos:", err);
        setError(String(err));
        setFallbackVideos();
      } finally {
        setLoading(false);
      }
    };

    const setFallbackVideos = () => {
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
    };

    fetchLatestVideos();
  }, []);

  // Handle clicking on a side video - play it in the main player
  const handleVideoClick = (videoId: string) => {
    setMainVideo(videoId);
  };

  return (
    <div className="w-screen -mx-[calc((100vw-100%)/2)] bg-[#FFF3E1] ">
      <div className="container mx-auto py-20">
        <div className="bg-white !px-4 xl:px-14 py-10 xl:py-20 md:rounded-3xl flex flex-col gap-4 xl:gap-14">
          <div className="flex items-center justify-center gap-4">
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
                    videoId={video.videoId}
                    isActive={mainVideo === video.videoId}
                    onVideoClick={handleVideoClick}
                  />
                ))
              ) : (
                <>
                  <div className="w-full xl:w-[280px] aspect-video bg-gray-200 animate-pulse rounded-[10px]" />
                  <div className="w-full xl:w-[280px] aspect-video bg-gray-200 animate-pulse rounded-[10px]" />
                  <div className="w-full xl:w-[280px] aspect-video bg-gray-200 animate-pulse rounded-[10px]" />
                  <div className="w-full xl:w-[280px] aspect-video bg-gray-200 animate-pulse rounded-[10px]" />
                </>
              )}
            </div>
            <div className="w-full xl:w-7/12 aspect-video xl:aspect-[16/9] overflow-hidden shrink-0 bg-neutral-100 rounded-[10px] xl:rounded-[20px]">
              <iframe
                key={mainVideo} // Force re-render when video changes
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${mainVideo}?rel=0`}
                title="Fantasiaasia Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FollowFantasiaasia;
