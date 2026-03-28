"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Paper,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import {
  FiActivity,
  FiDollarSign,
  FiRefreshCw,
  FiTarget,
} from "react-icons/fi";
import { useParams } from "next/navigation";
import apiServices from "@/utils/service-calls/apiServices";
import styles from "../spends.module.css";
import DashboardStatCards from "./DashboardStatCards";
import SpendsBarChart from "./SpendsBarChart";
import CategoryDonutChart from "./CategoryDonutChart";
import {
  formatCurrency,
  normalizeArrayResponse,
  normalizeObjectResponse,
  SummaryData,
  toNumber,
} from "./dashboardUtils";

const USER_FALLBACK = "user_1";

const toMonth = (date = new Date()) => date.toISOString().slice(0, 7);

export default function ExpenseDashbord() {
  const params = useParams<{ user?: string[] }>();
  const [month, setMonth] = useState(toMonth());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [viewMode, setViewMode] = useState<"estimated" | "actual">("estimated");
  const [income, setIncome] = useState<any>({});
  const [expenseRows, setExpenseRows] = useState<any[]>([]);
  const [summary, setSummary] = useState<SummaryData>({});

  const userId = useMemo(() => {
    // const raw = params?.user;
    // if (Array.isArray(raw) && raw[0]) return decodeURIComponent(raw[0]);
    return USER_FALLBACK;
  }, [params]);

  const monthForIncomeApi = `${month}-01`;

  const fetchDashboardData = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const [incomeRes, expensesRes, summaryRes] = await Promise.all([
        apiServices.getMonthlyIncomeByMonth(monthForIncomeApi, userId),
        apiServices.getMonthlyExpenses(month, userId),
        apiServices.getMonthlyExpensesSummary(month, userId),
      ]);

      const incomeData = normalizeObjectResponse(incomeRes);
      const expensesData = normalizeArrayResponse(expensesRes).filter(
        (row: any) => !row?.is_deleted,
      );
      const summaryData = normalizeObjectResponse(summaryRes);

      setIncome(incomeData);
      setExpenseRows(expensesData);
      setSummary(summaryData);
    } catch (err) {
      console.error(err);
      setError("Unable to load dashboard data");
      setIncome({});
      setExpenseRows([]);
      setSummary({});
    } finally {
      setLoading(false);
    }
  }, [month, monthForIncomeApi, userId]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const totals = useMemo(() => {
    const totalIncome =
      toNumber(income?.salary) +
      toNumber(income?.prev_balance) +
      toNumber(income?.extra_income);

    const totalEstimated = expenseRows.reduce(
      (sum, row) => sum + toNumber(row?.estimated),
      0,
    );

    const totalActual = expenseRows.reduce(
      (sum, row) => sum + toNumber(row?.actual),
      0,
    );

    return {
      totalIncome,
      totalEstimated:
        summary?.total_estimated !== undefined
          ? toNumber(summary.total_estimated)
          : totalEstimated,
      totalActual,
      totalPending:
        summary?.total_pending !== undefined
          ? toNumber(summary?.total_pending)
          : 0,
      totalPaid:
        summary?.total_paid !== undefined
          ? toNumber(summary?.total_paid)
          : totalActual,
      expectedBalance:
        summary?.expected_balance !== undefined
          ? toNumber(summary.expected_balance)
          : totalIncome - totalEstimated,
      actualBalance:
        summary?.actual_balance !== undefined
          ? toNumber(summary.actual_balance)
          : totalIncome - totalActual,
    };
  }, [income, expenseRows, summary]);

  const categoryData = useMemo(() => {
    const map = new Map<string, number>();

    expenseRows.forEach((row) => {
      const key = row?.item || "Other";
      const value =
        viewMode === "estimated"
          ? toNumber(row?.estimated)
          : toNumber(row?.actual);
      map.set(key, (map.get(key) || 0) + value);
    });

    return Array.from(map.entries()).map(([name, value]) => ({
      name,
      value,
    }));
  }, [expenseRows, viewMode]);

  const statItems = useMemo(
    () => [
      {
        title: "Total Income",
        value: formatCurrency(totals.totalIncome),
        icon: FiDollarSign,
        color: "#2563eb",
        subtitle: "salary + prev balance + extra income",
      },
      {
        title: "Expected Balance",
        value: formatCurrency(totals.expectedBalance),
        icon: FiTarget,
        color: "#16a34a",
      },
      {
        title: "Actual Balance",
        value: formatCurrency(totals.actualBalance),
        icon: FiActivity,
        color: "#dc2626",
      },
      {
        title: "Paid",
        value: formatCurrency(totals.totalPaid),
        icon: FiActivity,
        color: "#0891b2",
      },
      {
        title: "Pending",
        value: formatCurrency(totals.totalPending),
        icon: FiTarget,
        color: "#8b5cf6",
      },
    ],
    [totals],
  );

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <Paper
        sx={{
          p: 2,
          mb: 2.5,
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          flexWrap: "wrap",
        }}
      >
        <Typography className={styles.cardTitle} sx={{ mr: 1 }}>
          Expense Dashboard
        </Typography>
        <Typography className={styles.cardSubTitle}>User: {userId}</Typography>
        <Box sx={{ flex: 1 }} />
        <input
          type="month"
          value={month}
          onChange={(event) => setMonth(event.target.value)}
          style={{
            padding: "8px 10px",
            border: "1px solid rgba(148, 163, 184, 0.45)",
            borderRadius: 8,
            fontSize: 14,
          }}
        />
        <Button
          variant="outlined"
          startIcon={<FiRefreshCw />}
          onClick={fetchDashboardData}
          disabled={loading}
        >
          Refresh
        </Button>
      </Paper>

      {error ? (
        <Alert severity="error" sx={{ mb: 2.5 }}>
          {error}
        </Alert>
      ) : null}

      {loading ? (
        <Stack alignItems="center" justifyContent="center" sx={{ py: 8 }}>
          <CircularProgress />
        </Stack>
      ) : (
        <Stack spacing={2.5}>
          <DashboardStatCards items={statItems} />

          <Grid container spacing={2.5}>
            <Grid size={{ xs: 12, lg: 7 }}>
              <SpendsBarChart
                income={totals.totalIncome}
                estimated={totals.totalEstimated}
                actual={totals.totalActual}
                pending={totals.totalPending}
              />
            </Grid>

            <Grid size={{ xs: 12, lg: 5 }}>
              <Paper className={styles.card} sx={{ p: 1 }}>
                <Box className={styles.cardHeader}>
                  <div>
                    <Typography className={styles.cardTitle}>
                      Category Analysis
                    </Typography>
                    <Typography className={styles.cardSubTitle}>
                      Switch estimated vs actual by expense item
                    </Typography>
                  </div>
                  <ToggleButtonGroup
                    value={viewMode}
                    exclusive
                    size="small"
                    onChange={(_, value) => value && setViewMode(value)}
                  >
                    <ToggleButton value="estimated">Estimated</ToggleButton>
                    <ToggleButton value="actual">Actual</ToggleButton>
                  </ToggleButtonGroup>
                </Box>
                <CategoryDonutChart
                  title={
                    viewMode === "estimated"
                      ? "Estimated by Item"
                      : "Actual by Item"
                  }
                  data={categoryData}
                />
              </Paper>
            </Grid>
          </Grid>
        </Stack>
      )}
    </Container>
  );
}
