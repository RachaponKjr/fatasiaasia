"use client";

import { useState } from "react";

import PayForm from "./pay-form";
import PromptPayForm from "./promptpay-form";

type Props = {
  bookingRef: string;
  amount: number;
  currency: string;
  omisePublicKey: string;
  adminApi: string;
};

// Tabs only render when PromptPay is offered (THB). For other currencies
// the page renders <PayForm> directly so this component isn't even loaded.
export default function PaymentTabs({
  bookingRef,
  amount,
  currency,
  omisePublicKey,
  adminApi,
}: Props) {
  const [tab, setTab] = useState<"card" | "promptpay">("card");

  return (
    <div>
      <div
        role="tablist"
        aria-label="Payment method"
        className="mb-4 grid grid-cols-2 gap-2 rounded-lg bg-[#FBF7F1] p-1"
      >
        <button
          role="tab"
          aria-selected={tab === "card"}
          type="button"
          onClick={() => setTab("card")}
          className={`rounded-md px-3 py-2 text-sm font-semibold transition ${
            tab === "card"
              ? "bg-white text-[#BD3E2B] shadow-sm"
              : "text-[#7A6F5C] hover:text-[#333333]"
          }`}
        >
          Credit / Debit card
        </button>
        <button
          role="tab"
          aria-selected={tab === "promptpay"}
          type="button"
          onClick={() => setTab("promptpay")}
          className={`rounded-md px-3 py-2 text-sm font-semibold transition ${
            tab === "promptpay"
              ? "bg-white text-[#BD3E2B] shadow-sm"
              : "text-[#7A6F5C] hover:text-[#333333]"
          }`}
        >
          PromptPay QR
        </button>
      </div>

      {tab === "card" ? (
        <PayForm
          bookingRef={bookingRef}
          amount={amount}
          currency={currency}
          omisePublicKey={omisePublicKey}
          adminApi={adminApi}
        />
      ) : (
        <PromptPayForm
          bookingRef={bookingRef}
          amount={amount}
          adminApi={adminApi}
        />
      )}
    </div>
  );
}
