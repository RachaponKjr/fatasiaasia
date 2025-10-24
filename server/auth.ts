import { BaseApi } from "@/lib/base-api";
import { Auth } from "@/types/auth.type";

type LoginRes = {
  sessionToken: string;
};

const signup = async ({ payload }: { payload: Auth }) => {
  return BaseApi("/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};

const login = async ({
  payload,
}: {
  payload: Omit<Auth, "firstName" | "lastName">;
}) => {
  return BaseApi<LoginRes>("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
    requiresAuth: false,
  });
};

const verifyOtp = async ({
  email,
  otpCode,
}: {
  email: string;
  otpCode: string;
}) => {
  return BaseApi("/auth/verify-otp", {
    method: "POST",
    body: JSON.stringify({
      email,
      otpCode,
    }),
  });
};

export { signup, login, verifyOtp };
