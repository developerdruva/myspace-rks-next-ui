export type ExpenseRow = {
  id: string;
  user_id: string;
  month: string;
  item?: string;
  item_name?: string;
  estimated?: number | string;
  estimated_amount?: number | string;
  actual?: number | string;
  amount?: number | string;
  expense_date?: string;
  paid_on?: string;
  payment_status?: boolean;
  status?: string;
  notes?: string | null;
  [key: string]: any;
};

export type ExpenseSummary = {
  total_estimated?: number | string;
  total_actual?: number | string;
  total_paid?: number | string;
  total_pending?: number | string;
  expected_balance?: number | string;
  actual_balance?: number | string;
  [key: string]: any;
};

export function normalizeExpenses(input: any): ExpenseRow[] {
  const data = input?.data ?? input;

  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data?.records)) return data.records;
  if (Array.isArray(data?.items)) return data.items;

  if (
    data &&
    typeof data === "object" &&
    (data?.item !== undefined || data?.item_name !== undefined)
  ) {
    return [data];
  }

  return [];
}

export function normalizeSummary(input: any): ExpenseSummary {
  const data = input?.data ?? input;
  if (data && typeof data === "object") return data;
  return {};
}

export function formatCurrency(value: number | string | undefined) {
  const parsed = typeof value === "string" ? parseFloat(value) : value;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(parsed || 0);
}

export function getExpenseName(row: ExpenseRow): string {
  return row?.item || row?.item_name || "-";
}

export function getEstimated(row: ExpenseRow): number {
  const value = row?.estimated ?? row?.estimated_amount ?? 0;
  return Number(value || 0);
}

export function getActual(row: ExpenseRow): number {
  const value = row?.actual ?? row?.amount ?? 0;
  return Number(value || 0);
}

export function getPaidStatus(row: ExpenseRow): boolean {
  if (typeof row?.payment_status === "boolean") return row.payment_status;
  return row?.status === "paid";
}

export function getExpenseDate(row: ExpenseRow): string {
  return formatDate(row?.expense_date || row?.paid_on || "");
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return "-";
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function getFormattedExpenseDate(row: ExpenseRow): string {
  const dateStr = row?.expense_date || row?.paid_on;
  if (!dateStr) return "-";
  return formatDate(dateStr);
}
