import api from "@/server";
import { notFound } from "next/navigation";
import BookingDetailClient from "./_components/booking-detail-client";

export const dynamic = "force-dynamic";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: idStr } = await params;
  const id = Number(idStr);
  if (!Number.isFinite(id) || id <= 0) notFound();

  // Fetch the focused booking + the customer's full booking list in parallel
  // so the chat sidebar can render immediately without a client-side fetch.
  const [detailRes, listRes] = await Promise.all([
    api.booking.getBookingDetail(id),
    api.booking.getMyBooking(),
  ]);
  if (detailRes.code !== 2000 || !detailRes.data) {
    notFound();
  }

  const allBookings =
    listRes.code === 2000 && Array.isArray(listRes.data) ? listRes.data : [];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto max-w-[1400px] py-6 md:py-10 px-4">
        <BookingDetailClient
          initialBooking={detailRes.data}
          bookingId={id}
          allBookings={allBookings}
        />
      </div>
    </div>
  );
}
