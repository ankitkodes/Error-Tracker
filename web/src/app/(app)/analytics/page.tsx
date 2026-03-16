"use client"
import ApexAreaChart from "@/components/Analytics/ApexAreaChart";
import ErrorAnalytics from "@/components/Analytics/error-analytics";
import TodayError from "@/components/errors/today-errors";


export default function page() {
  return (
    <>
      <div className="">
        <div className="flex relative">
          <div className="inline-block">
            <h1 className="text-2xl font-bold">Analytics</h1>
            <p className="text-sm text-muted-foreground">
              Monitor errors and track system health
            </p>
          </div>
          <div className=" absolute right-2 flex gap-2">
            <button className="text-sm text-white bg-black  border px-2 py-1 rounded-md cursor-pointer  flex items-center gap-1">
              Last 7 days
            </button>
            <button className="text-sm text-white bg-black  border px-4 py-2 rounded-md cursor-pointer  flex items-center gap-1">
              Last 30 days
            </button>
          </div>
        </div>
        <div>
          <ErrorAnalytics />
        </div>
        <div className="my-4"></div>

        <div className="border p-6">
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
