"use client";

import { InputAdornment, Paper, TextField } from "@mui/material";
import { Button } from "@mui/material";
import { FiCalendar, FiPlus } from "react-icons/fi";
import styles from "./expenses.module.css";

type ExpenseFiltersProps = {
  month: string;
  setMonth: (month: string) => void;
  onCreateExpense: () => void;
};

export default function ExpenseFilters({
  month,
  setMonth,
  onCreateExpense,
}: ExpenseFiltersProps) {
  return (
    <Paper className={styles.filterCard}>
      <TextField
        label="Month"
        type="month"
        size="small"
        value={month}
        onChange={(event) => setMonth(event.target.value)}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <FiCalendar />
              </InputAdornment>
            ),
          },
        }}
      />
      <Button
        variant="contained"
        size="small"
        startIcon={<FiPlus />}
        onClick={onCreateExpense}
      >
        Create New Expense
      </Button>
    </Paper>
  );
}
