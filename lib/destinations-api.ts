// Destinations fetched from the admin API. Reads are public; writes happen
// only in the admin SPA. New destinations created in the admin show up here
// after the next ISR revalidation (1h).

const ADMIN_BASE_URL =
  process.env.NEXT_PUBLIC_ADMIN_API_BASE_URL ||
  "https://tour-admin-api-dl8qs.ondigitalocean.app";

export type Destination = {
  destinationId: number;
  name: string;
  slug: string;
  title: string;
  description: string;
  coverImageUrl: string;
  cardImageUrl: string;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

type ApiEnvelope<T> = { code: number; message: string; data: T };

async function adminGet<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${ADMIN_BASE_URL}${path}`, {
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

export async function listDestinations(): Promise<Destination[]> {
  const data = await adminGet<Destination[]>("/destination?activeOnly=true");
  return Array.isArray(data) ? data : [];
}

export async function getDestinationBySlug(
  slug: string
): Promise<Destination | null> {
  return adminGet<Destination>(
    `/destination/slug/${encodeURIComponent(slug)}`
  );
}
