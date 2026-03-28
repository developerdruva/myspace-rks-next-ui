"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import apiServices from "@/utils/service-calls/apiServices";
import IncomeTable from "./IncomeTable";
import { IncomeRow, normalizeIncomeRows } from "./incomeUtils";

type IncomeSectionProps = {
  month: string;
  refreshKey?: number;
  incomeFormOpen: boolean;
  setIncomeFormOpen: (open: boolean) => void;
  onError?: (error: string) => void;
};

export default function IncomeSection({
  month,
  refreshKey,
  incomeFormOpen,
  setIncomeFormOpen,
  onError,
}: IncomeSectionProps) {
  const [rows, setRows] = useState<IncomeRow[]>([]);
  const [loading, setLoading] = useState(false);
  const monthForApi = `${month}-01`;
  const onErrorRef = useRef(onError);
  onErrorRef.current = onError;

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await apiServices.getMonthlyIncomeByMonth(
        monthForApi,
        "user_1",
      );
      const apiData = res?.data ?? res;
      setRows(normalizeIncomeRows(apiData));
    } catch (error) {
      console.error("Income fetch error:", error);
      onErrorRef.current?.("Unable to fetch income records");
      setRows([]);
    } finally {
      setLoading(false);
    }
  }, [monthForApi]);

  useEffect(() => {
    fetchData();
  }, [fetchData, refreshKey]);

  const onCreate = async (payload: any) => {
    await apiServices.upsertMonthlyIncome({ ...payload, month: monthForApi });
    await fetchData();
  };

  const onUpdate = async (id: string, payload: any) => {
    await apiServices.updateMonthlyIncome(id, {
      ...payload,
      month: monthForApi,
    });
    await fetchData();
  };

  const onDelete = async (id: string) => {
    await apiServices.deleteMonthlyIncome(id);
    await fetchData();
  };

  return (
    <IncomeTable
      rows={rows}
      loading={loading}
      incomeFormOpen={incomeFormOpen}
      setIncomeFormOpen={setIncomeFormOpen}
      onCreate={onCreate}
      onUpdate={onUpdate}
      onDelete={onDelete}
    />
  );
}
