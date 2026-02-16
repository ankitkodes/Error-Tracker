"use client";

import React, { useEffect, useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

function generateDayWiseTimeSeries(
  baseval: number,
  count: number,
  yrange: { min: number; max: number },
) {
  const series: [number, number][] = [];
  let x = baseval;

  for (let i = 0; i < count; i++) {
    series.push([
      x,
      Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min,
    ]);
    x += 86400000;
  }

  return series;
}

export default function ApexAreaChart() {
  const [isDark, setIsDark] = useState(false);

  // Detect Tailwind dark mode
  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const series = useMemo(
    () => [
      {
        name: "Resolved",
        data: generateDayWiseTimeSeries(
          new Date("11 Feb 2024 GMT").getTime(),
          20,
          { min: 20, max: 60 },
        ),
      },
      {
        name: "Errors",
        data: generateDayWiseTimeSeries(
          new Date("11 Feb 2024 GMT").getTime(),
          20,
          { min: 5, max: 25 },
        ),
      },
    ],
    [],
  );

  const options: ApexOptions = useMemo(
    () => ({
      chart: {
        type: "area",
        stacked: true,
        background: "transparent",
        toolbar: { show: false },
      },

      theme: {
        mode: isDark ? "dark" : "light",
      },

      colors: ["#22c55e", "#ef4444"],

      dataLabels: {
        enabled: false,
      },

      stroke: {
        curve: "smooth",
        width: 2,
      },

      fill: {
        type: "gradient",
        gradient: {
          shade: isDark ? "dark" : "light",
          type: "vertical",
          opacityFrom: 0.6,
          opacityTo: 0.1,
        },
      },

      legend: {
        position: "top",
        horizontalAlign: "left",
      },

      xaxis: {
        type: "datetime",
      },

      grid: {
        borderColor: isDark ? "#334155" : "#e5e7eb",
      },

      tooltip: {
        theme: isDark ? "dark" : "light",
      },
    }),
    [isDark],
  );

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="area"
      height={350}
    />
  );
}
