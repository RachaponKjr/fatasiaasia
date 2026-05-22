"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import FormLogin from "@/app/(auth)/login/_components/form-login";
import FormSignUp from "@/app/(auth)/signup/_components/form-signup";

type AuthDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /**
   * Called once the user has either logged in OR completed signup + OTP
   * verification. The caller is expected to close the dialog inside this
   * handler (or rely on the inner forms — they call us only on success)
   * and resume whatever flow triggered the auth prompt.
   */
  onAuthenticated: () => void;
  /** Initial tab; defaults to "login". */
  initialTab?: "login" | "signup";
  /** Short reason rendered under the title, e.g. "to complete your booking". */
  reason?: string;
};

/**
 * Modal that lets a guest user log in or sign up without navigating away
 * from the current page. Used by the booking flow so a half-filled
 * booking form isn't lost when the user realises they need an account.
 */
const AuthDialog = ({
  open,
  onOpenChange,
  onAuthenticated,
  initialTab = "login",
  reason,
}: AuthDialogProps) => {
  const [tab, setTab] = useState<"login" | "signup">(initialTab);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Reset tab when reopened so the dialog always lands on the requested tab.
  useEffect(() => {
    if (open) setTab(initialTab);
  }, [open, initialTab]);

  if (!mounted) return null;

  const handleSuccess = () => {
    onOpenChange(false);
    onAuthenticated();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[calc(100vw-2rem)] max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            {tab === "login" ? "Welcome back" : "Create your account"}
          </DialogTitle>
          {reason && (
            <p className="text-center text-sm text-gray-600 mt-2">
              Please {tab === "login" ? "log in" : "sign up"} {reason}
            </p>
          )}
        </DialogHeader>

        <div className="flex w-full rounded-lg bg-[#F2F2F2] p-1 mb-2">
          <button
            type="button"
            onClick={() => setTab("login")}
            className={`flex-1 py-2 text-sm font-semibold rounded-md transition ${
              tab === "login"
                ? "bg-white text-[#BD3E2B] shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Log in
          </button>
          <button
            type="button"
            onClick={() => setTab("signup")}
            className={`flex-1 py-2 text-sm font-semibold rounded-md transition ${
              tab === "signup"
                ? "bg-white text-[#BD3E2B] shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Sign up
          </button>
        </div>

        {tab === "login" ? (
          <FormLogin onSuccess={handleSuccess} />
        ) : (
          <FormSignUp onSuccess={handleSuccess} />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;
