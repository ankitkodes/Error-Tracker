"use client";
import ErrorCard from "@/components/error-card";
import debounce from 'lodash.debounce';
import { useGetallError, useGetSearchResult, } from "@/lib/services/errors/errors.query";
import { Search } from "lucide-react";
import { useState } from "react";
import { UseErrorId } from "@/lib/store";
import ErrorDrawer from "@/components/Error-Drawer";
import { Skeleton } from "@/components/ui/skeleton";

interface Error {
  id: number;
  message: string;
  severity: string;
  status: string;
  environment: string;
  projectName: string;
  projectId: string;
  occurrence: number;
  project: {
    environment: string;
    name: string;
  };
  errorCount: number;
}
export default function Page() {
  const [searchquery, GetSearchQuery] = useState("");
  const [severity, setSeverity] = useState("");
  const [status, setStatus] = useState("")
  const [errortype, setErrortype] = useState("");
  const { isLoading, isError, data } = useGetallError(severity, status, errortype);
  const debouncedSearch = debounce((value: string) => GetSearchQuery(value), 100);
  const searchresult = useGetSearchResult(searchquery);
  const setErrorDrawer = UseErrorId((state) => state.setErrorDrawer);
  const setErrorId = UseErrorId((state) => state.setErrorId);
  const setProjectId = UseErrorId((state) => state.setProjectId);
  console.log("error values in issues project:- ", isError)

  if (isError) {
    return <div>some invlid error has occured</div>
  }
  return (
    <>
      <div>
        <div className="pb-4">
          <h1 className="text-2xl font-bold">Issues</h1>
          <p className="text-sm text-gray-500">
            Track and manage all errors across your applications.
          </p>
        </div>
        <div className="border border-black/[0.08] dark:border-white/[0.08] rounded-md p-4 flex flex-col xl:flex-row gap-4 bg-white dark:bg-[#18171D]">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search errors..."
              className="w-full border rounded-md py-1.5 pl-9 pr-4 text-sm focus:outline-primary dark:bg-background"
              onChange={(e) => (debouncedSearch(e.target.value))}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <div className="flex-1 min-w-[140px]">
              <select
                className="h-9 w-full rounded-lg border border-black/[0.08] dark:border-white/[0.08] bg-white dark:bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 hover:border-primary/40 transition-colors cursor-pointer"
                onChange={(e) => setSeverity(e.target.value)}
              >
                <option value={""}>All Severities</option>
                <option value={"Error"}>Error</option>
                <option value={"Warning"}>Warning</option>
              </select>
            </div>
            <div className="flex-1 min-w-[140px]">
              <select
                className="h-9 w-full rounded-lg border border-black/[0.08] dark:border-white/[0.08] bg-white dark:bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 hover:border-primary/40 transition-colors cursor-pointer"
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">All Status</option>
                <option value={"Bug"}>Bug</option>
                <option value={"InProcess"}>InProcess</option>
                <option value={"Resolved"}>Resolved</option>
              </select>
            </div>
            <div className="flex-1 min-w-[150px]">
              <select
                className="h-9 w-full rounded-lg border border-black/[0.08] dark:border-white/[0.08] bg-white dark:bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 hover:border-primary/40 transition-colors cursor-pointer"
                onChange={(e) => setErrortype(e.target.value)}
              >
                <option value={""}>All ErrorTypes</option>
                <option value={"ReferenceError"}>ReferenceError</option>
                <option value={"TypeError"}>TypeError</option>
                <option value={"SyntaxError"}>SyntaxError</option>
                <option value={"RangeError"}>RangeError</option>
                <option value={"EvalError"}>EvalError</option>
                <option value={"URIError"}>URIError</option>
                <option value={"AggregateError"}>AggregateError</option>
                <option value={"InternalError"}>InternalError</option>
              </select>
            </div>
          </div>
        </div>
        <div className="px-4 border border-black/[0.08] dark:border-white/[0.08] rounded-md my-4 bg-white dark:bg-[#18171D]">
          <div className="text-lg font-medium py-2">All Issues ({searchquery && searchresult.data ? searchresult.data?.data.length : data?.Error.length || 0})</div>
          <div className="bg-scroll space-y-2">
            {isLoading ? (
              <div className="space-y-3 pb-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="p-4 border border-black/[0.05] dark:border-white/[0.05] rounded-xl bg-white dark:bg-[#1e1d24]">
                    <div className="flex items-start justify-between mb-4">
                      <div className="space-y-2 grow">
                        <Skeleton className="h-5 w-3/4" />
                        <div className="flex gap-2">
                           <Skeleton className="h-4 w-16" />
                           <Skeleton className="h-4 w-16" />
                        </div>
                      </div>
                      <Skeleton className="h-6 w-20 rounded-lg" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-4">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-24" />
                      </div>
                      <Skeleton className="h-4 w-20" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <>{searchquery && searchresult.data ? (
                <>
                  {searchresult.isLoading ? (
                     <div className="space-y-3 pb-4">
                        {[...Array(3)].map((_, i) => (
                          <Skeleton key={i} className="h-24 w-full rounded-xl" />
                        ))}
                     </div>
                  ) : (
                    (searchresult.data?.data ?? []).map((items: Error) => (
                      <div key={items.id} onClick={() => {
                        setErrorId(items.id);
                        setProjectId(items.projectId)
                        setErrorDrawer(true);
                      }} className="cursor-pointer">
                        <ErrorCard
                          key={items.id}
                          message={items.message}
                          severity={items.severity}
                          status={items.status}
                          environment={items.project.environment}
                          projectName={items.project.name}
                          occurrences={items.occurrence}
                          lastseen="12 minutes ago"
                        />
                      </div>
                    ))
                  )}
                </>) : (data?.Error ?? []).map((items: Error) => (
                  <div key={items.id} onClick={() => {
                    setErrorId(items.id);
                    setProjectId(items.projectId)
                    setErrorDrawer(true);
                  }} className="cursor-pointer">
                    <ErrorCard
                      key={items.id}
                      message={items.message}
                      severity={items.severity}
                      status={items.status}
                      environment={items.project.environment}
                      projectName={items.project.name}
                      occurrences={items.occurrence}
                      lastseen="12 minutes ago"
                    />
                  </div>
                ))
              }</>
            )}
          </div>
        </div>
      </div >
      <ErrorDrawer />
    </>
  );
}
