"use client"
import { useGetTodayError } from "@/lib/services/errors/errors.query";
import ErrorTable from "../project/project-errors";
import ErrorDrawer from "../Error-Drawer";
import { Skeleton } from "../ui/skeleton";

export default function TodayError() {
  const { isLoading, isError, data } = useGetTodayError();
  if (isLoading) {
    return (
      <div className="my-8 space-y-4">
        <Skeleton className="h-7 w-48 mb-6" />
        <div className="border border-black/[0.08] dark:border-white/[0.08] rounded-md bg-white dark:bg-[#18171D] overflow-hidden">
          <div className="p-4 space-y-4">
             {[...Array(4)].map((_, i) => (
                <div key={i} className="flex gap-4 items-center">
                   <Skeleton className="h-5 flex-1" />
                   <Skeleton className="h-5 w-24" />
                   <Skeleton className="h-8 w-20 rounded-lg" />
                </div>
             ))}
          </div>
        </div>
      </div>
    );
  }
  if (isError) {
    return <p className="text-red-400 py-6 text-center">Failed to load today&apos;s errors.</p>
  }
  if (data?.todayError.length === 0) {
    return (
      <>
        <div className="my-4 flex items-center justify-center">
          <div>No error occured Today</div>
        </div>
      </>
    )
  }
  return (
    <>
      <div className="my-4">
        <div className="font-semibold my-4">Total Today Error({data?.todayError.length})</div>
        <ErrorTable data={data?.todayError} />
        <ErrorDrawer />
      </div>
    </>
  )
}