"use client";
import ErrorCard from "@/components/error-card";
import axios from "axios";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

interface AllError {
  id: number;
  message: string;
  severity: string;
  status: string;
  environment: string;
  projectName: string;
  occurences: number;
  project: {
    environment: string;
    name: string;
  };
  errorCount: number;
}
export default function Page() {
  const [allError, GetallError] = useState([]);

  useEffect(() => {
    async function fetallError() {
      const response = await axios({
        method: "GET",
        url: "/api/bugs",
      });
      const data = response.data;
      GetallError(data.bulkError);
    }

    fetallError();
  }, []);

  return (
    <>
      <div>
        <div className="pb-4">
          <h1 className="text-2xl font-bold">Issues</h1>
          <p className="text-sm text-gray-500">
            Track and manage all errors across your applications.
          </p>
        </div>
        <div className="border py-8 px-4 rounded-md">
          <div className=" relative w-full pb-2">
            <Search size={20} className="absolute left-2 top-2 inset-y-0" />
            <input
              type="text"
              placeholder="Search errors..."
              className="w-full border rounded-md p-1 pl-8"
            />
          </div>
          <div className="my-2 flex gap-4 flex-col md:flex-row">
            <select
              className="h-10 min-w-[160px] rounded-lg border border-gray-300 bg-white px-3 pr-8 text-sm text-gray-900
               focus:outline-none focus:ring-2 focus:ring-blue-500
               hover:border-gray-400"
            >
              <option className="bg-white text-black">All Severities</option>
              <option className="bg-white text-black">Critical</option>
              <option className="bg-white text-black">Error</option>
              <option className="bg-white text-black">Warning</option>
              <option className="bg-white text-black">Info</option>
            </select>
            <select
              className="h-10 min-w-[140px] rounded-lg border border-gray-300 bg-white px-3 pr-8 text-sm text-gray-900
               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
               hover:border-gray-400 transition"
            >
              <option>All Status</option>
              <option>Bug</option>
              <option>InProcess</option>
              <option>Fixed</option>
            </select>
            <select
              className="h-10 min-w-[200px] rounded-lg border border-gray-300 bg-white px-3 pr-8 text-sm text-gray-900
               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
               hover:border-gray-400 transition"
            >
              <option>All Projects</option>
              <option>Error Tracker Dashboard</option>
              <option>Auth Service</option>
              <option>User API</option>
              <option>Payment Service</option>
              <option>Admin Panel</option>
            </select>
          </div>
        </div>
        <div className="p-4 border rounded-md my-4">
          <div className="text-lg font-medium">All Issues (8)</div>
          <div className="">
            {allError ? (
              allError.map((items: AllError) => (
                <ErrorCard
                  key={items.id}
                  message={items.message}
                  severity={items.severity}
                  status={items.status}
                  environment={items.project.environment}
                  projectName={items.project.name}
                  occurrences={items.errorCount}
                  lastseen="12 minutes ago"
                />
              ))
            ) : (
              <div>Loading...</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
