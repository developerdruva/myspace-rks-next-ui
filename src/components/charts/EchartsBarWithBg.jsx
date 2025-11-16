// components/EchartsBarWithBg.jsx (or .tsx if using TypeScript)

"use client";
import { useEffect, useRef } from "react";
import * as echarts from "echarts";

const EchartsBarWithBg = ({ xAxisValues, actualValues }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chartDom = chartRef.current;
    const myChart = echarts.init(chartDom, null, {
      renderer: "canvas",
      useDirtyRect: false,
    });

    const option = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
        formatter: function (params) {
          const item = params[0];
          const index = item.dataIndex;
          //   const name = customNames[index] || item.name;
          const value = item.value;
          return `<b>${item?.name}: ${value}%</b>`;
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "10%", // give space for dataZoom
        containLabel: true,
      },
      dataZoom: [
        {
          type: "slider",
          show: true,
          xAxisIndex: 0,
          start: 0,
          end: 100,
        },
      ],
      xAxis: [
        {
          type: "category",
          data: xAxisValues,
          axisTick: {
            alignWithLabel: true,
          },
          axisLabel: {
            interval: 0,
            rotate: 20,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "User Actions",
          type: "bar",
          barWidth: "60%",
          data: actualValues,
        },
      ],
    };

    myChart.setOption(option);

    const handleResize = () => myChart.resize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      myChart.dispose();
    };
  }, []);

  return <div ref={chartRef} style={{ width: "100%", height: "400px" }} />;
};

export default EchartsBarWithBg;
