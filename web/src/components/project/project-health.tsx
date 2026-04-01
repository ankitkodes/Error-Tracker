import { useProjectReport } from "@/lib/services/projects/projects.query";
import { AlertCircle, CheckCircle2, Activity, ShieldCheck } from "lucide-react";

export default function ProjectHealth({ projectid }: { projectid: string }) {
  const projecthealthreport = useProjectReport(projectid);
  const healthData = projecthealthreport.data?.projecthealth;

  return (
    <div className="w-full my-4">
      <div className="flex flex-col gap-2">
        <div className="font-semibold">Project Health</div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

          {/* Total Error */}
          <div className="rounded-xl border bg-transparent text-black dark:text-white shadow-sm">
            <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="tracking-tight text-base font-medium">Total Errors</h3>
              <AlertCircle className="h-5 w-5 text-red-500" />
            </div>
            <div className="p-6 pt-0">
              <div className="text-xl font-bold">{healthData?.totalerrors ?? 0}</div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Errors recorded so far
              </p>
            </div>
          </div>

          {/* Resolved Error */}
          <div className="rounded-xl border bg-transparent text-black dark:text-white shadow-sm">
            <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="tracking-tight text-base font-medium">Resolved Errors</h3>
              <CheckCircle2 className="h-5 w-5 text-emerald-500" />
            </div>
            <div className="p-6 pt-0">
              <div className="text-xl font-bold">{healthData?.resolvederror ?? 0}</div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Successfully resolved
              </p>
            </div>
          </div>

          {/* Uptime */}
          <div className="rounded-xl border bg-transparent text-black dark:text-white shadow-sm">
            <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="tracking-tight text-base font-medium">Uptime</h3>
              <Activity className="h-5 w-5 text-blue-500" />
            </div>
            <div className="p-6 pt-0">
              <div className="text-xl font-bold">{Math.round(Number(healthData?.uptimepercentage ?? 0))}%</div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                System uptime
              </p>
            </div>
          </div>

          {/* Status */}
          <div className="rounded-xl border bg-transparent text-black dark:text-white shadow-sm">
            <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="tracking-tight text-base font-medium">Status</h3>
              <ShieldCheck className={`h-5 w-5 ${(healthData?.status === "Active" || healthData?.status === "Healthy" || healthData?.status === "healthy") ? "text-emerald-500" : "text-yellow-500"}`} />
            </div>
            <div className="p-6 pt-0">
              <div className="text-xl font-bold capitalize">{healthData?.status || "Unknown"}</div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Current project state
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
