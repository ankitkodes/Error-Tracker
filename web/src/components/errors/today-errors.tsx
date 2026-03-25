"use client"
import { useGetTodayError } from "@/lib/services/errors/errors.query";
import ErrorTable from "../project/project-errors";
import ErrorDrawer from "../Error-Drawer";

export default function TodayError() {
  const { isLoading, isError, data } = useGetTodayError();
  if (isLoading) {
    return <p>loading...</p>
  }
  if (isError) {
    return <p> some invalid error has occured</p>
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