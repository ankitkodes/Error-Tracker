"use client";
import AddProjectModal from "@/components/Modal/AddProjectModal";
import ProjectDetails from "@/components/project/project-details";
import axios from "axios";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Project() {
  const [open, setOpen] = useState(false);
  const [project, getProject] = useState([]);
  const [loading, setloading] = useState(false);

  function closeprojectmodal() {
    setOpen(false);
  }

  useEffect(() => {
    async function getProjectdetails() {
      setloading(true);
      const response = await axios({
        method: "GET",
        url: "/api/projects",
      });
      getProject(response.data.projectdetails);
      setloading(false);
      console.log("the value of data", response);
    }

    getProjectdetails();
  }, []);

  return (
    <>
      <div className="">
        <div className="relative">
          <div className="inline-block">
            <h1 className="text-2xl font-bold">Project</h1>
            <p className="text-sm text-gray-500">
              Manage and monitor all your application projects
            </p>
          </div>
          <div className="inline-block absolute right-4 top-0">
            <button
              onClick={() => setOpen(true)}
              className="border-2 border-black rounded px-4 py-2 cursor-pointer hover:bg-black hover:text-white transition text-black"
            >
              +Add Project{" "}
            </button>
          </div>
          <AddProjectModal open={open} onClose={closeprojectmodal} />
        </div>
        <div className="my-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-4">
            {project.map((items: any) => (
              <>
                <Link href={`/project/${items.id}`} className="cursor-pointer">
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
