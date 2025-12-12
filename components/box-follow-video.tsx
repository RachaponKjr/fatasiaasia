"use client";
import React, { useEffect, useState } from "react";

interface YoutubeData {
  title: string;
  description: string;
  publishedAt: string;
  viewCount: string;
  likeCount: string;
  commentCount: string;
  thumbnailUrl: string;
}

const API_KEY = "AIzaSyBHklPpmmfthTbESyX6zTbwCKzNDMVf71Q";

interface BoxFollowVideoProps {
  youtube: string;
  videoId?: string;
  isActive?: boolean;
  onVideoClick?: (videoId: string) => void;
}

const BoxFollowVideo = ({ youtube, videoId: propVideoId, isActive, onVideoClick }: BoxFollowVideoProps) => {
  const [data, setData] = useState<YoutubeData | null>(null);
  const [videoId, setVideoId] = useState<string | null>(propVideoId || null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = propVideoId || new URLSearchParams(new URL(youtube).search).get("v");
        if (!id) return;
        setVideoId(id);

        const res = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${id}&key=${API_KEY}`
        );
        const json = await res.json();

        if (json.items && json.items.length > 0) {
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
            thumbnailUrl: item.snippet.thumbnails?.medium?.url || `https://img.youtube.com/vi/${id}/mqdefault.jpg`,
          });
        }
      } catch (err) {
        console.error("Error fetching YouTube data", err);
      }
    };

    fetchData();
  }, [youtube, propVideoId]);

  // Format view count
  const formatViews = (views: string) => {
    const num = parseInt(views);
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return views;
  };

  const handleClick = () => {
    if (onVideoClick && videoId) {
      onVideoClick(videoId);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`flex items-center gap-4 p-2 rounded-lg transition-all cursor-pointer group ${isActive
          ? 'bg-[#FFF3E1] ring-2 ring-[#BD3E2B]'
          : 'hover:bg-gray-50'
        }`}
    >
      {/* Thumbnail - proper 16:9 aspect ratio */}
      <div className="w-[140px] xl:w-[160px] aspect-video shrink-0 overflow-hidden rounded-lg relative bg-gray-200">
        {videoId && (
          <>
            <img
              src={data?.thumbnailUrl || `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`}
              alt={data?.title || "Video thumbnail"}
              className="w-full h-full object-cover"
            />
            {/* Play button overlay */}
            <div className={`absolute inset-0 flex items-center justify-center transition-opacity ${isActive ? 'opacity-100' : 'opacity-80 group-hover:opacity-100'
              }`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg ${isActive ? 'bg-[#BD3E2B]' : 'bg-red-600'
                }`}>
                <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Video Info */}
      <div className="flex flex-col gap-1 leading-tight flex-1 min-w-0">
        <h6 className={`font-semibold text-xs xl:text-sm line-clamp-2 ${isActive ? 'text-[#BD3E2B]' : 'text-[#333333]'
          }`}>
          {data?.title || "Loading..."}
        </h6>
        <span className="text-[#777777] text-[10px] xl:text-xs font-medium">
          {data?.publishedAt}
        </span>
        <span className="text-[#777777] text-[10px] xl:text-xs font-medium">
          {data ? `${formatViews(data.viewCount)} views` : ""}
        </span>
      </div>
    </div>
  );
};

export default BoxFollowVideo;
