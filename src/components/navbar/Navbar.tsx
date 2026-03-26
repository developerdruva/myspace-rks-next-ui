"use client";

import { useState } from "react";
import Link from "next/link";
import {
  AppBar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { FiMenu } from "react-icons/fi";
import UserMenu from "../usermenu/UserMenu";
import { signOut, useSession } from "next-auth/react";
import ButtonMUI from "../buttons/ButtonMUI";
import { MdLightMode, MdNightlight } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useThemeMode } from "@/global/ThemeProvider";
import styles from "./Navbar.module.css";

const navLinks = [
  { label: "Home", href: "/myspace" },
  //   { label: "Profile", href: "/profile/rajesh" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const { toggleTheme, theme }: any = useThemeMode();
  const isGlobalRefresh: any = useSelector(
    (state: any) => state?.globalRefresh.isRefresh,
  );

  const toggleDrawer = (open: boolean) => () => {
    setIsOpen(open);
  };

  const handleProfileClick = () => {
    router.push("/profile/rajesh");
  };

  const handleLogoutClick = async () => {
    // (await cookies()).delete("next-auth.session-token", { path: "/" });
    // const res = await fetch("/api/logout", { method: "GET" });

    // await signOut({ redirect: false });
    // // 2. Then force delete cookies
    // const res = await fetch("/api/logout", { cache: "no-store" });
    // console.log("Logout response: ", res);
    // // 3. Hard reload (VERY IMPORTANT)
    // window.location.href = "/";
    sessionStorage.setItem("logout", "true");
    await signOut({ callbackUrl: "/myspace/logout" });

    // prevent re-fetch race
    await new Promise((r) => setTimeout(r, 3000));

    await fetch("/api/logout");

    // window.location.href = "/";
  };
  const isLight = theme === "light" ? true : false;

  return (
    <>
      <AppBar position="fixed" elevation={1} className={styles.appBarContainer}>
        <Toolbar className={styles.navToolbar}>
          <Link href="/" className={styles.brandLink}>
            <Typography variant="h6" className={styles.brandText}>
              mylogr
            </Typography>
          </Link>

          <Box className={styles.navRightSection}>
            <Box className={styles.desktopNavSection}>
              <Tooltip
                title={isLight ? "Switch to dark mode" : "Switch to light mode"}
                arrow
              >
                <IconButton
                  onClick={toggleTheme}
                  aria-label={
                    isLight ? "Switch to dark mode" : "Switch to light mode"
                  }
                  className={styles.themeToggleButton}
                >
                  {isLight ? (
                    <MdNightlight size={20} />
                  ) : (
                    <MdLightMode size={20} />
                  )}
                </IconButton>
              </Tooltip>
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={styles.navLinkItem}
                >
                  <Button className={styles.navButton}>{link.label}</Button>
                </Link>
              ))}

              <Box className={styles.navActionsSection}>
                <ButtonMUI
                  label={"Refresh"}
                  variant="button"
                  color="steelblue"
                  onClick={() =>
                    dispatch({
                      type: "REFRESH_GLOBAL_STATE",
                      payload: !isGlobalRefresh,
                    })
                  }
                  size="small"
                  // icon={<MdRefresh />}
                />
                <ButtonMUI
                  label={"Back"}
                  variant="button"
                  color="steelblue"
                  onClick={() => router.back()}
                  size="small"
                />
              </Box>
            </Box>

            <Box className={styles.desktopUserMenuSection}>
              {session && (
                <UserMenu
                  name={session.user?.name || "User"}
                  email={session.user?.email || "user@example.com"}
                  image={session.user?.image || ""}
                  onProfileClick={handleProfileClick}
                  onLogoutClick={handleLogoutClick}
                />
              )}
            </Box>
          </Box>

          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
            className={styles.mobileMenuButton}
          >
            <FiMenu />
          </IconButton>
        </Toolbar>

        <Drawer anchor="right" open={isOpen} onClose={toggleDrawer(false)}>
          <Box className={styles.drawerContentContainer} role="presentation">
            <List className={styles.drawerList}>
              {navLinks.map((link) => (
                <ListItem key={link.label} disablePadding>
                  <Link href={link.href} className={styles.drawerLinkItem}>
                    <ListItemButton onClick={toggleDrawer(false)}>
                      <ListItemText primary={link.label} />
                    </ListItemButton>
                  </Link>
                </ListItem>
              ))}
            </List>

            <Divider />

            <Box className={styles.drawerUserMenuSection}>
              <UserMenu
                name={session?.user?.name || "User"}
                email={session?.user?.email || "user@example.com"}
                image={session?.user?.image || ""}
                compact
                onProfileClick={handleProfileClick}
                onLogoutClick={handleLogoutClick}
              />
            </Box>
          </Box>
        </Drawer>
      </AppBar>
      <Toolbar className={styles.navbarSpacer} />
    </>
  );
}
