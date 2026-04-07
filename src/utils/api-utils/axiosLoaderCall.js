import axios from "axios";
import { reduxStore as store } from "@/store/index.js";
import { API_URL } from "./apiConfigs";
import { getAccessToken } from "../service-utils/getAccessToken";
import { getSession } from "next-auth/react";

var token = "";
const resolveAuthToken = async () => {
  try {
    const localToken = getAccessToken();
    if (localToken) {
      return localToken;
    }

    const session = await getSession();
    const email = session?.user?.email || "";
    if (!email) {
      return "";
    }

    const response = await axios.post(`${API_URL}/api/auth/sso-token`, {
      email,
    });

    return response?.data?.data?.token || response?.data?.token || "";
  } catch (error) {
    return "";
  }
};
token = await resolveAuthToken();

const axiosLoaderCall = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Send cookies/auth headers with every request
  headers: {
    "Content-Type": "application/json",
  },
});

axiosLoaderCall?.interceptors?.request?.use(
  async (config) => {
    // const token = token || (await resolveAuthToken());
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    store?.dispatch({ type: "SHOW_SPINNER" });
    return config;
  },
  (error) => {
    store?.dispatch({ type: "HIDE_SPINNER" });
    return Promise.reject(error);
  },
);

axiosLoaderCall?.interceptors?.response?.use(
  (config) => {
    store?.dispatch({ type: "HIDE_SPINNER" });
    return config;
  },
  (error) => {
    store?.dispatch({ type: "HIDE_SPINNER" });
    return Promise.reject(error);
  },
);

export default axiosLoaderCall;
