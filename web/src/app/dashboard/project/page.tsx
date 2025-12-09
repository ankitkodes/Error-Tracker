"use client";
import AddProjectModal from "@/components/Modal/AddProjectModal";
import { IconBrandTabler } from "@tabler/icons-react";
import { useState } from "react";

export default function Project() {
  const [open, setOpen] = useState(false);

  function closeprojectmodal() {
    setOpen(false);
  }

  return (
    <>
      {/* <div className=""> */}
      <div className="">
        <div className="m-4 flex justify-between">
          <div className="inline-block">
            <h1 className="text-2xl font-bold">Project Section</h1>
            <p className="text-sm text-gray-500">
              Manage your projects here. You can add, edit, or delete projects.
            </p>
          </div>
          <div className="inline-block">
            <button
              onClick={() => setOpen(true)}
              className="border-2 rounded px-4 py-2 cursor-pointer hover:bg-black hover:text-white transition"
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
