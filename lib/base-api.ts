"use server";

import { cookies } from "next/headers";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://tour-user-api-27tvf.ondigitalocean.app";

interface RequestOptions extends RequestInit {
  token?: string;
  requiresAuth?: boolean;
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

  // ⛔ ไม่มี token แต่ต้องใช้ auth → ตัดไฟตั้งแต่ต้นลม
  if (requiresAuth) {
    try {
      const cookieStore = cookies();
      finalToken = (await cookieStore).get("access_token")?.value;
    } catch (err) {
      console.warn("Cannot read auth token from cookies:", err);
    }
  }

  const requestHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    ...(headers as Record<string, string>),
  };

  if (requiresAuth && finalToken) {
    requestHeaders["Authorization"] = `Bearer ${finalToken}`;
  }

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...rest,
    headers: requestHeaders,
  });

  // Parse response body regardless of status
  const responseData = await res.json().catch(() => ({
    code: 5000,
    message: "An unexpected response was received from the server.",
    data: null,
  }));

  // For non-OK responses, return the error response from API instead of throwing
  // This allows the frontend to show proper error messages
  if (!res.ok) {
    return {
      code: responseData.code || res.status,
      message: responseData.message || "An error occurred. Please try again.",
      data: responseData.data || null,
    } as ApiResponse<T>;
  }

  return responseData;
}

