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
  const routeOwner = getRouteOwner(pathname);
  console.log("route owner", routeOwner);
  const isAuth = isAuthRoute(pathname);
  console.log("is auth route", isAuth);
  if (isAuth && isVerified) {
    return NextResponse.redirect(
      new URL(getDefaultDashboardRoute(userRole), request.url),
    );
  }
}

export const config = {
  matcher:
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.well-known).*)",
};
