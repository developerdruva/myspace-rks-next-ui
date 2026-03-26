import { useState, useMemo } from "react";
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Drawer,
  Grid,
  InputAdornment,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  TextField,
  Typography,
} from "@mui/material";

// ─── helpers ────────────────────────────────────────────────────────────────

const getStatusColor = (status) => {
  const s = status?.toUpperCase();
  if (s === "ACTIVE") return "success";
  if (s === "INACTIVE") return "warning";
  if (s === "CLOSED") return "error";
  return "default";
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

const safe = (value, fallback = "-") => {
  if (value === null || value === undefined) return fallback;
  const text = String(value).trim();
  return text || fallback;
};

// ─── detail modal ────────────────────────────────────────────────────────────

const DetailItem = ({ label, value }) => (
  <Box>
    <Typography
      variant="caption"
      color="text.secondary"
      sx={{
        textTransform: "uppercase",
        letterSpacing: 0.5,
        display: "block",
        mb: 0.25,
      }}
    >
      {label}
    </Typography>
    <Typography
      variant="body2"
      sx={{ fontWeight: 500, wordBreak: "break-word" }}
    >
      {value}
    </Typography>
  </Box>
);

const SectionHeading = ({ children }) => (
  <Grid size={{ xs: 12 }}>
    <Typography
      variant="overline"
      color="primary"
      sx={{ fontWeight: 700, letterSpacing: 1 }}
    >
      {children}
    </Typography>
    <Divider sx={{ mt: 0.5 }} />
  </Grid>
);

function DetailDrawer({ item, open, onClose, onEdit }) {
  const status = safe(item?.status, "—").toUpperCase();

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      ModalProps={{ keepMounted: true }}
      SlideProps={{ appear: true }}
    >
      <Box
        sx={{
          width: { xs: "100vw", sm: 520, md: 600 },
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            px: 3,
            pt: 2.5,
            pb: 1.5,
            borderBottom: "1px solid",
            borderColor: "divider",
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            gap={2}
          >
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                {safe(item?.document_particular)}
              </Typography>
              {item?.short_id && (
                <Typography variant="caption" color="text.secondary">
                  ID: {item?.short_id}
                </Typography>
              )}
            </Box>
            <Chip
              label={status}
              size="small"
              color={getStatusColor(status)}
              variant="outlined"
              sx={{ fontWeight: 600 }}
            />
          </Stack>
        </Box>

        <Box sx={{ p: 3, flex: 1, overflowY: "auto" }}>
          <Grid container spacing={2.5}>
            {/* Basic */}
            <SectionHeading>Basic Info</SectionHeading>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <DetailItem label="Category" value={safe(item?.category)} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <DetailItem label="Type" value={safe(item?.type)} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <DetailItem label="Frequency" value={safe(item?.frequency)} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <DetailItem
                label="Tenure (months)"
                value={item?.tenure != null ? String(item?.tenure) : "-"}
              />
            </Grid>

            {/* Dates */}
            <SectionHeading>Dates</SectionHeading>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <DetailItem
                label="Start Date"
                value={formatDate(item?.start_date)}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <DetailItem
                label="Renewal / Due"
                value={formatDate(item?.renewal_due)}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <DetailItem
                label="Validity From"
                value={formatDate(item?.validity_from)}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <DetailItem
                label="Validity To"
                value={formatDate(item?.validity_to)}
              />
            </Grid>

            {/* Financial */}
            <SectionHeading>Financial</SectionHeading>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <DetailItem
                label="Base Amount"
                value={formatCurrency(item?.base_amount)}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <DetailItem
                label="Total Amount"
                value={formatCurrency(item?.total_amount)}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <DetailItem
                label="Reference Number"
                value={safe(item?.reference_number)}
              />
            </Grid>

            {/* Description */}
            {item?.description && (
              <>
                <SectionHeading>Description</SectionHeading>
                <Grid size={{ xs: 12 }}>
                  <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>
                    {item?.description}
                  </Typography>
                </Grid>
              </>
            )}
          </Grid>
        </Box>

        <Box
          sx={{
            px: 3,
            py: 2,
            borderTop: "1px solid",
            borderColor: "divider",
            display: "flex",
            gap: 1,
            justifyContent: "flex-end",
          }}
        >
          <Button variant="outlined" onClick={onClose}>
            Close
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              onClose();
              if (item) onEdit?.(item);
            }}
          >
            Edit
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
}

// ─── delete confirmation ──────────────────────────────────────────────────────

function DeleteDialog({ item, onClose, onConfirm }) {
  return (
    <Dialog open onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ fontWeight: 700 }}>Delete Particular?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete{" "}
          <strong>{safe(item?.document_particular)}</strong>? This action cannot
          be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="contained" color="error" onClick={onConfirm}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// ─── main component ───────────────────────────────────────────────────────────

const ROWS_PER_PAGE_OPTIONS = [5, 10, 25];
const ALL = "ALL";

export default function ParticularsTable({ rows = [], onEdit, onDelete }) {
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState(ALL);
  const [filterStatus, setFilterStatus] = useState(ALL);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [viewItem, setViewItem] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);
  const [sortBy, setSortBy] = useState("document_particular");
  const [sortDirection, setSortDirection] = useState("asc");

  const safeRows = Array.isArray(rows)
    ? rows.map((row, i) => ({ ...(row || {}), id: row?.id ?? `row-${i}` }))
    : [];

  // unique filter options derived from data
  const categories = useMemo(
    () => [ALL, ...new Set(safeRows.map((r) => r.category).filter(Boolean))],
    [safeRows],
  );
  const statuses = useMemo(
    () => [
      ALL,
      ...new Set(safeRows.map((r) => r.status?.toUpperCase()).filter(Boolean)),
    ],
    [safeRows],
  );

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return safeRows.filter((r) => {
      const matchSearch =
        !q ||
        safe(r.document_particular).toLowerCase().includes(q) ||
        safe(r.type).toLowerCase().includes(q) ||
        safe(r.short_id).toLowerCase().includes(q);
      const matchCategory =
        filterCategory === ALL || r.category === filterCategory;
      const matchStatus =
        filterStatus === ALL || r.status?.toUpperCase() === filterStatus;
      return matchSearch && matchCategory && matchStatus;
    });
  }, [safeRows, search, filterCategory, filterStatus]);

  const sorted = useMemo(() => {
    const rowsToSort = [...filtered];
    rowsToSort.sort((a, b) => {
      let aValue;
      let bValue;

      if (sortBy === "category_type") {
        aValue = `${safe(a.category)} ${safe(a.type)}`;
        bValue = `${safe(b.category)} ${safe(b.type)}`;
      } else if (sortBy === "base_amount") {
        aValue = Number(a.base_amount) || 0;
        bValue = Number(b.base_amount) || 0;
      } else if (sortBy === "renewal_due") {
        aValue = a.renewal_due ? new Date(a.renewal_due).getTime() : 0;
        bValue = b.renewal_due ? new Date(b.renewal_due).getTime() : 0;
      } else {
        aValue = safe(a[sortBy], "").toUpperCase();
        bValue = safe(b[sortBy], "").toUpperCase();
      }

      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
    return rowsToSort;
  }, [filtered, sortBy, sortDirection]);

  const paginated = sorted.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(column);
      setSortDirection("asc");
    }
    setPage(0);
  };

  const handleChangePage = (_, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  const clearFilters = () => {
    setSearch("");
    setFilterCategory(ALL);
    setFilterStatus(ALL);
    setPage(0);
  };

  const hasFilters = search || filterCategory !== ALL || filterStatus !== ALL;

  if (safeRows.length === 0) {
    return (
      <Box sx={{ py: 6, display: "grid", placeItems: "center" }}>
        <Typography variant="body2" color="text.secondary">
          No particulars found
        </Typography>
      </Box>
    );
  }

  return (
    <Stack spacing={2}>
      {/* ── Search + Filters ── */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={1.5}
        alignItems="center"
      >
        <TextField
          size="small"
          placeholder="Search by name, type, ID…"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(0);
          }}
          sx={{ flex: 1, minWidth: 200 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Typography variant="body2" color="text.secondary">
                  🔍
                </Typography>
              </InputAdornment>
            ),
          }}
        />

        <Select
          size="small"
          value={filterCategory}
          onChange={(e) => {
            setFilterCategory(e.target.value);
            setPage(0);
          }}
          sx={{ minWidth: 150 }}
        >
          {categories.map((c) => (
            <MenuItem key={c} value={c}>
              {c === ALL ? "All Categories" : c}
            </MenuItem>
          ))}
        </Select>

        <Select
          size="small"
          value={filterStatus}
          onChange={(e) => {
            setFilterStatus(e.target.value);
            setPage(0);
          }}
          sx={{ minWidth: 130 }}
        >
          {statuses.map((s) => (
            <MenuItem key={s} value={s}>
              {s === ALL ? "All Statuses" : s}
            </MenuItem>
          ))}
        </Select>

        {hasFilters && (
          <Button
            size="small"
            variant="text"
            color="inherit"
            onClick={clearFilters}
          >
            Clear
          </Button>
        )}

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ whiteSpace: "nowrap" }}
        >
          {filtered.length} record{filtered.length !== 1 ? "s" : ""}
        </Typography>
      </Stack>

      {/* ── Table ── */}
      <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
        <Table size="small" sx={{ minWidth: 800 }}>
          <TableHead>
            <TableRow sx={{ "& th": { fontWeight: 700 } }}>
              <TableCell
                sortDirection={
                  sortBy === "document_particular" ? sortDirection : false
                }
              >
                <TableSortLabel
                  active={sortBy === "document_particular"}
                  direction={
                    sortBy === "document_particular" ? sortDirection : "asc"
                  }
                  onClick={() => handleSort("document_particular")}
                >
                  Particular
                </TableSortLabel>
              </TableCell>
              <TableCell
                sortDirection={
                  sortBy === "category_type" ? sortDirection : false
                }
              >
                <TableSortLabel
                  active={sortBy === "category_type"}
                  direction={sortBy === "category_type" ? sortDirection : "asc"}
                  onClick={() => handleSort("category_type")}
                >
                  Category / Type
                </TableSortLabel>
              </TableCell>
              <TableCell
                sortDirection={sortBy === "base_amount" ? sortDirection : false}
              >
                <TableSortLabel
                  active={sortBy === "base_amount"}
                  direction={sortBy === "base_amount" ? sortDirection : "asc"}
                  onClick={() => handleSort("base_amount")}
                >
                  Base Amount
                </TableSortLabel>
              </TableCell>
              <TableCell
                sortDirection={sortBy === "renewal_due" ? sortDirection : false}
              >
                <TableSortLabel
                  active={sortBy === "renewal_due"}
                  direction={sortBy === "renewal_due" ? sortDirection : "asc"}
                  onClick={() => handleSort("renewal_due")}
                >
                  Renewal Due
                </TableSortLabel>
              </TableCell>
              <TableCell
                sortDirection={sortBy === "status" ? sortDirection : false}
              >
                <TableSortLabel
                  active={sortBy === "status"}
                  direction={sortBy === "status" ? sortDirection : "asc"}
                  onClick={() => handleSort("status")}
                >
                  Status
                </TableSortLabel>
              </TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {paginated.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                  <Typography variant="body2" color="text.secondary">
                    No results match your filters
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              paginated.map((item) => {
                const status = safe(item.status, "—").toUpperCase();
                return (
                  <TableRow key={item.id} hover>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {safe(item.document_particular)}
                      </Typography>
                      {item.short_id && (
                        <Typography variant="caption" color="text.secondary">
                          {item.short_id}
                        </Typography>
                      )}
                    </TableCell>

                    <TableCell>
                      <Typography variant="body2">
                        {safe(item.category)}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {safe(item.type)}
                      </Typography>
                    </TableCell>

                    <TableCell>{formatCurrency(item.base_amount)}</TableCell>

                    <TableCell>{formatDate(item.renewal_due)}</TableCell>

                    <TableCell>
                      <Chip
                        label={status}
                        size="small"
                        color={getStatusColor(status)}
                        variant="outlined"
                      />
                    </TableCell>

                    <TableCell align="right">
                      <Stack
                        direction="row"
                        spacing={0.75}
                        justifyContent="flex-end"
                      >
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={() => setViewItem(item)}
                        >
                          View
                        </Button>
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={() => onEdit?.(item)}
                        >
                          Edit
                        </Button>
                        <Button
                          size="small"
                          variant="outlined"
                          color="error"
                          onClick={() => setDeleteItem(item)}
                        >
                          Delete
                        </Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>

        <TablePagination
          component="div"
          count={filtered.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
        />
      </TableContainer>

      {/* ── Detail Drawer ── */}
      <DetailDrawer
        item={viewItem}
        open={!!viewItem}
        onClose={() => setViewItem(null)}
        onEdit={(item) => {
          setViewItem(null);
          onEdit?.(item);
        }}
      />

      {/* ── Delete Confirmation ── */}
      {deleteItem && (
        <DeleteDialog
          item={deleteItem}
          onClose={() => setDeleteItem(null)}
          onConfirm={() => {
            onDelete?.(deleteItem.id, deleteItem.user_id);
            setDeleteItem(null);
          }}
        />
      )}
    </Stack>
  );
}
