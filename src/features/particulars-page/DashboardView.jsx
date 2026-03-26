"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import * as echarts from "echarts";
import apiServices from "@/utils/service-calls/apiServices";
import {
  Alert,
  Avatar,
  Box,
  Chip,
  CircularProgress,
  Container,
  Grid,
  LinearProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import {
  FiActivity,
  FiAlertTriangle,
  FiCreditCard,
  FiFileText,
  FiGrid,
  FiLayers,
  FiShield,
  FiTrendingUp,
  FiWifi,
} from "react-icons/fi";
import styles from "./dashboard.module.css";

const CATEGORY_META = {
  BANKING: { color: "#1d4ed8", icon: FiCreditCard },
  LOANS: { color: "#d97706", icon: FiLayers },
  INSURANCE: { color: "#dc2626", icon: FiShield },
  DOCUMENTS: { color: "#0891b2", icon: FiFileText },
  INVESTMENTS: { color: "#16a34a", icon: FiTrendingUp },
  ASSETS: { color: "#7c3aed", icon: FiGrid },
  SUBSCRIPTIONS: { color: "#ea580c", icon: FiWifi },
};

const STATUS_META = {
  ACTIVE: { color: "#15803d", tone: "rgba(21, 128, 61, 0.12)" },
  INACTIVE: { color: "#b45309", tone: "rgba(180, 83, 9, 0.12)" },
  CLOSED: { color: "#b91c1c", tone: "rgba(185, 28, 28, 0.12)" },
};

function formatCurrency(value) {
  const amount = Number(value || 0);
  if (Number.isNaN(amount)) return "-";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatDate(value) {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

function getDaysUntil(dateValue) {
  if (!dateValue) return null;
  const current = new Date();
  const target = new Date(dateValue);
  if (Number.isNaN(target.getTime())) return null;
  current.setHours(0, 0, 0, 0);
  target.setHours(0, 0, 0, 0);
  return Math.ceil((target.getTime() - current.getTime()) / 86400000);
}

function ChartPanel({ option, height = 320 }) {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current) return undefined;

    const chart = echarts.init(chartRef.current, null, {
      renderer: "canvas",
      useDirtyRect: true,
    });

    chart.setOption(option);

    const handleResize = () => chart.resize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.dispose();
    };
  }, [option]);

  return <div ref={chartRef} style={{ width: "100%", height }} />;
}

function StatCard({ title, value, subtitle, accent, icon: Icon }) {
  return (
    <Paper
      className={styles.statCard}
      sx={{ borderBottom: `3px solid ${accent}` }}
    >
      <Stack direction="row" spacing={2} alignItems="flex-start">
        <Avatar
          sx={{
            width: 52,
            height: 52,
            bgcolor: `${accent}1a`,
            color: accent,
          }}
        >
          <Icon />
        </Avatar>
        <Box sx={{ minWidth: 0 }}>
          <Typography className={styles.statLabel}>{title}</Typography>
          <Typography className={styles.statValue}>{value}</Typography>
          <Typography className={styles.statHint}>{subtitle}</Typography>
        </Box>
      </Stack>
    </Paper>
  );
}

