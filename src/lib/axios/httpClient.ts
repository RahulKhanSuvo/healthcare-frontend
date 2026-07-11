import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const axiosInstance = () => {
  return axios.create({
    baseURL: API_URL,
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
export interface ApiRequestOptions {
    params?: Record<string, unknown>;
    headers?: Record<string, string>;
}

export const httpClient = {
  get: <T>(url: string, config?: ApiRequestOptions) => axiosInstance().get<T>(url, config),
  post: <T>(url: string, data?: T, config?: ApiRequestOptions) => axiosInstance().post<T>(url, data, config),
  put: <T>(url: string, data?: T, config?: ApiRequestOptions) => axiosInstance().put<T>(url, data, config),
  delete: <T>(url: string, config?: ApiRequestOptions) => axiosInstance().delete<T>(url, config),

};
