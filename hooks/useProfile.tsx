"use client";

import { ApiResponse } from "@/lib/base-api";
import api from "@/server";
import { Profile } from "@/types/profile.type";
import { useState, useEffect, useCallback, useRef } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export const useProfile = () => {
  const [user, setUser] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [authStatus, setAuthStatus] = useState<string | null>(null);
  const router = useRouter();
  const hasFetched = useRef(false);

  const fetchProfile = useCallback(async () => {
    const authCookie = Cookies.get("access_token");
    setIsLoading(true);
    setError(null);
    try {
      if (authCookie) {
        const res: ApiResponse<Profile> = await api.user.getProfile();
        setUser(res.data);
        Cookies.set("authStatus", "true", {
          expires: 7,
          path: '/',
          sameSite: 'lax'
        });
        setAuthStatus("true");
      } else {
        setIsLoading(false);
      }
    } catch (err: any) {
      // Only clear cookies if it's an authentication error (401)
      if (err.response?.status === 401) {
        Cookies.remove("access_token", { path: '/' });
        Cookies.remove("authStatus", { path: '/' });
        setAuthStatus(null);
        setUser(null);
      }
      setError(err.message || "Failed to fetch profile");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    Cookies.remove("access_token", { path: '/' });
    Cookies.remove("authStatus", { path: '/' });
    setUser(null);
    setAuthStatus(null);
    router.push("/login");
  }, [router]);

  useEffect(() => {
    // Only fetch once on mount
    if (!hasFetched.current) {
      hasFetched.current = true;
      fetchProfile();
    }
  }, [fetchProfile]);

  return {
    user,
    isLoading,
    error,
    refresh: fetchProfile,
    logout,
    authStatus,
  };
};
