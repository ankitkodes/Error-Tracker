"use client";
import AddProjectModal from "@/components/Modal/AddProjectModal";
import { useState } from "react";

export default function Project() {
  const [open, setOpen] = useState(false);

  function closeprojectmodal() {
    setOpen(false);
  }

  return (
    <>
      {/* <div className=""> */}
      <div className="p-2 md:p-10 ">
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
      </div>
      {/* </div> */}
    </>
  );
}
