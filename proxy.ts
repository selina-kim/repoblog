import { NextResponse } from "next/server";
import { auth } from "@/auth";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isOnDashboard = req.nextUrl.pathname.startsWith("/dashboard");
  const isOnEditor = req.nextUrl.pathname.includes("/edit");
  const isOnNew = req.nextUrl.pathname.includes("/new");

  // Protect dashboard, editor, and new post routes
  if ((isOnDashboard || isOnEditor || isOnNew) && !isLoggedIn) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
