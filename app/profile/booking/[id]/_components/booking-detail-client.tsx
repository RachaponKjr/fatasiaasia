"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import api from "@/server";
import type { BookingDetail, BookingMessage } from "@/types/booking.type";

type Props = {
  initialBooking: BookingDetail;
  bookingId: number;
};

const STATUS_LABEL: Record<
  BookingDetail["bookingStatus"],
  { label: string; tone: string; description: string }
> = {
  pending: {
    label: "Awaiting confirmation",
    tone: "bg-amber-100 text-amber-800 ring-amber-200",
    description:
      "Our team has received your inquiry and is reviewing availability. You'll be notified here as soon as we respond — usually within a few hours.",
  },
  confirmed: {
    label: "Confirmed — payment pending",
    tone: "bg-emerald-100 text-emerald-800 ring-emerald-200",
    description:
      "Great news — your booking is confirmed! Please complete payment using the button below to secure your spot.",
  },
  paid: {
    label: "Paid",
    tone: "bg-emerald-100 text-emerald-800 ring-emerald-200",
    description: "Payment received. We can't wait to host you!",
  },
  completed: {
    label: "Completed",
    tone: "bg-slate-100 text-slate-700 ring-slate-200",
    description: "This tour has been completed. We hope you enjoyed it!",
  },
  declined: {
    label: "Declined",
    tone: "bg-red-100 text-red-800 ring-red-200",
    description:
      "Unfortunately we were unable to confirm this booking. See the reason below.",
  },
  cancelled: {
    label: "Cancelled",
    tone: "bg-red-100 text-red-800 ring-red-200",
    description: "This booking has been cancelled.",
  },
};

