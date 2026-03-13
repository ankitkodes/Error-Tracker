"use client";

import React, { useEffect, useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import { useErrorAnalytics } from "@/lib/services/analytics/analytics.query";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

type Analytics = {
  date: string;
  error: number;
  resolvederror: number;
};

export default function ApexAreaChart() {
  const { isLoading, isError, data } = useErrorAnalytics();

  console.log("this is analytics details of the user:- ", data);

  const [isDark, setIsDark] = useState(false);

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

  const series = useMemo(() => {
    const analytics: Analytics[] = data?.analytics ?? [];

    if (!analytics.length) return [];

    const sorted = [...analytics].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    const errors = sorted.map((item) => ({
      x: new Date(item.date).getTime(),
      y: item.error,
    }));

    const resolved = sorted.map((item) => ({
      x: new Date(item.date).getTime(),
      y: item.resolvederror,
    }));

    return [
      {
        name: "Errors",
        data: errors,
      },
      {
        name: "Resolved",
        data: resolved,
      },
    ];
  }, [data]);

  const options: ApexOptions = useMemo(
    () => ({
      chart: {
        type: "area",
        stacked: false,
        background: "transparent",
        toolbar: { show: false },
      },

      theme: {
        mode: isDark ? "dark" : "light",
      },

      colors: ["#ef4444", "#22c55e"],

      stroke: {
        curve: "smooth",
        width: 2,
      },

      dataLabels: {
        enabled: false,
      },

      fill: {
        type: "gradient",
        gradient: {
          shade: isDark ? "dark" : "light",
          opacityFrom: 0.6,
          opacityTo: 0.1,
        },
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
    [isDark]
  );

  if (isLoading) return <p>Loading analytics...</p>;
  if (isError) return <p>Error loading analytics</p>;

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="area"
      height={450}
    />
  );
}