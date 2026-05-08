import axios from "axios";

let isRedirectingToLogin = false;

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api",
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

const getStoredAccessToken = () =>
  localStorage.getItem("access_token") || localStorage.getItem("token");

api.interceptors.request.use((config) => {
  const token = getStoredAccessToken();

  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const requestUrl = error?.config?.url || "";
    const isLoginRequest = requestUrl.includes("/login/");

    if (status === 403) {
      const responseData = error?.response?.data;
      const hasReadableMessage =
        typeof responseData?.detail === "string" ||
        typeof responseData?.error === "string";

      if (error?.response && !hasReadableMessage) {
        error.response.data = {
          ...(responseData || {}),
          error: "Access denied. You do not have permission for this action.",
        };
      }
    }

    if (status === 401 && !isLoginRequest) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("token");
      localStorage.removeItem("refresh_token");

      if (window.location.pathname !== "/login" && !isRedirectingToLogin) {
        isRedirectingToLogin = true;
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
