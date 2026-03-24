import axios from "axios";
import toast from "react-hot-toast";
import { logOut } from "../store/auth.store";
import { store } from "../store/store";

/* =======================
   REQUEST INTERCEPTOR
======================= */
axios.interceptors.request.use((config: any) => {
  config.baseURL = import.meta.env.VITE_API_BASE_URL;

  const token = localStorage.getItem("access_token");

  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }

  return config;
});

/* =======================
   RESPONSE INTERCEPTOR
======================= */

let retryCount = 0;
const MAX_RETRIES = 1;
let isRefreshing = false;

axios.interceptors.response.use(
  // ✅ SUCCESS HANDLER
  (response) => {
    const message =
      response?.data?.message || response?.data?.responseMessage;

    if (message) {
      toast.success(message);
    }

    retryCount = 0;
    return response;
  },

  // ❌ ERROR HANDLER
  async (error) => {
    const { response, config } = error;
    const status = response?.status;

    const message =
      response?.data?.responseMessage ||
      response?.data?.message ||
      "Something went wrong";

    // 🔐 TOKEN EXPIRED → REFRESH
    if (
      status === 401 &&
      response?.data?.tokenExpired &&
      retryCount < MAX_RETRIES &&
      !isRefreshing
    ) {
      isRefreshing = true;
      retryCount++;

      try {
        const refreshToken = localStorage.getItem("refresh_token");

        if (!refreshToken) throw new Error("No refresh token");

        const refreshResponse = await axios.post("/admin/refresh-tokens", {
          token: refreshToken,
        });

        const { access, refresh } = refreshResponse.data.tokens || {};

        if (!access || !refresh) throw new Error("Invalid refresh response");

        localStorage.setItem("access_token", access);
        localStorage.setItem("refresh_token", refresh);

        config.headers.authorization = `Bearer ${access}`;
        isRefreshing = false;

        return axios(config);
      } catch {
        isRefreshing = false;
        store.dispatch(logOut());
        toast.error("Session expired. Please login again.");
        return Promise.reject(error);
      }
    }

    // 🚪 FORCE LOGOUT CASES
    if (
      status === 401 ||
      message === "Token blacklisted" ||
      message === "Please authenticate"
    ) {
      store.dispatch(logOut());
    }

    // ❌ SHOW ERROR TOAST (ONCE)
    toast.error(message);

    retryCount = 0;
    return Promise.reject(error);
  }
);

/* =======================
   EXPORT WRAPPER
======================= */
const httpsCall = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  patch: axios.patch,
};

export default httpsCall;
