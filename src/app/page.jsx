"use client";
import RouteProtection from "@/common/auth/RouteProtection";
import { getPortfolioDetails } from "@/common/CommonFunction";
import LandingPage from "@/components/landing/Landing";
import { reduxStore } from "@/store";
import { Suspense } from "react";

const Home = () => {
  return (
    <Suspense fallback={<h1 color="red">Loading...</h1>}>
      <RouteProtection>
        <LandingPage />
      </RouteProtection>
    </Suspense>
  );
};

export default Home;
