"use client";
import AddProjectModal from "@/components/Modal/AddProjectModal";
import ProjectDetails from "@/components/project/project-details";
import { useProjects } from "@/lib/services/projects/projects.query";
import Link from "next/link";
import { useState} from "react";


interface Project{
  id: string;
  environment: string;
  apikey: string;
  language: string;
  name: string;
}

export default function Project() {
  const [open, setOpen] = useState(false);
  const{data , isLoading , isError} = useProjects();

  function closeprojectmodal() {
    setOpen(false);
  }

if(isError){
  return <div className="text-red-500">Error fetching projects. Please try again later.</div>;
}

if(isLoading){
  return <div className="text-gray-500">Loading projects...</div>;
}


  return (
    <>
      <div className="">
        <div className="relative">
          <div className="inline-block">
            <h1 className="text-2xl font-bold">Project</h1>
            <p className="text-sm text-muted-foreground">
              Manage and monitor all your application projects
            </p>
          </div>
          <div className="inline-block absolute right-4 top-0">
            <button
              onClick={() => setOpen(true)}
              className="border-2 border-primary/20 hover:border-primary rounded px-4 py-2 cursor-pointer hover:bg-primary hover:text-primary-foreground transition text-primary"
            >
              +Add Project{" "}
            </button>
          </div>
          <AddProjectModal open={open} onClose={closeprojectmodal} />
        </div>
        <div>
        </div>
        <div className="my-8 flex-1">
          
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-4">
              {data.projectdetails.map((items: Project) => (
                <>
                  <Link
                    href={`/project/${items.id}`}
                    className="cursor-pointer"
                  >
                    <ProjectDetails
                      name={items.name}
                      environment={items.environment}
                    />
                  </Link>
                </>
              ))}
            </div>
          
        </div>
      </div>
    </>
  );
}
