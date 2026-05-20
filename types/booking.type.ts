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
  currency: z.string().optional(),
  bookingStatus: z.string(),
  paymentURL: z.string().nullable(),
  createdAt: z.string(),
});

export type BookingReq = z.infer<typeof BookingReqSchema>;
export type MyBooking = z.infer<typeof MyBookingSchema>;

export type BookingDetail = {
  bookingId: number;
  tourId: number;
  tourTitle: string;
  country: string;
  thumbnail: string;
  startDate: string;
  visitTime?: string | null;
  adultTickets: number;
  childTickets: number;
  infantTickets: number;
  totalTravellers: number;
  totalPrice: number | null;
  currency: string;
  bookingStatus:
    | "pending"
    | "confirmed"
    | "paid"
    | "completed"
    | "declined"
    | "cancelled";
  paymentUrl: string | null;
  declineReason: string | null;
  bookingFirstname: string;
  bookingSurname: string;
  bookingEmail: string;
  bookingPhone: string;
  bookingAddress: string | null;
  createdAt: string;
  updatedAt: string;
};

export type MessageAttachment = {
  url: string;
  name: string;
  type: string;
  size: number;
};

export type BookingMessage = {
  messageId: number;
  bookingId: number;
  senderType: "customer" | "admin" | "system";
  body: string;
  attachments?: MessageAttachment[] | null;
  createdAt: string;
};
