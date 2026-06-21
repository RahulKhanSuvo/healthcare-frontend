"use server"
import { AxiosError } from 'axios';
import { ApiErrorResponse } from '../../../../types/api.type';
import { httpClient } from "@/lib/axios/httpClient";
import { setTokenInCookies } from '@/lib/tokenUtil';
import { ILoginResponse } from "@/types/auth.type";
import { ILogin, loginSchema } from "@/zod/auth.validation";
import { redirect } from 'next/navigation';

const setAuthTokens = async (accessToken: string, refreshToken: string, sessionToken?: string) => {
    if (!accessToken || !refreshToken) {
        throw new Error("Missing required tokens in response");
    }
    await setTokenInCookies("accessToken", accessToken);
    await setTokenInCookies("refreshToken", refreshToken);
    if (sessionToken) {
        await setTokenInCookies("batter-auth.session_token", sessionToken);
    }
};

export const loginAction = async (payload: ILogin): Promise<ILoginResponse | ApiErrorResponse> => {
    const parsedPayload = loginSchema.safeParse(payload);
    if (!parsedPayload.success) {
        const filterError = parsedPayload.error.issues[0].message || "Invalid input";
        return {
            success: false,
            message: filterError,
        };
    }
    try {
        const response = await httpClient.post<ILoginResponse>("/auth/login", parsedPayload.data);
        const { accessToken, refreshToken, token } = response.data;

        // Set all tokens in cookies
        await setAuthTokens(accessToken, refreshToken, token);

        redirect("/dashboard");
    } catch (error) {
        // Handle Next.js redirect errors
        if (error && typeof error === "object" && "digest" in error && typeof error.digest === "string" && error.digest.startsWith("NEXT_REDIRECT")) {
            throw error;
        }

        // Handle API errors
        if (error instanceof AxiosError && error.response?.data) {
            const errorData = error.response.data;
            return {
                success: false,
                message: errorData.message || "Authentication failed",
            };
        }

        // Handle other errors
        console.error("Login error:", error instanceof Error ? error.message : "Unknown error");
        return {
            success: false,
            message: "Something went wrong during login.",
        };
    }
};