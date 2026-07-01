export type UserRole = "SUPER_ADMIN" | "ADMIN" | "DOCTOR" | "PATIENT";
export const authRoutes = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/verify-email",
];
export const isAuthRoute = (pathname: string) => {
  return authRoutes.some((router: string) => router === pathname);
};
export type RouteConfig = {
  exact: string[];
  pattern: RegExp[];
};
export const commonProtectedRoutes: RouteConfig = {
  exact: ["/my-profile", "/change-password"],
  pattern: [],
};
export const patientProtectedRoutes: RouteConfig = {
  exact: ["/payment/success"],
  pattern: [/^\/dashboard/],
};
export const doctorProtectedRoutes: RouteConfig = {
  exact: ["/appointments", "/patients", "/prescriptions", "/medical-records"],
  pattern: [/^\/doctor\/dashboard/],
};
export const adminProtectRoute: RouteConfig = {
  exact: [],
  pattern: [/^\/admin\/dashboard/],
};
export const isRouteMatch = (
  pathname: string,
  routes: RouteConfig,
): boolean => {
  if (routes.exact.includes(pathname)) return true;
  return routes.pattern.some((predicate: RegExp) => predicate.test(pathname));
};
export const getRouteOwner = (
  pathname: string,
): "SUPER_ADMIN" | "ADMIN" | "DOCTOR" | "PATIENT" | "COMMON" | null => {
  if (isRouteMatch(pathname, commonProtectedRoutes)) {
    return "COMMON";
  }
  if (isRouteMatch(pathname, patientProtectedRoutes)) {
    return "PATIENT";
  }
  if (isRouteMatch(pathname, doctorProtectedRoutes)) {
    return "DOCTOR";
  }
  if (isRouteMatch(pathname, adminProtectRoute)) {
    return "ADMIN";
  }
  return null;
};
export const getDefaultDashboardRoute = (role: UserRole | null) => {
  if (role === "ADMIN" || role === "SUPER_ADMIN") {
    return "/admin/dashboard";
  }
  if (role === "DOCTOR") {
    return "/doctor/dashboard";
  }
  if (role === "PATIENT") {
    return "/dashboard";
  }

  return "/";
};
export const isValidRedirectForRole = (
  redirectPath: string,
  role: UserRole,
) => {
  const routeOwner = getRouteOwner(redirectPath);
  if (routeOwner === null || routeOwner === "COMMON") return true;
  const unifiedRole = role === "SUPER_ADMIN" ? "ADMIN" : role;
  if (unifiedRole === routeOwner) {
    return true;
  }
  return false;
};
