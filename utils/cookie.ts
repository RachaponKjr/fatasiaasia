"use server";

import { cookies } from "next/headers";

type CookieOptions = {
  name: string;
  value?: string;
  maxAge?: number;
  sameSite?: "strict" | "lax" | "none";
  path?: string;
  secure?: boolean;
  httpOnly?: boolean;
};

// ฟังก์ชันตั้งค่า Cookie
const setCookie = async ({
  name,
  value = "",
  maxAge = 60 * 60 * 24 * 365, // 1 ปี
  sameSite = "lax",
  path = "/",
  secure = process.env.NODE_ENV === "production",
  httpOnly = true,
}: CookieOptions) => {
  (await cookies()).set({
    name,
    value,
    maxAge,
    sameSite,
    path,
    secure,
    httpOnly,
  });
};

// ฟังก์ชันดึงค่า Cookie
const getCookie = async (name: string): Promise<string | undefined> => {
  return (await cookies()).get(name)?.value;
};

// ฟังก์ชันลบ Cookie
const deleteCookie = async (name: string) => {
  (await cookies()).set({
    name,
    value: "",
    maxAge: 0,
    path: "/",
  });
};

export { setCookie, getCookie, deleteCookie };
