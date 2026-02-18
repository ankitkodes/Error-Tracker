import { UseErrorId } from "@/lib/store";

export default function ErrorDrawer() {
  const errorId = UseErrorId((state) => state.errorId);
  const isOpen = UseErrorId((state) => state.ErrorDrawer);
  const closeDrawer = UseErrorId((state) => state.setErrorDrawer);

  return (
    <>
      <div
        onClick={() => closeDrawer(false)}
        className={`fixed inset-0 bg-black/35 backdrop-blur-sm transition-opacity duration-200 ease-out z-40
        ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      />

      <div
        className={`fixed top-0 right-0 h-screen w-full sm:w-3/4 lg:w-1/2 max-w-3xl bg-white shadow-2xl 
        transition-transform duration-300 ease-out z-50
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-6">
          <div className="relative flex">
            <div>Error Details</div>
            <div className="absolute right-0 flex gap-2">
              <button className="border rounded px-2 py-[1px] text-xs font-medium cursor-pointer">
                Mark as Resolved
              </button>
              <button className="border rounded px-2 py-[1px] text-xs font-medium cursor-pointer">
                Assign
              </button>
              <button className="border rounded px-2 py-[1px] text-xs font-medium cursor-pointer">
                Mute
              </button>
            </div>
          </div>
          <div>
            <div>
              <div></div>
              <div>
                <div>TypeError:Cannot read property map of unified</div>
                <div>Critical</div>
              </div>
              <div></div>
            </div>
          </div>

          <button
            onClick={() => closeDrawer(false)}
            className="mt-6 text-sm text-blue-600 hover:underline"
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
}
