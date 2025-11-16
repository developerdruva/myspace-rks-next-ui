"use client";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { BsArrowBarLeft } from "react-icons/bs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "./CSS/NavbarStyles.css";

const AuthorizedNavbar = ({ logoTitle, isLightTheme }) => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.clear();
    router.push("/login");
  };

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
          <Link href="/" className="navLink">
            <Button disableRipple>
              <span className="navIcon">
                <BsArrowBarLeft />
              </span>
              Back
            </Button>
          </Link>
          <Button
            className="navLink logoutBtn"
            onClick={handleLogout}
            disableRipple
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AuthorizedNavbar;
