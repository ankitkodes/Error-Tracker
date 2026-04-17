"use client";

import React, { useEffect, useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import { useErrorAnalytics } from "@/lib/services/analytics/analytics.query";
import { Skeleton } from "@/components/ui/skeleton";

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

  if (isLoading) {
    return (
      <div className="w-full space-y-4">
        <div className="flex justify-between items-center mb-4">
           <Skeleton className="h-6 w-32" />
           <Skeleton className="h-6 w-24" />
        </div>
        <Skeleton className="w-full h-[450px] rounded-xl" />
      </div>
    );
  }

  if (isError) return <p className="text-red-500 py-10 text-center">Error loading analytics dashboard.</p>;

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="area"
      height={450}
    />
  );
}