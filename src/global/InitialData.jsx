"use client";
import apiServices from "@/utils/service-calls/apiServices";
import { useEffect } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { ThemeProvider } from "@/global/ThemeProvider";
import { reduxStore } from "../store/index";
import { Geist, Geist_Mono } from "next/font/google";
import { CognitoProvider } from "@/global/CognitoProvider";

const GlobalProvider = ({ children }) => {
  const dispatch = reduxStore.dispatch;
  const isPortfolioExist = reduxStore.getState()?.portfolioState;
  useEffect(() => {
    if (!isPortfolioExist) getPortfolioDetails(dispatch);
  }, []);

  return (
    <CognitoProvider>
      <ReduxProvider store={reduxStore}>
        <ThemeProvider>{children}</ThemeProvider>
      </ReduxProvider>
    </CognitoProvider>
  );
};

export default GlobalProvider;

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
