"use client";
import AddProjectModal from "@/components/Modal/AddProjectModal";
import ProjectDetails from "@/components/project/project-details";
import { useProjects } from "@/lib/services/projects/projects.query";
import Link from "next/link";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";


interface Project {
  id: string;
  environment: string;
  apikey: string;
  language: string;
  name: string;
  projecthealth: { totalerrors: number }[];
  error: { createdAt: string | Date }[];
}

export default function Project() {
  const [open, setOpen] = useState(false);
  const { data, isLoading, isError } = useProjects();

  function closeprojectmodal() {
    setOpen(false);
  }

  if (isError) {
    return <div className="text-red-500">Error fetching projects. Please try again later.</div>;
  }

  return (
    <>
      <div className="w-full">
        <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 w-full px-1">
          <div>
            <h1 className="text-2xl font-bold">Project</h1>
            <p className="text-sm text-muted-foreground">
              Manage and monitor all your application projects
            </p>
          </div>
          <div className="shrink-0 absolute right-1">
            <button
              disabled={isLoading}
              onClick={() => setOpen(true)}
              className="w-full sm:w-auto border-2 border-primary/20 hover:border-primary rounded px-4 py-2 cursor-pointer hover:bg-primary hover:text-primary-foreground transition text-primary disabled:opacity-50"
            >
              +Add Project
            </button>
          </div>
          <AddProjectModal open={open} onClose={closeprojectmodal} />
        </div>

        <div className="my-8 flex-1">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="p-6 border border-black/[0.08] dark:border-white/[0.08] rounded-lg bg-white dark:bg-[#18171D]">
                  <div className="flex items-center mb-8">
                    <Skeleton className="mr-3 w-10 h-10 rounded-lg shrink-0" />
                    <div className="space-y-2 grow">
                      <Skeleton className="h-5 w-1/2" />
                      <Skeleton className="h-3 w-1/4" />
                    </div>
                  </div>
                  <Skeleton className="h-4 w-full mb-4" />
                  <hr className="mb-4 border-black/[0.08] dark:border-white/[0.08]" />
                  <div className="flex justify-between">
                    <Skeleton className="h-3 w-1/6" />
                    <Skeleton className="h-3 w-1/4" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.projectdetails.map((items: Project) => {
                const totalErrors = items.projecthealth?.[0]?.totalerrors ?? 0;
                const lastErrorDate = items.error?.[0]?.createdAt
                  ? new Date(items.error[0].createdAt).toISOString()
                  : null;

                return (
                  <Link
                    key={items.id}
                    href={`/project/${items.id}`}
                    className="cursor-pointer block"
                  >
                    <ProjectDetails
                      name={items.name}
                      environment={items.environment}
                      totalErrors={totalErrors}
                      lastErrorDate={lastErrorDate}
                    />
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
