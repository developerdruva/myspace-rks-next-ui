"use client";
import { getPortfolioDetails } from "@/common/CommonFunction";
import { createContext, useContext, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");
  const dispatch = useDispatch();
  // const isPortfolioExist = useSelector((state) => state?.portfolioState);
  const isGlobalRefresh = useSelector(
    (state) => state?.globalRefresh?.isRefresh
  );

  useEffect(() => {
    const saved = localStorage.getItem("theme") || "light";
    setTheme(saved);
    document.documentElement.setAttribute("data-theme", saved);
  }, []);

  useEffect(() => {
    if (isGlobalRefresh) {
      getPortfolioDetails();
      dispatch({ type: "REFRESH_GLOBAL_STATE", payload: !isGlobalRefresh });
    }
  }, [isGlobalRefresh]);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem("theme", next);
    document.documentElement.setAttribute("data-theme", next);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useThemeMode = () => useContext(ThemeContext);
