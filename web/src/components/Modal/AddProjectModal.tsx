"use client";
import { X, FolderPlus, ChevronDown } from "lucide-react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { useEffect, useState } from "react";
import { useAddPojects, useUpdateProject } from "@/lib/services/projects/projects.mutation";
import { useProject } from "@/lib/services/projects/projects.query";
import toast from "react-hot-toast";

export type modal = {
  open: boolean;
  onClose: () => void;
  projectId?: string
};



export default function AddProjectModal({ open, onClose, projectId }: modal) {
  const [name, setProjectName] = useState("");
  const [language, setLanguage] = useState("Nodejs");
  const [env, setEnv] = useState("Production");
  const [team, setTeam] = useState("");

  const mutation = useAddPojects();

  async function CreateProject() {
    mutation.mutate({ name, language, env, team });
    onClose();
  }

  const updateMutation = useUpdateProject();
  async function updateProject() {
    if (!projectId) {
      return;
    }
    const loadingToast = toast.loading("updating project details", { duration: 5000 });
    await updateMutation.mutateAsync({ projectId, name, language, env, team });
    toast.dismiss(loadingToast);
    onClose();
  }

  const { data } = useProject(projectId ?? "");

  useEffect(() => {
    if (!data?.project) return;
    setProjectName(data.project.name);
    setLanguage(data.project.language);
    setEnv(data.project.environment);
    setTeam(data.project.team ?? "");
  }, [data])



  return (
    <div>
      <Dialog open={open} onClose={onClose} className="relative z-50">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-2xl bg-white dark:bg-[#13121a] border border-black/[0.08] dark:border-white/[0.08] text-left shadow-2xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 w-full max-w-[480px]"
            >
              {/* Subtle gradient glow at top */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[#00ffb2]/40 to-transparent" />

              <div className="px-6 pb-6 pt-8 relative">
                {/* Close button */}
                <button
                  onClick={onClose}
                  className="absolute right-5 top-5 cursor-pointer text-muted-foreground hover:text-foreground transition-colors duration-200 hover:bg-white/[0.06] rounded-lg p-1"
                >
                  <X size={18} strokeWidth={2} />
                </button>

                {/* Header icon */}
                <div className="flex items-center justify-center mb-5">
                  <div className="bg-[#00ffb2]/10 border border-[#00ffb2]/20 p-3.5 rounded-2xl flex items-center justify-center">
                    <FolderPlus className="text-[#00ffb2] w-6 h-6" strokeWidth={2} />
                  </div>
                </div>

                {/* Title & subtitle */}
                <div className="text-center mb-6">
                  <h3 className="text-[22px] font-semibold text-foreground mb-1.5 tracking-tight">
                    Add Your Project
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Set up a new project to start tracking errors
                  </p>
                </div>

                {/* Form */}
                <form className="space-y-4">
                  {/* Project Name */}
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1.5">
                      Project Name <span className="text-[#00ffb2]">*</span>
                    </label>
                    <input
                      id="projectname"
                      type="text"
                      value={name}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-black/[0.08] dark:border-white/[0.08] text-foreground placeholder:text-gray-500 focus:outline-none focus:border-[#00ffb2]/40 focus:ring-1 focus:ring-[#00ffb2]/20 transition-all duration-200 text-sm"
                      name="projectname"
                      placeholder="E-commerce Platform"
                      required
                      onChange={(e) => setProjectName(e.target.value)}
                    />
                  </div>

                  {/* Language */}
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1.5">
                      Language <span className="text-[#00ffb2]">*</span>
                    </label>
                    <div className="relative">
                      <select
                        id="language"
                        name="language"
                        value={language}
                        className="w-full appearance-none px-4 py-2.5 rounded-xl bg-white/[0.04] border border-black/[0.08] dark:border-white/[0.08] text-foreground focus:outline-none focus:border-[#00ffb2]/40 focus:ring-1 focus:ring-[#00ffb2]/20 transition-all duration-200 text-sm cursor-pointer"
                        required
                        onChange={(e) => setLanguage(e.target.value)}
                      >
                        <option value="Nodejs" className="bg-[#13121a] text-foreground">
                          Nodejs
                        </option>
                        <option value="Nextjs" className="bg-[#13121a] text-foreground">
                          Nextjs
                        </option>
                        <option value="Reactjs" className="bg-[#13121a] text-foreground">
                          Reactjs
                        </option>
                      </select>
                      <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                    </div>
                  </div>

                  {/* Environment */}
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1.5">
                      Environment
                    </label>
                    <div className="relative">
                      <select
                        id="env"
                        name="env"
                        value={env}
                        className="w-full appearance-none px-4 py-2.5 rounded-xl bg-white/[0.04] border border-black/[0.08] dark:border-white/[0.08] text-foreground focus:outline-none focus:border-[#00ffb2]/40 focus:ring-1 focus:ring-[#00ffb2]/20 transition-all duration-200 text-sm cursor-pointer"
                        required
                        onChange={(e) => setEnv(e.target.value)}
                      >
                        <option value="Production" className="bg-[#13121a] text-foreground">
                          Production
                        </option>
                        <option value="Staging" className="bg-[#13121a] text-foreground">
                          Staging
                        </option>
                        <option value="Development" className="bg-[#13121a] text-foreground">
                          Development
                        </option>
                      </select>
                      <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                    </div>
                  </div>

                  {/* Organization / Team */}
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1.5">
                      Organization / Team
                    </label>
                    <input
                      id="organization"
                      type="text"
                      value={team}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-black/[0.08] dark:border-white/[0.08] text-foreground placeholder:text-gray-500 focus:outline-none focus:border-[#00ffb2]/40 focus:ring-1 focus:ring-[#00ffb2]/20 transition-all duration-200 text-sm"
                      name="team"
                      placeholder="Flipkart-Frontend"
                      onChange={(e) => setTeam(e.target.value)}
                    />
                  </div>
                </form>

                {/* Actions */}
                <div className="flex flex-row gap-3 mt-6">
                  <button
                    className="flex-1 py-2.5 px-4 bg-white/[0.04] border border-black/[0.08] dark:border-white/[0.08] hover:bg-white/[0.08] text-muted-foreground hover:text-foreground font-medium rounded-xl transition-all duration-200 flex items-center justify-center text-sm cursor-pointer"
                    onClick={onClose}
                    type="button"
                  >
                    Cancel
                  </button>
                  {projectId ? <button
                    className="flex-1 py-2.5 px-4 bg-[#00ffb2] hover:bg-[#00e6a0] text-[#0a0a0a] font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 text-sm cursor-pointer hover:shadow-lg hover:shadow-[#00ffb2]/20"
                    type="button"
                    onClick={updateProject}
                  >
                    <FolderPlus size={16} strokeWidth={2.5} />
                    Update
                  </button> : <button
                    className="flex-1 py-2.5 px-4 bg-[#00ffb2] hover:bg-[#00e6a0] text-[#0a0a0a] font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 text-sm cursor-pointer hover:shadow-lg hover:shadow-[#00ffb2]/20"
                    type="button"
                    onClick={CreateProject}
                  >
                    <FolderPlus size={16} strokeWidth={2.5} />
                    Create
                  </button>}
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
