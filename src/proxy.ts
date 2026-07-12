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
          process.env.JWT_ACCESS_SECRET as string,
        ).data
      : null;

    const isValidAccessToken = accessToken
      ? jwtUtils.verifyToken(
          accessToken,
          process.env.JWT_ACCESS_SECRET as string,
        ).success
      : false;

    let userRole: UserRole | null = null;

    if (decodedAccessToken) {
      userRole = decodedAccessToken.role as UserRole;
    }

    const routeOwner = getRouteOwner(pathname);
    const unifiedRole = userRole === "SUPER_ADMIN" ? "ADMIN" : userRole;
    const isAuth = isAuthRoute(pathname);
    console.log("isAuthRoute", isAuth);
    console.log("Path:", pathname);
    console.log("Route Owner:", routeOwner);
    console.log("Role:", unifiedRole);

    if (isAuth && isValidAccessToken) {
      return NextResponse.redirect(
        new URL(getDefaultDashboardRoute(userRole), request.url),
      );
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Proxy Error:", error);
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|\\.well-known).*)",
  ],
};
