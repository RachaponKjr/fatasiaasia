// Site Images: admin-managed CMS overrides for fixed images on the public
// website (hero slideshow, section banners, etc.).
//
// The catalog of valid slot keys lives on the admin API at
// app/siteimages/catalog.go. This loader fetches the merged
// (override or default) URL for each slot and exposes a typed accessor.
//
// Used from Server Components — never imported into a "use client" file
// directly. Client components receive resolved URLs as props.
"use server";

const ADMIN_BASE_URL =
  process.env.NEXT_PUBLIC_ADMIN_API_BASE_URL ||
  "https://tour-admin-api-dl8qs.ondigitalocean.app";

type RawSlot = {
  key: string;
  url: string;
  customUrl?: string;
  alt?: string;
  isCustom?: boolean;
  defaultUrl?: string;
};

type RawContentSlot = {
  key: string;
  headline: string;
  description: string;
  customHeadline?: string;
  customDescription?: string;
  isCustom?: boolean;
};

type ApiEnvelope<T> = { code: number; message: string; data: T };

export type SiteImage = {
  url: string;
  alt: string;
};

export type SiteImagesMap = Record<string, SiteImage>;

export type SiteContent = {
  headline: string;
  description: string;
};

export type SiteContentMap = Record<string, SiteContent>;

export type SiteCms = {
  images: SiteImagesMap;
  content: SiteContentMap;
};

/**
 * Fetches the full CMS slot map. This is intentionally uncached so admin
 * image and text edits are visible on the public website immediately.
 *
 * Returns empty maps on failure — callers fall back to bundled defaults.
 */
export async function getSiteCms(): Promise<SiteCms> {
  try {
    const res = await fetch(`${ADMIN_BASE_URL}/site-images`, {
      cache: "no-store",
    });
    if (!res.ok) return { images: {}, content: {} };
    const body = (await res.json()) as ApiEnvelope<{
      slots: RawSlot[];
      contentSlots?: RawContentSlot[];
    }>;
    if (body.code !== 2000 || !body.data?.slots) {
      return { images: {}, content: {} };
    }

    const images: SiteImagesMap = {};
    for (const s of body.data.slots) {
      // Only surface admin overrides — if no override is set, leave the slot
      // empty so the component uses its bundled default import (which keeps
      // Next.js static optimization + blur placeholders working).
      if (s.isCustom && s.customUrl) {
        images[s.key] = { url: s.customUrl, alt: s.alt || "" };
      }
    }

    const content: SiteContentMap = {};
    for (const s of body.data.contentSlots ?? []) {
      if (s.isCustom) {
        content[s.key] = {
          headline: s.customHeadline ?? s.headline ?? "",
          description: s.customDescription ?? s.description ?? "",
        };
      }
    }

    return { images, content };
  } catch {
    return { images: {}, content: {} };
  }
}

export async function getSiteImages(): Promise<SiteImagesMap> {
  return (await getSiteCms()).images;
}

export async function getSiteContent(): Promise<SiteContentMap> {
  return (await getSiteCms()).content;
}

/**
 * Convenience: get one slot URL or undefined.
 */
export async function getSiteImage(key: string): Promise<SiteImage | undefined> {
  const all = await getSiteImages();
  return all[key];
}

export async function getSiteContentSlot(
  key: string
): Promise<SiteContent | undefined> {
  const all = await getSiteContent();
  return all[key];
}
