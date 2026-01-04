"use client";
import { cn } from "@/lib/utils";
import { Settings, EllipsisVertical } from "lucide-react";
import { EnvStyle, setactive } from "@/lib/projectstyles";
import ProjectCredential from "@/components/project/project-credential";
import ProjectHealth from "@/components/project/project-health";

export default function Page({}) {
  const errorlog = [
    {
      id: 1,
      errormessage: "TypeError:Cannot read property map of unified",
      severity: "Error",
      occurences: 678,
      lastseen: "2 minutes ago",
      environment: "production",
      status: "open",
    },
    {
      id: 2,
      errormessage: "ReferenceError:user is not defined",
      severity: "Error",
      occurences: 78,
      lastseen: "17 minutes ago",
      environment: "Staging",
      status: "open",
    },
    {
      id: 3,
      errormessage: "Network request timeout",
      severity: "Error",
      occurences: 67,
      lastseen: "1 hour ago",
      environment: "Development",
      status: "resolved",
    },
    {
      id: 4,
      errormessage: "TypeError:Cannot read property map of unified",
      severity: "Warning",
      occurences: 68,
      lastseen: "3 hour ago",
      environment: "production",
      status: "ignored",
    },
  ];

  return (
    <>
      <div>
        <div className="flex gap-2 justify-between align-baseline">
          <div className="flex gap-2">
            <div className="font-semibold text-xl">Blogging Website</div>
            <button className="px-2 py-[1px] text-xs font-medium rounded-lg border-gray-400 bg-gray-300 h-min-content">
              Nodejs
            </button>
            <button
              className={cn(
                "rounded-md inline-block text-xs font-medium text-yellow-200 px-2 py-[1px]",
                EnvStyle["Staging"]
              )}
            >
              Production
            </button>
            <button
              className={cn(
                "rounded-lg px-2 py-[1px] text-xs font-medium",
                setactive["Active"]
              )}
            >
              Active
            </button>
          </div>
          <div className="flex gap-2">
            <button className="text-sm gap-2 border-2 rounded-md px-2 py-1 cursor-pointer">
              {" "}
              <Settings className="inline-block mr-1" size={18} />
              Settings
            </button>
            <button className="cursor-pointer">
              <EllipsisVertical />{" "}
            </button>
          </div>
        </div>
        <ProjectCredential />
        {/* <ProjectHealth /> */}
        <div className="border-2 rounded-md p-2">
          <div className="font-semibold">Error in this Project</div>
          <table className="border-collapse border-b-2 w-full text-left mt-2">
            <tbody>
              <tr className=" text-sm font-semibold text-muted-foreground">
                <td className="border-b-2 py-3 px-4">Error Message</td>
                <td className="border-b-2 py-3 px-4">Severity</td>
                <td className="border-b-2 py-3 px-4">Occurrences</td>
                <td className="border-b-2 py-3 px-4">Last Seen</td>
                <td className="border-b-2 py-3 px-4">Environment</td>
                <td className="border-b-2 py-3 px-4">Statue</td>
              </tr>

              {errorlog.map((items: any) => (
                <>
                  <tr className="text-sm">
                    <td className="border-b-2  py-3 px-4">
                      {items.errormessage}
                    </td>
                    <td className="border-b-2 py-3 px-4">{items.severity} </td>
                    <td className="border-b-2 py-3 px-4">
                      {" "}
                      {items.occurences}{" "}
                    </td>
                    <td className="border-b-2 py-3 px-4">{items.lastseen} </td>
                    <td className="border-b-2 py-3 px-4">
                      {items.environment}{" "}
                    </td>
                    <td className="border-b-2 py-3 px-4">{items.status} </td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
