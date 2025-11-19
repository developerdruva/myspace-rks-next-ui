"use client";

import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import { motion } from "framer-motion";
import Link from "next/link";
import { FiLayers, FiBarChart, FiUser, FiClipboard } from "react-icons/fi"; // example icons

const services = [
  {
    title: "User Profile",
    description: "Manage your personal and professional details.",
    icon: <FiUser size={32} />,
    path: "/profile/rajesh",
  },
  {
    title: "Daily Tracker",
    description: "Log routine, food, cravings, and daily activities.",
    icon: <FiClipboard size={32} />,
    path: "/daily-tracker",
  },
  {
    title: "Progress & Metrics",
    description: "Track your health progress and body metrics.",
    icon: <FiBarChart size={32} />,
    path: "/metrics",
  },
  {
    title: "Master Data",
    description: "Configure your dropdowns and master tables.",
    icon: <FiLayers size={32} />,
    path: "/master",
  },
];

export default function LandingPage() {
  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #0f172a, #1e293b)",
        minHeight: "100vh",
        paddingTop: 8,
      }}
    >
      <Container maxWidth="lg">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          style={{ textAlign: "center", marginBottom: "60px" }}
        >
          <Typography
            variant="h3"
            sx={{ color: "white", fontWeight: 700, mb: 2 }}
          >
            Welcome to Fitlogr
          </Typography>

          <Typography variant="h6" sx={{ color: "#cbd5e1" }}>
            Track. Improve. Transform. All in one place.
          </Typography>
        </motion.div>

        {/* Services Grid */}
        <Grid container spacing={4}>
          {services.map((service, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Link href={service.path} style={{ textDecoration: "none" }}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <Card
                    sx={{
                      p: 2,
                      borderRadius: 4,
                      background: "#1e293b",
                      color: "white",
                      cursor: "pointer",
                    }}
                  >
                    <CardContent sx={{ textAlign: "center" }}>
                      <Box sx={{ mb: 2 }}>{service.icon}</Box>

                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                        {service.title}
                      </Typography>

                      <Typography variant="body2" sx={{ color: "#94a3b8" }}>
                        {service.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
