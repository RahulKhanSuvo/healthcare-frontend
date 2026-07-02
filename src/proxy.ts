import { NextResponse, type NextRequest } from "next/server";
import { JwtUtils } from "./lib/jwt";
import {
  getDefaultDashboardRoute,
  getRouteOwner,
  isAuthRoute,
  UserRole,
} from "./lib/authUtils";
import { JwtPayload } from "jsonwebtoken";
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  console.log(pathname);
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;
  // console.log(accessToken, refreshToken);
  const verifyResult = accessToken
    ? JwtUtils.verifyToken(accessToken, process.env.ACCESS_TOKEN_SECRET!)
    : { success: false, data: null };
  const isVerified = verifyResult.success;
  const verifyAccessToken = verifyResult?.data as
    | (JwtPayload & { role?: string; id?: string; email?: string })
    | null;
  console.log(isVerified);
  let userRole: UserRole | null = null;
  if (accessToken && isVerified) {
    userRole = verifyAccessToken?.role as UserRole;
  }
  const unifiedSuperAdminRole = userRole === "SUPER_ADMIN" ? "ADMIN" : userRole;
  userRole = unifiedSuperAdminRole;
  const routeOwner = getRouteOwner(pathname);
  console.log("route owner", routeOwner);
  const isAuth = isAuthRoute(pathname);
  console.log("is auth route", isAuth);
  // refresh token check
  if (accessToken && isVerified && refreshToken) {
    
  }
  // if the route is an auth route and the user is verified, redirect to the default dashboard route
  if (isAuth && isVerified) {
    return NextResponse.redirect(
      new URL(getDefaultDashboardRoute(userRole), request.url),
    );
  }
  // if the route is not an auth route or the user is not verified, allow the request to proceed
  if (routeOwner === null) {
    return NextResponse.next();
  }
  // if the route is an auth route and the user is not verified, redirect to the login page
  if (!accessToken && !isVerified) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }
  // rule-4: if the router owner is COMMON, return the next response
  if (routeOwner === "COMMON") {
    return NextResponse.next();
  }
  // rule-5: if the router owner is USER, return the next response
  if (routeOwner === "PATIENT") {
    return NextResponse.next();
  }
}

export const config = {
  matcher:
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.well-known).*)",
};
