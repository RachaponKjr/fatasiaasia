import { NextResponse } from "next/server";

const CHANNEL_ID = "UC3mLCHCq_A99BKjGz-5EYLQ";

export async function GET() {
    try {
        const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

        const res = await fetch(rssUrl, {
            next: { revalidate: 3600 }, // Cache for 1 hour
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch RSS: ${res.status}`);
        }

        const xmlText = await res.text();

        // Parse video IDs from XML using regex (simple approach for server)
        const videoIdMatches = xmlText.matchAll(/<yt:videoId>([^<]+)<\/yt:videoId>/g);
        const titleMatches = xmlText.matchAll(/<title>([^<]+)<\/title>/g);

        const videoIds = [...videoIdMatches].map(m => m[1]);
        const titles = [...titleMatches].map(m => m[1]).slice(1); // Skip channel title

        const videos = videoIds.slice(0, 5).map((videoId, index) => ({
            videoId,
            url: `https://www.youtube.com/watch?v=${videoId}`,
            title: titles[index] || "",
        }));

        return NextResponse.json({ videos, success: true });

    } catch (error) {
        console.error("YouTube RSS fetch error:", error);

        // Return fallback videos
        const fallbackVideos = [
            { videoId: "AhneBfQjRg4", url: "https://www.youtube.com/watch?v=AhneBfQjRg4", title: "" },
            { videoId: "YC3UtNPVL5Q", url: "https://www.youtube.com/watch?v=YC3UtNPVL5Q", title: "" },
            { videoId: "t0pafVU3EhY", url: "https://www.youtube.com/watch?v=t0pafVU3EhY", title: "" },
            { videoId: "3-UBBZwjn1M", url: "https://www.youtube.com/watch?v=3-UBBZwjn1M", title: "" },
            { videoId: "5iIIE04DDhU", url: "https://www.youtube.com/watch?v=5iIIE04DDhU", title: "" },
        ];

        return NextResponse.json({ videos: fallbackVideos, success: false, error: "Using fallback" });
    }
}
