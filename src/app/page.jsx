"use client";
import RouteProtection from "@/common/auth/RouteProtection";
import LandingPage from "@/components/landing/Landing";
import { Suspense } from "react";

const Home = () => (
  <Suspense fallback={<h1 color="red">Loading...</h1>}>
    <RouteProtection>
      <LandingPage />
    </RouteProtection>
  </Suspense>
);

export default Home;
