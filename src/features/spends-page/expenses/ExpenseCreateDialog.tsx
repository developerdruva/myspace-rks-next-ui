"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  Stack,
  TextField,
} from "@mui/material";
import { FiX } from "react-icons/fi";

type ExpenseFormValues = {
  item: string;
  estimated: string;
  actual: string;
  expense_date: string;
  payment_status: boolean;
  notes: string;
};

type ExpenseCreateDialogProps = {
  month: string;
  open: boolean;
  onClose: () => void;
  onSubmitExpense: (payload: any) => Promise<void>;
};

const initialForm: ExpenseFormValues = {
  item: "",
  estimated: "",
  actual: "",
  expense_date: "",
  payment_status: false,
  notes: "",
};

export default function ExpenseCreateDialog({
  month,
  open,
  onClose,
  onSubmitExpense,
}: ExpenseCreateDialogProps) {
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");
  const [form, setForm] = useState<ExpenseFormValues>(initialForm);

  const defaultDate = useMemo(() => {
    if (!month) return "";
    return `${month}-01`;
  }, [month]);

  useEffect(() => {
    if (!open) return;
    setForm({ ...initialForm, expense_date: defaultDate });
    setFormError("");
  }, [open, defaultDate]);

  const closeDialog = () => {
    if (saving) return;
    onClose();
  };

  const handleSubmit = async () => {
    const item = form.item.trim();
    const estimated = Number(form.estimated);
    const actual = Number(form.actual || 0);

    if (!item) {
      setFormError("Item is required");
      return;
    }

    if (!form.estimated || Number.isNaN(estimated) || estimated <= 0) {
      setFormError("Valid estimated amount is required");
      return;
    }

    if (!form.expense_date) {
      setFormError("Expense date is required");
      return;
    }

    const payload = {
      item,
      estimated,
      actual,
      expense_date: form.expense_date,
      payment_status: form.payment_status,
      notes: form.notes?.trim() || null,
      user_id: "user_1",
      month: form.expense_date.slice(0, 7),
      status: form.payment_status ? "completed" : "planned",
    };

    try {
      setSaving(true);
      await onSubmitExpense(payload);
      onClose();
    } catch (error) {
      setFormError("Failed to add expense. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onClose={closeDialog} fullWidth maxWidth="sm">
      <DialogTitle sx={{ pr: 6 }}>
        Add Expense
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
          {formError && <Alert severity="error">{formError}</Alert>}
          <TextField
            label="Item"
            value={form.item}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, item: event.target.value }))
            }
            fullWidth
            size="small"
            required
          />
          <TextField
            label="Estimated"
            type="number"
            value={form.estimated}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, estimated: event.target.value }))
            }
            fullWidth
            size="small"
            required
          />
          <TextField
            label="Actual"
            type="number"
            value={form.actual}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, actual: event.target.value }))
            }
            fullWidth
            size="small"
          />
          <TextField
            label="Expense Date"
            type="date"
            value={form.expense_date}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, expense_date: event.target.value }))
            }
            fullWidth
            size="small"
            InputLabelProps={{ shrink: true }}
            required
          />
          <TextField
            label="Notes"
            value={form.notes}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, notes: event.target.value }))
            }
            fullWidth
            size="small"
            multiline
            minRows={2}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={form.payment_status}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    payment_status: event.target.checked,
                  }))
                }
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
        <Button onClick={handleSubmit} variant="contained" disabled={saving}>
          {saving ? "Saving..." : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
