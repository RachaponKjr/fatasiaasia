import z from "zod";

export const AuthSchema = z.object({
  firstName: z.string().min(1, { message: "กรุณากรอกชื่อ" }),
  lastName: z.string().min(1, { message: "กรุณากรอกชื่อ" }),
  email: z.string().email({ message: "อีเมลไม่ถูกต้อง" }),
  password: z
    .string()
    .min(8, { message: "รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร" }),
  confirmPassword: z.string().optional(),
});

export type Auth = z.infer<typeof AuthSchema>;
