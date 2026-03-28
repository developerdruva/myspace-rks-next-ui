"use client";

import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Button,
  Stack,
} from "@mui/material";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  FiLayers,
  FiBarChart,
  FiUser,
  FiClipboard,
  FiArrowRight,
} from "react-icons/fi";

export default function LandingPage() {
  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #0f172a, #1e293b)",
        minHeight: "100vh",
        py: { xs: 6, md: 10 },
      }}
    >
      <Container maxWidth="lg">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          style={{ textAlign: "center", marginBottom: "48px" }}
        >
          <Typography
            variant="h2"
            sx={{
              color: "white",
              fontWeight: 800,
              mb: 2,
              fontSize: { xs: "2rem", sm: "2.6rem", md: "3rem" },
            }}
          >
            Welcome to mylogr
          </Typography>

          <Typography
            variant="h6"
            sx={{
              color: "#cbd5e1",
              maxWidth: "700px",
              mx: "auto",
              mb: 3,
              px: { xs: 1, sm: 0 },
            }}
          >
            Track. Improve. Transform. All in one place.
          </Typography>

          {/* <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            justifyContent="center"
            sx={{ mb: 3 }}
          >
            <Link href="/profile/rajesh" style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                size="large"
                endIcon={<FiArrowRight />}
                sx={{ px: 3, py: 1.1, borderRadius: 3, fontWeight: 600 }}
              >
                Open Profile
              </Button>
            </Link>
            <Link href="/myspace/admin-page" style={{ textDecoration: "none" }}>
              <Button
                variant="outlined"
                size="large"
                sx={{
                  px: 3,
                  py: 1.1,
                  borderRadius: 3,
                  fontWeight: 600,
                  color: "white",
                  borderColor: "#94a3b8",
                }}
              >
                Go to Admin Board
              </Button>
            </Link>
          </Stack> */}
        </motion.div>

        {/* Services Grid */}
        <Grid container spacing={{ xs: 2.5, sm: 3, md: 4 }}>
          {features.map((service, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Link
                href={service.path}
                style={{
                  textDecoration: "none",
                  display: "block",
                  height: "100%",
                }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  style={{ height: "100%" }}
                >
                  <Card
                    sx={{
                      p: { xs: 1.5, sm: 2 },
                      borderRadius: 4,
                      background: "#1e293b",
                      color: "white",
                      cursor: "pointer",
                      height: "100%",
                      border: "1px solid rgba(148, 163, 184, 0.25)",
                      transition: "all 0.2s ease",
                      "&:hover": {
                        transform: "translateY(-3px)",
                        borderColor: "rgba(148, 163, 184, 0.45)",
                      },
                    }}
                  >
                    <CardContent sx={{ textAlign: "left" }}>
                      <Box
                        sx={{
                          mb: 2,
                          width: 48,
                          height: 48,
                          borderRadius: 2,
                          display: "grid",
                          placeItems: "center",
                          background: "rgba(148, 163, 184, 0.15)",
                        }}
                      >
                        {service.icon}
                      </Box>

                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 700, mb: 1, color: "#cbd5e1" }}
                      >
                        {service.title}
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{ color: "#94a3b8", mb: 2, lineHeight: 1.6 }}
                      >
                        {service.description}
                      </Typography>

                      <Typography
                        variant="caption"
                        sx={{ color: "#e2e8f0", fontWeight: 600 }}
                      >
                        Open module →
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

const features = [
  {
    title: "User Profile",
    description: "Manage your personal and professional details.",
    icon: <FiUser size={32} />,
    path: "myspace/profile/rajesh",
  },

  {
    title: "Document Particulars",
    description: "Track and manage financial particulars and reminders",
    icon: <FiClipboard size={32} />,
    path: "myspace/particulars",
  },

  {
    title: "Monthly Spends",
    description: "Manage month-wise income, planned, and actual spends",
    icon: <FiBarChart size={32} />,
    path: "myspace/monthly-spends",
  },

  // {
  //   title: " Particulars Dashboard",
  //   description: "Track and manage financial particulars and reminders",
  //   icon: <FiClipboard size={32} />,
  //   path: "myspace/particulars/dashboard",
  // },
  {
    title: "Admin Board",
    description:
      "dashboard, handle data, manage or maintain sufficient set of data and modifications",
    icon: <FiLayers size={32} />,
    path: "/myspace/admin-page",
  },
];
