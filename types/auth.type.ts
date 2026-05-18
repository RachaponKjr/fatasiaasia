import z from "zod";

export const AuthSchema = z.object({
  firstName: z.string().min(1, { message: "กรุณากรอกชื่อ" }),
  lastName: z.string().min(1, { message: "กรุณากรอกชื่อ" }),
  email: z.string().email({ message: "อีเมลไม่ถูกต้อง" }),
  password: z
    .string()
    .min(8, { message: "รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร" }),
  confirmPassword: z.string().optional(),
  // Optional B2B agency discount code entered by the customer at signup.
  // Validated server-side; invalid codes are ignored so signups can't be
  // broken by a typo.
  agencyCode: z.string().optional(),
});

export type Auth = z.infer<typeof AuthSchema>;
