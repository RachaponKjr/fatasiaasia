// Static blog/article data. Each post is independently editable.
// To add a post, append an entry below. Use plain HTML in `bodyHtml`.
// When the backend supports articles, swap this for an API fetch.

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  cover: string; // public path or remote URL
  author: string;
  publishedAt: string; // ISO date
  readTimeMin: number;
  tags: string[];
  bodyHtml: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "welcome-to-fantasia-asia-blog",
    title: "Welcome to the Fantasia Asia Travel Blog",
    excerpt:
      "Stories, tips and inspiration for your next journey across Southeast Asia.",
    cover: "/assets/images/destination/Thai.webp",
    author: "Fantasia Asia Team",
    publishedAt: "2026-05-18",
    readTimeMin: 2,
    tags: ["news"],
    bodyHtml: `
      <p>Welcome to our travel journal. Here we will share insider tips,
      destination spotlights, cultural deep-dives and stories from the road
      across Thailand and the wider region.</p>
      <p>New articles are published regularly. Bookmark this page or follow
      us on social media to stay up to date.</p>
    `,
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
