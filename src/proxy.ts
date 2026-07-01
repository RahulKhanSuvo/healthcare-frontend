import { NextRequest, NextResponse } from "next/server";
import { JwtUtils } from "./lib/jwt";
import {
  getDefaultDashboardRoute,
  getRouteOwner,
  isAuthRoute,
  UserRole,
} from "./lib/authUtils";
import { JwtPayload } from "jsonwebtoken";
import { getNewRefreshToken } from "./services/auth.service";
import { isTokenExpiringSoon } from "./lib/tokenUtil";
async function refreshAccessTokenMiddleware(
  refreshToken: string,
): Promise<boolean> {
  try {
    const refreshedAccessToken = await getNewRefreshToken(refreshToken);
    if (refreshedAccessToken) {
      return true;
    }
    return false;
  } catch (error) {
    console.error(error);
    return false;
  }
}
export async function proxy(request: NextRequest) {
  try {
    const { pathname } = request.nextUrl;
    const accessToken = request.cookies.get("accessToken")?.value;
    const refreshToken = request.cookies.get("refreshToken")?.value;

    const verifyResult = accessToken
      ? JwtUtils.verifyToken(
          accessToken,
          process.env.ACCESS_TOKEN_SECRET as string,
        )
      : { success: false, data: null };

    const verifyAccessToken = verifyResult?.data as
      | (JwtPayload & { role?: string; id?: string; email?: string })
      | null;
    const isAccessTokenValid = verifyResult?.success || false;

    let userRole: UserRole | null = null;
    if (isAccessTokenValid && verifyAccessToken) {
      userRole = verifyAccessToken.role as UserRole;
    }
    const routerOwner = getRouteOwner(pathname);
    console.log("routerOwner", routerOwner);

    const unifiedSuperAdminRole =
      userRole === "SUPER_ADMIN" ? "ADMIN" : userRole;
    userRole = unifiedSuperAdminRole;
    const isAuth = isAuthRoute(pathname);
    console.log("isAuth", isAuth);
    if (
      isAccessTokenValid &&
      refreshToken &&
      accessToken &&
      (await isTokenExpiringSoon(accessToken))
    ) {
      const requestHeaders = new Headers(request.headers);
      const response = NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
      try {
        const refresh = await refreshAccessTokenMiddleware(refreshToken);
        if (refresh) {
          requestHeaders.set("x-token-refreshed", "1");
        }
        return NextResponse.next({
          request: {
            headers: requestHeaders,
          },
          headers: response.headers,
        });
      } catch (error) {
        console.error("Error: error message", error);
      }
      return response;
    }
    // rule-1: if the user is authenticated, redirect to the default dashboard route
    if (isAuth && isAccessTokenValid) {
      return NextResponse.redirect(
        new URL(getDefaultDashboardRoute(userRole), request.url),
      );
    }
    // rule-2: if the router owner is null, return the next response
    if (routerOwner === null) {
      return NextResponse.next();
    }
    // // rule-3: if user not login, and try to access the router owner, return the next response
    if (!accessToken || !isAccessTokenValid) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
    // rule-4: if the router owner is COMMON, return the next response
    if (routerOwner === "COMMON") {
      return NextResponse.next();
    }
    // rule-5: if user try to access role base route, return the next response
    if (
      routerOwner === "ADMIN" ||
      routerOwner === "DOCTOR" ||
      routerOwner === "PATIENT"
    ) {
      if (userRole !== routerOwner) {
        return NextResponse.redirect(
          new URL(getDefaultDashboardRoute(userRole as UserRole), request.url),
        );
      }
    }
    return NextResponse.next();
  } catch (error) {
    console.error("Error: error message", error);
  }
  return NextResponse.next();
}
export const config = {
  matcher:
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.well-known).*)",
};
