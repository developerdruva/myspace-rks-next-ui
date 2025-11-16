import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LandingPage from '@/components/main/LandingPage';
import { Provider } from "react-redux";
import { reduxStore } from "@/store/index";
import apiServices from '@/utils/service-calls/apiServices';
import { useEffect, useState } from 'react';


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [portfolioDetails, setPortfolioDetails] = useState(null);

  useEffect(() => {
    getPortfolioDetails(setPortfolioDetails);
  }, []);
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Provider store={reduxStore}>
          {children}
        </Provider>
      </body>
    </html>
  );
}

const dispatch = reduxStore.dispatch;

const getPortfolioDetails = (setPortfolioDetails: any) => {
  apiServices.getPortfolioDetails().then((res) => {
    if (res?.data?.status == "success") {
      dispatch({
        type: "PORTFOLIO_DETAILS",
        payload: res?.data?.data,
      });
      setPortfolioDetails(res?.data?.data);
    }
  });
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MySpace - Personal Portfolio",
  description: "Personal portfolio and blog",

};
