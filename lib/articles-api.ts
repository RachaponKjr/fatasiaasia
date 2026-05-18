// Article fetching against the admin API.
// Reads are public so we can call directly without auth.

const ADMIN_BASE_URL =
  process.env.NEXT_PUBLIC_ADMIN_API_BASE_URL ||
  "https://tour-admin-api-dl8qs.ondigitalocean.app";

export type Article = {
  articleId: number;
  type: "blog" | "guide";
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImageUrl: string;
  pdfUrl: string;
  authorName: string;
  destination: string;
  tags: string[];
  isPublished: boolean;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

type ApiEnvelope<T> = {
  code: number;
  message: string;
  data: T;
};

async function adminGet<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${ADMIN_BASE_URL}${path}`, {
      // Revalidate hourly so admin edits propagate without redeploy.
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const body = (await res.json()) as ApiEnvelope<T>;
    if (body.code !== 2000) return null;
    return body.data;
  } catch {
    return null;
  }
}

export async function listBlogPosts(): Promise<Article[]> {
  const data = await adminGet<Article[]>(`/article?type=blog&publishedOnly=true`);
  return Array.isArray(data) ? data : [];
}

export async function listTravelGuides(): Promise<Article[]> {
  const data = await adminGet<Article[]>(`/article?type=guide&publishedOnly=true`);
  return Array.isArray(data) ? data : [];
}

export async function getBlogPostBySlug(slug: string): Promise<Article | null> {
  const data = await adminGet<Article>(`/article/slug/blog/${encodeURIComponent(slug)}`);
  return data && data.isPublished ? data : null;
}

export async function getGuideBySlug(slug: string): Promise<Article | null> {
  const data = await adminGet<Article>(`/article/slug/guide/${encodeURIComponent(slug)}`);
  return data && data.isPublished ? data : null;
}

/** Estimate read time from content (~200 wpm). */
export function estimateReadTime(content: string): number {
  const words = String(content || "").trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}
