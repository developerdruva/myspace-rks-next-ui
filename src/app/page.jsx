"use client";
import RouteProtection from "@/common/auth/RouteProtection";
import { getPortfolioDetails } from "@/common/CommonFunction";
import LandingPage from "@/components/landing/Landing";
import { reduxStore } from "@/store";
import { Suspense } from "react";

const Home = () => {
  const isGlobalRefresh = reduxStore.getState()?.globalRefresh?.isRefresh;
  console.log(" is ", isGlobalRefresh);

  useEffect(() => {
    // if (!isPortfolioExist || isGlobalRefresh) {
    getPortfolioDetails();
    // dispatch({ type: "REFRESH_GLOBAL_STATE", payload: !isGlobalRefresh });
    // }
    alert(isGlobalRefresh);
  }, [isGlobalRefresh]);

  return (
    <Suspense fallback={<h1 color="red">Loading...</h1>}>
      <RouteProtection>
        <LandingPage />
      </RouteProtection>
    </Suspense>
  );
};

export default Home;
