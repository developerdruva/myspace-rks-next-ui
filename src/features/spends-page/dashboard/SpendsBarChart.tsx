"use client";

import { useEffect, useMemo, useRef } from "react";
import * as echarts from "echarts";
import { Paper, Typography } from "@mui/material";
import styles from "../spends.module.css";

type SpendsBarChartProps = {
  income: number;
  estimated: number;
  actual: number;
  pending: number;
};

export default function SpendsBarChart({
  income,
  estimated,
  actual,
  pending,
}: SpendsBarChartProps) {
  const chartRef = useRef<HTMLDivElement | null>(null);

  const option = useMemo(
    () => ({
      tooltip: { trigger: "axis" },
      grid: { top: 25, left: 45, right: 20, bottom: 25 },
      xAxis: {
        type: "category",
        data: ["Income", "Estimated", "Actual", "Pending"],
        axisLabel: { color: "#475569" },
      },
      yAxis: {
        type: "value",
        axisLabel: { color: "#475569" },
        splitLine: { lineStyle: { color: "rgba(148, 163, 184, 0.25)" } },
      },
      series: [
        {
          type: "bar",
          barWidth: 42,
          data: [
            { value: income, itemStyle: { color: "#2563eb" } },
            { value: estimated, itemStyle: { color: "#f59e0b" } },
            { value: actual, itemStyle: { color: "#ef4444" } },
            { value: pending, itemStyle: { color: "#8b5cf6" } },
          ],
          emphasis: { focus: "series" },
          label: { show: true, position: "top", color: "#334155" },
        },
      ],
    }),
    [income, estimated, actual, pending],
  );

  useEffect(() => {
    if (!chartRef.current) return;

    const chart = echarts.init(chartRef.current, null, {
      renderer: "canvas",
      useDirtyRect: true,
    });

    chart.setOption(option);
    const onResize = () => chart.resize();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      chart.dispose();
    };
  }, [option]);

  return (
    <Paper className={styles.card}>
      <div className={styles.cardHeader}>
        <div>
          <Typography className={styles.cardTitle}>Monthly Snapshot</Typography>
          <Typography className={styles.cardSubTitle}>
            Income vs estimated vs actual vs pending
          </Typography>
        </div>
      </div>
      <div ref={chartRef} style={{ width: "100%", height: 320 }} />
    </Paper>
  );
}
