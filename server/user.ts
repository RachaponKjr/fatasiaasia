import { BaseApi } from "@/lib/base-api";
import { Profile, ProfileEdit } from "@/types/profile.type";

const getProfile = async () => {
  return BaseApi<Profile>("/user/profile", {
    method: "GET",
    requiresAuth: true,
  });
};

const updateProfile = async ({ payload }: { payload: ProfileEdit }) => {
  return BaseApi("/user/profile", {
    method: "PUT",
    body: JSON.stringify(payload),
    requiresAuth: true,
  });
};

export { getProfile, updateProfile };
