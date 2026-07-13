"use server";

import { setTokenInCookies } from "@/lib/tokenUtil";
import { UserInfo } from "@/types/user.types";
import { cookies } from "next/headers";

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
// get current user
export async function getUserInfo(): Promise<UserInfo | null> {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("batter-auth.session_token")?.value;
  // console.log("sessionToken", sessionToken);
  const accessToken = cookieStore.get("accessToken")?.value;
  if (!sessionToken || !accessToken) {
    return null;
  }
  const response = await fetch(`${BASE_API_URL}/auth/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Cookie: `batter-auth.session_token=${sessionToken}; accessToken=${accessToken}`,
    },
  });
  if (!response.ok) {
    return null;
  }
  const { data } = await response.json();
  return data as UserInfo;
}
