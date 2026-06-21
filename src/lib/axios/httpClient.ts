import { ApiResponse } from "@/types/api.type"
import axios from "axios"
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL
if (!API_BASE_URL) {
    throw new Error("Api base url is not define")
}
const axiosInstance = () => {
    const instance = axios.create({
        baseURL: API_BASE_URL,
        timeout: 30000,
        headers: {
            "Content-Type": "application/json"
        }
    })
    return instance
}
export interface ApiRequestsOptions {
    params: Record<string, unknown>;
    headers: Record<string, string>;
}
const httpGet = async <T>(
    endpoint: string,
    options?: ApiRequestsOptions
): Promise<ApiResponse<T>> => {
    try {
        const instance = axiosInstance()

        const response = await instance.get<ApiResponse<T>>(endpoint, {
            params: options?.params,
            headers: options?.headers,
        })

        return response.data

    } catch (error) {
        throw error
    }
}
const httpPost = async <T>(endpoint: string, data: unknown, options?: ApiRequestsOptions): Promise<ApiResponse<T>> => {

    try {
        const response = await axiosInstance().post<ApiResponse<T>>(endpoint, data, {
            params: options?.params,
            headers: options?.headers
        })
        return response.data

    } catch (error) {

        throw error
    }
}
const httpPut = async <T>(endpoint: string, options?: ApiRequestsOptions): Promise<ApiResponse<T>> => {
    try {
        const response = await axiosInstance().put<ApiResponse<T>>(endpoint, {
            params: options?.params,
            headers: options?.headers
        })
        return response.data

    } catch (error) {

        throw error
    }
}
const httpPatch = async <T>(endpoint: string, options?: ApiRequestsOptions): Promise<ApiResponse<T>> => {
    try {
        const response = await axiosInstance().patch<ApiResponse<T>>(endpoint, {
            params: options?.params,
            headers: options?.headers
        })
        return response.data

    } catch (error) {

        throw error
    }
}
const httpDelete = async <T>(endpoint: string, options?: ApiRequestsOptions): Promise<ApiResponse<T>> => {
    try {
        const response = await axiosInstance().delete<ApiResponse<T>>(endpoint, {
            params: options?.params,
            headers: options?.headers
        })
        return response.data

    } catch (error) {

        throw error
    }
}

export const httpClient = {
    get: httpGet,
    post: httpPost,
    put: httpPut,
    patch: httpPatch,
    delete: httpDelete
}