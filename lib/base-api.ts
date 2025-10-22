"use server";


import { cookies } from "next/headers";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://tour-user-api-gep6p.ondigitalocean.app";

interface RequestOptions extends RequestInit {
  token?: string;
  requiresAuth?: boolean; // <-- เพิ่มตรงนี้
}

export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

export async function BaseApi<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<ApiResponse<T>> {
  const {
    token: optionToken,
    headers,
    requiresAuth = false,
    ...rest
  } = options;

  let finalToken: string | undefined = optionToken;

  // ถ้า requiresAuth และไม่มี token → ลองดึงจาก cookie
  if (requiresAuth && !finalToken) {
    try {
      const cookieStore = cookies();
      finalToken = (await cookieStore).get("auth_token")?.value;
    } catch (err) {
      console.warn("Cannot read auth token from cookies:", err);
    }
  }

  const requestHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    ...(headers as Record<string, string>),
  };

  // ใส่ Authorization เฉพาะถ้า requiresAuth และมี token จริง
  if (requiresAuth && finalToken) {
    requestHeaders["Authorization"] = `Bearer ${finalToken}`;
  }

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...rest,
    headers: requestHeaders,
  });

  // Debug
  // console.log("===== DEBUG API CALL =====");
  // console.log("Endpoint:", endpoint);
  // console.log("Token:", finalToken);
  // console.log("Headers:", requestHeaders);
  // console.log("==========================");

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "API Error");
  }

  return res.json();
}
