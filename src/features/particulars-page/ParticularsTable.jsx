import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

const getStatus = (row) => {
  if (!row?.next_due_date) return "No Due";

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const due = new Date(row.next_due_date);
  if (Number.isNaN(due.getTime())) return "No Due";
  due.setHours(0, 0, 0, 0);

  return due < today ? "Overdue" : "Upcoming";
};

const formatCurrency = (value) => {
  const amount = Number(value);
  if (Number.isNaN(amount)) return "-";

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(amount);
};

const formatDate = (value) => {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
};

const getSafeText = (value, fallback = "-") => {
  if (value === null || value === undefined) return fallback;
  const text = String(value).trim();
  return text ? text : fallback;
};

export default function ParticularsTable({ rows = [], onMarkPaid }) {
  const safeRows = Array.isArray(rows)
    ? rows.map((row, index) => ({
        ...(row || {}),
        id: row?.id ?? `row-${index}`,
      }))
    : [];

  const openPayment = (row) => {
    if (!row) return;
    onMarkPaid?.(row);
  };

  if (safeRows.length === 0) {
    return (
      <Box sx={{ py: 4 }}>
        <Typography variant="body2" color="text.secondary" align="center">
          No particulars found
        </Typography>
      </Box>
    );
  }

  return (
    <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
      <Table size="small" sx={{ minWidth: 900 }}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Next Due</TableCell>
            <TableCell>Last Paid</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {safeRows.map((item) => {
            const status = getStatus(item);
            const statusColor =
              status === "Overdue"
                ? "error.main"
                : status === "Upcoming"
                  ? "warning.main"
                  : "text.secondary";

            return (
              <TableRow key={item.id} hover>
                <TableCell>{getSafeText(item?.name)}</TableCell>
                <TableCell>{formatCurrency(item?.amount)}</TableCell>
                <TableCell>{getSafeText(item?.category)}</TableCell>
                <TableCell>{formatDate(item?.next_due_date)}</TableCell>
                <TableCell>
                  {item?.last_paid_date
                    ? formatDate(item?.last_paid_date)
                    : "Not Paid"}
                </TableCell>
                <TableCell>
                  <Typography
                    variant="body2"
                    sx={{ color: statusColor, fontWeight: 600 }}
                  >
                    {status}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Button
                    size="small"
                    variant="outlined"
                    disabled={!item}
                    onClick={() => openPayment(item)}
                  >
                    Mark Paid
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
