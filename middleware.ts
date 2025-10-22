import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// กำหนดหน้าที่ต้องตรวจสอบ token
const protectedRoutes = ['/dashboard'];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ถ้า route ไม่ต้อง protect → ผ่านเลย
  if (!protectedRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // ตรวจสอบ cookie
  const token = req.cookies.get("auth_token")?.value;

  if (!token) {
    // ถ้าไม่มี token → redirect ไป login
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  // มี token → ผ่าน
  return NextResponse.next();
}

// เงื่อนไขว่าจะใช้ middleware กับ route ไหน
export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/settings/:path*"],
};
