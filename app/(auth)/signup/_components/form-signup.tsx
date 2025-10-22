"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import api from "@/server";
import { Auth, AuthSchema } from "@/types/auth.type";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

const FormSignUp = () => {
  const router = useRouter();
  const [sign, setSign] = useState<Auth>({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSign((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = AuthSchema.safeParse(sign);

    if (!result.success) {
      result.error.issues.forEach((err) => {
        toast.error(err.message, { className: "!text-red-500" }); // แสดง error แต่ละอันเป็น toast
      });
      return;
    }
    if (sign.password != sign.confirmPassword) {
      toast.error("รหัสไม่ตรงกันกรุณากรอกใหม่ !", {
        className: "!text-red-500",
      });
      return;
    }
    try {
      const payload = {
        name: sign.name,
        email: sign.email,
        password: sign.password,
      };
      const signupRes = await api.auth.signup({ payload });
      console.log(signupRes);
      if (signupRes.code !== 2000) {
        toast.error(signupRes.message, { className: "!text-red-500" });
      }
      toast.success("สมัครสมาชิกสำเร็จ", { className: "!text-green-500" });
      router.push("/login");
    } catch (err) {
      console.error(err, "ERROR!");
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 [&>input]:bg-[#F2F2F2] [&>input]:h-12 [&>input]:rounded-[6px] [&>input]:border-[#E5E5E5]"
    >
      <div>
        <Input
          name="name"
          value={sign.name}
          onChange={handleChange}
          placeholder="Enter your name"
        />
      </div>

      <div>
        <Input
          name="email"
          type="email"
          value={sign.email}
          onChange={handleChange}
          placeholder="Enter your email"
        />
      </div>

      <div>
        <Input
          name="password"
          type="password"
          value={sign.password}
          onChange={handleChange}
          placeholder="Create password"
        />
      </div>

      <div>
        <Input
          name="confirmPassword"
          type="password"
          value={sign.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm password"
        />
      </div>

      <Button
        type="submit"
        size="lg"
        className="bg-[#BD3E2B] hover:bg-[#BD3E2B] font-bold cursor-pointer"
      >
        Sign up
      </Button>
    </form>
  );
};

export default FormSignUp;
