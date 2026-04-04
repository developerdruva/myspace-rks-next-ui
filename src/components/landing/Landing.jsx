"use client";

import { useMemo } from "react";
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
import {
  FiLayers,
  FiBarChart,
  FiUser,
  FiClipboard,
  FiArrowRight,
} from "react-icons/fi";
import { useSession } from "next-auth/react";

export default function LandingPage() {
  const { data: session } = useSession();

  const userSegment = useMemo(() => {
    const fromName = session?.user?.name
      ?.trim()
      ?.toLowerCase()
      ?.replace(/\s+/g, "_");

    return encodeURIComponent(fromName || "user_1");
  }, [session]);

  const featuresWithDynamicPaths = useMemo(
    () =>
      features.map((feature) =>
        feature.title === "Expenses Dashboard"
          ? {
              ...feature,
              path: `/myspace/monthly-spends/dashboard/${userSegment}`,
            }
          : feature,
      ),
    [userSegment],
  );

  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #0f172a, #1e293b)",
        minHeight: "100vh",
        py: { xs: 5, md: 8 },
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          style={{ textAlign: "center", marginBottom: "34px" }}
        >
          <Typography
            variant="h2"
            sx={{
              color: "white",
              fontWeight: 800,
              mb: 1.2,
              fontSize: { xs: "1.65rem", sm: "2.1rem", md: "2.4rem" },
            }}
          >
            Welcome to mylogr
          </Typography>

          <Typography
            sx={{
              color: "#cbd5e1",
              maxWidth: "620px",
              mx: "auto",
              mb: 2,
              fontSize: { xs: "0.88rem", sm: "0.95rem" },
              px: { xs: 1, sm: 0 },
            }}
          >
            Track. Improve. Transform. All in one place.
          </Typography>
        </motion.div>

        {/* Services Grid */}
        <Grid container spacing={{ xs: 1.8, sm: 2.2, md: 2.6 }}>
          {featuresWithDynamicPaths.map((service, index) => (
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
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  style={{ height: "100%" }}
                >
                  <Card
                    sx={{
                      p: { xs: 1.1, sm: 1.35 },
                      borderRadius: 3,
                      background: "#1e293b",
                      color: "white",
                      cursor: "pointer",
                      height: "100%",
                      border: "1px solid rgba(148, 163, 184, 0.25)",
                      transition: "all 0.2s ease",
                      "&:hover": {
                        transform: "translateY(-2px)",
                        borderColor: "rgba(148, 163, 184, 0.45)",
                      },
                    }}
                  >
                    <CardContent
                      sx={{ textAlign: "left", p: "10px !important" }}
                    >
                      <Box
                        sx={{
                          mb: 1.2,
                          width: 38,
                          height: 38,
                          borderRadius: 2,
                          display: "grid",
                          placeItems: "center",
                          background: "rgba(148, 163, 184, 0.15)",
                        }}
                      >
                        {service.icon}
                      </Box>

                      <Typography
                        sx={{
                          fontWeight: 700,
                          mb: 0.55,
                          color: "#cbd5e1",
                          fontSize: { xs: "0.95rem", sm: "1.02rem" },
                        }}
                      >
                        {service.title}
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{
                          color: "#94a3b8",
                          mb: 1.2,
                          lineHeight: 1.45,
                          fontSize: "0.78rem",
                        }}
                      >
                        {service.description}
                      </Typography>

                      <Typography
                        variant="caption"
                        sx={{
                          color: "#e2e8f0",
                          fontWeight: 600,
                          fontSize: "0.7rem",
                        }}
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
    icon: <FiUser size={22} />,
    path: "myspace/profile/rajesh",
  },

  {
    title: "Document Particulars",
    description: "Track and manage financial particulars and reminders",
    icon: <FiClipboard size={22} />,
    path: "myspace/particulars",
  },

  {
    title: "Monthly Spends",
    description: "Manage month-wise income, planned, and actual spends",
    icon: <FiBarChart size={22} />,
    path: "myspace/monthly-spends",
  },

  {
    title: "Expenses Dashboard",
    description: "View and manage your monthly expenses",
    icon: <FiBarChart size={22} />,
    path: "/myspace/monthly-spends/dashboard/user_1",
  },
  {
    title: "Admin Board",
    description:
      "dashboard, handle data, manage or maintain sufficient set of data and modifications",
    icon: <FiLayers size={22} />,
    path: "/myspace/admin-page",
  },
];
