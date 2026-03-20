"use client";

import { useAuth } from "react-oidc-context";
import { useEffect } from "react";

export default function RouteProtection({ children }) {
  const auth = useAuth();

  useEffect(() => {
    if (!auth.isLoading && !auth.isAuthenticated) {
      auth.signinRedirect();
    }
  }, [auth]);

  if (auth.isLoading) return <div>Loading...</div>;
  if (auth.error) return <div>Error: {auth.error.message}</div>;

  if (!auth.isAuthenticated) return null; // redirect in progress

  return <>{children}</>;
}
