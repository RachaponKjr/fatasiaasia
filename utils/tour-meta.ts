/**
 * Tour metadata extracted from the META_* convention in `tourDetails.included`.
 *
 * The admin app encodes extra fields (duration, weekdays, childPrice, etc.)
 * as fake "included" items prefixed with `META_KEY:` so we don't need to
 * change the backend schema. This helper centralises parsing.
 */
export type TourHotel = {
  id?: number;
  name: string;
  locationName?: string;
  location?: string;
  stars?: number | string;
  image?: string;
  description?: string;
};

export type TourMeta = {
  duration?: string;
  groupSize?: string;
  ages?: string;
  languages?: string[];
  category?: string;
  region?: string[];
  beachTour?: boolean;
  /** Per-child price in the tour's currency (number). Undefined when unset. */
  childPrice?: number;
  /** Weekdays (0=Sun..6=Sat) the tour can be booked on. Defaults to all 7. */
  availableWeekdays: number[];
  /** Accommodation hotels assigned to this tour by admin. Prices intentionally omitted. */
  hotels?: TourHotel[];
};

const ALL_WEEKDAYS = [0, 1, 2, 3, 4, 5, 6];

type IncludedItem = { text?: string; iconUrl?: string };

export function parseTourMeta(
  included?: IncludedItem[] | null
): TourMeta {
  const meta: TourMeta = { availableWeekdays: ALL_WEEKDAYS };
  if (!Array.isArray(included)) return meta;

  for (const item of included) {
    const text = item?.text;
    if (!text || typeof text !== "string") continue;
    if (!text.startsWith("META_")) continue;

    const idx = text.indexOf(":");
    if (idx === -1) continue;
    const key = text.slice(5, idx);
    const value = text.slice(idx + 1);

    switch (key) {
      case "DURATION":
        meta.duration = value;
        break;
      case "GROUPSIZE":
        meta.groupSize = value;
        break;
      case "AGES":
        meta.ages = value;
        break;
      case "LANGUAGES":
        meta.languages = value.split(",").map((s) => s.trim()).filter(Boolean);
        break;
      case "CATEGORY":
        meta.category = value;
        break;
      case "REGION":
        meta.region = value.split(",").map((s) => s.trim()).filter(Boolean);
        break;
      case "BEACHTOUR":
        meta.beachTour = value === "true";
        break;
      case "CHILDPRICE": {
        const trimmed = value.trim();
        if (trimmed === "") break;
        const n = Number(trimmed);
        if (Number.isFinite(n) && n > 0) meta.childPrice = n;
        break;
      }
      case "WEEKDAYS": {
        const parsed = value
          .split(",")
          .map((s) => parseInt(s.trim(), 10))
          .filter((n) => Number.isInteger(n) && n >= 0 && n <= 6);
        if (parsed.length > 0) {
          meta.availableWeekdays = Array.from(new Set(parsed)).sort();
        }
        break;
      }
      case "HOTELS_JSON": {
        try {
          const parsed: unknown = JSON.parse(value);
          if (Array.isArray(parsed)) {
            const hotels: TourHotel[] = parsed
              .filter(
                (h): h is Record<string, unknown> =>
                  typeof h === "object" && h !== null
              )
              .map((h) => ({
                id: typeof h.id === "number" ? h.id : undefined,
                name: typeof h.name === "string" ? h.name : "",
                locationName:
                  typeof h.locationName === "string" ? h.locationName : undefined,
                location:
                  typeof h.location === "string" ? h.location : undefined,
                stars:
                  typeof h.stars === "number" || typeof h.stars === "string"
                    ? h.stars
                    : undefined,
                image: typeof h.image === "string" ? h.image : undefined,
                description:
                  typeof h.description === "string" ? h.description : undefined,
              }))
              .filter((h) => h.name);
            if (hotels.length > 0) meta.hotels = hotels;
          }
        } catch {
          /* ignore malformed JSON */
        }
        break;
      }
    }
  }

  return meta;
}

/**
 * Compute the booking total taking child pricing into account.
 * Falls back to adult price for children when childPrice is not set.
 * Infants are always free.
 */
export function computeBookingTotal({
  adultTickets,
  childTickets,
  adultPrice,
  childPrice,
}: {
  adultTickets: number;
  childTickets: number;
  adultPrice: number;
  childPrice?: number;
}): number {
  const adults = adultTickets || 0;
  const children = childTickets || 0;
  const effectiveChildPrice =
    childPrice !== undefined ? childPrice : adultPrice;
  return adults * adultPrice + children * effectiveChildPrice;
}
