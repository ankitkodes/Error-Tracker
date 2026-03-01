"use client";

import React, { useEffect, useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function ApexPieChart() {
  const [isDark, setIsDark] = useState(false);

  // Detect Tailwind dark mode from <html class="dark">
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

  const series = useMemo(() => [44, 55, 13, 43, 22], []);

  const options: ApexOptions = useMemo(
    () => ({
      chart: {
        type: "pie",
        background: "transparent",
      },

      theme: {
        mode: isDark ? "dark" : "light",
      },

      labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],

      legend: {
        position: "right",
      },

      stroke: {
        colors: [isDark ? "#0f172a" : "#ffffff"], // border between slices
      },

      dataLabels: {
        style: {
          colors: [isDark ? "#ffffff" : "#000000"],
        },
      },

      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 250,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    }),
    [isDark],
  );

  return (
    <div className="w-full flex justify-center">
      <ReactApexChart
        options={options}
        series={series}
        type="pie"
        width={380}
      />
    </div>
  );
}
