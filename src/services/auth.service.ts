"use server";

import { setTokenInCookies } from "@/lib/tokenUtil";

const BASE_API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
if (!BASE_API_URL) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined");
}

export async function getNewRefreshToken(
  refreshToken: string,
): Promise<boolean> {
  try {
    const response = await fetch(`${BASE_API_URL}/auth/refresh-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `refreshToken=${refreshToken}`,
      },
    });
    if (!response.ok) {
      return false;
    }
    const { data } = await response.json();
    const {
      refreshToken: newRefreshToken,
      accessToken: newAccessToken,
      token: sessionToken,
    } = data;
    if (newAccessToken) {
      setTokenInCookies("batter-auth.session_token", sessionToken);
    }
    if (newRefreshToken) {
      setTokenInCookies("refreshToken", newRefreshToken);
    }
    if (newAccessToken) {
      setTokenInCookies("accessToken", newAccessToken);
    }

    return true;
  } catch (error) {
    console.error("Error: error message", error);
    return false;
  }
}
