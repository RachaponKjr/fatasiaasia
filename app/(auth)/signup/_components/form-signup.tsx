"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import api from "@/server";
import { Auth, AuthSchema } from "@/types/auth.type";
import { formatTime } from "@/utils/format";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const FormSignUp = () => {
  const router = useRouter();
  const [step, setStep] = useState<number>(0); // เริ่มที่ 0
  const [valueOtp, setValueOtp] = React.useState("");
  const [timeLeft, setTimeLeft] = useState(300);
  const [isResending, setIsResending] = useState(false);
  const [sign, setSign] = useState<Auth>({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
  });
  // Optional B2B agency code. We validate against the public endpoint
  // /agency-code/validate/:code on blur. If valid, the back-end will
  // mark the new user as user_type=tour_agency on OTP verification so
  // future bookings get the agency price tier.
  const [agencyCode, setAgencyCode] = useState<string>("");
  const [agencyCodeStatus, setAgencyCodeStatus] = useState<
    null | { ok: true; label: string; discount: number } | { ok: false; reason: string }
  >(null);
  const [agencyCodeChecking, setAgencyCodeChecking] = useState(false);

  const validateAgencyCode = async () => {
    const code = agencyCode.trim().toUpperCase();
    if (!code) {
      setAgencyCodeStatus(null);
      return;
    }
    setAgencyCodeChecking(true);
    try {
      const base =
        process.env.NEXT_PUBLIC_API_BASE_URL ||
        "https://tour-user-api-27tvf.ondigitalocean.app";
      const res = await fetch(`${base}/agency-code/validate/${encodeURIComponent(code)}`);
      const json = await res.json();
      if (json?.code === 2000 && json?.data?.code) {
        setAgencyCodeStatus({
          ok: true,
          label: json.data.label || code,
          discount: Number(json.data.discountPercent) || 0,
        });
      } else {
        setAgencyCodeStatus({ ok: false, reason: json?.message || "Code not recognised" });
      }
    } catch {
      setAgencyCodeStatus({ ok: false, reason: "Could not verify code right now" });
    } finally {
      setAgencyCodeChecking(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSign((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = AuthSchema.safeParse(sign);
    if (!result.success) {
      result.error.issues.forEach((err) =>
        toast.error(err.message, { className: "!text-red-500" })
      );
      return;
    }
    if (sign.password !== sign.confirmPassword) {
      toast.error("Passwords do not match. Please try again.", {
        className: "!text-red-500",
      });
      return;
    }
    try {
      const payload = {
        firstName: sign.firstName,
        lastName: sign.lastName,
        email: sign.email,
        password: sign.password,
      };
      const signupRes = await api.auth.signup({ payload });

      if (signupRes.code !== 2000) {
        const errorMessage = signupRes.message || "Registration failed. Please try again.";
        toast.error(errorMessage, { className: "!text-red-500" });
        return;
      }
      toast.success("Registration successful! Please check your email for OTP.", { className: "!text-green-500" });
      setStep(1); // ไป OTP step
      setTimeLeft(300);
    } catch (err) {
      console.error(err, "ERROR!");
      toast.error("A network error occurred. Please check your connection and try again.", {
        className: "!text-red-500",
      });
    }
  };

  const verifyOtp = async () => {
    try {
      const otpRes = await api.auth.verifyOtp({
        email: sign.email,
        otpCode: valueOtp,
      });
      if (otpRes.code === 2000) {
        toast.success("Verification successful!", { className: "!text-green-500" });
        // Redirect to homepage after successful signup verification
        router.push("/");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const resendOtp = async () => {
    try {
      const payload = {
        firstName: sign.firstName,
        lastName: sign.lastName,
        email: sign.email,
        password: sign.password,
        agencyCode: agencyCode.trim().toUpperCase(),
      };
      const signupRes = await api.auth.signup({ payload });
      if (signupRes.code !== 2000) {
        toast.error(signupRes.message, { className: "!text-red-500" });
        return;
      }
      toast.success("ส่ง Otp ใหม่เรียบร้อย", { className: "!text-green-500" });
      setStep(1); // ไป OTP step
      setTimeLeft(300);
    } catch (err) {
      console.error(err, "ERROR!");
    }
  };

  useEffect(() => {
    if (valueOtp.length === 6) {
      void verifyOtp();
    }
  }, [valueOtp]);

  // Countdown timer
  useEffect(() => {
    if (step !== 1 || timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [step, timeLeft]);

  return (
    <>
      {step === 0 && (
        <div className="flex flex-col gap-4 max-w-md mx-auto">
          <span className="font-semibold text-[28px] text-center">Sign up</span>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 [&>input]:bg-[#F2F2F2] [&>input]:h-12 [&>input]:rounded-[6px] [&>input]:border-[#E5E5E5]"
          >
            <Input
              name="firstName"
              value={sign.firstName}
              onChange={handleChange}
              placeholder="Enter your firstName"
            />
            <Input
              name="lastName"
              value={sign.lastName}
              onChange={handleChange}
              placeholder="Enter your lastName"
            />
            <Input
              name="email"
              type="email"
              value={sign.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
            <Input
              name="password"
              type="password"
              value={sign.password}
              onChange={handleChange}
              placeholder="Create password"
            />
            <Input
              name="confirmPassword"
              type="password"
              value={sign.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm password"
            />
            <div className="flex flex-col gap-1">
              <Input
                name="agencyCode"
                value={agencyCode}
                onChange={(e) => {
                  setAgencyCode(e.target.value);
                  setAgencyCodeStatus(null);
                }}
                onBlur={validateAgencyCode}
                placeholder="Agency code (optional)"
              />
              {agencyCodeChecking && (
                <span className="text-xs text-gray-500">Checking code…</span>
              )}
              {agencyCodeStatus?.ok && (
                <span className="text-xs text-green-600">
                  ✓ {agencyCodeStatus.label} — {agencyCodeStatus.discount}% agency rate
                </span>
              )}
              {agencyCodeStatus && !agencyCodeStatus.ok && (
                <span className="text-xs text-red-500">{agencyCodeStatus.reason}</span>
              )}
            </div>

            <Button
              type="submit"
              size="lg"
              className="bg-[#BD3E2B] hover:bg-[#BD3E2B] font-bold cursor-pointer"
            >
              Sign up
            </Button>

            <p className="text-xs text-center">
              By logging in, you accept our{" "}
              <Link href="#" className="text-[#007AFF]">
                Terms of Use
              </Link>{" "}
              and{" "}
              <Link href="#" className="text-[#007AFF]">
                Privacy & Cookies
              </Link>{" "}
              Statement.
            </p>
            <div className="text-xs justify-center flex gap-2">
              <span>Already have account?</span>
              <Link href="/login" className="text-[#007AFF]">
                Log in here
              </Link>
            </div>
          </form>
        </div>
      )}

      {step === 1 && (
        <div className="flex flex-col items-center space-y-4 bg-white p-6 rounded-xl mx-auto ">
          <p className="text-gray-700 font-semibold text-xl text-center">
            กรุณายืนยัน OTP
          </p>
          <p className="text-sm text-gray-500">OTP ส่งไปยัง {sign.email}</p>
          <p className="text-sm text-gray-500">
            หมดเวลาใน <span className="font-mono">{formatTime(timeLeft)}</span>
          </p>

          <InputOTP
            maxLength={6}
            pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
            value={valueOtp}
            onChange={(value) => setValueOtp(value)}
          >
            <InputOTPGroup className="flex justify-center gap-3">
              <InputOTPSlot
                index={0}
                className="w-12 h-12 text-center rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-lg"
              />
              <InputOTPSlot
                index={1}
                className="w-12 h-12 text-center rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-lg"
              />
              <InputOTPSlot
                index={2}
                className="w-12 h-12 text-center rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-lg"
              />
              <InputOTPSlot
                index={3}
                className="w-12 h-12 text-center rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-lg"
              />
              <InputOTPSlot
                index={4}
                className="w-12 h-12 text-center rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-lg"
              />
              <InputOTPSlot
                index={5}
                className="w-12 h-12 text-center rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-lg"
              />
            </InputOTPGroup>
          </InputOTP>

          <div>
            <div className="cursor-pointer" onClick={() => resendOtp()}>
              ส่ง Otp ใหม่
            </div>
          </div>

          {timeLeft === 0 && (
            <p className="text-red-500 text-sm mt-2">
              OTP หมดเวลาแล้ว กรุณาส่งใหม่
            </p>
          )}
        </div>
      )}
    </>
  );
};

export default FormSignUp;
