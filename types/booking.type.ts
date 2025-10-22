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

export type BookingReq = z.infer<typeof BookingReqSchema>;
