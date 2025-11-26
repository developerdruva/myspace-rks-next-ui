"use client";

import { AuthProvider } from "react-oidc-context";

const cognitoAuthConfig = {
  authority:
    "https://cognito-idp.ap-south-1.amazonaws.com/ap-south-1_yOxYQDdhr",
  client_id: "28fkbk0mju1tg6mft3or06h7kh",
  redirect_uri: "http://localhost:3001/",
  response_type: "code",
  scope: "email openid phone",
};

export function CognitoProvider({ children }) {
  return <AuthProvider {...cognitoAuthConfig}>{children}</AuthProvider>;
}
