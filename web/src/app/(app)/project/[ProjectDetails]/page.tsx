"use client";
import { cn } from "@/lib/utils";
import { Settings, EllipsisVertical, Pencil, FileBarChart, Trash2 } from "lucide-react";
import { EnvStyle, setactive } from "@/lib/projectstyles";
import ProjectCredential from "@/components/project/project-credential";
import { useParams } from "next/navigation";
import ErrorDrawer from "@/components/Error-Drawer";
import { useProject, useProjectError, } from "@/lib/services/projects/projects.query";
import ProjectHealth from "@/components/project/project-health";
import ErrorTable from "@/components/project/project-errors";
import { useEffect, useRef, useState } from "react";



export default function Page() {
  const params = useParams();
  const projectid = params.ProjectDetails as string;
  const [projectmenu, setOpenProjectMenu] = useState(false);

  const { data, isLoading, isError } = useProject(projectid);
  const projectError = useProjectError(projectid);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpenProjectMenu(false);
      }
    }
    if (projectmenu) return document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [projectmenu])

  if (isLoading) {
    return <p>loading project details</p>
  }
  if (isError) {
    return <p>unable to load project details</p>
  }
  return (
    <>
      <div>
        <div className="flex gap-2 justify-between align-baseline">
          <div className="flex gap-2">
            <div className="font-semibold text-4xl">{data.project.name} </div>
            <div>
              <button className="px-2 mx-2 py-1 text-sm font-medium rounded-lg dark:text-black border-gray-400 bg-gray-300 h-min-content">
                {data.project.language}
              </button>
              <button
                className={cn(
                  "rounded-md inline-block mx-2 text-sm font-medium text-yellow-200 px-2 py-1",
                  EnvStyle["Staging"],
                )}
              >
                {data.project.environment}
              </button>
              <button
                className={cn(
                  "rounded-lg px-2 mx-2 py-1 text-sm font-medium",
                  setactive["Active"],
                )}
              >
                Active
              </button>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <button className="text-sm gap-2 border-2 rounded-md px-2 py-1 cursor-pointer">
              {" "}
              <Settings className="inline-block mr-1" size={18} />
              Settings
            </button>

            {/* Project context menu */}
            <div className="relative" ref={panelRef}>
              <button
                onClick={() => setOpenProjectMenu(!projectmenu)}
                className="rounded-lg flex w-9 h-9 hover:bg-gray-100 dark:hover:bg-neutral-800 items-center justify-center cursor-pointer transition-colors"
              >
                <EllipsisVertical size={18} />
              </button>

              {projectmenu && (
                <div className="absolute right-0 top-11 z-50 w-[210px] border rounded-xl bg-white dark:bg-card shadow-xl overflow-hidden">
                  <div className="px-3 pt-2.5 pb-1.5">
                    <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Actions</p>
                  </div>
                  <div className="px-1 pb-1">
                    <button
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-sm rounded-lg text-left hover:bg-gray-100 dark:hover:bg-neutral-800/60 cursor-pointer transition-colors"
                      onClick={() => setOpenProjectMenu(false)}
                    >
                      <Pencil size={14} className="text-muted-foreground shrink-0" />
                      <span>Edit Project</span>
                    </button>
                    <button
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-sm rounded-lg text-left hover:bg-gray-100 dark:hover:bg-neutral-800/60 cursor-pointer transition-colors"
                      onClick={() => setOpenProjectMenu(false)}
                    >
                      <FileBarChart size={14} className="text-muted-foreground shrink-0" />
                      <span>Project Report</span>
                    </button>
                  </div>
                  <div className="border-t dark:border-neutral-800" />
                  <div className="px-1 py-1">
                    <button
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-sm rounded-lg text-left text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 cursor-pointer transition-colors"
                      onClick={() => setOpenProjectMenu(false)}
                    >
                      <Trash2 size={14} className="shrink-0" />
                      <span>Delete Project</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <ProjectCredential project_Id={data.project.id} APIkey={data.project.apikey} />
        <ProjectHealth projectid={projectid} />
        <div>
          <div className="font-semibold">Error in this Project</div>
          <ErrorTable data={projectError.data?.errors} />
        </div>
        <ErrorDrawer />
      </div>
    </>
  );
}
