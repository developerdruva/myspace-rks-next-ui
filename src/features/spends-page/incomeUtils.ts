export type IncomeRow = {
  id: string;
  user_id: string;
  month: string;
  salary: number | string;
  prev_balance: number | string;
  extra_income: number | string;
  income_note?: string | null;
  created_at: string;
  updated_at: string;
  is_deleted: boolean;
  deleted_at: string | null;
  deleted_by: string | null;
  [key: string]: any;
};

export function getIncomeId(row: IncomeRow, index: number): string {
  return row?.id || String(index);
}

export function getTotalIncome(row: IncomeRow): number {
  const salary = Number(row?.salary || 0);
  const prevBalance = Number(row?.prev_balance || 0);
  const extraIncome = Number(row?.extra_income || 0);
  return salary + prevBalance + extraIncome;
}

export function getIncomeNote(row: IncomeRow): string {
  return row?.income_note || "-";
}

export function formatCurrency(value: number | string) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(Number(value || 0));
}

export function calculateTotalIncomeForMonth(rows: IncomeRow[]): number {
  if (!Array.isArray(rows) || rows.length === 0) return 0;
  return rows.reduce((sum, row) => sum + getTotalIncome(row), 0);
}

export function normalizeIncomeRows(input: any): IncomeRow[] {
  // Handle axios response wrapper
  const data = input?.data ?? input;

  // If it's an array, return as-is
  if (Array.isArray(data)) return data.filter((item) => !item?.is_deleted);

  // If it's a single object with income properties, wrap in array
  if (
    data &&
    typeof data === "object" &&
    data?.salary !== undefined &&
    !data?.is_deleted
  ) {
    return [data];
  }

  return [];
}
