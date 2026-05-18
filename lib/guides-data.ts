// Static travel-guide data. Each guide can have a downloadable PDF.
// To add a guide, drop the PDF into /public/guides/<file>.pdf and append
// an entry below. When the backend supports guides, swap for API.

export type TravelGuide = {
  slug: string;
  title: string;
  destination: string;
  summary: string;
  cover: string; // public path or remote URL
  pdfUrl?: string; // /guides/<file>.pdf — if absent, marked "coming soon"
  pages?: number;
  updatedAt: string; // ISO date
};

export const travelGuides: TravelGuide[] = [
  {
    slug: "krabi-essentials",
    title: "Krabi Essentials Guide",
    destination: "Krabi, Thailand",
    summary:
      "Beaches, viewpoints, food, transport and the best half-day trips from Ao Nang.",
    cover: "/assets/images/destination/Thai.webp",
    pdfUrl: undefined, // upload to /public/guides/krabi-essentials.pdf when ready
    pages: 24,
    updatedAt: "2026-05-18",
  },
];

export function getGuideBySlug(slug: string): TravelGuide | undefined {
  return travelGuides.find((g) => g.slug === slug);
}
