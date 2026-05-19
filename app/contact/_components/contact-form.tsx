"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Status = { kind: "idle" | "sending" | "ok" | "error"; message?: string };

export default function ContactForm() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, [k]: e.target.value }));

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status.kind === "sending") return;
    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok) {
        setStatus({
          kind: "error",
          message: data?.error || "Could not send your message. Please try again.",
        });
        return;
      }
      setStatus({ kind: "ok", message: "Thanks — we'll get back to you shortly." });
      setForm({ firstName: "", lastName: "", email: "", phone: "", message: "" });
    } catch {
      setStatus({ kind: "error", message: "Network error. Please try again." });
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="bg-white px-4 xl:px-12 py-10 xl:py-20 shadow-[0px_0px_25px_0px_#000000]/10 border border-[#BDBDBD] rounded-[8px] flex flex-col gap-[50px]"
    >
      <div className="w-full [&>input]:rounded-xl [&>input]:h-[50px] h-max [&>input]:border [&>input]:border-[#828282] [&>input]:bg-[#F9F9F9] grid grid-cols-2 gap-6">
        <Input
          placeholder="First Name*"
          value={form.firstName}
          onChange={set("firstName")}
          required
        />
        <Input
          placeholder="Last Name*"
          value={form.lastName}
          onChange={set("lastName")}
        />
        <Input
          type="email"
          placeholder="Email*"
          className="col-span-2"
          value={form.email}
          onChange={set("email")}
          required
        />
        <Input
          placeholder="Phone Number*"
          className="col-span-2"
          value={form.phone}
          onChange={set("phone")}
        />
        <textarea
          placeholder="Your message..."
          className="w-full p-4 border border-[#828282] bg-[#F9F9F9] col-span-2 h-[176px] rounded-xl"
          value={form.message}
          onChange={set("message")}
          required
        />
      </div>
      {status.message && (
        <p
          className={`text-sm ${status.kind === "ok" ? "text-green-600" : "text-red-600"}`}
        >
          {status.message}
        </p>
      )}
      <Button
        type="submit"
        disabled={status.kind === "sending"}
        className="cursor-pointer bg-gradient-to-r from-[#FFBA0A] to-[#DF6951] text-xl text-white col-span-2 h-[50px] rounded-full disabled:opacity-60"
      >
        {status.kind === "sending" ? "Sending…" : "Send Message"}
      </Button>
    </form>
  );
}
