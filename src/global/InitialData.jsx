"use client";
import apiServices from "@/utils/service-calls/apiServices";
import { useEffect } from "react";
import {
  Provider as ReduxProvider,
  useDispatch,
  useSelector,
} from "react-redux";
import { ThemeProvider } from "@/global/ThemeProvider";
import { reduxStore } from "../store/index";
import { Geist, Geist_Mono } from "next/font/google";
import { CognitoProvider } from "@/global/CognitoProvider";
import { getPortfolioDetails } from "@/common/CommonFunction";

const GlobalProvider = ({ children }) => {
  const dispatch = reduxStore.dispatch;
  const isPortfolioExist = reduxStore.getState()?.portfolioState;

  // useEffect(() => {
  //   // if (!isPortfolioExist || isGlobalRefresh) {
  //   getPortfolioDetails();
  //   dispatch({ type: "REFRESH_GLOBAL_STATE", payload: !isGlobalRefresh });
  //   // }
  //   alert(isGlobalRefresh);
  // }, [isGlobalRefresh]);

  return (
    <CognitoProvider>
      <ReduxProvider store={reduxStore}>
        <ThemeProvider>{children}</ThemeProvider>
      </ReduxProvider>
    </CognitoProvider>
  );
};

export default GlobalProvider;

export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
