import axios from "axios";
import { reduxStore as store } from "@/store/index.js";
import { API_URL } from "./apiConfigs";
import { getAccessToken } from "../service-utils/getAccessToken";
import { getTokenFromNextAuth } from "@/components/landing/Landing";
import { getSession } from "next-auth/react";

// const access_token = getAccessToken();
const session = await getSession();
const email = session?.user?.email || "";
const getToken = await axios.post(API_URL + "/api/auth/sso-token", {
  email: email,
});
console.log("token from next auth --> ", getToken.data);
// const userToken = access_token || "";
const token = getToken?.data?.token || "";

const axiosLoaderCall = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Send cookies/auth headers with every request
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`, // optionally add auth token
  },
});

axiosLoaderCall?.interceptors?.request?.use(
  (config) => {
    store?.dispatch({ type: "SHOW_SPINNER" });
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosLoaderCall?.interceptors?.response?.use(
  (config) => {
    store?.dispatch({ type: "HIDE_SPINNER" });
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axiosLoaderCall;
