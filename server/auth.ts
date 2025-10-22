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

const login = async ({ payload }: { payload: Omit<Auth, "name"> }) => {
  return BaseApi<LoginRes>("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
    requiresAuth: false,
  });
};

export { signup, login };
