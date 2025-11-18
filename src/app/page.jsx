"use client";
import LandingPage from "@/components/profilepage-items/LandingPage";
import { Suspense } from "react";

const Home = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <LandingPage />/
  </Suspense>
);

export default Home;
