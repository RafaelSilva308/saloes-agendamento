import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

const DASHBOARD_PREFIX = "/dashboard";
const AUTH_ROUTES = ["/login", "/register"];
const PUBLIC_PREFIXES = ["/api/public", "/api/webhooks"];

export const proxy = auth((req) => {
  const { nextUrl, auth: session } = req;
  const pathname = nextUrl.pathname;

  if (PUBLIC_PREFIXES.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  const isLoggedIn = !!session?.user;
  const userRole = session?.user?.role;
  const isDashboardRoute = pathname.startsWith(DASHBOARD_PREFIX);
  const isAuthRoute = AUTH_ROUTES.some((r) => pathname === r);

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(getDashboardRedirect(userRole), req.url));
    }
    return NextResponse.next();
  }

  if (isDashboardRoute) {
    if (!isLoggedIn) {
      const loginUrl = new URL("/login", req.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
    if (userRole === "SUPER_ADMIN") return NextResponse.next();
    if (userRole === "CLIENT") return NextResponse.redirect(new URL("/", req.url));
    if (userRole === "SALON_OWNER" || userRole === "SALON_STAFF") {
      if (!session?.user?.salonId && !pathname.startsWith("/dashboard/onboarding")) {
        return NextResponse.redirect(new URL("/dashboard/onboarding", req.url));
      }
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
});

function getDashboardRedirect(role: string | undefined): string {
  if (role === "SUPER_ADMIN") return "/dashboard/admin";
  if (role === "SALON_OWNER" || role === "SALON_STAFF") return "/dashboard";
  return "/";
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
