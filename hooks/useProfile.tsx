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
  const router = useRouter();
  const authCookie = Cookies.get('auth_token')

  const fetchProfile = async () => {
    setIsLoading(true);
    setError(null);
    try {
      if (authCookie) {
        const res: ApiResponse<Profile> = await api.user.getProfile();
        setUser(res.data);
      }
    } catch (err: any) {
      setError(err.message || "Failed to fetch profile");
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    Cookies.remove("auth_token"); // clear token
    setUser(null); // clear state
    router.push("/login"); // redirect
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return {
    user,
    isLoading,
    error,
    refresh: fetchProfile,
    logout,
  };
};
