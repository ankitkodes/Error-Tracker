"use client";
import { X } from "lucide-react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { useState } from "react";
import axios from "axios";

export type modal = {
  open: boolean;
  onClose: () => void;
};

export default function AddProjectModal({ open, onClose }: modal) {
  const [projectname, setProjectName] = useState("");
  const [language, setLanguage] = useState("Nodejs");
  const [env, setEnv] = useState("Production");
  const [team, setTeam] = useState("");
  const [status, setStatus] = useState(false);

  async function CreateProject() {
    setStatus(true);
    const reponse = await axios({
      method: "POST",
      url: "/api/projects",
      data: {
        name: projectname,
        language: language,
        environment: env,
        team: team,
      },
    });
    console.log(reponse);
    onClose();
    setStatus(false);
  }
  return (
    <div>
      <Dialog open={open} onClose={onClose} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-900/50 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-gray-800 text-left shadow-xl outline -outline-offset-1 outline-white/10 transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
            >
              <div className="bg-black text-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 relative">
                <h3 className="text-center font-medium text-xl">
                  Add Your Project
                </h3>
                <form>
                  <div className="my-4">
                    <label>
                      Project Name <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="projectname"
                      type="text"
                      className="w-full px-4 py-2 rounded border-2 mt-2"
                      name="projectname"
                      placeholder="E-commerce Platform"
                      required
                      onChange={(e) => setProjectName(e.target.value)}
                    />
                  </div>
                  <div className="my-4">
                    <label>
                      Language <span className="text-red-600">*</span>
                    </label>
                    <div>
                      <select
                        id="language"
                        name="language"
                        className="w-full  px-4 py-2 rounded border-2  mt-2"
                        required
                        onChange={(e) => setLanguage(e.target.value)}
                      >
                        <option value="Nodejs" className="">
                          Nodejs
                        </option>
                        <option value="Nextjs">Nextjs</option>
                        <option value="Reactjs">Reactjs</option>
                      </select>
                    </div>
                  </div>
                  <div className="my-4">
                    <label>Environment</label>
                    <div>
                      <select
                        id="env"
                        name="env"
                        className="w-full  px-4 py-2 rounded border-2  mt-2"
                        required
                        onChange={(e) => setEnv(e.target.value)}
                      >
                        <option value="Production">Production</option>
                        <option value="Staging">Staging</option>
                        <option value="Development">Development</option>
                      </select>
                    </div>
                  </div>
                  <div className="my-4">
                    <label>Organization / Team</label>
                    <input
                      id="organization"
                      type="text"
                      className="w-full px-4 py-2 rounded border-2 mt-2"
                      name="team"
                      placeholder="Flipkart-Frontend"
                      onChange={(e) => setTeam(e.target.value)}
                    />
                  </div>
                </form>
                <button
                  className="w-full my-4 py-2 text-black border-2 bg-white rounded cursor-pointer hover:text-black hover:bg-[#00ffb2] hover:border-[#00ffb2]"
                  type="submit"
                  onClick={CreateProject}
                >
                  {status ? "Creating....." : "Create Project"}
                </button>
                <button
                  onClick={onClose}
                  className="absolute right-1 top-1 cursor-pointer text-white"
                >
                  <X />
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
