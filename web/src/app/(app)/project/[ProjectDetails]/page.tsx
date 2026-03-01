"use client";
import { cn } from "@/lib/utils";
import { Settings, EllipsisVertical } from "lucide-react";
import { EnvStyle, setactive, StatusStyle } from "@/lib/projectstyles";
import ProjectCredential from "@/components/project/project-credential";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { SeverityStyle } from "@/lib/projectstyles";
import { RotatingLines } from "react-loader-spinner";
import { UseErrorId } from "@/lib/store";
import ErrorDrawer from "@/components/Error-Drawer";
interface ErrorlogInterface {
  error: string;
  occurrence: number;
  id: number;
  message: string;
  projectId: string;
  severity: string;
  status: string;
}
export default function Page() {
  const setErrorId = UseErrorId((state) => state.setErrorId);
  const setProjectId = UseErrorId((state) => state.setProjectId);
  const setErrorDrawer = UseErrorId((state) => state.setErrorDrawer);
  const [loading, setloading] = useState(true);
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
      setloading(false);
    }

    getProjectdetails();
  }, [projectid]);

  useEffect(() => {
    async function Geterror() {
      const response = await axios({
        method: "GET",
        url: `/api/projects/${projectid}/errors`,
      });
      const data = response.data;
      getErrorlog(data.errors);
    }

    Geterror();
  }, [projectid]);

  if (loading) {
    return (
      <>
        <div className="h-screen flex items-center justify-center">
          <RotatingLines
            visible={true}
            height="96"
            width="96"
            color="grey"
            strokeWidth="5"
            animationDuration="0.75"
            ariaLabel="rotating-lines-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      </>
    );
  }

  return (
    <>
      <div>
        <div className="flex gap-2 justify-between align-baseline">
          <div className="flex gap-2">
            <div className="font-semibold text-xl">{project.name} </div>
            <button className="px-2 py-[1px] text-xs font-medium rounded-lg dark:text-black border-gray-400 bg-gray-300 h-min-content">
              {project.language}
            </button>
            <button
              className={cn(
                "rounded-md inline-block text-xs font-medium text-yellow-200 px-2 py-[1px]",
                EnvStyle["Staging"],
              )}
            >
              {project.environment}
            </button>
            <button
              className={cn(
                "rounded-lg px-2 py-[1px] text-xs font-medium",
                setactive["Active"],
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

              {error.map((items: ErrorlogInterface) => (
                <>
                  <tr className="text-sm">
                    <td className="border-b-2  py-3 px-4">
                      {" "}
                      <button
                        onClick={() => {
                          setErrorId(items.id);
                          setErrorDrawer(true);
                        }}
                        className="cursor-pointer"
                      >
                        {items.message}{" "}
                      </button>
                    </td>

                    <td className="border-b-2 py-3 px-4">
                      <button
                        className={cn(
                          "rounded-lg px-2 py-1 text-xs font-medium text-center",
                          SeverityStyle[items.severity],
                        )}
                      >
                        {items.severity}
                      </button>
                    </td>
                    <td className="border-b-2 py-3 px-4">
                      {" "}
                      {items.occurrence}{" "}
                    </td>
                    <td className="border-b-2 py-3 px-4">12 minutes ago </td>
                    <td className="border-b-2 py-3 px-4">
                      <button
                        className={cn(
                          "rounded-lg px-2 py-1 text-xs font-medium text-center cursor-pointer",
                          StatusStyle[items.status],
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
      <ErrorDrawer projectid={projectid} />
    </>
  );
}
