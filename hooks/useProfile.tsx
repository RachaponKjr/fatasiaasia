"use client";

import { ApiResponse } from "@/lib/base-api";
import api from "@/server";
import { Profile } from "@/types/profile.type";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export const useProfile = () => {
  const [user, setUser] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [authStatus, setAuthStatus] = useState<string | null>(null);
  const router = useRouter();
  const authCookie = Cookies.get("access_token");

  const fetchProfile = async () => {
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
        // Don't reset the access_token cookie here, keep the original
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
  };

  const logout = async () => {
    Cookies.remove("access_token", { path: '/' }); // clear token with path
    Cookies.remove("authStatus", { path: '/' });
    setUser(null); // clear state
    setAuthStatus(null);
    router.push("/login"); // redirect
  };

  useEffect(() => {
    if (!user) {
      fetchProfile();
    }
  }, []);

  return {
    user,
    isLoading,
    error,
    refresh: fetchProfile,
    logout,
    authStatus,
  };
};
