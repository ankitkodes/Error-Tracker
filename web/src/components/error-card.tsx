import { EnvStyle, SeverityStyle, StatusStyle } from "@/lib/projectstyles";
import { cn } from "@/lib/utils";
import Link from "next/link";

export interface ErrorInterface {
  id?: number;
  message: string;
  severity: string;
  status: string;
  environment: string;
  projectName: string;
  occurrences: number;
  lastseen: string;
}
export default function ErrorCard({
  message,
  severity,
  status,
  environment,
  projectName,
  occurrences,
  lastseen,
}: ErrorInterface) {
  return (
    <>
      <Link href="#" className="">
        <div className="w-full p-4 border border-black/[0.08] dark:border-white/[0.08] rounded-md my-2 flex flex-col gap-2 bg-white dark:bg-[#18171D] hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors">
          <div className="flex flex-wrap gap-2 items-center">
            <button
              className={cn(
                "rounded-md px-2 py-1 text-xs font-medium text-center",
                SeverityStyle[severity],
              )}
            >
              {severity}{" "}
            </button>
            <button
              className={cn(
                "rounded-md px-2 py-1 text-xs font-medium text-center cursor-pointer",
                StatusStyle[status],
              )}
            >
              {status}{" "}
            </button>
            <button
              className={cn(
                "rounded-md inline-block text-xs font-medium text-yellow-200 px-2 py-[1px]",
                EnvStyle[environment],
              )}
            >
              {environment}{" "}
            </button>
            <div className="text-sm text-gray-400 font-normal">
              {projectName}{" "}
            </div>
          </div>
          <div className="font-medium text-md">{message}</div>
          <div className="flex gap-4 text-sm text-gray-500">
            <div> {occurrences} occurrences</div>
            <div>Last seen {lastseen} </div>
          </div>
        </div>
      </Link>
    </>
  );
}
