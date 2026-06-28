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
