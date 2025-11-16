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
  AppBar,
  Divider,
} from "@mui/material";
import { useSelector } from "react-redux";
import AuthorizedNavbar from "../main/AuthorizedNavbar";
import ProfileView from "../admin/ProfileView";
import ExperienceView from "../admin/ExperienceView";
import EducationView from "../admin/EducationView";
import SkillsView from "../admin/SkillsView";
import CertificationsView from "../admin/CertificationsView";
import PocProjectsView from "../admin/PocProjectsView";

import { GiSkills, GiSoapExperiment } from "react-icons/gi";
import { PiCertificate, PiUserRectangle } from "react-icons/pi";
import { SiBookstack } from "react-icons/si";
import { GoProject } from "react-icons/go";
import ExperianceCalc from "../admin/ExperienceCalc";
import { BsCalculator } from "react-icons/bs";

const drawerWidth = 240;

const AdminBoard = () => {
  const portfolioDetails =
    useSelector((state) => state?.portfolioState) || null;
  const [selectedKey, setSelectedKey] = useState("1");
  const emailId = portfolioDetails?.personDetails[0]?.email_id || "";

  const renderContent = () => {
    switch (selectedKey) {
      case "1":
        return (
          <ProfileView profile={portfolioDetails?.personDetails[0] || ""} />
        );
      case "2":
        return (
          <ExperienceView
            workedCompanies={portfolioDetails?.workedCompanies}
            workedProjects={portfolioDetails?.workedProjects}
          />
        );
      case "3":
        return <EducationView />;
      case "4":
        return <SkillsView emailId={emailId} />;
      case "5":
        return <CertificationsView emailId={emailId} />;
      case "6":
        return <PocProjectsView emailId={emailId} />;
      case '7': 
        return <ExperianceCalc />
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
    { key: "7", label: "Experiance Calculation", icon: <BsCalculator size={20} /> },

  ];

  return (
    <Box
      sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#f5f5f5" }}
    >
      <CssBaseline />

      {/* Sidebar Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#001529",
            color: "#fff",
          },
        }}
      >
        <Toolbar sx={{ justifyContent: "center", padding: 2 }}>
          <Typography variant="h6" color="inherit">
            Admin Panel
          </Typography>
        </Toolbar>
        <Divider sx={{ borderColor: "rgba(255,255,255,0.1)" }} />
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.key} disablePadding>
              <ListItemButton
                selected={selectedKey === item.key}
                onClick={() => setSelectedKey(item.key)}
                sx={{
                  color: "#fff",
                  "&.Mui-selected": {
                    backgroundColor: "#1890ff",
                    color: "#fff",
                    "&:hover": {
                      backgroundColor: "#1677cc",
                    },
                  },
                }}
              >
                <ListItemIcon sx={{ color: "inherit", minWidth: 36 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        {/* AppBar with Navbar */}

        <AuthorizedNavbar
          logoTitle="Profile Blog Dashboard"
          isLightTheme={true}
        />

        {/* Content Area */}
        <Box
          sx={{
            padding: 1,
            // minHeight: "calc(100vh)",
          }}
        >
          <Box
            sx={{
              backgroundColor: "#fff",
              padding: 2,
              borderRadius: 1,
              boxShadow: 1,
              // border: "1px solid green",
              height: "calc(100vh - 80px)",
              overflowY: "auto",
              scrollBehavior: "smooth",
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
