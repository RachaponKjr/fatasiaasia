import z from "zod";

export const ProfileSchema = z.object({
  userId: z.string(),
  name: z.string(),
  email: z.string(),
  userType: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  phoneNumber: z.string(),
  language: z.string(),
  birthday: z.string(),
  country: z.string(),
  timezone: z.string(),
  address: z.string(),
});

export const ProfileEditSchema = ProfileSchema.omit({
  userId: true,
  userType: true,
});

export type Profile = z.infer<typeof ProfileSchema>;
export type ProfileEdit = z.infer<typeof ProfileEditSchema>;
