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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPayload((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.auth.login({ payload });

      if (res.code !== 2000) {
        toast.error("เข้าสู่ระบบไม่สำเร็จ กรุณาลองใหม่อีกครั้ง", {
          className: "!text-red-500",
        });
        return;
      }

      toast.success("เข้าสู่ระบบสำเร็จ", { className: "!text-green-500" });

      if (res?.data?.sessionToken) {
        Cookies.set("access_token", res.data.sessionToken, { expires: 1 });
        Cookies.set("authStatus", "true", { expires: 1 });
      }
      await refresh();
      router.push("/");
    } catch (err) {
      console.error("Login error:", err);
      toast.error("เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง", {
        className: "!text-red-500",
      });
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-4 [&>input]:bg-[#F2F2F2] [&>input]:h-12 [&>input]:rounded-[6px] [&>input]:border-[#E5E5E5]"
    >
      <Input name="email" onChange={handleChange} placeholder="Email" />
      <Input
        name="password"
        onChange={handleChange}
        placeholder="Enter password"
        type="password"
      />
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
        className="bg-[#BD3E2B] hover:bg-[#BD3E2B] font-bold cursor-pointer"
      >
        Login
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
