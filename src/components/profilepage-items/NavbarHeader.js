"use client";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  useTheme,
  useMediaQuery,
  Slide,
  Container,
  Tooltip,
} from "@mui/material";
import { MdLightMode, MdNightlight } from "react-icons/md";
import { BsPersonCircle } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import "./CSS/navbarheader.css"; // 👈 External styles updated for enhanced look
import { useRouter } from "next/navigation";

const NavbarHeader = ({ navbarItems, logoTitle, activeSection, scrollTo }) => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const router = useRouter();
  const theme = useTheme();
  const isLight = theme.palette.mode == "light";
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const toggleTheme = () => {
    dispatch({ type: "TOGGLE_THEME_MODE" });
  };

  return (
    <Slide in direction="down" timeout={500}>
      <AppBar
        color={isLight ? "default" : "primary"}
        position="sticky"
        elevation={4}
        className={`mui-navbar ${isLight ? "light-theme" : "dark-theme"}`}
        // key={isLight ? "light" : "dark"}
        sx={{
          transition: "background-color 0.3s ease",
          backdropFilter: "blur(8px)",
        }}
      >
        <Container maxWidth="xl" style={{ background: "inherit" }}>
          <Toolbar
            className="mui-toolbar"
            sx={{ justifyContent: "space-between" }}
          >
            {/* Logo */}
            <Typography
              variant="h6"
              className="mui-logo"
              sx={{
                fontWeight: 600,
                letterSpacing: 1,
                cursor: "pointer",
                textTransform: "uppercase",
                fontSize: { xs: "1rem", sm: "1.25rem" },
              }}
              onClick={() => router.push("/")}
            >
              {logoTitle}
            </Typography>

            {/* Navbar Items */}
            <Box
              className="mui-nav-items"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: { xs: 1, sm: 1, md: 3 },
              }}
            >
              {!isMobile &&
                navbarItems?.map((item, index) => {
                  const isActive = activeSection === item.path.split("#")[1];

                  if (item.type === "link") {
                    return (
                      <Box
                        key={index}
                        component="button"
                        className={`mui-link ${isActive ? "active" : ""}`}
                        onClick={() => scrollTo(item.path.split("#")[1])}
                        sx={{
                          border: "none",
                          background: "transparent",
                          fontSize: "0.75rem",
                          fontWeight: isActive ? 600 : 400,
                          cursor: "pointer",
                          transition: "color 0.3s",
                        }}
                      >
                        {item.label}
                      </Box>
                    );
                  }

                  if (item.type === "navlink") {
                    return (
                      <NavLink
                        key={index}
                        to={item.path}
                        className={`mui-link ${isActive ? "active" : ""}`}
                        style={{
                          textDecoration: "none",
                          fontSize: "0.95rem",
                          fontWeight: isActive ? 600 : 400,
                          transition: "color 0.3s",
                        }}
                      >
                        {item.label}
                      </NavLink>
                    );
                  }

                  if (item.type === "admin") {
                    return (
                      <Tooltip title="Admin Panel" arrow key={index}>
                        <IconButton
                          onClick={() =>
                            router.push(
                              localStorage.getItem("token")
                                ? "/adminboard"
                                : "/login"
                            )
                          }
                          className="mui-admin-icon"
                          sx={{
                            transition: "color 0.3s",
                            "&:hover": {
                              color: theme.palette.primary.main,
                            },
                          }}
                        >
                          <BsPersonCircle size={20} />
                        </IconButton>
                      </Tooltip>
                    );
                  }

                  return null;
                })}

              {/* Theme Toggle */}
              <Tooltip title="Toggle Theme" arrow>
                <IconButton
                  onClick={toggleTheme}
                  className="mui-theme-toggle"
                  sx={{
                    transition: "color 0.3s",
                  }}
                >
                  {isLight ? (
                    <MdNightlight size={18} />
                  ) : (
                    <MdLightMode size={18} />
                  )}
                </IconButton>
              </Tooltip>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Slide>
  );
};

export default NavbarHeader;
