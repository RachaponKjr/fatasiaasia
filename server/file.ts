"use server";

import { BaseApi } from "@/lib/base-api";

export const uploadProfilePicture = async (formData: FormData) => {
    return await BaseApi<{ profilePictureUrl: string }>("/user/profile/picture", {
        method: "POST",
        body: formData,
        requiresAuth: true,
        isMultipart: true,
    });
};