export default function DashboardView() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError("");
        setIsLoading(true);
        const res = await apiServices.getDocumentParticulars();
        setData(res?.data?.data || []);
      } catch (e) {
        console.log(e);
        setError("Failed to load dashboard");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const summary = useMemo(() => {
    const safeRows = Array.isArray(data) ? data : [];
    const byCategory = {};
    const byStatus = {};
    let totalValue = 0;
    let activeAmount = 0;

    safeRows.forEach((item) => {
      const category = item?.category || "UNKNOWN";
      const status = (item?.status || "UNKNOWN").toUpperCase();
      const totalAmount =
        Number(item?.total_amount || item?.base_amount || 0) || 0;

      byCategory[category] = (byCategory[category] || 0) + 1;
      byStatus[status] = (byStatus[status] || 0) + 1;
      totalValue += totalAmount;

      if (status === "ACTIVE") {
        activeAmount += totalAmount;
      }
    });

    const upcomingRenewals = [...safeRows]
      .filter((item) => item?.renewal_due)
      .map((item) => ({
        ...item,
        daysLeft: getDaysUntil(item.renewal_due),
      }))
      .filter((item) => item.daysLeft !== null)
      .sort((a, b) => a.daysLeft - b.daysLeft)
      .slice(0, 5);

    const recentItems = [...safeRows]
      .sort(
        (a, b) =>
          new Date(b?.created_at || 0).getTime() -
          new Date(a?.created_at || 0).getTime(),
      )
      .slice(0, 6);

    return {
      totalItems: safeRows.length,
      activeItems: byStatus.ACTIVE || 0,
      totalValue,
      activeAmount,
      byCategory,
      upcomingRenewals,
      recentItems,
    };
  }, [data]);

  const categoryEntries = useMemo(
    () => Object.entries(summary.byCategory).sort((a, b) => b[1] - a[1]),
    [summary.byCategory],
  );

  const categoryOption = useMemo(
    () => ({
      tooltip: {
        trigger: "item",
        formatter: "{b}<br/>{c} items ({d}%)",
      },
      legend: {
        bottom: 0,
        icon: "circle",
        textStyle: { color: "#475569" },
      },
      series: [
        {
          type: "pie",
          radius: ["46%", "72%"],
          center: ["50%", "42%"],
          label: { show: false },
          itemStyle: {
            borderRadius: 10,
            borderColor: "#fff",
            borderWidth: 3,
          },
          data: categoryEntries.map(([name, value]) => ({
            name,
            value,
            itemStyle: {
              color: CATEGORY_META[name]?.color || "#64748b",
            },
          })),
        },
      ],
    }),
    [categoryEntries],
  );

  const amountOption = useMemo(
    () => ({
      tooltip: {
        trigger: "axis",
        axisPointer: { type: "shadow" },
        formatter(params) {
          const item = params?.[0];
          if (!item) return "";
          return `${item.name}<br/>${formatCurrency(item.value)}`;
        },
      },
      grid: {
        top: 20,
        left: 10,
        right: 10,
        bottom: 10,
        containLabel: true,
      },
      xAxis: {
        type: "category",
        data: ["Total Value", "Active Value"],
        axisLine: { lineStyle: { color: "#cbd5e1" } },
        axisLabel: { color: "#475569", fontWeight: 600 },
      },
      yAxis: {
        type: "value",
        splitLine: { lineStyle: { color: "#e2e8f0" } },
        axisLabel: {
          color: "#64748b",
          formatter: (value) => `₹${Number(value).toLocaleString("en-IN")}`,
        },
      },
      series: [
        {
          type: "bar",
          barWidth: 46,
          data: [
            {
              value: summary.totalValue,
              itemStyle: { color: "#1d4ed8", borderRadius: [10, 10, 0, 0] },
            },
            {
              value: summary.activeAmount,
              itemStyle: { color: "#15803d", borderRadius: [10, 10, 0, 0] },
            },
          ],
        },
      ],
    }),
    [summary.activeAmount, summary.totalValue],
  );

  if (isLoading) {
    return (
      <Box sx={{ py: 10, display: "grid", placeItems: "center" }}>
        <CircularProgress size={30} />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (!summary.totalItems) {
    return (
      <Container maxWidth="xl" disableGutters>
        <Paper className={styles.emptyState}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
            No dashboard data available
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Add particulars to see category trends, renewal insights, and value
            summaries.
          </Typography>
        </Paper>
      </Container>
    );
  }

  return (
    <Box className={styles.shell}>
      {/* <Box className={styles.hero}>
        <Typography className={styles.eyebrow}>Portfolio View</Typography>
        <Typography className={styles.title}>
          Interactive Particulars Dashboard
        </Typography>
        <Typography className={styles.subtitle}>
          Live overview of categories, status mix, financial exposure, and
          upcoming renewals based on your particulars API response.
        </Typography>
      </Box> */}

      <Grid container spacing={2.5} sx={{ mb: 2.5 }}>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard
            title="Tracked Records"
            value={summary.totalItems}
            subtitle="Total particulars currently stored"
            accent="#1d4ed8"
            icon={FiFileText}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard
            title="Active Items"
            value={summary.activeItems}
            subtitle={`${summary.totalItems ? Math.round((summary.activeItems / summary.totalItems) * 100) : 0}% of all records`}
            accent="#15803d"
            icon={FiActivity}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard
            title="Total Value"
            value={formatCurrency(summary.totalValue)}
            subtitle="Combined total amount across records"
            accent="#b45309"
            icon={FiCreditCard}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard
            title="Renewals Soon"
            value={summary.upcomingRenewals.length}
            subtitle="Nearest items with renewal dates"
            accent="#b91c1c"
            icon={FiAlertTriangle}
          />
        </Grid>
      </Grid>

      <Grid container spacing={2.5} sx={{ mb: 2.5 }}>
        <Grid size={{ xs: 12, lg: 7 }}>
          <Paper className={styles.panel}>
            <Box className={styles.panelHeader}>
              <Box>
                <Typography className={styles.panelTitle}>
                  Category Distribution
                </Typography>
                <Typography className={styles.panelCaption}>
                  Split of particulars by category using the live API response.
                </Typography>
              </Box>
            </Box>
            <ChartPanel option={categoryOption} height={340} />
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, lg: 5 }}>
          <Paper className={styles.panel}>
            <Box className={styles.panelHeader}>
              <Box>
                <Typography className={styles.panelTitle}>
                  Value Overview
                </Typography>
                <Typography className={styles.panelCaption}>
                  Compare total value versus value from active items.
                </Typography>
              </Box>
            </Box>
            <ChartPanel option={amountOption} height={340} />
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={2.5} sx={{ mb: 2.5 }}>
        <Grid size={{ xs: 12, lg: 7 }}>
          <Paper className={styles.panel}>
            <Box className={styles.panelHeader}>
              <Box>
                <Typography className={styles.panelTitle}>
                  Category Highlights
                </Typography>
                <Typography className={styles.panelCaption}>
                  Relative share of each category in your dashboard.
                </Typography>
              </Box>
            </Box>

            <Stack spacing={1.5}>
              {categoryEntries.map(([category, count]) => {
                const meta = CATEGORY_META[category] || {};
                const Icon = meta.icon || FiFileText;
                const share = summary.totalItems
                  ? (count / summary.totalItems) * 100
                  : 0;

                return (
                  <Box key={category} className={styles.categoryRow}>
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <Avatar
                        sx={{
                          width: 42,
                          height: 42,
                          bgcolor: `${meta.color || "#64748b"}1a`,
                          color: meta.color || "#64748b",
                        }}
                      >
                        <Icon />
                      </Avatar>
                      <Box sx={{ minWidth: 0, flex: 1 }}>
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          spacing={1}
                          sx={{ mb: 0.75 }}
                        >
                          <Typography className={styles.rowTitle}>
                            {category}
                          </Typography>
                          <Typography className={styles.rowValue}>
                            {count}
                          </Typography>
                        </Stack>
                        <LinearProgress
                          variant="determinate"
                          value={share}
                          sx={{
                            height: 9,
                            borderRadius: 999,
                            bgcolor: "rgba(148, 163, 184, 0.16)",
                            "& .MuiLinearProgress-bar": {
                              borderRadius: 999,
                              backgroundColor: meta.color || "#64748b",
                            },
                          }}
                        />
                      </Box>
                    </Stack>
                  </Box>
                );
              })}
            </Stack>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, lg: 5 }}>
          <Paper className={styles.panel}>
            <Box className={styles.panelHeader}>
              <Box>
                <Typography className={styles.panelTitle}>
                  Upcoming Renewals
                </Typography>
                <Typography className={styles.panelCaption}>
                  Records with the nearest renewal dates.
                </Typography>
              </Box>
            </Box>

            <Stack spacing={1.25}>
              {summary.upcomingRenewals.length === 0 ? (
                <Typography variant="body2" color="text.secondary">
                  No renewal dates available.
                </Typography>
              ) : (
                summary.upcomingRenewals.map((item) => {
                  const daysTone =
                    item.daysLeft < 0
                      ? STATUS_META.CLOSED
                      : STATUS_META[item?.status?.toUpperCase()] ||
                        STATUS_META.INACTIVE;

                  return (
                    <Box key={item.id} className={styles.listCard}>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="flex-start"
                        spacing={1.5}
                      >
                        <Box sx={{ minWidth: 0 }}>
                          <Typography className={styles.listTitle}>
                            {item.document_particular || "Untitled particular"}
                          </Typography>
                          <Typography className={styles.listMeta}>
                            {item.category || "-"} • {item.type || "-"}
                          </Typography>
                        </Box>
                        <Chip
                          label={
                            item.daysLeft < 0
                              ? `${Math.abs(item.daysLeft)}d overdue`
                              : `${item.daysLeft}d left`
                          }
                          size="small"
                          sx={{
                            bgcolor: daysTone.tone,
                            color: daysTone.color,
                            fontWeight: 700,
                          }}
                        />
                      </Stack>
                      <Typography className={styles.listDate}>
                        Renewal due: {formatDate(item.renewal_due)}
                      </Typography>
                    </Box>
                  );
                })
              )}
            </Stack>
          </Paper>
        </Grid>
      </Grid>

      <Paper className={styles.panel}>
        <Box className={styles.panelHeader}>
          <Box>
            <Typography className={styles.panelTitle}>
              Recent Records
            </Typography>
            <Typography className={styles.panelCaption}>
              Latest entries added from the particulars API.
            </Typography>
          </Box>
        </Box>

        <Grid container spacing={1.5}>
          {summary.recentItems.map((item) => {
            const meta = CATEGORY_META[item?.category] || {};
            return (
              <Grid key={item.id} size={{ xs: 12, md: 6, xl: 4 }}>
                <Box className={styles.recentCard}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    spacing={1.5}
                  >
                    <Box sx={{ minWidth: 0 }}>
                      <Typography className={styles.listTitle}>
                        {item.document_particular || "Untitled particular"}
                      </Typography>
                      <Typography className={styles.listMeta}>
                        {item.reference_number || "No reference number"}
                      </Typography>
                    </Box>
                    <Chip
                      label={item.category || "UNKNOWN"}
                      size="small"
                      sx={{
                        bgcolor: `${meta.color || "#64748b"}1a`,
                        color: meta.color || "#64748b",
                        fontWeight: 700,
                      }}
                    />
                  </Stack>

                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    sx={{ mt: 2 }}
                  >
                    <Box>
                      <Typography className={styles.smallLabel}>
                        Created
                      </Typography>
                      <Typography className={styles.smallValue}>
                        {formatDate(item.created_at)}
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: "right" }}>
                      <Typography className={styles.smallLabel}>
                        Value
                      </Typography>
                      <Typography className={styles.smallValue}>
                        {formatCurrency(item.total_amount || item.base_amount)}
                      </Typography>
                    </Box>
                  </Stack>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Paper>
    </Box>
  );
}
