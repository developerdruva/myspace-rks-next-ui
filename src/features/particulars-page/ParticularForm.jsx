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
  Grid,
  MenuItem,
  TextField,
} from "@mui/material";

export default function ParticularForm({ onSuccess, onClose }) {
  const [form, setForm] = useState({
    name: "",
    amount: "",
    type_id: 1,
    category_id: 1,
    start_date: "",
    due_day: "",
    status_id: 1,
    description: "",
    workspace_id: "0d4f53ac-c506-4121-8fe0-cdcddf4690d4",
    created_by: "3dec1547-9a74-4c6a-bd3b-7fa3b9211ace",
  });

  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e) => {
    if (error) {
      setError("");
    }
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (!form.name) return "Name is required";
    if (!form.amount) return "Amount is required";
    if (!form.start_date) return "Start date required";
    return "";
  };

  const handleSubmit = async () => {
    const err = validate();
    if (err) return setError(err);

    try {
      setIsSaving(true);
      await apiServices.addParticular(form);
      onSuccess && onSuccess();
    } catch (e) {
      console.log(e);
      setError("Failed to add");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog
      open
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: 2,
        },
      }}
    >
      <DialogTitle>Add Particular</DialogTitle>

      <DialogContent dividers>
        <Box sx={{ mt: 1 }}>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={form.name}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Amount"
                name="amount"
                type="number"
                value={form.amount}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                label="Type"
                name="type_id"
                value={form.type_id}
                onChange={handleChange}
              >
                <MenuItem value={1}>Monthly</MenuItem>
                <MenuItem value={2}>Yearly</MenuItem>
                <MenuItem value={3}>One-time</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Start Date"
                type="date"
                name="start_date"
                value={form.start_date}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Due Day"
                name="due_day"
                type="number"
                value={form.due_day}
                onChange={handleChange}
                inputProps={{ min: 1, max: 31 }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                minRows={3}
                label="Description"
                name="description"
                value={form.description}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose} variant="outlined" disabled={isSaving}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" disabled={isSaving}>
          {isSaving ? "Saving..." : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
