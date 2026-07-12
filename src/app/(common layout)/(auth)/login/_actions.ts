import { httpClient } from "@/lib/axios/httpClient";
import { ApiErrorResponse } from "@/types/api.type";
import { ILoginResponse } from "@/types/auth.type";
import { ILoginPayload, loginZodSchema } from "@/zod/auth.validation";

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
      payload,
    );
    return response.data;
  } catch (error) {
    console.log("Error: error message", error);
    return {
      success: false,
      message: `Login failed: ${error instanceof Error ? error.message : String(error)}`,
    };
  }
};
