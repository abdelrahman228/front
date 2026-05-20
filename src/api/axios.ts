import axios, { AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from "axios";
import { toast } from "react-toastify";
import { logoutUser } from "../store/auth";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
const DEV_FORWARDED_FOR = import.meta.env.VITE_DEV_FORWARDED_FOR;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken && config.headers) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  if (DEV_FORWARDED_FOR && config.headers) {
    config.headers["X-Forwarded-For"] = DEV_FORWARDED_FOR;
  }
  return config;
});

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as (InternalAxiosRequestConfig & { _retry?: boolean }) | undefined;

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      !originalRequest.url?.includes("/auth/login") &&
      !originalRequest.url?.includes("/auth/signup") &&
      !originalRequest.url?.includes("/user/rotate-token")
    ) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refreshToken");

      if (!refreshToken) {
        logoutUser();
        return Promise.reject(error);
      }

      try {
        const response = await axios.post(
          `${API_URL}/user/rotate-token`,
          {},
          { headers: { Authorization: `Bearer ${refreshToken}` } }
        );
        const { access_token, refresh_token } = response.data.data || response.data;
        localStorage.setItem("accessToken", access_token);
        localStorage.setItem("refreshToken", refresh_token);
        originalRequest.headers.Authorization = `Bearer ${access_token}`;
        return api(originalRequest);
      } catch (refreshError) {
        logoutUser();
        toast.error("انتهت الجلسة، يُرجى تسجيل الدخول مرة أخرى.");
        return Promise.reject(refreshError);
      }
    }

    if (error.code === "ERR_NETWORK" || error.message === "Network Error") {
      toast.error("تعذر الاتصال بالسيرفر. تأكد أن الباك إند يعمل على http://localhost:3000");
      return Promise.reject(error);
    }

    const data = error.response?.data as
      | {
          message?: string;
          errorMessage?: string;
          extra?: Array<{ details?: Array<{ message?: string }> }>;
        }
      | undefined;
    const validationMessage = data?.extra?.flatMap((item) => item.details || []).find((detail) => detail.message)?.message;
    toast.error(validationMessage || data?.message || data?.errorMessage || error.message || "حدث خطأ غير متوقع");
    return Promise.reject(error);
  }
);

export default api;
