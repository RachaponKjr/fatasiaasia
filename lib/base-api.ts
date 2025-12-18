"use server";

import { cookies } from "next/headers";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://tour-user-api-27tvf.ondigitalocean.app";

interface RequestOptions extends RequestInit {
  token?: string;
  requiresAuth?: boolean;
  isMultipart?: boolean;
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
    isMultipart = false,
    ...rest
  } = options;

  let finalToken: string | undefined = optionToken;

  // Only try to get token from cookies when auth is required or optionally for pricing
  if (requiresAuth) {
    try {
      const cookieStore = cookies();
      const storedToken = (await cookieStore).get("access_token")?.value;
      if (storedToken && !finalToken) {
        finalToken = storedToken;
      }
    } catch (err) {
      // Ignore error if cookies cannot be accessed (e.g. in some contexts)
    }
  }

  // If auth is strictly required but no token found, we could throw here, 
  // but current logic just proceeds without header (which will likely result in 401 from API)
  if (requiresAuth && !finalToken) {
    // warning or handle if needed
  }

  const requestHeaders: Record<string, string> = {
    ...(isMultipart ? {} : { "Content-Type": "application/json" }),
    ...(headers as Record<string, string>),
  };

  if (finalToken) {
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

