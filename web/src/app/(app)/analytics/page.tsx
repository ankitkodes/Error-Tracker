"use client"
import ApexAreaChart from "@/components/Analytics/ApexAreaChart";
import ErrorAnalytics from "@/components/Analytics/error-analytics";
import TodayError from "@/components/errors/today-errors";


export default function page() {
  return (
    <>
      <div className="">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4">
          <div>
            <h1 className="text-2xl font-bold">Analytics</h1>
            <p className="text-sm text-muted-foreground">
              Monitor errors and track system health
            </p>
          </div>
          <div className="flex gap-2">
            <button className="text-xs font-medium bg-white/[0.04] border border-black/[0.08] dark:border-white/[0.08] px-3 py-1.5 rounded-lg cursor-pointer hover:bg-white/[0.08] transition-colors text-foreground">
              Last 7 days
            </button>
            <button className="text-xs font-medium bg-white/[0.04] border border-black/[0.08] dark:border-white/[0.08] px-3 py-1.5 rounded-lg cursor-pointer hover:bg-white/[0.08] transition-colors text-foreground">
              Last 30 days
            </button>
          </div>
        </div>
        <div>
          <ErrorAnalytics />
        </div>
        <div className="my-4"></div>

        <div className="border border-black/[0.08] dark:border-white/[0.08] p-6 bg-white dark:bg-[#18171D]">
          <ApexAreaChart />
        </div>

        {/* <div className="border flex justify-center my-4">
            <ApexPieChart />{" "}
          </div> */}
        <div>
          <TodayError />
        </div>

      </div>
    </>
  );
}
