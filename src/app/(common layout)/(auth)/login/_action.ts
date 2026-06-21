"use server"
import { ApiErrorResponse } from '../../../../types/api.type';
import { httpClient } from "@/lib/axios/httpClient";
import { setTokenInCookies } from '@/lib/tokenUtil';
import { ILoginResponse } from "@/types/auth.type";
import { ILogin, loginSchema } from "@/zod/auth.validation";
import { redirect } from 'next/navigation';

export const loginAction = async (payload: ILogin): Promise<ILoginResponse | ApiErrorResponse> => {
    const parsedPayload = loginSchema.safeParse(payload)
    if (!parsedPayload.success) {
        const filterError = parsedPayload.error.issues[0].message || "Invalid input";
        return {
            success: false,
            message: filterError,
        }
    }
    try {
        const response = await httpClient.post<ILoginResponse>("/auth/login", parsedPayload.data)
        const { accessToken, refreshToken, token } = response.data
        await setTokenInCookies("accessToken", accessToken)
        await setTokenInCookies("refreshToken", refreshToken)
        await setTokenInCookies("batter-auth.session_token", token)
        redirect("/dashboard")
    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: "Something went wrong during login.",
        }
    }
}