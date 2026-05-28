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
const httpGet = async (endpoint: string, options?: ApiRequestsOptions) => {
    try {
        const response = await axiosInstance().get(endpoint, {
            params: options?.params,
            headers: options?.headers
        })
        return response.data

    } catch (error) {

        console.log(error)
        throw error
    }
}
const httpPost = async (endpoint: string, options?: ApiRequestsOptions) => {

    try {
        const response = await axiosInstance().post(endpoint, {
            params: options?.params,
            headers: options?.headers
        })
        return response.data

    } catch (error) {

        console.log(error)
        throw error
    }
}
const httpPut = async (endpoint: string, options?: ApiRequestsOptions) => {
    try {
        const response = await axiosInstance().put(endpoint, {
            params: options?.params,
            headers: options?.headers
        })
        return response.data

    } catch (error) {

        console.log(error)
        throw error
    }
}
const httpPatch = async (endpoint: string, options?: ApiRequestsOptions) => {
    try {
        const response = await axiosInstance().patch(endpoint, {
            params: options?.params,
            headers: options?.headers
        })
        return response.data

    } catch (error) {

        console.log(error)
        throw error
    }
}
const httpDelete = async (endpoint: string, options?: ApiRequestsOptions) => {
    try {
        const response = await axiosInstance().delete(endpoint, {
            params: options?.params,
            headers: options?.headers
        })
        return response.data

    } catch (error) {

        console.log(error)
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