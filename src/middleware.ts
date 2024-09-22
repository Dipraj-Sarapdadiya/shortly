import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const middleware = (request: NextRequest) => {
  const cookie = request.cookies.get("sns_token" || "__Secure-sns_token");

  if (cookie) {
    if (request.nextUrl.pathname.startsWith("/sign")) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    } else {
      return NextResponse.next();
    }
  } else {
    console.log("in the else condition: ", request.url);
    if (!request.nextUrl.pathname.startsWith("/sign")) {
      console.log("in the else - if condition: ", request.url, request.nextUrl.pathname);
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/sign-in", "/sign-up"],
};
