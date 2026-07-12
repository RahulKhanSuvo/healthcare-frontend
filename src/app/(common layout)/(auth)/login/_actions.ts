"use server";
import { httpClient } from "@/lib/axios/httpClient";
import { setTokenInCookies } from "@/lib/tokenUtil";
import { ApiErrorResponse } from "@/types/api.type";
import { ILoginResponse } from "@/types/auth.type";
import { ILoginPayload, loginZodSchema } from "@/zod/auth.validation";
import { redirect } from "next/navigation";

export const loginAction = async (
  payload: ILoginPayload,
): Promise<ILoginResponse | ApiErrorResponse> => {
  const parsedPayload = loginZodSchema.safeParse(payload);
  if (!parsedPayload.success) {
    const errorMessage =
      parsedPayload.error.issues[0].message || "Invalid payload";
    return {
      success: false,
      message: errorMessage,
    };
  }
  try {
    const response = await httpClient.post<ILoginResponse>(
      "auth/login",
      parsedPayload.data,
    );
    const { accessToken, refreshToken, token, user } = response.data;
    await setTokenInCookies("accessToken", accessToken);
    await setTokenInCookies("refreshToken", refreshToken);
    await setTokenInCookies("batter-auth.session_token", token);
    redirect("/dashboard");
  } catch (error) {
    console.log("Error: error message", error);
    return {
      success: false,
      message: `Login failed: ${error instanceof Error ? error.message : String(error)}`,
    };
  }
};
