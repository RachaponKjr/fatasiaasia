"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import api from "@/server";
import { Auth } from "@/types/auth.type";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { useProfile } from "@/hooks/useProfile";

const FormLogin = () => {
  const router = useRouter();
  const { refresh } = useProfile();
  const [payload, setPayload] = useState<Omit<Auth, "firstName" | "lastName">>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPayload((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (error) setError("");
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await api.auth.login({ payload });

      if (res.code !== 2000) {
        // Show the actual error message from the API
        const errorMessage = res.message || "Login failed. Please try again.";
        setError(errorMessage);
        toast.error(errorMessage, {
          className: "!text-red-500",
        });
        setIsLoading(false);
        return;
      }

      toast.success("Login successful!", { className: "!text-green-500" });

      if (res?.data?.sessionToken) {
        Cookies.set("access_token", res.data.sessionToken, {
          expires: 7,
          path: '/',
          sameSite: 'lax'
        });
        Cookies.set("authStatus", "true", {
          expires: 7,
          path: '/',
          sameSite: 'lax'
        });
      }
      await refresh();

      // Redirect to homepage after successful login
      router.push("/");
    } catch (err) {
      console.error("Login error:", err);
      const networkError = "A network error occurred. Please check your connection and try again.";
      setError(networkError);
      toast.error(networkError, {
        className: "!text-red-500",
      });
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-4 [&>input]:bg-[#F2F2F2] [&>input]:h-12 [&>input]:rounded-[6px] [&>input]:border-[#E5E5E5]"
    >
      <div className="flex flex-col gap-1">
        <Input
          name="email"
          onChange={handleChange}
          placeholder="Email"
          className={error ? "border-red-500 focus:border-red-500" : ""}
        />
      </div>
      <div className="flex flex-col gap-1">
        <Input
          name="password"
          onChange={handleChange}
          placeholder="Enter password"
          type="password"
          className={error ? "border-red-500 focus:border-red-500" : ""}
        />
        {error && (
          <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </p>
        )}
      </div>
      <div className="flex items-center justify-between text-xs font-medium my-4">
        <div className="flex items-center gap-2">
          <Switch className="" />
          <span>Remember me</span>
        </div>
        <Link href={"/forgotpassword"} className="text-[#007AFF] underline">
          Forgot password?
        </Link>
      </div>
      <Button
        type="submit"
        size={"lg"}
        disabled={isLoading}
        className="bg-[#BD3E2B] hover:bg-[#BD3E2B] font-bold cursor-pointer disabled:opacity-70"
      >
        {isLoading ? "Logging in..." : "Login"}
      </Button>
      <div className="w-full h-[1px] bg-neutral-100 my-4" />
      <div className="flex flex-col gap-3 items-center justify-center">
        <div className="flex gap-2 text-xs ">
          <span>Dont have an account?</span>
          <Link href={"/signup"} className="text-[#007AFF]">
            Sign up here
          </Link>
        </div>
        <p className="text-[9px] text-center">
          By logging in, you accept our{" "}
          <Link href={"#"} className="text-[#007AFF]">
            Terms of Use,
          </Link>
          <br /> and{" "}
          <Link href={"#"} className="text-[#007AFF]">
            Privacy & Cookies
          </Link>
          Statement.
        </p>
      </div>
    </form>
  );
};

export default FormLogin;
