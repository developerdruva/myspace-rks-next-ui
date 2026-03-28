"use client";

import { useState, useEffect } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { FiEdit2, FiPlus, FiTrash2, FiX } from "react-icons/fi";
import styles from "./spends.module.css";
import {
  IncomeRow,
  formatCurrency,
  getIncomeId,
  getTotalIncome,
  getIncomeNote,
} from "./incomeUtils";

type IncomeTableProps = {
  rows: IncomeRow[];
  loading: boolean;
  incomeFormOpen: boolean;
  setIncomeFormOpen: (open: boolean) => void;
  onCreate: (payload: any) => Promise<any>;
  onUpdate: (id: string, payload: any) => Promise<any>;
  onDelete: (id: string) => Promise<any>;
};

const USER_ID = "user_1";

export default function IncomeTable({
  rows,
  loading,
  incomeFormOpen,
  setIncomeFormOpen,
  onCreate,
  onUpdate,
  onDelete,
}: IncomeTableProps) {
  const [open, setOpen] = useState(false);
  const [editingRow, setEditingRow] = useState<IncomeRow | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [salary, setSalary] = useState("");
  const [prevBalance, setPrevBalance] = useState("");
  const [extraIncome, setExtraIncome] = useState("");
  const [incomeNote, setIncomeNote] = useState("");
  const [formError, setFormError] = useState("");
  const [saving, setSaving] = useState(false);

  const openCreate = () => {
    setIncomeFormOpen(true);
    setSalary("");
    setPrevBalance("");
    setExtraIncome("");
    setIncomeNote("");
    setFormError("");
    setOpen(true);
  };

  const openEdit = (row: IncomeRow) => {
    setEditingRow(row);
    setSalary(String(row?.salary || ""));
    setPrevBalance(String(row?.prev_balance || ""));
    setExtraIncome(String(row?.extra_income || ""));
    setIncomeNote(String(row?.income_note || ""));
    setFormError("");
    setOpen(true);
  };

  const closeCreate = () => {
    setOpen(false);
    if (!open) {
      setIncomeFormOpen(false);
    }
  };

  useEffect(() => {
    if (incomeFormOpen && !open) {
      openCreate();
    }
  }, [incomeFormOpen]);

  const onSubmit = async () => {
    const numSalary = Number(salary);
    const numPrevBalance = Number(prevBalance);
    const numExtraIncome = Number(extraIncome);

    if (!salary || Number.isNaN(numSalary) || numSalary < 0) {
      setFormError("Valid salary is required");
      return;
    }

    const payload = {
      salary: numSalary,
      prev_balance: numPrevBalance || 0,
      extra_income: numExtraIncome || 0,
      income_note: incomeNote?.trim() || null,
      user_id: USER_ID,
    };

    try {
      setSaving(true);
      if (editingRow) {
        await onUpdate(getIncomeId(editingRow, 0), payload);
      } else {
        await onCreate(payload);
      }
      setOpen(false);
    } catch (error) {
      setFormError("Save failed. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Paper className={styles.card}>
      <Box className={styles.cardHeader}>
        <Box>
          <Typography className={styles.cardTitle}>
            Income Records{" "}
            <span className={styles.cardSubTitle}>
              All income records for selected month
            </span>
          </Typography>
        </Box>
      </Box>

      <TableContainer className={styles.tableWrap}>
        <Table size="small" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Salary</TableCell>
              <TableCell align="right">Prev Balance</TableCell>
              <TableCell align="right">Extra Income</TableCell>
              <TableCell align="right">Total</TableCell>
              <TableCell>Notes</TableCell>
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
            ) : rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                  <Typography variant="body2" color="text.secondary">
                    No records found
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row, index) => {
                const rowId = getIncomeId(row, index);
                const total = getTotalIncome(row);
                return (
                  <TableRow key={rowId} hover>
                    <TableCell>{formatCurrency(row?.salary || 0)}</TableCell>
                    <TableCell align="right">
                      {formatCurrency(row?.prev_balance || 0)}
                    </TableCell>
                    <TableCell align="right">
                      {formatCurrency(row?.extra_income || 0)}
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ fontWeight: 600, color: "#10b981" }}
                    >
                      {formatCurrency(total)}
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body2"
                        sx={{
                          maxWidth: 120,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          color: "#64748b",
                        }}
                        title={getIncomeNote(row)}
                      >
                        {getIncomeNote(row)}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <IconButton size="small" onClick={() => openEdit(row)}>
                        <FiEdit2 size={15} />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => setDeleteConfirmId(rowId)}
                      >
                        <FiTrash2 size={15} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={!!deleteConfirmId}
        onClose={() => setDeleteConfirmId(null)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Delete Income Record</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this income record? This cannot be
            undone.
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
            onClick={async () => {
              if (!deleteConfirmId) return;
              try {
                setDeleting(true);
                await onDelete(deleteConfirmId);
                setDeleteConfirmId(null);
              } finally {
                setDeleting(false);
              }
            }}
          >
            {deleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={open} onClose={closeCreate} fullWidth maxWidth="xs">
        <DialogTitle sx={{ pr: 6 }}>
          {editingRow ? "Edit Income" : "Add Income"}
          <IconButton
            onClick={closeCreate}
            sx={{ position: "absolute", right: 8, top: 8 }}
            size="small"
          >
            <FiX />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ pt: 1 }}>
            {formError && <Alert severity="error">{formError}</Alert>}
            <TextField
              label="Salary"
              value={salary}
              onChange={(event) => setSalary(event.target.value)}
              type="number"
              fullWidth
              size="small"
              required
            />
            <TextField
              label="Previous Balance"
              value={prevBalance}
              onChange={(event) => setPrevBalance(event.target.value)}
              type="number"
              fullWidth
              size="small"
            />
            <TextField
              label="Extra Income"
              value={extraIncome}
              onChange={(event) => setExtraIncome(event.target.value)}
              type="number"
              fullWidth
              size="small"
            />
            <TextField
              label="Notes"
              value={incomeNote}
              onChange={(event) => setIncomeNote(event.target.value)}
              fullWidth
              size="small"
              multiline
              minRows={2}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeCreate} disabled={saving}>
            Cancel
          </Button>
          <Button onClick={onSubmit} variant="contained" disabled={saving}>
            {saving ? "Saving..." : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}
