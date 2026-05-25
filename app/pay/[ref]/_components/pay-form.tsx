"use client";

import { useEffect, useRef, useState } from "react";

// Minimal type shim for the omise.js global so we don't pull in any extra
// dependency just for typings. Only the two calls we actually use.
type OmiseTokenCallback = (
  status: number,
  resp: { id?: string; object?: string; code?: string; message?: string }
) => void;
type OmiseGlobal = {
  setPublicKey: (k: string) => void;
  createToken: (
    kind: "card",
    card: Record<string, string | number>,
    cb: OmiseTokenCallback
  ) => void;
};
declare global {
  interface Window {
    Omise?: OmiseGlobal;
  }
}

type Props = {
  bookingRef: string;
  amount: number;
  currency: string;
  omisePublicKey: string;
  adminApi: string;
  successRedirectUrl: string;
};

const OMISE_SCRIPT_SRC = "https://cdn.omise.co/omise.js";

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

export default function PayForm({
  bookingRef,
  amount,
  currency,
  omisePublicKey,
  adminApi,
  successRedirectUrl,
}: Props) {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [expiry, setExpiry] = useState(""); // MM/YY
  const [cvv, setCvv] = useState("");

  const [omiseReady, setOmiseReady] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<"successful" | "pending" | null>(null);

  // Defensive: in case the script loaded before this component mounted (e.g.
  // navigation back to the page) — re-check on mount.
  const keyAppliedRef = useRef(false);
  useEffect(() => {
    let cancelled = false;
    let timeoutId: number | undefined;

    const applyPublicKey = () => {
      if (cancelled || !window.Omise) return;
      try {
        window.Omise.setPublicKey(omisePublicKey);
        keyAppliedRef.current = true;
        setOmiseReady(true);
      } catch {
        if (!cancelled) {
          setError("Could not initialize payment library.");
        }
      }
    };

    setOmiseReady(false);
    keyAppliedRef.current = false;

    if (window.Omise) {
      applyPublicKey();
      return () => {
        cancelled = true;
      };
    }

    let script = document.querySelector<HTMLScriptElement>(
      `script[src="${OMISE_SCRIPT_SRC}"]`
    );
    if (!script) {
      script = document.createElement("script");
      script.src = OMISE_SCRIPT_SRC;
      script.async = true;
      script.dataset.omiseJs = "true";
      document.head.appendChild(script);
    }

    const handleError = () => {
      if (!cancelled) {
        setError("Could not initialize payment library.");
      }
    };

    script.addEventListener("load", applyPublicKey);
    script.addEventListener("error", handleError);

    timeoutId = window.setTimeout(() => {
      if (!cancelled && !window.Omise) {
        handleError();
      }
    }, 10000);

    return () => {
      cancelled = true;
      if (timeoutId) window.clearTimeout(timeoutId);
      script.removeEventListener("load", applyPublicKey);
      script.removeEventListener("error", handleError);
    };
  }, [omisePublicKey]);

  function handleNumberChange(v: string) {
    // Group digits in 4s for legibility, max 19 digits (Amex etc).
    const digits = v.replace(/\D+/g, "").slice(0, 19);
    const grouped = digits.replace(/(.{4})/g, "$1 ").trim();
    setNumber(grouped);
  }

  function handleExpiryChange(v: string) {
    const digits = v.replace(/\D+/g, "").slice(0, 4);
    if (digits.length <= 2) {
      setExpiry(digits);
    } else {
      setExpiry(`${digits.slice(0, 2)}/${digits.slice(2)}`);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting || done) return;
    setError(null);

    if (!omiseReady || !window.Omise) {
      setError("Payment system is still loading. Please try again in a moment.");
      return;
    }

    const cardNumber = number.replace(/\s+/g, "");
    const [mmStr, yyStr] = expiry.split("/");
    const mm = parseInt(mmStr || "", 10);
    const yyShort = parseInt(yyStr || "", 10);
    if (!cardNumber || cardNumber.length < 12) {
      setError("Please enter a valid card number.");
      return;
    }
    if (!mm || mm < 1 || mm > 12 || !yyShort) {
      setError("Please enter a valid expiry date (MM/YY).");
      return;
    }
    if (!cvv || cvv.length < 3) {
      setError("Please enter the CVV from the back of your card.");
      return;
    }
    if (!name.trim()) {
      setError("Please enter the name on the card.");
      return;
    }

    const expiration_year = 2000 + yyShort;
    setSubmitting(true);

    const tokenResp = await new Promise<{
      ok: boolean;
      token?: string;
      message?: string;
    }>((resolve) => {
      window.Omise!.createToken(
        "card",
        {
          name: name.trim(),
          number: cardNumber,
          expiration_month: mm,
          expiration_year,
          security_code: cvv,
        },
        (status, resp) => {
          if (status === 200 && resp.id) {
            resolve({ ok: true, token: resp.id });
          } else {
            resolve({
              ok: false,
              message: resp.message || "Your card could not be validated.",
            });
          }
        }
      );
    });

    if (!tokenResp.ok || !tokenResp.token) {
      setSubmitting(false);
      setError(tokenResp.message || "Your card could not be validated.");
      return;
    }

    try {
      const res = await fetch(
        `${adminApi}/pay/${encodeURIComponent(bookingRef)}/charge`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: tokenResp.token }),
        }
      );
      const body = (await res.json().catch(() => ({}))) as {
        message?: string;
        data?: {
          status?: "successful" | "pending" | "failed";
          authorizeUri?: string;
          redirectUrl?: string;
          failureMessage?: string;
        };
      };
      if (!res.ok) {
        setSubmitting(false);
        setError(body.message || "Payment failed. Please try again.");
        return;
      }
      const result = body.data;
      if (result?.status === "successful") {
        setDone("successful");
        // Move the customer straight back into their booking chat once the
        // charge is confirmed, so they are not stranded on the payment form.
        setTimeout(() => {
          window.location.assign(result.redirectUrl || successRedirectUrl);
        }, 700);
        return;
      }
      if (result?.status === "pending" && result.authorizeUri) {
        // 3DS — hand off to the bank's authorize URL.
        window.location.href = result.authorizeUri;
        return;
      }
      setSubmitting(false);
      setError(
        result?.failureMessage ||
          "Payment could not be completed. Please try a different card."
      );
    } catch (err) {
      setSubmitting(false);
      setError(
        err instanceof Error ? err.message : "Network error. Please retry."
      );
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="cc-name"
            className="block text-sm font-semibold text-[#333333]"
          >
            Name on card
          </label>
          <input
            id="cc-name"
            type="text"
            autoComplete="cc-name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full rounded-lg border border-[#E4DCCC] bg-white px-3 py-2.5 text-base outline-none focus:border-[#BD3E2B]"
          />
        </div>

        <div>
          <label
            htmlFor="cc-number"
            className="block text-sm font-semibold text-[#333333]"
          >
            Card number
          </label>
          <input
            id="cc-number"
            type="text"
            inputMode="numeric"
            autoComplete="cc-number"
            required
            value={number}
            onChange={(e) => handleNumberChange(e.target.value)}
            placeholder="1234 5678 9012 3456"
            className="mt-1 w-full rounded-lg border border-[#E4DCCC] bg-white px-3 py-2.5 text-base outline-none focus:border-[#BD3E2B]"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label
              htmlFor="cc-exp"
              className="block text-sm font-semibold text-[#333333]"
            >
              Expiry (MM/YY)
            </label>
            <input
              id="cc-exp"
              type="text"
              inputMode="numeric"
              autoComplete="cc-exp"
              required
              value={expiry}
              onChange={(e) => handleExpiryChange(e.target.value)}
              placeholder="MM/YY"
              className="mt-1 w-full rounded-lg border border-[#E4DCCC] bg-white px-3 py-2.5 text-base outline-none focus:border-[#BD3E2B]"
            />
          </div>
          <div>
            <label
              htmlFor="cc-csc"
              className="block text-sm font-semibold text-[#333333]"
            >
              CVV
            </label>
            <input
              id="cc-csc"
              type="text"
              inputMode="numeric"
              autoComplete="cc-csc"
              required
              value={cvv}
              onChange={(e) =>
                setCvv(e.target.value.replace(/\D+/g, "").slice(0, 4))
              }
              placeholder="123"
              className="mt-1 w-full rounded-lg border border-[#E4DCCC] bg-white px-3 py-2.5 text-base outline-none focus:border-[#BD3E2B]"
            />
          </div>
        </div>

        {error ? (
          <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        <button
          type="submit"
          disabled={submitting || !!done}
          className="w-full rounded-lg bg-[#BD3E2B] px-4 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-[#A1331E] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {done === "successful"
            ? "Payment received. Opening chat..."
            : submitting
              ? "Processing…"
              : `Pay ${symbolFor(currency)}${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
        </button>

        <p className="text-center text-xs text-[#9A8E78]">
          Your card is sent directly to Omise over a secure connection — we
          never see or store the number.
        </p>
      </form>
    </>
  );
}
