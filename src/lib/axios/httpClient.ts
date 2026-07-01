import { ApiResponse } from "@/types/api.type";
import axios from "axios";
import { isTokenExpiringSoon } from "../tokenUtil";
import { cookies, headers } from "next/headers";
import { getNewRefreshToken } from "../../services/auth.service";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
if (!API_BASE_URL) {
  throw new Error("Api base url is not define");
}
async function tryRefreshToken(
  accessToken: string,
  refreshToken: string,
): Promise<void> {
  try {
    if (!isTokenExpiringSoon(accessToken)) {
      return;
    }
    const requestHeaders = await headers();
    if (requestHeaders.get("x-token-refreshed") === "1") {
      return;
    }
    try {
      await getNewRefreshToken(refreshToken);
    } catch (error) {
      console.error("Error: error message", error);
    }
  } catch (error) {
    throw error;
  }
}
const axiosInstance = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;
  if (refreshToken && accessToken) {
    await tryRefreshToken(accessToken, refreshToken);
  }
  const cookieHeader = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");
  const instance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 30000,
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieHeader,
    },
  });
  return instance;
};
export interface ApiRequestsOptions {
  params: Record<string, unknown>;
  headers: Record<string, string>;
}
const httpGet = async <T>(
  endpoint: string,
  options?: ApiRequestsOptions,
): Promise<ApiResponse<T>> => {
  try {
    const instance = await axiosInstance();

    const response = await instance.get<ApiResponse<T>>(endpoint, {
      params: options?.params,
      headers: options?.headers,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
const httpPost = async <T>(
  endpoint: string,
  data: unknown,
  options?: ApiRequestsOptions,
): Promise<ApiResponse<T>> => {
  try {
    const instance = await axiosInstance();
    const response = await instance.post<ApiResponse<T>>(endpoint, data, {
      params: options?.params,
      headers: options?.headers,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
const httpPut = async <T>(
  endpoint: string,
  options?: ApiRequestsOptions,
): Promise<ApiResponse<T>> => {
  try {
    const instance = await axiosInstance();
    const response = await instance.put<ApiResponse<T>>(endpoint, {
      params: options?.params,
      headers: options?.headers,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
const httpPatch = async <T>(
  endpoint: string,
  options?: ApiRequestsOptions,
): Promise<ApiResponse<T>> => {
  try {
    const instance = await axiosInstance();
    const response = await instance.patch<ApiResponse<T>>(endpoint, {
      params: options?.params,
      headers: options?.headers,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
const httpDelete = async <T>(
  endpoint: string,
  options?: ApiRequestsOptions,
): Promise<ApiResponse<T>> => {
  try {
    const instance = await axiosInstance();
    const response = await instance.delete<ApiResponse<T>>(endpoint, {
      params: options?.params,
      headers: options?.headers,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const httpClient = {
  get: httpGet,
  post: httpPost,
  put: httpPut,
  patch: httpPatch,
  delete: httpDelete,
};
