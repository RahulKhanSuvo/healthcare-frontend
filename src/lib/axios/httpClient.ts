import { ApiResponse } from "@/types/api.type";
import axios from "axios";
import { isTokenExpiringSoon } from "../tokenUtil";
import { cookies, headers } from "next/headers";
import { getNewRefreshToken } from "@/services/auth.service";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
if (!API_URL) throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined");
async function tryRefreshToken(
  accessToken: string,
  refreshToken: string,
): Promise<void> {
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
}

const axiosInstance = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;
  if (accessToken && refreshToken) {
    await tryRefreshToken(accessToken, refreshToken);
  }
  const cookieHeader = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");
  return axios.create({
    baseURL: API_URL,
    timeout: 5000,
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieHeader,
    },
  });
};
export interface ApiRequestOptions {
  params?: Record<string, unknown>;
  headers?: Record<string, string>;
}
const httpGet = async <TData>(
  url: string,
  option?: ApiRequestOptions,
): Promise<ApiResponse<TData>> => {
  try {
    const instance = await axiosInstance();
    const response = await instance.get<ApiResponse<TData>>(url, option);
    return response.data;
  } catch (error) {
    console.error(`Get request endpoint ${url} failed:`, error);
    throw error;
  }
};
const httpPost = async <TData>(
  url: string,
  data: unknown,
  option?: ApiRequestOptions,
): Promise<ApiResponse<TData>> => {
  try {
    const instance = await axiosInstance();
    const res = await instance.post<ApiResponse<TData>>(url, data, option);
    return res.data;
  } catch (error) {
    console.error(`Post request endpoint ${url} failed:`, error);
    throw error;
  }
};

const httpPut = async <TData>(
  url: string,
  data: unknown,
  option?: ApiRequestOptions,
): Promise<ApiResponse<TData>> => {
  try {
    const instance = await axiosInstance();
    const res = await instance.put<ApiResponse<TData>>(url, data, option);
    return res.data;
  } catch (error) {
    console.error(`Put request endpoint ${url} failed:`, error);
    throw error;
  }
};

const httpPatch = async <TData>(
  url: string,
  data: unknown,
  option?: ApiRequestOptions,
): Promise<ApiResponse<TData>> => {
  try {
    const instance = await axiosInstance();
    const res = await instance.patch<ApiResponse<TData>>(url, data, option);
    return res.data;
  } catch (error) {
    console.error(`Patch request endpoint ${url} failed:`, error);
    throw error;
  }
};

const httpDelete = async <TData>(
  url: string,
  option?: ApiRequestOptions,
): Promise<ApiResponse<TData>> => {
  try {
    const instance = await axiosInstance();
    const res = await instance.delete<ApiResponse<TData>>(url, option);
    return res.data;
  } catch (error) {
    console.error(`Delete request endpoint ${url} failed:`, error);
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
