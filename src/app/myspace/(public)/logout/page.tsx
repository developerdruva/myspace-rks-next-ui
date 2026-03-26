"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoggedOut() {
  const router = useRouter();
  useEffect(() => {
    const logout = async () => {
      sessionStorage.clear();
      await fetch("/api/logout");
    };
    logout();
    localStorage.clear();
    sessionStorage.clear();
  }, []);

  return (
    <p>
      You have been logged out
      <button onClick={() => router.push("/myspace")}>Go to Login</button>
    </p>
  );
}
