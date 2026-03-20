export const getAccessToken = () => {
  try {
    const key = Object.keys(sessionStorage).find((k) =>
      k.startsWith("oidc.user")
    );
    if (!key) return null;
    const oidcData = JSON.parse(sessionStorage.getItem(key));
    return oidcData?.access_token || null;
  } catch (err) {
    console.error("Token read error:", err);
    return null;
  }
};
