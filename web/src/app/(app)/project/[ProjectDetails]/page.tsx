"use client";
import { cn } from "@/lib/utils";
import { Settings, EllipsisVertical } from "lucide-react";
import { EnvStyle, setactive} from "@/lib/projectstyles";
import ProjectCredential from "@/components/project/project-credential";
import { useParams } from "next/navigation";
import ErrorDrawer from "@/components/Error-Drawer";
import { useProject,} from "@/lib/services/projects/projects.query";
import ProjectError from "@/components/project/project-errors";
import ProjectHealth from "@/components/project/project-health";



export default function Page() {
  const projectid:any = useParams().ProjectDetails;

  const {data , isLoading , isError} = useProject(projectid);

  if(isLoading){
    return <p>loading project details</p>
  }
  if(isError){
    return <p>unable to load project details</p>
  }
  return (
    <>
      <div>
        <div className="flex gap-2 justify-between align-baseline">
          <div className="flex gap-2">
            <div className="font-semibold text-xl">{data.project.name} </div>
            <button className="px-2 py-[1px] text-xs font-medium rounded-lg dark:text-black border-gray-400 bg-gray-300 h-min-content">
              {data.project.language}
            </button>
            <button
              className={cn(
                "rounded-md inline-block text-xs font-medium text-yellow-200 px-2 py-[1px]",
                EnvStyle["Staging"],
              )}
            >
              {data.project.environment}
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
        <ProjectCredential project_Id={data.project.id} APIkey={data.project.apikey} />
        <ProjectHealth projectid={projectid} />
        <ProjectError />
      </div>
      <ErrorDrawer projectid={projectid} />
    </>
  );
}
