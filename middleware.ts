import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const isAuthPage = req.nextUrl.pathname.startsWith("/login");

    console.log("token", token, 'isAuthPage', isAuthPage);

  if (!token && !isAuthPage) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/account", req.url));
  }

    return NextResponse.next();
  } catch (error) {
    console.error("Error in middleware:", error);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/account/:path*", "/login"]
};