import axios from "axios";
import { reduxStore as store } from "@/store/index.js";
import { API_URL } from "./apiConfigs";
import { getAccessToken } from "../service-utils/getAccessToken";

const access_token = getAccessToken();

const axiosLoaderCall = axios.create({
  baseURL: API_URL,
  //   withCredentials: true, // Send cookies/auth headers with every request
  headers: {
    // "Content-Type": "application/json",
    Authorization: `Bearer ${access_token}`, // optionally add auth token
  },
});

axiosLoaderCall?.interceptors?.request?.use(
  (config) => {
    store?.dispatch({ type: "SHOW_SPINNER" });
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosLoaderCall?.interceptors?.response?.use(
  (config) => {
    store?.dispatch({ type: "HIDE_SPINNER" });
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosLoaderCall;
