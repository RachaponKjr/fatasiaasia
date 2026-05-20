import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import PayForm from "./_components/pay-form";
import PaymentTabs from "./_components/payment-tabs";

// We intentionally keep this page server-rendered + uncached so the customer
// always sees the latest booking status (e.g. "paid" after their card went
// through, even if they reload the tab).
export const dynamic = "force-dynamic";
export const revalidate = 0;

const ADMIN_API =
  process.env.NEXT_PUBLIC_ADMIN_API_BASE_URL ||
  "https://tour-admin-api-dl8qs.ondigitalocean.app";

type PayData = {
  bookingRef: string;
  tourTitle: string;
  customerName: string;
  amount: number;
  currency: string;
  bookingStatus: string;
  omisePublicKey: string;
};

function symbolFor(code: string): string {
  switch ((code || "").toUpperCase()) {
    case "THB":
      return "฿";
    case "EUR":
      return "€";
    case "USD":
      return "$";
    case "GBP":
      return "£";
    case "JPY":
      return "¥";
    default:
      return (code || "").toUpperCase() + " ";
  }
}

function formatAmount(amount: number, currency: string): string {
  const sym = symbolFor(currency);
  return `${sym}${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export default async function PayPage({
  params,
}: {
  params: Promise<{ ref: string }>;
}) {
  const { ref } = await params;
  const res = await fetch(`${ADMIN_API}/pay/${encodeURIComponent(ref)}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    notFound();
  }
  const body = (await res.json()) as { code?: string; data?: PayData };
  if (!body?.data) {
    notFound();
  }
  const data = body.data;

  const isPaid = data.bookingStatus === "paid";
  const isAwaitingPayment = data.bookingStatus === "confirmed";

  return (
    <div className="min-h-screen bg-[#F8F4EE] text-[#333333]">
      <div className="mx-auto max-w-2xl px-4 py-10 sm:py-16">
        <div className="mb-8 flex items-center justify-center">
          <Link href="/" aria-label="Fantasia Asia home">
            <Image
              src="/logo.png"
              alt="Fantasia Asia"
              width={120}
              height={48}
              className="h-12 w-auto"
              priority
            />
          </Link>
        </div>

        <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
          <div className="border-b border-[#EFE9DF] bg-[#FBF7F1] px-6 py-5">
            <p className="text-xs uppercase tracking-wider text-[#9A8E78]">
              Booking
            </p>
            <h1 className="mt-1 text-xl font-bold sm:text-2xl">
              {data.tourTitle}
            </h1>
            <p className="mt-1 text-sm text-[#7A6F5C]">
              Reference: <span className="font-mono">{data.bookingRef}</span>
            </p>
          </div>

          <div className="px-6 py-5">
            <div className="flex items-baseline justify-between">
              <span className="text-sm text-[#7A6F5C]">Amount due</span>
              <span className="text-3xl font-bold text-[#BD3E2B]">
                {formatAmount(data.amount, data.currency)}
              </span>
            </div>
          </div>

          {isPaid ? (
            <div className="border-t border-[#EFE9DF] bg-[#F0F8F0] px-6 py-8 text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-600 text-2xl text-white">
                ✓
              </div>
              <h2 className="text-lg font-bold text-green-800">
                Payment received
              </h2>
              <p className="mt-1 text-sm text-green-700">
                Thank you{data.customerName ? `, ${data.customerName}` : ""}!
                Your booking is fully confirmed. We&apos;ll be in touch shortly.
              </p>
            </div>
          ) : isAwaitingPayment ? (
            <div className="border-t border-[#EFE9DF] px-6 py-6">
              {data.currency?.toUpperCase() === "THB" ? (
                <PaymentTabs
                  bookingRef={data.bookingRef}
                  amount={data.amount}
                  currency={data.currency}
                  omisePublicKey={data.omisePublicKey}
                  adminApi={ADMIN_API}
                />
              ) : (
                <PayForm
                  bookingRef={data.bookingRef}
                  amount={data.amount}
                  currency={data.currency}
                  omisePublicKey={data.omisePublicKey}
                  adminApi={ADMIN_API}
                />
              )}
            </div>
          ) : (
            <div className="border-t border-[#EFE9DF] bg-[#FDF4F2] px-6 py-8 text-center">
              <h2 className="text-lg font-bold text-[#BD3E2B]">
                This booking is not available for payment
              </h2>
              <p className="mt-1 text-sm text-[#7A6F5C]">
                Status: <span className="font-semibold">{data.bookingStatus}</span>.
                Please contact us at{" "}
                <a
                  href="mailto:info@fantasiaasia.com"
                  className="text-[#BD3E2B] underline"
                >
                  info@fantasiaasia.com
                </a>{" "}
                if this looks wrong.
              </p>
            </div>
          )}

          <div className="border-t border-[#EFE9DF] bg-[#FBF7F1] px-6 py-3 text-center text-xs text-[#9A8E78]">
            Payments are processed securely by Omise (Opn Payments). Your card
            details never touch our servers.
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-[#9A8E78]">
          Questions? Email{" "}
          <a href="mailto:info@fantasiaasia.com" className="underline">
            info@fantasiaasia.com
          </a>
        </p>
      </div>
    </div>
  );
}
