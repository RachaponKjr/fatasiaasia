"use client";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";

interface YoutubeData {
  title: string;
  description: string;
  publishedAt: string;
  viewCount: string;
  likeCount: string;
  commentCount: string;
}
const API_KEY = "AIzaSyALWMBSjkV5xo_qT3ZpZz9gXrBjFoacBbU";
const BoxFollowVideo = ({ youtube }: { youtube: string }) => {
  const [data, setData] = useState<YoutubeData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const videoId = new URLSearchParams(new URL(youtube).search).get("v");
        if (!videoId) return;
        const res = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${API_KEY}`
        );
        const json = await res.json();

        if (json.items.length > 0) {
          const item = json.items[0];
          setData({
            title: item.snippet.title,
            description: item.snippet.description,
            publishedAt: new Date(
              item.snippet.publishedAt
            ).toLocaleDateString(),
            viewCount: item.statistics.viewCount,
            likeCount: item.statistics.likeCount,
            commentCount: item.statistics.commentCount,
          });
        }
      } catch (err) {
        console.error("Error fetching YouTube data", err);
      }
    };

    fetchData();
  }, [youtube]);

  return (
    <div className="flex items-center gap-4">
      <div className="w-2/5 aspect-video shrink-0 flex items-center justify-center bg-neutral-300 overflow-hidden rounded">
        <ReactPlayer src={youtube} controls width="100%" height="100%" />
      </div>

      <div className="flex flex-col gap-1.5 leading-none">
        <h6 className="font-semibold text-xs xl:text-sm">
          {data?.title || "Loading..."}
        </h6>
        <span className="text-[#777777] text-[10px] xl:text-xs font-medium">
          {data?.publishedAt}
        </span>
        <p className="text-[10px] xl:text-xs line-clamp-2">
          {data?.description || ""}
        </p>
        <span className="text-[#777777] text-[10px] xl:text-xs font-medium">
          {data
            ? `${data.viewCount} Views • ${data.likeCount} Likes • ${data.commentCount} Comments`
            : ""}
        </span>
      </div>
    </div>
  );
};

export default BoxFollowVideo;
