export type UserRole = "SUPER_ADMIN" | "ADMIN" | "DOCTOR" | "PATIENT";

export const authRoutes = ["/login", "/register", "/forgot-password", "/reset-password", "/verify-email"];
export const isAuthRoute = (pathname: string) => {
    return authRoutes.some((router: string) => router === pathname);
}