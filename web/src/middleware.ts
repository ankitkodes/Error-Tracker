import { NextRequest, NextResponse } from "next/server";
export { default } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });

  if (!token) {
    return NextResponse.redirect(new URL('/signin', request.url))
  }
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/project/:path*",
    "/dashboard/:path*",
    "/analytics",
    "/issue",
    "/report",
    "/setup",
    "/profile/:path*"
  ],
};
