import { Eye, Copy, EyeOff } from "lucide-react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

export default function ProjectCredential() {
  const [visible, setVisible] = useState(false);
  const apikey = "hnksdfnloeknlsdfnl45678";
  const project_id = "Proj_c4hy7nkh7oj";

  return (
    <>
      <div className="flex flex-col border-2 shadow-sm rounded-md p-4 my-4 gap-3">
        <div className="font-semibold">Project Credentials</div>
        <div>
          <label className="text-gray-400 mb-2">Project ID</label>
          <div className="flex justify-between gap-4">
            <input
              value={project_id}
              readOnly
              className="bg-[#f5f5f5] grow ... px-2 py-1 rounded-md text-sm"
            />

            <button
              onClick={() => {
                navigator.clipboard.writeText(project_id);
                toast.success("project_id Copied Successfully");
              }}
              className="text-xs gap-2 grow-0 ... border-2 rounded-md font-medium px-2 py-1 cursor-pointer"
            >
              <Copy className="inline-block mr-1" size={18} /> Copy
            </button>
          </div>
        </div>
        <div>
          <label className="text-gray-400">API Key</label>
          <div className="flex gap-2">
            <input
              type={visible ? "text" : "password"}
              value={apikey}
              readOnly
              className="bg-[#f5f5f5] grow ... px-2 py-1 rounded-md text-sm"
            />

            <button
              onClick={() => setVisible(!visible)}
              className="text-xs gap-2 flex-none ... border-2 rounded-md font-medium px-2 py-1 cursor-pointer"
            >
              {visible ? (
                <EyeOff className="inline-block" size={18} />
              ) : (
                <Eye className="inline-block" size={18} />
              )}
            </button>
            <button
              onClick={() => {
                navigator.clipboard.writeText(apikey);
                toast.success("API key copied successfully");
              }}
              className="text-xs gap-2 flex-none ... border-2 rounded-md font-medium px-2 py-1 cursor-pointer"
            >
              <Copy className="inline-block mr-1" size={18} /> Copy
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
