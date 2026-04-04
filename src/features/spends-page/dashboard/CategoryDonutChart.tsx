"use client";

import { useEffect, useMemo, useRef } from "react";
import * as echarts from "echarts";
import { Paper, Typography } from "@mui/material";
import styles from "../spends.module.css";

type CategoryItem = {
  name: string;
  value: number;
};

type CategoryDonutChartProps = {
  title: string;
  data: CategoryItem[];
};

export default function CategoryDonutChart({
  title,
  data,
}: CategoryDonutChartProps) {
  const chartRef = useRef<HTMLDivElement | null>(null);

  const option = useMemo(
    () => ({
      tooltip: {
        trigger: "item",
        formatter: "{b}<br/>{c} ({d}%)",
      },
      legend: {
        bottom: 0,
        icon: "circle",
        textStyle: { color: "#475569" },
      },
      series: [
        {
          name: title,
          type: "pie",
          radius: ["45%", "70%"],
          center: ["50%", "44%"],
          avoidLabelOverlap: false,
          label: { show: false },
          labelLine: { show: false },
          data: data.length ? data : [{ name: "No Data", value: 1 }],
          emphasis: {
            scale: true,
            scaleSize: 8,
          },
        },
      ],
    }),
    [data, title],
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
          <Typography className={styles.cardTitle}>{title}</Typography>
          <Typography className={styles.cardSubTitle}>
            Category-wise distribution
          </Typography>
        </div>
      </div>
      <div ref={chartRef} style={{ width: "100%", height: 320 }} />
    </Paper>
  );
}
