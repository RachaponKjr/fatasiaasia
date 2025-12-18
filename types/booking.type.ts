import { z } from "zod";

export const BookingReqSchema = z.object({
  startDate: z.number(),

  visitTime: z.number(),

  adultTickets: z.number().min(0),
  childTickets: z.number().min(0),
  infantTickets: z.number().min(0),

  bookingEmail: z.string().email(),
  bookingFirstname: z.string().min(1),
  bookingSurname: z.string().min(1),
  bookingPhone: z.string().min(1),
  bookingAddress: z.string().min(1),
});

export const MyBookingSchema = z.object({
  bookingId: z.number(),
  tourId: z.number(),
  tourTitle: z.string(),
  country: z.string(),
  thumbnail: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  duration: z.string(),
  adultTickets: z.number().optional(),
  childTickets: z.number().optional(),
  infantTickets: z.number().optional(),
  totalTravellers: z.number(),
  totalPrice: z.number(),
  bookingStatus: z.string(),
  paymentURL: z.string().nullable(),
  createdAt: z.string(),
});

export type BookingReq = z.infer<typeof BookingReqSchema>;
export type MyBooking = z.infer<typeof MyBookingSchema>;
