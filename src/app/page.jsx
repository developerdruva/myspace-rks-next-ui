"use client";
import LandingPage from "@/components/landing/Landing";
import { Suspense } from "react";

const Home = () => (
  <Suspense fallback={<h1 color="red">Loading...</h1>}>
    <LandingPage />
  </Suspense>
);

export default Home;
