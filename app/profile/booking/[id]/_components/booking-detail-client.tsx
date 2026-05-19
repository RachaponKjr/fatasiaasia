"use client";

import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import api from "@/server";
import type {
  BookingDetail,
  BookingMessage,
  MyBooking,
} from "@/types/booking.type";

type Props = {
  initialBooking: BookingDetail;
  bookingId: number;
  allBookings: MyBooking[];
};

const STATUS_LABEL: Record<
  BookingDetail["bookingStatus"],
  { label: string; tone: string; dot: string; description: string }
> = {
  pending: {
    label: "Awaiting confirmation",
    tone: "bg-amber-50 text-amber-800 ring-amber-200",
    dot: "bg-amber-400",
    description:
      "Our team has received your inquiry and is reviewing availability. You'll be notified here as soon as we respond — usually within a few hours.",
  },
  confirmed: {
    label: "Confirmed — payment pending",
    tone: "bg-emerald-50 text-emerald-800 ring-emerald-200",
    dot: "bg-emerald-500",
    description:
      "Great news — your booking is confirmed! Please complete payment using the button below to secure your spot.",
  },
  paid: {
    label: "Paid",
    tone: "bg-emerald-50 text-emerald-800 ring-emerald-200",
    dot: "bg-emerald-500",
    description: "Payment received. We can't wait to host you!",
  },
  completed: {
    label: "Completed",
    tone: "bg-slate-100 text-slate-700 ring-slate-200",
    dot: "bg-slate-400",
    description: "This tour has been completed. We hope you enjoyed it!",
  },
  declined: {
    label: "Declined",
    tone: "bg-red-50 text-red-800 ring-red-200",
    dot: "bg-red-500",
    description:
      "Unfortunately we were unable to confirm this booking. See the reason below.",
  },
  cancelled: {
    label: "Cancelled",
    tone: "bg-red-50 text-red-800 ring-red-200",
    dot: "bg-red-500",
    description: "This booking has been cancelled.",
  },
};

const SHORT_STATUS: Record<string, { label: string; cls: string }> = {
  pending: { label: "Pending", cls: "bg-amber-100 text-amber-800" },
  confirmed: { label: "Confirmed", cls: "bg-emerald-100 text-emerald-800" },
  paid: { label: "Paid", cls: "bg-emerald-100 text-emerald-800" },
  completed: { label: "Completed", cls: "bg-slate-200 text-slate-700" },
  declined: { label: "Declined", cls: "bg-red-100 text-red-800" },
  cancelled: { label: "Cancelled", cls: "bg-red-100 text-red-800" },
};

const formatBytes = (n: number) => {
  if (!n) return "";
  const units = ["B", "KB", "MB", "GB"];
  let i = 0;
  let v = n;
  while (v >= 1024 && i < units.length - 1) {
    v /= 1024;
    i += 1;
  }
  return `${v.toFixed(v >= 10 || i === 0 ? 0 : 1)} ${units[i]}`;
};

const dayMonth = (s: string) =>
  new Date(s).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });

