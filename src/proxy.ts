import { NextRequest, NextResponse } from "next/server";
import { jwtUtils } from "./lib/jwt";
import {
  getDefaultDashboardRoute,
  getRouteOwner,
  isAuthRoute,
  UserRole,
} from "./lib/authUtils";
import { getNewRefreshToken, getUserInfo } from "./services/auth.service";
import { isTokenExpiringSoon } from "./lib/tokenUtil";
async function refreshTokenMiddleware(refreshToken: string): Promise<boolean> {
  try {
    const isValidRefreshToken = await getNewRefreshToken(refreshToken);
    return isValidRefreshToken;
  } catch (error) {
    console.error("Error: error message", error);
    return false;
  }
}

export async function proxy(request: NextRequest) {
  try {
    const { pathname } = request.nextUrl;
    const refreshToken = request.cookies.get("refreshToken")?.value;
    const accessToken = request.cookies.get("accessToken")?.value;

    const decodedAccessToken = accessToken
      ? jwtUtils.verifyToken(
          accessToken,
          process.env.ACCESS_TOKEN_SECRET as string,
        ).data
      : null;
    const isValidAccessToken = accessToken
      ? jwtUtils.verifyToken(
          accessToken,
          process.env.ACCESS_TOKEN_SECRET as string,
        ).success
      : false;

    let userRole: UserRole | null = null;

    if (decodedAccessToken) {
      userRole = decodedAccessToken.role as UserRole;
    }

    const routeOwner = getRouteOwner(pathname);
    const unifiedRole = userRole === "SUPER_ADMIN" ? "ADMIN" : userRole;
    const isAuth = isAuthRoute(pathname);
    console.log("Path:", pathname);
    console.log("Route Owner:", routeOwner);
    console.log("Role:", unifiedRole);
    console.log("isAuthRoute", isAuth);
    console.log("isValid use", isValidAccessToken);
    if (
      isValidAccessToken &&
      refreshToken &&
      (await isTokenExpiringSoon(accessToken as string))
    ) {
      const requestHeaders = new Headers(request.headers);
      const response = NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });

      try {
        const refreshed = await refreshTokenMiddleware(refreshToken);
        if (refreshed) {
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

    // rule:1 if user is login but try to access to auth route
    if (isAuth && isValidAccessToken) {
      return NextResponse.redirect(
        new URL(getDefaultDashboardRoute(userRole), request.url),
      );
    }
    // rule:2 if user try to access to reset-password route
    if (pathname === "/reset-password") {
      const email = request.nextUrl.searchParams.get("email");
      // case 1 if user need to change password
      if (accessToken && email) {
        const userInfo = await getUserInfo();
        if (userInfo?.needPasswordChange) {
          return NextResponse.next();
        } else {
          return NextResponse.redirect(
            new URL(getDefaultDashboardRoute(userRole), request.url),
          );
        }
      }
      if (email) {
        return NextResponse.next();
      }
      return NextResponse.redirect(new URL("/login", request.url));
    }
    // rule:3- if user try to access to the public route
    if (routeOwner === null) {
      return NextResponse.next();
    }

    // rule:4: if use is not login
    if (!accessToken) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
    // enforce user to stay in reset password if need password change
    if (accessToken) {
      const userInfo = await getUserInfo();
      if (userInfo?.needPasswordChange) {
        if (pathname !== "/reset-password") {
          const resetPasswordUrl = new URL("/reset-password", request.url);
          resetPasswordUrl.searchParams.set("email", userInfo.email);
          return NextResponse.redirect(resetPasswordUrl);
        }
        return NextResponse.next();
      }
    }
    // rule:5: if user try to go comment protected route
    if (routeOwner === "COMMON") {
      return NextResponse.next();
    }
    // rule:6: if user try access the other role or user protected route
    if (
      routeOwner === "ADMIN" ||
      routeOwner === "DOCTOR" ||
      routeOwner === "PATIENT"
    ) {
      if (routeOwner !== unifiedRole) {
        return NextResponse.redirect(
          new URL(getDefaultDashboardRoute(userRole), request.url),
        );
      }
    }
    return NextResponse.next();
  } catch (error) {
    console.error("Proxy Error:", error);
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.well-known).*)",
  ],
};
