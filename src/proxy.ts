import { NextRequest, NextResponse } from "next/server";
import { jwtUtils } from "./lib/jwt";
import {
  getDefaultDashboardRoute,
  getRouteOwner,
  isAuthRoute,
  UserRole,
} from "./lib/authUtils";

export function proxy(request: NextRequest) {
  try {
    const { pathname } = request.nextUrl;

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

    // rule:1 if user is login but try to access to auth route
    if (isAuth && isValidAccessToken) {
      return NextResponse.redirect(
        new URL(getDefaultDashboardRoute(userRole), request.url),
      );
    }
    // rule:2- if user try to access to the public route
    if (routeOwner === null) {
      return NextResponse.next();
    }

    // rule3: if use is not login
    if (!accessToken) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
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