const fullDate = (s: string) =>
  new Date(s).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export default function BookingDetailClient({
  initialBooking,
  bookingId,
  allBookings,
}: Props) {
  const [booking, setBooking] = useState<BookingDetail>(initialBooking);
  const [messages, setMessages] = useState<BookingMessage[]>([]);
  const [draft, setDraft] = useState("");
  const [sending, startSend] = useTransition();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  // Use a ref for the fetcher so the polling effect doesn't restart on every
  // render (and clear messages → cause visible flicker).
  const fetchTick = useRef<() => Promise<void>>(async () => {});
  useEffect(() => {
    fetchTick.current = async () => {
      try {
        const [statusRes, msgRes] = await Promise.all([
          api.booking.getBookingDetail(bookingId),
          api.booking.getBookingMessages(bookingId),
        ]);
        if (statusRes.code === 2000 && statusRes.data) {
          setBooking((prev) => {
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
  }, [bookingId]);

  // Initial chat load + status/chat polling every 5s.
  useEffect(() => {
    let cancelled = false;
    setMessages([]);
    const run = async () => {
      if (cancelled) return;
      await fetchTick.current();
    };
    run();
    const t = setInterval(run, 5000);
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

  // Sidebar list: active booking on top, then upcoming (pending/confirmed/paid)
  // by start date, then everything else by createdAt desc.
  const sidebarList = useMemo(() => {
    const list = (allBookings || []).slice();
    list.sort((a, b) => {
      if (a.bookingId === bookingId) return -1;
      if (b.bookingId === bookingId) return 1;
      const active = ["pending", "confirmed", "paid"];
      const aActive = active.includes(a.bookingStatus);
      const bActive = active.includes(b.bookingStatus);
      if (aActive !== bActive) return aActive ? -1 : 1;
      return (
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    });
    return list;
  }, [allBookings, bookingId]);

  // Renders one chat message row.
  const renderMessage = (m: BookingMessage) => {
    if (m.senderType === "system") {
      return (
        <div key={m.messageId} className="self-center max-w-[80%]">
          <div className="px-3 py-1.5 rounded-full bg-slate-200/70 text-slate-600 text-[11px] text-center">
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
        {!mine && (
          <div className="flex items-center gap-2 text-[11px] text-gray-500 mb-0.5 ml-1">
            <span className="w-5 h-5 rounded-full bg-[#BD3E2B] text-white flex items-center justify-center text-[9px] font-bold">
              FA
            </span>
            Fantasia Asia
          </div>
        )}
        {hasBody && (
          <div
            className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap shadow-sm ${
              mine
                ? "bg-[#BD3E2B] text-white rounded-br-md"
                : "bg-white border border-gray-200 text-[#2F2F2F] rounded-bl-md"
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
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={a.url}
                      alt={a.name || "attachment"}
                      className="max-w-[240px] max-h-[240px] rounded-xl border border-gray-200 object-cover"
                    />
                  </a>
                );
              }
              const sizeLabel = a.size ? formatBytes(a.size) : "";
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
          className={`text-[10px] text-gray-400 mt-0.5 px-1 ${
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
  };

  return (
    <>
      {/* Compact back link */}
      <div className="mb-4 flex items-center justify-between">
        <Link
          href="/profile"
          className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-[#BD3E2B]"
        >
          ← Back to my bookings
        </Link>
        <button
          type="button"
          onClick={() => setSidebarOpen((v) => !v)}
          className="lg:hidden inline-flex items-center gap-2 text-sm font-medium text-[#BD3E2B] px-3 py-1.5 rounded-full border border-[#BD3E2B]/30"
        >
          ☰ Bookings
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[280px_minmax(0,1fr)_360px] gap-4 lg:gap-6">
        {/* LEFT — bookings list / chat switcher */}
        <aside
          className={`bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex-col ${
            sidebarOpen ? "flex" : "hidden lg:flex"
          }`}
        >
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="text-xs uppercase tracking-wide text-gray-500">
              My bookings
            </div>
            <div className="text-sm font-semibold text-[#2F2F2F]">
              {sidebarList.length}{" "}
              {sidebarList.length === 1 ? "conversation" : "conversations"}
            </div>
          </div>
          <div className="flex-1 overflow-y-auto max-h-[70vh] lg:max-h-[calc(100vh-220px)]">
            {sidebarList.length === 0 && (
              <div className="p-4 text-sm text-gray-500 text-center">
                No other bookings yet.
              </div>
            )}
            {sidebarList.map((b) => {
              const isActive = b.bookingId === bookingId;
              const tone = SHORT_STATUS[b.bookingStatus] || SHORT_STATUS.pending;
              return (
                <Link
                  key={b.bookingId}
                  href={`/profile/booking/${b.bookingId}`}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex gap-3 p-3 border-b border-gray-50 last:border-b-0 transition ${
                    isActive
                      ? "bg-[#BD3E2B]/5 ring-1 ring-inset ring-[#BD3E2B]/20"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                    {b.thumbnail && (
                      <Image
                        src={b.thumbnail}
                        alt={b.tourTitle}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-semibold text-[#2F2F2F] truncate">
                        {b.tourTitle}
                      </span>
                    </div>
                    <div className="text-[11px] text-gray-500 mt-0.5">
                      #{b.bookingId} · {dayMonth(b.startDate)}
                    </div>
                    <span
                      className={`inline-block mt-1 text-[10px] font-medium px-1.5 py-0.5 rounded ${tone.cls}`}
                    >
                      {tone.label}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </aside>

        {/* CENTER — chat (the star) */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-[calc(100vh-180px)] min-h-[560px]">
          <header className="px-5 py-4 border-b border-gray-100 flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#BD3E2B] to-[#8c2c1e] text-white flex items-center justify-center font-bold shadow-sm">
              FA
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-[#2F2F2F] flex items-center gap-2">
                Fantasia Asia team
                <span className="inline-flex items-center gap-1 text-[11px] font-normal text-emerald-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Online
                </span>
              </div>
              <div className="text-xs text-gray-500 truncate">
                {booking.tourTitle} · #{booking.bookingId}
              </div>
            </div>
            <span
              className={`hidden md:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ring-1 ${status.tone}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
              {status.label}
            </span>
          </header>

          <div
            ref={chatRef}
            className="px-5 py-6 flex flex-col gap-3 flex-1 overflow-y-auto bg-gradient-to-b from-gray-50 to-white"
          >
            {messages.length === 0 && (
              <div className="m-auto text-center max-w-sm">
                <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-[#BD3E2B]/10 flex items-center justify-center text-2xl">
                  💬
                </div>
                <div className="text-sm font-semibold text-[#2F2F2F]">
                  Start the conversation
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Ask about anything — pickup times, dietary needs,
                  customisations. We usually reply within a few hours.
                </div>
              </div>
            )}
            {messages.map(renderMessage)}
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
              className="flex-1 resize-none rounded-xl border border-gray-200 focus:border-[#BD3E2B] focus:outline-none px-4 py-2.5 text-sm max-h-32"
            />
            <button
              type="button"
              disabled={sending || !draft.trim()}
              onClick={send}
              className="px-5 py-2.5 rounded-xl bg-[#BD3E2B] hover:bg-[#a13524] text-white font-semibold text-sm disabled:opacity-50 transition"
            >
              {sending ? "Sending…" : "Send"}
            </button>
          </div>
        </section>

        {/* RIGHT — booking detail panel */}
        <aside className="flex flex-col gap-4">
          {/* Hero card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="relative w-full aspect-[16/10] bg-gray-100">
              {booking.thumbnail && (
                <Image
                  src={booking.thumbnail}
                  alt={booking.tourTitle}
                  fill
                  sizes="360px"
                  className="object-cover"
                />
              )}
              <div className="absolute top-3 left-3">
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ring-1 ${status.tone} bg-white/95 backdrop-blur`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                  {status.label}
                </span>
              </div>
            </div>
            <div className="p-5">
              <div className="text-xs text-gray-500 uppercase tracking-wide">
                {booking.country}
              </div>
              <h1 className="text-lg font-bold text-[#2F2F2F] leading-snug mt-1">
                {booking.tourTitle}
              </h1>
              <div className="text-xs text-gray-500 mt-1">
                Booking #{booking.bookingId}
              </div>
              <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                {status.description}
              </p>

              {booking.bookingStatus === "confirmed" && booking.paymentUrl && (
                <Link
                  href={booking.paymentUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center justify-center w-full px-4 py-3 rounded-xl bg-[#BD3E2B] hover:bg-[#a13524] text-white font-semibold text-sm shadow-sm"
                >
                  Pay {total} now →
                </Link>
              )}
              {booking.bookingStatus === "paid" && (
                <div className="mt-4 inline-flex items-center gap-2 text-emerald-700 font-semibold text-sm">
                  ✓ Payment received
                </div>
              )}
            </div>
          </div>

          {/* Decline reason */}
          {booking.bookingStatus === "declined" && booking.declineReason && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-red-800">
              <div className="font-semibold mb-1 text-sm">
                Reason from the team
              </div>
              <div className="text-sm whitespace-pre-wrap">
                {booking.declineReason}
              </div>
            </div>
          )}

          {/* Trip summary */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <div className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-3">
              Trip summary
            </div>
            <dl className="grid grid-cols-2 gap-y-3 gap-x-2 text-sm">
              <dt className="text-gray-500">Start date</dt>
              <dd className="font-medium text-[#2F2F2F] text-right">
                {fullDate(booking.startDate)}
              </dd>
              {booking.visitTime && (
                <>
                  <dt className="text-gray-500">Pickup time</dt>
                  <dd className="font-medium text-[#2F2F2F] text-right">
                    {booking.visitTime}
                  </dd>
                </>
              )}
              <dt className="text-gray-500">Travellers</dt>
              <dd className="font-medium text-[#2F2F2F] text-right">
                {booking.totalTravellers}
              </dd>
              {booking.adultTickets > 0 && (
                <>
                  <dt className="text-gray-500 pl-3">· Adults</dt>
                  <dd className="text-[#2F2F2F] text-right">
                    {booking.adultTickets}
                  </dd>
                </>
              )}
              {booking.childTickets > 0 && (
                <>
                  <dt className="text-gray-500 pl-3">· Children</dt>
                  <dd className="text-[#2F2F2F] text-right">
                    {booking.childTickets}
                  </dd>
                </>
              )}
              {booking.infantTickets > 0 && (
                <>
                  <dt className="text-gray-500 pl-3">· Infants</dt>
                  <dd className="text-[#2F2F2F] text-right">
                    {booking.infantTickets}
                  </dd>
                </>
              )}
              <dt className="text-gray-500 pt-3 border-t border-gray-100">
                Total
              </dt>
              <dd className="font-bold text-[#BD3E2B] text-right pt-3 border-t border-gray-100">
                {total}
              </dd>
            </dl>
          </div>

          {/* Lead traveller */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <div className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-3">
              Lead traveller
            </div>
            <div className="space-y-1.5 text-sm">
              <div className="font-medium text-[#2F2F2F]">
                {booking.bookingFirstname} {booking.bookingSurname}
              </div>
              <div className="text-gray-600 break-all">
                {booking.bookingEmail}
              </div>
              <div className="text-gray-600">{booking.bookingPhone}</div>
              {booking.bookingAddress && (
                <div className="text-gray-600">{booking.bookingAddress}</div>
              )}
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
