"use client";
import { useThemeMode } from "@/global/ThemeProvider";
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { MdLightMode, MdNightlight } from "react-icons/md";
import ButtonMUI from "../buttons/ButtonMUI";
import "./CSS/NavbarStyles.css";

const AuthorizedNavbar = ({ logoTitle, isLightTheme }) => {
  const router = useRouter();

  const { toggleTheme, theme } = useThemeMode();
  const handleLogout = () => {
    localStorage.clear();
    router.push("/login");
  };
  const isLight = theme === "light" ? true : false;

  return (
    <AppBar
      position="sticky"
      elevation={1}
      sx={{
        backgroundColor: isLightTheme ? "white" : "black",
        color: isLightTheme ? "black" : "white",
        zIndex: 1200,
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Logo / Brand */}
        <Typography
          variant="h6"
          sx={{
            color: isLightTheme ? "black" : "steelblue",
            fontWeight: 600,
          }}
        >
          {logoTitle}
        </Typography>

        {/* Navigation Links */}
        <Box
          className="navActions"
          sx={{ display: "flex", alignItems: "center", gap: 2 }}
        >
          <Tooltip title="Toggle Theme">
            <IconButton onClick={toggleTheme}>
              {isLight ? (
                <MdNightlight size={20} />
              ) : (
                <MdLightMode color={"aliceblue"} size={20} />
              )}
            </IconButton>
          </Tooltip>
          <ButtonMUI
            label={"Back"}
            variant="button"
            color="steelblue"
            onClick={() => router.back()}
            size="small"
          />

          <ButtonMUI
            label={"Logout"}
            variant="button"
            color="steelblue"
            onClick={handleLogout}
            size="small"
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AuthorizedNavbar;

{
  /* <IconButton
            onClick={() => router.back()}
            size="small"
            sx={{
              transition: "color 0.3s",
              "&:hover": {
                color: isLight ? "steelblue" : "aliceblue",
                transition: "color 0.3s",

                borderRadius: "5px",
                backgroundColor: isLight
                  ? "rgba(94, 154, 207, 0.05)"
                  : "rgba(255,255,255,0.1)",
              },
              color: isLight ? "steelblue" : "aliceblue",
              letterSpacing: "0.1rem",
              fontSize: ".8rem",
              fontWeight: "200",
              padding: "0.6rem 0.55rem",
            }}
          >
            Back
          </IconButton>{" "} */
}
