import z from "zod";

export const PriceTierSchama = z.object({
  minPax: z.number(),
  maxPax: z.number(),
  pricePerPerson: z.string().optional(),
  discountPercent: z.string().optional(),
});

const TourSchama = z.object({
  tourId: z.number(),
  title: z.string(),
  country: z.string(),
  estimateCostPerPerson: z.number(),
  currency: z.string().optional(),
  priceTiers: z.array(PriceTierSchama).optional().nullable(),
  thumbnail: z.string(),
  itinerariesDays: z.number(),
  isWishlist: z.boolean(),
  tourDetails: z.object({
    included: z.array(z.object({
      text: z.string(),
      iconUrl: z.string(),
    })),
  }).optional(),
});

export const ItiinerarieSchama = z.object({
  day: z.string(),
  title: z.string(),
  detail: z.string(),
  images: z.array(z.string()),
});

export const IncludedSchama = z.object({
  text: z.string(),
  iconUrl: z.string(),
});

export const TourDetailSchama = z.object({
  tourId: z.number(),
  title: z.string(),
  country: z.string(),
  estimateCostPerPerson: z.number(),
  currency: z.string(),
  priceTiers: z.array(PriceTierSchama).optional().nullable(),
  overview: z.string(),
  isWishlist: z.boolean(),
  highlight: z.string(),
  galleryUrls: z.array(z.string()),
  brochureUrl: z.string(),
  itineraries: z.array(ItiinerarieSchama),
  tourDetails: z.object({
    included: z.array(IncludedSchama),
    notIncluded: z.array(z.string()),
    whatToBring: z.string(),
    duration: z.string().optional(),
    groupSize: z.string().optional(),
    ages: z.string().optional(),
    languages: z.string().optional(),
    tourCategory: z.string().optional(),
    /** Derived client-side from META_CHILDPRICE in `included`. */
    childPrice: z.number().optional(),
    /** Derived client-side from META_WEEKDAYS in `included`. */
    availableWeekdays: z.array(z.number()).optional(),
    // ---- v2 invoice scope additions ----
    faqs: z
      .array(z.object({ q: z.string(), a: z.string() }))
      .optional(),
    travelTips: z.array(z.string()).optional(),
    packingList: z.array(z.string()).optional(),
    coordinates: z
      .object({ lat: z.number(), lng: z.number() })
      .nullable()
      .optional(),
    operatorEmail: z.string().optional(),
    hotelEmails: z.array(z.string()).optional(),
  }),
});

export type Tour = z.infer<typeof TourSchama>;
export type TourDetail = z.infer<typeof TourDetailSchama>;
