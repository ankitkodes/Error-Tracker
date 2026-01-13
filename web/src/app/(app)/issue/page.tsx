import ErrorCard from "@/components/error-card";
import { ErrorInterface } from "@/components/error-card";
import { Search } from "lucide-react";
export default function Page() {
  const errorLogs = [
    {
      key: 1,
      errormessage:
        "TypeError: Cannot read properties of undefined (reading 'map')",
      severity: "Error",
      status: "Bug",
      environment: "production",
      projectName: "Error Tracker Dashboard",
      occurrences: 128,
      lastseen: "2026-01-12T18:42:11Z",
    },
    {
      key: 2,
      errormessage: "MongoNetworkError: failed to connect to server",
      severity: "Error",
      status: "InProcess",
      environment: "production",
      projectName: "Auth Service",
      occurrences: 54,
      lastseen: "2026-01-12T21:10:45Z",
    },
    {
      key: 3,
      errormessage: "ReferenceError: window is not defined",
      severity: "Warning",
      status: "Fixed",
      environment: "staging",
      projectName: "Next.js Web App",
      occurrences: 32,
      lastseen: "2026-01-11T09:15:30Z",
    },
    {
      key: 4,
      errormessage: "JWTExpiredError: jwt expired",
      severity: "Warning",
      status: "Bug",
      environment: "production",
      projectName: "User API",
      occurrences: 76,
      lastseen: "2026-01-13T01:05:02Z",
    },
    {
      key: 4,
      errormessage: "UnhandledPromiseRejection: Timeout exceeded",
      severity: "Error",
      status: "InProcess",
      environment: "production",
      projectName: "Payment Service",
      occurrences: 19,
      lastseen: "2026-01-12T23:58:44Z",
    },
    {
      key: 5,
      errormessage: "PrismaClientKnownRequestError: Unique constraint failed",
      severity: "Warning",
      status: "Fixed",
      environment: "development",
      projectName: "Admin Panel",
      occurrences: 11,
      lastseen: "2026-01-10T14:22:09Z",
    },
  ];

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
          <div className=" relative w-full">
            <Search size={20} className="absolute left-2 top-2 inset-y-0" />
            <input
              type="text"
              placeholder="Search errors..."
              className="w-full border rounded-md p-1 pl-8"
            />
          </div>
          <div className="my-2 flex gap-3">
            <select
              className="h-10 min-w-[160px] rounded-lg border border-gray-300 bg-white px-3 pr-8 text-sm
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
          <div>
            {errorLogs.map((items: ErrorInterface) => (
              <ErrorCard
                key={items.key}
                errormessage={items.errormessage}
                severity={items.severity}
                status={items.status}
                environment={items.environment}
                projectName={items.projectName}
                occurrences={items.occurrences}
                lastseen="12 minutes ago"
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
