"use client";
import apiServices from "@/utils/service-calls/apiServices";
import { useEffect } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { reduxStore } from "../store/index";
import { Geist, Geist_Mono } from "next/font/google";

const InitialProvider = ({ children }) => {
  const dispatch = reduxStore.dispatch;
  const isPortfolioExist = reduxStore.getState()?.portfolioState;

  useEffect(() => {
    if (!isPortfolioExist) getPortfolioDetails(dispatch);
  }, []);

  return <ReduxProvider store={reduxStore}>{children}</ReduxProvider>;
};

export default InitialProvider;

const getPortfolioDetails = (dispatch) => {
  apiServices.getPortfolioDetails().then((res) => {
    if (res?.data?.status == "success") {
      dispatch({
        type: "PORTFOLIO_DETAILS",
        payload: res?.data?.data,
      });
    }
  });
};

export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
