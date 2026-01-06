"use client";
import { cn } from "@/lib/utils";
import { Settings, EllipsisVertical } from "lucide-react";
import { EnvStyle, setactive, StatusStyle } from "@/lib/projectstyles";
import ProjectCredential from "@/components/project/project-credential";
import ProjectHealth from "@/components/project/project-health";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { SeverityStyle } from "@/lib/projectstyles";

export default function Page({}) {
  const [project, getProject] = useState({
    name: "",
    id: "",
    apikey: "",
    language: "",
    environment: "",
  });
  const [error, getErrorlog] = useState([]);
  const projectid = useParams().ProjectDetails;

  useEffect(() => {
    async function getProjectdetails() {
      const response = await axios({
        method: "GET",
        url: `/api/projects/${projectid}`,
      });
      const data = response.data.project;
      getProject(data);
    }

    getProjectdetails();
  }, []);

  useEffect(() => {
    async function Geterror() {
      console.log("function started");
      const response = await axios({
        method: "GET",
        url: `/api/errorlog/${projectid}`,
      });
      const data = response.data;
      getErrorlog(data.errorlog);
      console.log("collection of errror", data.errorlog);
      console.log("error message", data.errorlog[0].message);
    }

    Geterror();
  }, []);

  return (
    <>
      <div>
        <div className="flex gap-2 justify-between align-baseline">
          <div className="flex gap-2">
            <div className="font-semibold text-xl">{project.name} </div>
            <button className="px-2 py-[1px] text-xs font-medium rounded-lg border-gray-400 bg-gray-300 h-min-content">
              {project.language}
            </button>
            <button
              className={cn(
                "rounded-md inline-block text-xs font-medium text-yellow-200 px-2 py-[1px]",
                EnvStyle["Staging"]
              )}
            >
              {project.environment}
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
        <ProjectCredential project_Id={project.id} APIkey={project.apikey} />
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
                <td className="border-b-2 py-3 px-4">Statue</td>
              </tr>

              {error.map((items: any) => (
                <>
                  <tr className="text-sm">
                    <td className="border-b-2  py-3 px-4">{items.message}</td>
                    <td className="border-b-2 py-3 px-4">
                      <button
                        className={cn(
                          "rounded-lg px-2 py-1 text-xs font-medium text-center",
                          SeverityStyle["Warning"]
                        )}
                      >
                        {items.severity}
                      </button>
                    </td>
                    <td className="border-b-2 py-3 px-4">
                      {" "}
                      {items.errorCount}{" "}
                    </td>
                    <td className="border-b-2 py-3 px-4">12 minutes ago </td>
                    <td className="border-b-2 py-3 px-4">
                      <button
                        className={cn(
                          "rounded-lg px-2 py-1 text-xs font-medium text-center cursor-pointer",
                          StatusStyle["Fixed"]
                        )}
                      >
                        {items.status}
                      </button>
                    </td>
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
function UseEffect(arg0: () => void, arg1: never[]) {
  throw new Error("Function not implemented.");
}
