"use client";

import { useState } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { FiEdit2, FiTrash2, FiX } from "react-icons/fi";
import styles from "./expenses.module.css";
import {
  ExpenseRow,
  ExpenseSummary as ExpenseSummaryType,
  formatCurrency,
  getActual,
  getEstimated,
  getExpenseDate,
  getExpenseName,
  getPaidStatus,
} from "./types";

type ExpenseTableProps = {
  expenses: ExpenseRow[];
  loading: boolean;
  summary?: ExpenseSummaryType;
  onUpdateExpense: (id: string, payload: any) => Promise<void>;
  onDeleteExpense: (id: string) => Promise<void>;
  onRefreshSummary?: () => Promise<void>;
};

export default function ExpenseTable({
  expenses,
  loading,
  summary,
  onUpdateExpense,
  onDeleteExpense,
  onRefreshSummary,
}: ExpenseTableProps) {
  const [tableError, setTableError] = useState("");
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingRow, setEditingRow] = useState<ExpenseRow | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [item, setItem] = useState("");
  const [estimated, setEstimated] = useState("");
  const [actual, setActual] = useState("");
  const [expenseDate, setExpenseDate] = useState("");
  const [paymentStatus, setPaymentStatus] = useState(false);
  const [notes, setNotes] = useState("");

  const handleDelete = async (id: string) => {
    try {
      setTableError("");
      setDeleting(true);
      await onDeleteExpense(id);
      setDeleteConfirmId(null);
    } catch (error) {
      setTableError("Unable to delete expense");
    } finally {
      setDeleting(false);
    }
  };

  const getPayloadFromRow = (row: ExpenseRow, nextPaidStatus: boolean) => {
    const dateValue = String(row?.expense_date || row?.paid_on || "").slice(
      0,
      10,
    );
    const monthValue = dateValue
      ? dateValue.slice(0, 7)
      : String(row?.month || "").slice(0, 7);

    return {
      item: String(row?.item || row?.item_name || ""),
      estimated: Number(row?.estimated ?? row?.estimated_amount ?? 0),
      actual: Number(row?.actual ?? row?.amount ?? 0),
      expense_date: dateValue || undefined,
      payment_status: nextPaidStatus,
      notes: row?.notes ?? null,
      user_id: row?.user_id || "user_1",
      month: monthValue,
      status: nextPaidStatus ? "paid" : "pending",
    };
  };

  const handleTogglePaid = async (row: ExpenseRow) => {
    if (!row?.id) return;
    const nextPaidStatus = !getPaidStatus(row);
    const payload = getPayloadFromRow(row, nextPaidStatus);

    try {
      setTableError("");
      setTogglingId(row.id);
      await onUpdateExpense(row.id, payload);
      if (onRefreshSummary) {
        await onRefreshSummary();
      }
    } catch (error) {
      setTableError("Unable to update payment status");
    } finally {
      setTogglingId(null);
    }
  };

  const openEdit = (row: ExpenseRow) => {
    setEditingRow(row);
    setItem(String(row?.item || row?.item_name || ""));
    setEstimated(String(row?.estimated ?? row?.estimated_amount ?? ""));
    setActual(String(row?.actual ?? row?.amount ?? ""));
    setExpenseDate(
      String(row?.expense_date || row?.paid_on || "").slice(0, 10),
    );
    setPaymentStatus(getPaidStatus(row));
    setNotes(String(row?.notes || ""));
    setTableError("");
    setOpen(true);
  };

  const closeDialog = () => {
    if (saving) return;
    setOpen(false);
  };

  const handleUpdate = async () => {
    if (!editingRow?.id) {
      setTableError("Invalid expense record");
      return;
    }

    const trimmedItem = item.trim();
    const estimatedValue = Number(estimated);
    const actualValue = Number(actual || 0);

    if (!trimmedItem) {
      setTableError("Item is required");
      return;
    }

    if (!estimated || Number.isNaN(estimatedValue) || estimatedValue <= 0) {
      setTableError("Valid estimated amount is required");
      return;
    }

    if (!expenseDate) {
      setTableError("Expense date is required");
      return;
    }

    const payload = {
      item: trimmedItem,
      estimated: estimatedValue,
      actual: actualValue,
      expense_date: expenseDate,
      payment_status: paymentStatus,
      notes: notes?.trim() || null,
      user_id: "user_1",
      month: expenseDate.slice(0, 7),
      status: paymentStatus ? "paid" : "pending",
    };

    try {
      setSaving(true);
      setTableError("");
      await onUpdateExpense(editingRow.id, payload);
      setOpen(false);
    } catch (error) {
      setTableError("Unable to update expense");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Paper className={styles.card}>
      <Box className={styles.cardHeader}>
        <Box>
          <Typography className={styles.cardTitle}>
            Expense Records{" "}
            <span className={styles.cardSubTitle}>
              Estimated vs actual with payment status.
            </span>
          </Typography>
        </Box>
      </Box>

      {tableError && (
        <Alert severity="error" sx={{ m: 2, mb: 0 }}>
          {tableError}
        </Alert>
      )}

      <TableContainer className={styles.tableWrap}>
        <Table size="small" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Item</TableCell>
              <TableCell align="right">Estimated</TableCell>
              <TableCell align="right">Actual</TableCell>
              <TableCell>Paid</TableCell>
              <TableCell>Date</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                  <CircularProgress size={22} />
                </TableCell>
              </TableRow>
            ) : expenses.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                  <Typography variant="body2" color="text.secondary">
                    No expense records found
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              expenses.map((expense) => (
                <TableRow key={expense.id} hover>
                  <TableCell>{getExpenseName(expense)}</TableCell>
                  <TableCell align="right">
                    {formatCurrency(getEstimated(expense))}
                  </TableCell>
                  <TableCell align="right">
                    {formatCurrency(getActual(expense))}
                  </TableCell>
                  <TableCell>
                    <Button
                      size="small"
                      variant={getPaidStatus(expense) ? "outlined" : "outlined"}
                      color={getPaidStatus(expense) ? "success" : "inherit"}
                      onClick={() => handleTogglePaid(expense)}
                      disabled={togglingId === expense.id}
                    >
                      {getPaidStatus(expense) ? "✅ Paid" : "❌ Not Paid"}
                    </Button>
                  </TableCell>
                  <TableCell>{getExpenseDate(expense)}</TableCell>
                  <TableCell align="right">
                    <IconButton size="small" onClick={() => openEdit(expense)}>
                      <FiEdit2 size={15} />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => setDeleteConfirmId(expense.id)}
                    >
                      <FiTrash2 size={15} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
          <TableFooter>
            <TableRow sx={{ backgroundColor: "#f8fafc", fontWeight: 700 }}>
              <TableCell sx={{ fontWeight: 700 }}>Total</TableCell>
              <TableCell
                align="right"
                sx={{ fontWeight: 700, color: "#3b82f6" }}
              >
                {formatCurrency(summary?.total_estimated || 0)}
              </TableCell>
              <TableCell
                align="right"
                sx={{ fontWeight: 700, color: "#10b981" }}
              >
                {formatCurrency(summary?.total_actual || 0)}
              </TableCell>

              <TableCell />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>

      <Dialog
        open={!!deleteConfirmId}
        onClose={() => setDeleteConfirmId(null)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Delete Expense</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this expense? This cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmId(null)} disabled={deleting}>
            Cancel
          </Button>
          <Button
            color="error"
            variant="contained"
            disabled={deleting}
            onClick={() => deleteConfirmId && handleDelete(deleteConfirmId)}
          >
            {deleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={open} onClose={closeDialog} fullWidth maxWidth="sm">
        <DialogTitle sx={{ pr: 6 }}>
          Edit Expense
          <IconButton
            onClick={closeDialog}
            sx={{ position: "absolute", right: 8, top: 8 }}
            size="small"
          >
            <FiX />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ pt: 1 }}>
            {tableError && <Alert severity="error">{tableError}</Alert>}
            <TextField
              label="Item"
              value={item}
              onChange={(event) => setItem(event.target.value)}
              fullWidth
              size="small"
              required
            />
            <TextField
              label="Estimated"
              type="number"
              value={estimated}
              onChange={(event) => setEstimated(event.target.value)}
              fullWidth
              size="small"
              required
            />
            <TextField
              label="Actual"
              type="number"
              value={actual}
              onChange={(event) => setActual(event.target.value)}
              fullWidth
              size="small"
            />
            <TextField
              label="Expense Date"
              type="date"
              value={expenseDate}
              onChange={(event) => setExpenseDate(event.target.value)}
              fullWidth
              size="small"
              InputLabelProps={{ shrink: true }}
              required
            />
            <TextField
              label="Notes"
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              fullWidth
              size="small"
              multiline
              minRows={2}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={paymentStatus}
                  onChange={(event) => setPaymentStatus(event.target.checked)}
                />
              }
              label="Paid"
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} disabled={saving}>
            Cancel
          </Button>
          <Button onClick={handleUpdate} variant="contained" disabled={saving}>
            {saving ? "Saving..." : "Update"}
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}
