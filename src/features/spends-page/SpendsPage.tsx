"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { FiRefreshCw, FiPlus, FiX } from "react-icons/fi";
import styles from "./spends.module.css";
import apiServices from "@/utils/service-calls/apiServices";
import ExpenseTable from "@/features/spends-page/expenses/ExpenseTable";
import ExpenseCreateDialog from "@/features/spends-page/expenses/ExpenseCreateDialog";
import IncomeSection from "./IncomeSection";
import {
  ExpenseRow,
  ExpenseSummary as ExpenseSummaryType,
  normalizeExpenses,
  normalizeSummary,
} from "@/features/spends-page/expenses/types";
import ExpenseSummary from "./expenses/ExpenseSummary";

export default function SpendsPage() {
  const defaultMonth = useMemo(() => new Date().toISOString().slice(0, 7), []);
  const [month, setMonth] = useState(defaultMonth);
  const [expenseFormOpen, setExpenseFormOpen] = useState(false);
  const [incomeFormOpen, setIncomeFormOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [expenses, setExpenses] = useState<ExpenseRow[]>([]);
  const [summary, setSummary] = useState<ExpenseSummaryType>({});
  const [loading, setLoading] = useState(false);
  const [pageError, setPageError] = useState("");
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const user_id = "user_1";

  const handlePageError = useCallback((error: string) => {
    setPageError(error);
    setShowErrorDialog(true);
  }, []);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setPageError("");

      const expensesRes = await apiServices.getMonthlyExpenses(month, user_id);
      const summaryRes = await apiServices.getMonthlyExpensesSummary(
        month,
        user_id,
        Date.now(),
      );

      setExpenses(normalizeExpenses(expensesRes?.data ?? expensesRes));
      setSummary(normalizeSummary(summaryRes?.data ?? summaryRes));
    } catch (error) {
      handlePageError("Unable to fetch monthly expenses");
      setExpenses([]);
      setSummary({});
    } finally {
      setLoading(false);
    }
  }, [month, handlePageError]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const onSubmitExpense = async (payload: any) => {
    await apiServices.createMonthlyExpense(payload);
    await fetchData();
  };

  const onUpdateExpense = async (id: string, payload: any) => {
    await apiServices.updateMonthlyExpense(id, payload);
    await fetchData();
  };

  const onDeleteExpense = async (id: string) => {
    await apiServices.deleteMonthlyExpense(id, user_id);
    await fetchData();
  };

  const onRefreshSummary = async () => {
    setRefreshKey((prev) => prev + 1);
    await fetchData();
  };

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      {/* Error Dialog */}
      <Dialog open={showErrorDialog} onClose={() => setShowErrorDialog(false)}>
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          Error
          <IconButton size="small" onClick={() => setShowErrorDialog(false)}>
            <FiX size={18} />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Typography>{pageError}</Typography>
        </DialogContent>
      </Dialog>

      <Box sx={{ mb: 3, display: "flex", alignItems: "center", gap: 1.5 }}>
        <Typography
          sx={{
            fontSize: "1.4rem",
            fontWeight: 700,
            color: "#1e293b",
            letterSpacing: "-0.5px",
          }}
        >
          Monthly Spends Tracker
        </Typography>
        <Typography
          sx={{ color: "#94a3b8", fontSize: "1rem", fontWeight: 400 }}
        >
          —
        </Typography>
        <Typography
          sx={{ color: "#64748b", fontSize: "0.95rem", fontWeight: 400 }}
        >
          Manage income, expenses, and track monthly financial summary.
        </Typography>
      </Box>

      <Paper
        sx={{
          p: 2,
          mb: 3,
          display: "flex",
          gap: 2,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <TextField
          label="Month"
          type="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          size="small"
          sx={{ width: 180 }}
        />
        <Button
          variant="contained"
          size="small"
          startIcon={<FiPlus size={16} />}
          onClick={() => setIncomeFormOpen(true)}
        >
          Create Income
        </Button>
        <Button
          variant="contained"
          size="small"
          startIcon={<FiPlus size={16} />}
          onClick={() => setExpenseFormOpen(true)}
        >
          Create Expense
        </Button>
        <Button
          variant="outlined"
          size="small"
          startIcon={<FiRefreshCw size={16} />}
          onClick={onRefreshSummary}
          disabled={loading}
        >
          Refresh
        </Button>
      </Paper>

      <Box sx={{ mb: 3 }}>
        <IncomeSection
          month={month}
          refreshKey={refreshKey}
          incomeFormOpen={incomeFormOpen}
          setIncomeFormOpen={setIncomeFormOpen}
          onError={handlePageError}
        />
      </Box>

      <ExpenseTable
        expenses={expenses}
        loading={loading}
        summary={summary}
        onUpdateExpense={onUpdateExpense}
        onDeleteExpense={onDeleteExpense}
        onRefreshSummary={onRefreshSummary}
      />
      <Box sx={{ mt: 3 }}>
        <ExpenseSummary summary={summary} />
      </Box>

      <ExpenseCreateDialog
        month={month}
        open={expenseFormOpen}
        onClose={() => setExpenseFormOpen(false)}
        onSubmitExpense={onSubmitExpense}
      />
    </Container>
  );
}
