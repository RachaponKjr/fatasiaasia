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

type ApiEnvelope<T> = { code: number; message: string; data: T };

export type SiteImage = {
  url: string;
  alt: string;
};

export type SiteImagesMap = Record<string, SiteImage>;

/**
 * Fetches the full slot map. Revalidates every 60s on the Next.js side so
 * admin uploads propagate within a minute without a redeploy.
 *
 * Returns an empty map on failure — callers fall back to bundled defaults.
 */
export async function getSiteImages(): Promise<SiteImagesMap> {
  try {
    const res = await fetch(`${ADMIN_BASE_URL}/site-images`, {
      next: { revalidate: 60, tags: ["site-images"] },
    });
    if (!res.ok) return {};
    const body = (await res.json()) as ApiEnvelope<{ slots: RawSlot[] }>;
    if (body.code !== 2000 || !body.data?.slots) return {};

    const out: SiteImagesMap = {};
    for (const s of body.data.slots) {
      // Only surface admin overrides — if no override is set, leave the slot
      // empty so the component uses its bundled default import (which keeps
      // Next.js static optimization + blur placeholders working).
      if (s.isCustom && s.customUrl) {
        out[s.key] = { url: s.customUrl, alt: s.alt || "" };
      }
    }
    return out;
  } catch {
    return {};
  }
}

/**
 * Convenience: get one slot URL or undefined.
 */
export async function getSiteImage(key: string): Promise<SiteImage | undefined> {
  const all = await getSiteImages();
  return all[key];
}
