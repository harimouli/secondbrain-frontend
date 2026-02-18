import axios from "axios";
import { BACKEND_URL } from "../config";

const api = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await api.get("/api/v1/auth/refresh/access-token");

        return api(originalRequest);
      } catch (refreshError) {
        window.location.href = "/auth";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
