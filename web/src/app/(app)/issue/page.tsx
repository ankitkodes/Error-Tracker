"use client";
import ErrorCard from "@/components/error-card";
import debounce from 'lodash.debounce';
import { useGetallError, useGetSearchResult, } from "@/lib/services/errors/errors.query";
import { Search } from "lucide-react";
import { useState } from "react";
import { UseErrorId } from "@/lib/store";
import ErrorDrawer from "@/components/Error-Drawer";

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
        <div className="border rounded-md p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className=" relative w-full pb-2 col-span-2">
            <Search size={18} className="absolute left-2 top-2 inset-y-0" />
            <input
              type="text"
              placeholder="Search errors..."
              className="w-full border rounded-md p-1 pl-8"
              onChange={(e) => (debouncedSearch(e.target.value))}
            />
          </div>
          <div className="flex flex-col md:flex-row  gap-2">
            <div>
              <select
                className="h-8 w-full rounded-lg border border-gray-300 bg-white px-3 pr-8 text-sm text-gray-900
               focus:outline-none focus:ring-2 focus:ring-blue-500
               hover:border-gray-400"
                onChange={(e) => setSeverity(e.target.value)}
              >
                <option value={""}>All Severities</option>
                <option value={"Error"} >Error</option>
                <option value={"Warning"}>Warning</option>
              </select>
            </div>
            <div>
              <select
                className="h-8 w-full rounded-lg border border-gray-300 bg-white px-3 pr-8 text-sm text-gray-900
               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
               hover:border-gray-400 transition"

                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">All Status</option>
                <option value={"Bug"}>Bug</option>
                <option value={"InProcess"}>InProcess</option>
                <option value={"Resolved"}>Resolved</option>
              </select>
            </div>
            <div>
              <select
                className="h-8 w-full rounded-lg border border-gray-300 bg-white px-3 pr-8 text-sm text-gray-900
               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
               hover:border-gray-400 transition"
                onChange={(e) => setErrortype(e.target.value)}
              >
                <option value={""}>All ErrorType</option>
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
        <div className="px-4 border rounded-md my-4">
          <div className="text-lg font-medium">All Issues ({searchquery && searchresult.data ? searchresult.data?.data.length : data?.Error.length})</div>
          <div className="bg-scroll">
            {isLoading ? <div> loading data...</div> : <>{searchquery && searchresult.data ? (
              <>
                {searchresult.isLoading && <p>searching...</p>}

                {(searchresult.data?.data ?? []).map((items: Error) => (
                  <div key={items.id} onClick={() => {
                    setErrorId(items.id);
                    setProjectId(items.projectId)
                    setErrorDrawer(true);
                  }}>


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

                ))}
              </>) : (data?.Error ?? []).map((items: Error) => (
                <div key={items.id} onClick={() => {
                  setErrorId(items.id);
                  setProjectId(items.projectId)
                  setErrorDrawer(true);
                }}>
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
              )
              )
            }</>}

          </div>
        </div>
      </div >
      <ErrorDrawer />
    </>
  );
}
