"use client"
import { SeverityStyle, StatusStyle } from "@/lib/projectstyles";
import { useGetTodayError } from "@/lib/services/errors/errors.query";
import { useProjectError } from "@/lib/services/projects/projects.query";
import { UseErrorId } from "@/lib/store";
import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";
import ErrorTable from "../project/project-errors";

export default function TodayError() {
  const { isLoading, isError, data } = useGetTodayError();
  console.log("got today errors", data?.todayError);

  if (data?.todayError.length === 0) {
    return (
      <>
        <div className="flex justify-between items-center">
          <div>No error occured Today</div>
        </div>
      </>
    )
  }
  return (
    <>
      <div className="my-4">
        <div className="font-semibold my-4">Total Today's Error({data?.todayError.length})</div>
        <ErrorTable data={data?.todayError} />
      </div>
    </>
  )
}