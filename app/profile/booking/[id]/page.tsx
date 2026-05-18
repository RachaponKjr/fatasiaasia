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

  const res = await api.booking.getBookingDetail(id);
  if (res.code !== 2000 || !res.data) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto max-w-5xl py-8 md:py-12 px-4">
        <BookingDetailClient initialBooking={res.data} bookingId={id} />
      </div>
    </div>
  );
}