export default function BookingDetailClient({
  initialBooking,
  bookingId,
}: Props) {
  const [booking, setBooking] = useState<BookingDetail>(initialBooking);
  const [messages, setMessages] = useState<BookingMessage[]>([]);
  const [draft, setDraft] = useState("");
  const [sending, startSend] = useTransition();
  const chatRef = useRef<HTMLDivElement>(null);

  // Initial chat load + status/chat polling every 5s.
  useEffect(() => {
    let cancelled = false;
    const tick = async () => {
      try {
        const [statusRes, msgRes] = await Promise.all([
          api.booking.getBookingDetail(bookingId),
          api.booking.getBookingMessages(bookingId),
        ]);
        if (cancelled) return;
        if (statusRes.code === 2000 && statusRes.data) {
          setBooking((prev) => {
            // Toast on status transition so the customer notices.
            if (prev.bookingStatus !== statusRes.data!.bookingStatus) {
              const next = statusRes.data!.bookingStatus;
              if (next === "confirmed") {
                toast.success("Your booking has been confirmed!");
              } else if (next === "paid") {
                toast.success("Payment received — thank you!");
              } else if (next === "declined") {
                toast.error("Your booking was declined.");
              }
            }
            return statusRes.data!;
          });
        }
        if (msgRes.code === 2000 && Array.isArray(msgRes.data)) {
          setMessages(msgRes.data);
        }
      } catch {
        /* swallow polling errors */
      }
    };
    tick();
    const t = setInterval(tick, 5000);
    return () => {
      cancelled = true;
      clearInterval(t);
    };
  }, [bookingId]);

  // Auto-scroll chat to bottom on new messages.
  useEffect(() => {
    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages.length]);

  const send = () => {
    const body = draft.trim();
    if (!body) return;
    startSend(async () => {
      const res = await api.booking.sendBookingMessage(bookingId, body);
      if (res.code === 2000 && res.data) {
        setMessages((prev) => [...prev, res.data!]);
        setDraft("");
      } else {
        toast.error(res.message || "Couldn't send message");
      }
    });
  };

  const status = STATUS_LABEL[booking.bookingStatus] ?? STATUS_LABEL.pending;
  const total = (booking.totalPrice ?? 0).toLocaleString("en-US", {
    style: "currency",
    currency: booking.currency || "USD",
  });

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="relative w-full md:w-64 aspect-[16/10] rounded-xl overflow-hidden bg-gray-100">
            {booking.thumbnail && (
              <Image
                src={booking.thumbnail}
                alt={booking.tourTitle}
                fill
                className="object-cover"
              />
            )}
          </div>
          <div className="flex-1 flex flex-col gap-3">
            <div className="flex items-center gap-3 flex-wrap">
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ring-1 ${status.tone}`}
              >
                {status.label}
              </span>
              <span className="text-sm text-gray-500">
                Booking #{booking.bookingId}
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#2F2F2F]">
              {booking.tourTitle}
            </h1>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
              <div>
                <div className="text-gray-500">Country</div>
                <div className="font-medium">{booking.country}</div>
              </div>
              <div>
                <div className="text-gray-500">Start date</div>
                <div className="font-medium">
                  {new Date(booking.startDate).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </div>
              </div>
              <div>
                <div className="text-gray-500">Travellers</div>
                <div className="font-medium">{booking.totalTravellers}</div>
              </div>
              <div>
                <div className="text-gray-500">Total</div>
                <div className="font-medium">{total}</div>
              </div>
            </div>
            <p className="mt-2 text-gray-600">{status.description}</p>

            {/* Decline reason banner */}
            {booking.bookingStatus === "declined" && booking.declineReason && (
              <div className="mt-2 rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">
                <div className="font-semibold mb-1">Reason from the team</div>
                <div className="text-sm whitespace-pre-wrap">
                  {booking.declineReason}
                </div>
              </div>
            )}

            {/* Payment CTA */}
            {booking.bookingStatus === "confirmed" && booking.paymentUrl && (
              <Link
                href={booking.paymentUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#BD3E2B] hover:bg-[#a13524] text-white font-semibold text-base w-full md:w-auto"
              >
                Pay {total} now
              </Link>
            )}
            {booking.bookingStatus === "paid" && (
              <div className="mt-3 inline-flex items-center gap-2 text-emerald-700 font-semibold">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.7 5.3a1 1 0 010 1.4l-8 8a1 1 0 01-1.4 0l-4-4a1 1 0 011.4-1.4L8 12.6l7.3-7.3a1 1 0 011.4 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Payment received — see you on the tour!
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Chat */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#BD3E2B] text-white flex items-center justify-center font-bold">
            FA
          </div>
          <div>
            <div className="font-semibold text-[#2F2F2F]">
              Fantasia Asia team
            </div>
            <div className="text-xs text-gray-500">
              Typically replies within a few hours
            </div>
          </div>
        </div>

        <div
          ref={chatRef}
          className="px-6 py-6 flex flex-col gap-3 max-h-[420px] min-h-[260px] overflow-y-auto bg-gray-50"
        >
          {messages.length === 0 && (
            <div className="text-center text-sm text-gray-500 my-auto">
              No messages yet. Say hi or ask any questions about your trip!
            </div>
          )}
          {messages.map((m) => {
            if (m.senderType === "system") {
              return (
                <div key={m.messageId} className="self-center max-w-[80%]">
                  <div className="px-3 py-2 rounded-full bg-slate-200 text-slate-700 text-xs text-center">
                    {m.body}
                  </div>
                </div>
              );
            }
            const mine = m.senderType === "customer";
            const atts = Array.isArray(m.attachments) ? m.attachments : [];
            const hasBody = !!(m.body && m.body.trim());
            return (
              <div
                key={m.messageId}
                className={`max-w-[78%] flex flex-col gap-1 ${
                  mine ? "self-end items-end" : "self-start items-start"
                }`}
              >
                {hasBody && (
                  <div
                    className={`px-4 py-2 rounded-2xl text-sm whitespace-pre-wrap ${
                      mine
                        ? "bg-[#BD3E2B] text-white rounded-br-sm"
                        : "bg-white border border-gray-200 text-[#2F2F2F] rounded-bl-sm"
                    }`}
                  >
                    {m.body}
                  </div>
                )}
                {atts.length > 0 && (
                  <div className="flex flex-col gap-1.5 max-w-full">
                    {atts.map((a) => {
                      const isImage = (a.type || "").startsWith("image/");
                      if (isImage) {
                        return (
                          <a
                            key={`${m.messageId}-${a.url}`}
                            href={a.url}
                            target="_blank"
                            rel="noreferrer"
                            className="block"
                          >
                            <img
                              src={a.url}
                              alt={a.name || "attachment"}
                              className="max-w-[240px] max-h-[240px] rounded-xl border border-gray-200 object-cover"
                            />
                          </a>
                        );
                      }
                      const sizeLabel = a.size
                        ? (() => {
                            const units = ["B", "KB", "MB", "GB"];
                            let i = 0;
                            let v = a.size;
                            while (v >= 1024 && i < units.length - 1) {
                              v /= 1024;
                              i += 1;
                            }
                            return `${v.toFixed(
                              v >= 10 || i === 0 ? 0 : 1
                            )} ${units[i]}`;
                          })()
                        : "";
                      return (
                        <a
                          key={`${m.messageId}-${a.url}`}
                          href={a.url}
                          target="_blank"
                          rel="noreferrer"
                          download
                          className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl text-sm max-w-[280px] ${
                            mine
                              ? "bg-[#BD3E2B]/90 text-white border border-white/30"
                              : "bg-white border border-gray-200 text-[#2F2F2F]"
                          }`}
                          title={a.name}
                        >
                          <span className="text-lg">📄</span>
                          <span className="flex flex-col min-w-0 flex-1">
                            <span className="truncate font-medium">
                              {a.name || "Attachment"}
                            </span>
                            {sizeLabel && (
                              <span className="text-[11px] opacity-70">
                                {sizeLabel}
                              </span>
                            )}
                          </span>
                          <span className="text-xs opacity-80">↓</span>
                        </a>
                      );
                    })}
                  </div>
                )}
                <div
                  className={`text-[10px] text-gray-400 mt-1 ${
                    mine ? "text-right" : "text-left"
                  }`}
                >
                  {new Date(m.createdAt).toLocaleString("en-GB", {
                    hour: "2-digit",
                    minute: "2-digit",
                    day: "numeric",
                    month: "short",
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <div className="px-4 py-3 border-t border-gray-100 flex gap-2 items-end bg-white">
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
            rows={1}
            placeholder="Write a message to the team…"
            className="flex-1 resize-none rounded-xl border border-gray-200 focus:border-[#BD3E2B] focus:outline-none px-4 py-2 text-sm max-h-32"
          />
          <button
            type="button"
            disabled={sending || !draft.trim()}
            onClick={send}
            className="px-5 py-2 rounded-xl bg-[#BD3E2B] hover:bg-[#a13524] text-white font-semibold text-sm disabled:opacity-50"
          >
            {sending ? "Sending…" : "Send"}
          </button>
        </div>
      </div>

      <div className="text-center">
        <Link
          href="/profile"
          className="text-sm text-gray-500 hover:text-[#BD3E2B] underline-offset-4 hover:underline"
        >
          ← Back to my bookings
        </Link>
      </div>
    </div>
  );
}
