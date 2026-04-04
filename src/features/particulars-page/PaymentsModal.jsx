"use client";
import apiServices from "@/utils/service-calls/apiServices";
import { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

export default function PaymentsModal({ particular, onClose, onSuccess }) {
  const [form, setForm] = useState({
    particular_id: particular.id,
    amount: particular.amount,
    paid_on: new Date().toISOString().split("T")[0],
    notes: "",
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    if (error) {
      setError("");
    }
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.amount) {
      setError("Amount is required");
      return;
    }

    try {
      setIsSubmitting(true);
      await apiServices.markPayment(form);
      onSuccess && onSuccess();
    } catch (err) {
      console.log(err);
      setError("Payment failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Mark Payment</DialogTitle>

      <DialogContent dividers>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <Box>
            <Typography variant="caption" color="text.secondary">
              Particular
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              {particular.name}
            </Typography>
          </Box>

          {error && <Alert severity="error">{error}</Alert>}

          <TextField
            fullWidth
            label="Amount"
            name="amount"
            type="number"
            value={form.amount}
            onChange={handleChange}
          />

          <TextField
            fullWidth
            type="date"
            label="Paid On"
            name="paid_on"
            value={form.paid_on}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            fullWidth
            multiline
            minRows={3}
            label="Notes"
            name="notes"
            value={form.notes}
            onChange={handleChange}
          />
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button variant="outlined" onClick={onClose} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : "Confirm"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
