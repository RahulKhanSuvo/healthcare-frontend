"use server";

import { setTokenInCookies } from "@/lib/tokenUtil";
import { cookies } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
if (!BASE_URL) throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined");
export async function getNewRefreshToken(
  refreshToken: string,
): Promise<boolean> {
  try {
    const res = await fetch(`${BASE_URL}/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        cookie: `refreshToken=${refreshToken}`,
      },
    });
    if (!res.ok) throw new Error("Failed to refresh token");
    const { data } = await res.json();
    const { accessToken, refreshToken: newRefreshToken, token } = data;
    if (accessToken) {
      await setTokenInCookies("accessToken", accessToken);
      return true;
    }
    if (refreshToken) {
      await setTokenInCookies("refreshToken", newRefreshToken);
    }
    if (token) {
      await setTokenInCookies("batter-auth.session_token", token, 24 * 60 * 60);
    }
    return token;
  } catch (error) {
    console.error("Error: error message", error);
    return false;
  }
}
export async function getUserInfo() {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    const sessionToken = cookieStore.get("batter-auth.session_token")?.value;
    console.log("accessToken", accessToken, "sessionToken", sessionToken);
    if (!accessToken) {
      return null;
    }
    const res = await fetch(`${BASE_URL}/auth/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}; better-auth.session_token=${sessionToken}`,
      },
    });
    if (!res.ok) {
      return null;
    }
    const { data } = await res.json();
    return data;
  } catch (error) {
    console.error("Error: error message", error);
    return null;
  }
}
