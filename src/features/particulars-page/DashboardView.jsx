"use client";
import apiServices from "@/utils/service-calls/apiServices";
import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

export default function DashboardView() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const workspace_id = "0d4f53ac-c506-4121-8fe0-cdcddf4690d4";

  const formatCurrency = (value) => {
    const amount = Number(value);
    if (Number.isNaN(amount)) return "-";

    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const formatDate = (value) => {
    if (!value) return "-";

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "-";

    return new Intl.DateTimeFormat("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(date);
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      setError("");
      setIsLoading(true);
      const res = await apiServices.getDashboard(workspace_id);
      setData(res?.data?.data || null);
    } catch (e) {
      console.log(e);
      setError("Failed to load dashboard");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ py: 10, display: "grid", placeItems: "center" }}>
        <CircularProgress size={30} />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 2, sm: 3, md: 4 } }}>
      <Stack spacing={2.5}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            Dashboard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Quick overview of monthly totals, active entries, and payment
            status.
          </Typography>
        </Box>

        {error && <Alert severity="error">{error}</Alert>}

        {!data ? (
          <Alert severity="info">No dashboard data available.</Alert>
        ) : (
          <>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={4}>
                <Card>
                  <CardContent>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      Monthly Total
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      {formatCurrency(data.monthly_total)}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <Card>
                  <CardContent>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      Active
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      {data.active_count ?? "-"}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <Card>
                  <CardContent>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      Paid This Month
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      {formatCurrency(data.paid_this_month)}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 2, borderRadius: 2 }}>
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 700, mb: 1 }}
                  >
                    Upcoming (Next 7 days)
                  </Typography>

                  {(data.upcoming || []).length === 0 ? (
                    <Typography variant="body2" color="text.secondary">
                      No upcoming payments.
                    </Typography>
                  ) : (
                    <Stack spacing={1}>
                      {data.upcoming.map((item, i) => (
                        <Box
                          key={item.id || i}
                          sx={{
                            p: 1.25,
                            border: "1px solid",
                            borderColor: "divider",
                            borderRadius: 1.5,
                          }}
                        >
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {item.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {formatCurrency(item.amount)} •{" "}
                            {formatDate(item.next_due_date)}
                          </Typography>
                        </Box>
                      ))}
                    </Stack>
                  )}
                </Paper>
              </Grid>

              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 2, borderRadius: 2 }}>
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 700, mb: 1 }}
                  >
                    Overdue
                  </Typography>

                  {(data.overdue || []).length === 0 ? (
                    <Typography variant="body2" color="text.secondary">
                      No overdue payments.
                    </Typography>
                  ) : (
                    <Stack spacing={1}>
                      {data.overdue.map((item, i) => (
                        <Box
                          key={item.id || i}
                          sx={{
                            p: 1.25,
                            border: "1px solid",
                            borderColor: "error.light",
                            borderRadius: 1.5,
                            bgcolor: "error.lighter",
                          }}
                        >
                          <Typography
                            variant="body2"
                            sx={{ fontWeight: 600 }}
                            color="error.main"
                          >
                            {item.name}
                          </Typography>
                          <Typography variant="caption" color="error.main">
                            {formatCurrency(item.amount)} •{" "}
                            {formatDate(item.next_due_date)}
                          </Typography>
                        </Box>
                      ))}
                    </Stack>
                  )}
                </Paper>
              </Grid>
            </Grid>
          </>
        )}
      </Stack>
    </Container>
  );
}
