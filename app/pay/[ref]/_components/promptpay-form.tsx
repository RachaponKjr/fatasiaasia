"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  bookingRef: string;
  amount: number;
  adminApi: string;
  successRedirectUrl: string;
};

type GenerateResp = {
  message?: string;
  data?: {
    status?: string;
    chargeId?: string;
    qrImageUri?: string;
    expiresAt?: string; // RFC3339 — Omise charge expiry
    reused?: boolean;   // true if backend handed back an existing pending charge
    redirectUrl?: string;
  };
};

type StatusResp = {
  data?: { bookingStatus?: string; redirectUrl?: string };
};

export default function PromptPayForm({
  bookingRef,
  amount,
  adminApi,
  successRedirectUrl,
}: Props) {
  const [qr, setQr] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [waitingPayment, setWaitingPayment] = useState(false);
  const [done, setDone] = useState(false);
  const [expiresAt, setExpiresAt] = useState<number | null>(null); // epoch ms
  const [now, setNow] = useState<number>(() => Date.now());
  const [reused, setReused] = useState(false);
  const [expired, setExpired] = useState(false);
  const pollRef = useRef<number | null>(null);

  // Poll /pay/:ref every 4s while a QR is shown so we can flip to "received"
  // as soon as the webhook reconciles the charge. Stops on success, error,
  // or when the component unmounts.
  useEffect(() => {
    if (!waitingPayment) return;
    let cancelled = false;
    async function tick() {
      try {
        const res = await fetch(
          `${adminApi}/pay/${encodeURIComponent(bookingRef)}/status`,
          { cache: "no-store" }
        );
        if (!res.ok) return;
        const body = (await res.json()) as StatusResp;
        if (cancelled) return;
        if (body.data?.bookingStatus === "paid") {
          setDone(true);
          setWaitingPayment(false);
          setTimeout(() => {
            window.location.assign(body.data?.redirectUrl || successRedirectUrl);
          }, 700);
        }
      } catch {
        // transient — keep polling
      }
    }
    pollRef.current = window.setInterval(tick, 4000);
    void tick();
    return () => {
      cancelled = true;
      if (pollRef.current) window.clearInterval(pollRef.current);
    };
  }, [waitingPayment, adminApi, bookingRef, successRedirectUrl]);

  // Tick once a second while a QR is showing so the countdown re-renders.
  // Stops on success, expiry, or unmount.
  useEffect(() => {
    if (!qr || done) return;
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, [qr, done]);

  // Flip to expired state once we cross the charge expiry. Backend will
  // refuse to reuse a stale charge so we also drop the QR so the user can
  // generate a fresh one.
  useEffect(() => {
    if (!expiresAt || done) return;
    if (now >= expiresAt) {
      setExpired(true);
      setWaitingPayment(false);
      setQr(null);
    }
  }, [now, expiresAt, done]);

  async function handleGenerate() {
    if (generating || waitingPayment) return;
    setError(null);
    setExpired(false);
    setReused(false);
    setGenerating(true);
    try {
      const res = await fetch(
        `${adminApi}/pay/${encodeURIComponent(bookingRef)}/promptpay`,
        { method: "POST", headers: { "Content-Type": "application/json" } }
      );
      const body = (await res.json().catch(() => ({}))) as GenerateResp;
      if (body.data?.status === "successful") {
        setDone(true);
        window.location.assign(body.data.redirectUrl || successRedirectUrl);
        return;
      }
      if (!res.ok || !body.data?.qrImageUri) {
        setError(body.message || "Could not generate PromptPay QR. Please try again.");
        setGenerating(false);
        return;
      }
      setQr(body.data.qrImageUri);
      setReused(Boolean(body.data.reused));
      if (body.data.expiresAt) {
        const ts = Date.parse(body.data.expiresAt);
        setExpiresAt(Number.isFinite(ts) ? ts : null);
      } else {
        setExpiresAt(null);
      }
      setNow(Date.now());
      setWaitingPayment(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Network error. Please retry.");
    } finally {
      setGenerating(false);
    }
  }

  if (done) {
    return (
      <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-center">
        <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-green-600 text-xl text-white">
          ✓
        </div>
        <p className="font-semibold text-green-800">Payment received</p>
        <p className="text-xs text-green-700">Opening your booking chat...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-[#EFE9DF] bg-[#FBF7F1] p-4 text-sm text-[#7A6F5C]">
        <p className="font-semibold text-[#333333]">How PromptPay works</p>
        <ol className="mt-2 list-inside list-decimal space-y-1">
          <li>Tap &ldquo;Generate QR&rdquo; below.</li>
          <li>Open your Thai banking app and choose <strong>Scan</strong>.</li>
          <li>Scan the QR and confirm the payment in your app.</li>
          <li>This page will update automatically once the bank confirms.</li>
        </ol>
      </div>

      {!qr ? (
        <>
          {expired && (
            <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800">
              The previous QR has expired. Generate a new one to continue.
            </div>
          )}
          <button
            type="button"
            onClick={handleGenerate}
            disabled={generating}
            className="w-full rounded-lg bg-[#BD3E2B] px-4 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-[#A1331E] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {generating
              ? "Generating QR…"
              : expired
              ? `Generate new QR for ฿${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
              : `Generate QR for ฿${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          </button>
        </>
      ) : (
        <div className="flex flex-col items-center">
          {reused && (
            <div className="mb-3 w-full rounded-lg border border-[#EFE9DF] bg-white px-3 py-2 text-center text-xs text-[#7A6F5C]">
              Same QR restored — you can keep scanning the one already open in
              your bank app.
            </div>
          )}
          <div className="rounded-xl border border-[#EFE9DF] bg-white p-3 shadow-sm">
            {/* Omise QR is served from api.omise.co — load as raw <img> since
                next/image needs the domain whitelisted in next.config. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={qr}
              alt="PromptPay QR"
              className="h-64 w-64 object-contain"
            />
          </div>
          <div className="mt-3 flex items-center gap-2 text-sm text-[#7A6F5C]">
            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-[#BD3E2B]" />
            Waiting for payment confirmation…
          </div>
          {expiresAt ? (
            <CountdownLine expiresAt={expiresAt} now={now} />
          ) : (
            <p className="mt-2 text-xs text-[#9A8E78]">
              Keep this page open until the payment is confirmed.
            </p>
          )}
        </div>
      )}

      {error ? (
        <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      <div className="flex items-center justify-center gap-2 pt-1 text-xs text-[#9A8E78]">
        Powered by Omise · PromptPay
      </div>
    </div>
  );
}

function CountdownLine({ expiresAt, now }: { expiresAt: number; now: number }) {
  const msLeft = Math.max(0, expiresAt - now);
  const totalSec = Math.floor(msLeft / 1000);
  const mm = String(Math.floor(totalSec / 60)).padStart(2, "0");
  const ss = String(totalSec % 60).padStart(2, "0");
  const lowTime = msLeft <= 60_000; // <= 1 min left
  return (
    <p
      className={`mt-2 text-xs ${
        lowTime ? "font-semibold text-[#BD3E2B]" : "text-[#9A8E78]"
      }`}
    >
      QR expires in <span className="font-mono">{mm}:{ss}</span>
    </p>
  );
}
