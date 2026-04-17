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
import DeleteProjectModal from "@/components/Modal/DeleteProjectModal";
import AddProjectModal from "@/components/Modal/AddProjectModal";
import { Skeleton } from "@/components/ui/skeleton";



export default function Page() {
  const params = useParams();
  const projectid = params.ProjectDetails as string;
  const [projectmenu, setOpenProjectMenu] = useState(false);
  const [deleteModal, setOpenDeleteModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);

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

  function Update_project_details() {
    setOpenUpdateModal(!openUpdateModal);
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        {/* Header Skeleton */}
        <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center py-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full lg:w-auto">
            <Skeleton className="h-10 w-64" />
            <div className="flex gap-2">
              <Skeleton className="h-6 w-16 rounded-lg" />
              <Skeleton className="h-6 w-20 rounded-md" />
              <Skeleton className="h-6 w-16 rounded-lg" />
            </div>
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-9 w-24 rounded-md" />
            <Skeleton className="h-9 w-9 rounded-lg" />
          </div>
        </div>

        {/* Credentials Skeleton */}
        <div className="p-6 border border-black/[0.08] dark:border-white/[0.08] rounded-xl bg-white dark:bg-[#18171D] space-y-4">
           <Skeleton className="h-6 w-40" />
           <div className="space-y-4">
             <div className="space-y-2">
               <Skeleton className="h-4 w-20" />
               <Skeleton className="h-10 w-full" />
             </div>
             <div className="space-y-2">
               <Skeleton className="h-4 w-20" />
               <Skeleton className="h-10 w-full" />
             </div>
           </div>
        </div>

        {/* Health Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
           {[...Array(4)].map((_, i) => (
             <div key={i} className="p-6 border border-black/[0.08] dark:border-white/[0.08] rounded-xl bg-white dark:bg-[#18171D]">
                <Skeleton className="h-5 w-1/2 mb-4" />
                <Skeleton className="h-8 w-1/3 mb-2" />
                <Skeleton className="h-4 w-2/3" />
             </div>
           ))}
        </div>

        {/* Table Skeleton */}
        <div className="space-y-4">
           <Skeleton className="h-6 w-48" />
           <div className="border border-black/[0.08] dark:border-white/[0.08] rounded-xl bg-white dark:bg-[#18171D] p-4 space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex gap-4 items-center">
                   <Skeleton className="h-5 flex-1" />
                   <Skeleton className="h-5 w-24" />
                   <Skeleton className="h-5 w-24" />
                   <Skeleton className="h-8 w-20 rounded-lg" />
                </div>
              ))}
           </div>
        </div>
      </div>
    );
  }
  if (isError) {
    return <p>unable to load project details</p>
  }

  function handleClick() {
    setOpenDeleteModal(!deleteModal);
  }
  return (
    <>
      <div>
        <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center py-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full lg:w-auto">
            <h1 className="font-semibold text-2xl sm:text-3xl lg:text-4xl truncate max-w-full">{data.project.name}</h1>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 text-xs font-medium rounded-lg bg-gray-200 dark:bg-neutral-800 text-black dark:text-gray-300 border border-black/[0.08] dark:border-white/[0.08] h-fit">
                {data.project.language}
              </span>
              <span
                className={cn(
                  "rounded-md text-xs font-medium px-2 py-1 border border-transparent",
                  EnvStyle[data.project.environment] || EnvStyle["Staging"]
                )}
              >
                {data.project.environment}
              </span>
              <span
                className={cn(
                  "rounded-lg px-2 py-1 text-xs font-medium border border-transparent",
                  setactive["Active"]
                )}
              >
                Active
              </span>
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
                      onClick={Update_project_details}
                    >
                      <Pencil size={14} className="text-muted-foreground shrink-0" />
                      <span>Edit Project</span>
                    </button>
                    <button
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-sm rounded-lg text-left hover:bg-gray-100 dark:hover:bg-neutral-800/60 cursor-pointer transition-colors"

                      disabled={true}
                    >
                      <FileBarChart size={14} className="text-muted-foreground shrink-0" />
                      <span>Project Report</span>
                    </button>
                  </div>
                  <div className="border-t dark:border-neutral-800" />
                  <div className="px-1 py-1">
                    <button
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-sm rounded-lg text-left text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 cursor-pointer transition-colors"
                      onClick={handleClick}
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
          <div className="font-semibold mb-2">Error in this Project</div>
          <ErrorTable data={projectError.data?.errors} />
        </div>
        <ErrorDrawer />
      </div>
      <DeleteProjectModal open={deleteModal} onClose={handleClick} projectId={projectid} />

      <AddProjectModal open={openUpdateModal} onClose={Update_project_details} projectId={projectid} />
    </>
  );
}
