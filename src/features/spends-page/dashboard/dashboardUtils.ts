export type IncomeData = {
  salary?: number | string;
  prev_balance?: number | string;
  extra_income?: number | string;
};

export type PlannedRow = {
  id?: string;
  category?: string;
  estimated_amount?: number | string;
};

export type ActualRow = {
  planned_id?: string;
  amount?: number | string;
};

export type SummaryData = {
  total_estimated?: number | string;
  total_actual?: number | string;
  total_paid?: number | string;
  total_pending?: number | string;
  expected_balance?: number | string;
  actual_balance?: number | string;
};

export function toNumber(value: number | string | undefined | null) {
  return Number(value || 0);
}

export function formatCurrency(value: number | string | undefined | null) {
  const parsed = toNumber(value);
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(parsed);
}

export function normalizeArrayResponse(input: any) {
  const data = input?.data ?? input;
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data?.items)) return data.items;
  if (Array.isArray(data?.records)) return data.records;
  return [];
}

export function normalizeObjectResponse(input: any) {
  const data = input?.data ?? input;
  if (data && typeof data === "object" && !Array.isArray(data)) return data;
  if (
    data?.data &&
    typeof data.data === "object" &&
    !Array.isArray(data.data)
  ) {
    return data.data;
  }
  return {};
}
