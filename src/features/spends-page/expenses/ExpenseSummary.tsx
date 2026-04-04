"use client";

import { Grid, Paper, Typography } from "@mui/material";
import styles from "./expenses.module.css";
import { ExpenseSummary as ExpenseSummaryType, formatCurrency } from "./types";

type ExpenseSummaryProps = {
  summary: ExpenseSummaryType;
};

type CardProps = {
  title: string;
  value?: number | string;
  color?: string;
};

function SummaryCard({ title, value, color }: CardProps) {
  return (
    <Paper className={styles.summaryCard}>
      <Typography className={styles.summaryLabel}>{title}</Typography>
      <Typography className={styles.summaryValue} sx={color ? { color } : {}}>
        {formatCurrency(value || 0)}
      </Typography>
    </Paper>
  );
}

export default function ExpenseSummary({ summary }: ExpenseSummaryProps) {
  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 6, sm: 4, lg: 2 }}>
        <SummaryCard
          title="Estimated"
          value={summary?.total_estimated}
          color="#3b82f6"
        />
      </Grid>
      <Grid size={{ xs: 6, sm: 4, lg: 2 }}>
        <SummaryCard
          title="Actual"
          value={summary?.total_actual}
          color="#f59e0b"
        />
      </Grid>
      <Grid size={{ xs: 6, sm: 4, lg: 2 }}>
        <SummaryCard title="Paid" value={summary?.total_paid} color="#10b981" />
      </Grid>
      <Grid size={{ xs: 6, sm: 4, lg: 2 }}>
        <SummaryCard
          title="Pending"
          value={summary?.total_pending}
          color="#ef4444"
        />
      </Grid>
      <Grid size={{ xs: 6, sm: 4, lg: 2 }}>
        <SummaryCard
          title="Expected Balance"
          value={summary?.expected_balance}
          color="#8b5cf6"
        />
      </Grid>
      <Grid size={{ xs: 6, sm: 4, lg: 2 }}>
        <SummaryCard
          title="Actual Balance"
          value={summary?.actual_balance}
          color="#06b6d4"
        />
      </Grid>
    </Grid>
  );
}
