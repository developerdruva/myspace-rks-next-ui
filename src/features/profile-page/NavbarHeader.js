"use client";
import { useThemeMode } from "@/global/ThemeProvider";
import {
  AppBar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Slide,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BsPersonCircle } from "react-icons/bs";
import { MdClose, MdLightMode, MdMenu, MdNightlight } from "react-icons/md";
import "./CSS/navbarheader.css";

const NavbarHeader = ({ navbarItems, logoTitle, activeSection, scrollTo }) => {
  const router = useRouter();
  const { theme, toggleTheme } = useThemeMode();
  const muiTheme = useTheme();

  const isLight = theme == "light" ? true : false;
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => setDrawerOpen((prev) => !prev);
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("md"));

  return (
    <AppBar
      position="fixed"
      component="nav"
      color="default"
      elevation={3}
      className={`mui-navbar ${isLight ? "light-theme" : "dark-theme"}`}
      sx={{
        backdropFilter: "blur(10px)",
        backgroundColor: isLight
          ? "rgba(255,255,255,0.8)"
          : "rgba(15,15,15,0.6)",
        transition: "all 0.3s ease",
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          px: { xs: 1, sm: 2, md: 3, lg: 4 }, // horizontal padding adjusts by screen
          // py: { xs: 1, sm: 2, md: 3 }, // vertical padding adjusts by screen
        }}
      >
        <Toolbar
          sx={{ justifyContent: "space-between", padding: "0 !important" }}
        >
          {/* Logo */}
          <Typography
            variant="h6"
            sx={{
              cursor: "pointer",
              fontWeight: 700,
              letterSpacing: 1.2,
              textTransform: "uppercase",
            }}
            onClick={() => router.push("/")}
          >
            {logoTitle.split(".")[0]}.
            <span
              style={{
                fontSize: "0.8rem",
                textTransform: "lowercase",
                letterSpacing: 2,
              }}
            >
              {logoTitle.split(".")[1]}
            </span>
          </Typography>

          {/* Desktop Navbar Items */}
          {!isMobile && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
              {navbarItems?.map((item, index) => {
                const isActive = activeSection === item.path.split("#")[1];

                if (item.type === "link") {
                  return (
                    <Box
                      key={index}
                      component="button"
                      onClick={() => scrollTo(item.path.split("#")[1])}
                      className={`mui-link ${isActive ? "active" : ""}`}
                      sx={{
                        border: "none",
                        background: "transparent",
                        fontSize: "0.9rem",
                        fontWeight: isActive ? 600 : 400,
                        cursor: "pointer",
                        position: "relative",
                        "&::after": {
                          content: '""',
                          position: "absolute",
                          bottom: -2,
                          left: 0,
                          height: "2px",
                          width: isActive ? "100%" : 0,
                          background: "",
                          transition: "all 0.3s ease",
                        },
                        "&:hover::after": {
                          width: "100%",
                        },
                      }}
                    >
                      {item.label}
                    </Box>
                  );
                }

                if (item.type === "admin") {
                  return (
                    <Tooltip key={index} title="Admin Panel" arrow>
                      <IconButton
                        onClick={() =>
                          router.push(token ? "/adminboard" : "/login")
                        }
                        sx={{
                          transition: "color 0.3s",
                          "&:hover": {
                            color: "theme.palette.primary.main,",
                          },
                        }}
                      >
                        <BsPersonCircle size={22} />
                      </IconButton>
                    </Tooltip>
                  );
                }

                return null;
              })}

              {/* Theme Toggle */}
              <Tooltip title="Toggle Theme">
                <IconButton onClick={toggleTheme}>
                  {isLight ? (
                    <MdNightlight size={20} />
                  ) : (
                    <MdLightMode color={"aliceblue"} size={20} />
                  )}
                </IconButton>
              </Tooltip>
            </Box>
          )}

          {/* Mobile Icons */}
          {isMobile && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Tooltip title="Toggle Theme">
                <IconButton onClick={toggleTheme}>
                  {isLight ? (
                    <MdNightlight size={20} />
                  ) : (
                    <MdLightMode size={20} />
                  )}
                </IconButton>
              </Tooltip>

              <IconButton onClick={toggleDrawer}>
                <MdMenu
                  color={isLight ? "#1f1f1f" : "aliceblue"}
                  cursor={"pointer"}
                  size={25}
                />
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </Container>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer}
        sx={{
          "& .MuiDrawer-paper": {
            backgroundColor: isLight ? "#f9f9f9" : "#121212",
          },
        }}
      >
        <Box sx={{ textAlign: "left", paddingTop: 2 }}>
          <Button onClick={toggleDrawer}>
            <MdClose size={20} />
          </Button>
        </Box>
        <Box sx={{ width: 250, paddingTop: 2 }}>
          <List>
            {navbarItems?.map((item, index) => {
              const isActive = activeSection === item.path.split("#")[1];

              if (item.type === "link") {
                return (
                  <ListItem key={index} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        scrollTo(item.path.split("#")[1]);
                        toggleDrawer();
                      }}
                    >
                      <ListItemText
                        primary={item.label}
                        primaryTypographyProps={{
                          fontWeight: isActive ? 700 : 400,
                          color: isActive
                            ? "theme.palette.primary.main"
                            : "inherit",
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                );
              }

              if (item.type === "admin") {
                return (
                  <ListItem key={index} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        router.push(token ? "/adminboard" : "/login");
                        toggleDrawer();
                      }}
                    >
                      <ListItemText primary="Admin Panel" />
                    </ListItemButton>
                  </ListItem>
                );
              }

              return null;
            })}
            <ListItem>
              {/* Theme Toggle */}
              <Tooltip title="Toggle Theme">
                <IconButton onClick={toggleTheme}>
                  {isLight ? (
                    <MdNightlight size={20} />
                  ) : (
                    <MdLightMode color={"aliceblue"} size={20} />
                  )}
                </IconButton>
              </Tooltip>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default NavbarHeader;
