export type UserRole =
  | "SUPER_ADMIN"
  | "ADMIN"
  | "DOCTOR"
  | "PATIENT"
  | "COMMON"
  | null;

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
export const adminProtectedRoutes: RouteConfig = {
  exact: [],
  pattern: [/^\/admin\/dashboard/],
};
export const isRouteMatch = (pathname: string, routes: RouteConfig) => {
  return (
    routes.exact.includes(pathname) ||
    routes.pattern.some((pattern: RegExp) => pattern.test(pathname))
  );
};
export const routeOwner = (pathname: string): UserRole => {
  if (isRouteMatch(pathname, doctorProtectedRoutes)) {
    return "DOCTOR";
  }
  if (isRouteMatch(pathname, adminProtectedRoutes)) {
    return "ADMIN";
  }
  if (isRouteMatch(pathname, patientProtectedRoutes)) {
    return "PATIENT";
  }
  if (isRouteMatch(pathname, commonProtectedRoutes)) {
    return "COMMON";
  }
  return null;
};
