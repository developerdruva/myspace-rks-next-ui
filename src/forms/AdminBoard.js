"use client";

import { useState } from "react";
import {
  Box,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Divider,
} from "@mui/material";
import { useSelector } from "react-redux";
import AuthorizedNavbar from "../features/profile-page/AuthorizedNavbar";

import ProfileView from "../features/admin-page/ProfileView";
import ExperienceView from "../features/admin-page/ExperienceView";
import EducationView from "../features/admin-page/EducationView";
import SkillsView from "../features/admin-page/SkillsView";
import CertificationsView from "../features/admin-page/CertificationsView";
import PocProjectsView from "../features/admin-page/PocProjectsView";
import ExperienceCalc from "../features/admin-page/ExperienceCalc";

import { GiSkills, GiSoapExperiment } from "react-icons/gi";
import { PiCertificate, PiUserRectangle } from "react-icons/pi";
import { SiBookstack } from "react-icons/si";
import { GoProject } from "react-icons/go";
import { BsCalculator } from "react-icons/bs";

import { useThemeMode } from "@/global/ThemeProvider";

const drawerWidth = 250;

const AdminBoard = () => {
  const portfolioDetails =
    useSelector((state) => state?.portfolioState) || null;

  const [selectedKey, setSelectedKey] = useState("1");

  const person = portfolioDetails?.personDetails[0] || {};
  const { theme } = useThemeMode();
  const isLight = theme === "light" ? true : false;

  const renderContent = () => {
    switch (selectedKey) {
      case "1":
        return <ProfileView profile={person} />;
      case "2":
        return <ExperienceView />;
      case "3":
        return <EducationView />;
      case "4":
        return <SkillsView emailId={person?.emailId} />;
      case "5":
        return <CertificationsView emailId={person?.emailId} />;
      case "6":
        return <PocProjectsView emailId={person?.emailId} />;
      case "7":
        return <ExperienceCalc />;
      default:
        return null;
    }
  };

  const menuItems = [
    { key: "1", label: "Basic Details", icon: <PiUserRectangle size={20} /> },
    { key: "2", label: "Experience", icon: <GiSoapExperiment size={20} /> },
    { key: "3", label: "Education", icon: <SiBookstack size={20} /> },
    { key: "4", label: "Skills", icon: <GiSkills size={20} /> },
    { key: "5", label: "Certifications", icon: <PiCertificate size={20} /> },
    { key: "6", label: "POC Projects", icon: <GoProject size={20} /> },
    {
      key: "7",
      label: "Experience Calculator",
      icon: <BsCalculator size={20} />,
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
      }}
    >
      <CssBaseline />

      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: isLight ? "#0B1A2A" : "#151B2F",
            borderRight: "none",
            boxShadow: "2px 0 6px rgba(0, 0, 0, 0.15)",
          },
        }}
      >
        <Toolbar sx={{ justifyContent: "center", py: 2 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              letterSpacing: 0.5,
              color: isLight ? "aliceblue" : "steelblue",
            }}
          >
            Admin Panel
          </Typography>
        </Toolbar>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.1)" }} />

        <List sx={{ mt: 1 }}>
          {menuItems.map((item) => (
            <ListItem key={item.key} disablePadding>
              <ListItemButton
                selected={selectedKey === item.key}
                onClick={() => setSelectedKey(item.key)}
                sx={{
                  color: "#b3c2e7",
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.08)",
                  },
                  "&.Mui-selected": {
                    backgroundColor: "#1890ff",
                    color: "#fff",
                    boxShadow: "inset 0 0 6px rgba(0,0,0,0.2)",
                    "&:hover": {
                      backgroundColor: "#1677cc",
                    },
                  },
                }}
              >
                <ListItemIcon sx={{ color: "inherit", minWidth: 36 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  sx={{
                    "& .MuiTypography-root": {
                      color: isLight ? "aliceblue" : "steelblue",
                      fontWeight: 200,
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: `calc(100% - ${drawerWidth}px)`,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <AuthorizedNavbar
          logoTitle="Profile Blog Dashboard 111"
          isLightTheme={true}
        />

        <Box sx={{ p: 2 }}>
          <Box
            sx={{
              backgroundColor: isLight ? "#fff" : "#1e2335",
              borderRadius: 2,
              padding: 3,
              minHeight: "calc(100vh - 100px)",
              boxShadow: isLight
                ? "0 2px 10px rgba(0,0,0,0.08)"
                : "0 2px 10px rgba(0,0,0,0.4)",
              overflowY: "auto",
            }}
          >
            {renderContent()}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AdminBoard;
