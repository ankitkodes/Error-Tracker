export default function Page() {
  return (
    <>
      <div>
        <div className="pb-4">
          <h1 className="text-2xl font-bold">Issues</h1>
          <p className="text-sm text-gray-500">
            Track and manage all errors across your applications.
          </p>
        </div>
        <div className="flex gap-2 relative justify-between">
          <div>
            <input
              type="text"
              id="search"
              placeholder="Search errors..."
              className="w-full py-1 px-2 border flex-1"
            />
          </div>
          <div className="flex gap-2">
            <div>
              <button className="border cursor-pointer rounded-md px-2 py-1 text-left hover:bg-gray-100">
                Severity
              </button>
            </div>
            <div>
              {" "}
              <button className="border cursor-pointer rounded-md px-2 py-1 text-left hover:bg-gray-100">
                Status
              </button>
            </div>
            <div>
              {" "}
              <button className="border cursor-pointer rounded-md px-2 py-1 text-left hover:bg-gray-100">
                Environment
              </button>
            </div>
            <div>
              {" "}
              <button className="border cursor-pointer rounded-md px-2 py-1 text-left hover:bg-gray-100">
                Last 24h
              </button>
            </div>
            <div>
              {" "}
              <button className="border cursor-pointer rounded-md px-2 py-1 text-left hover:bg-gray-100">
                Sort:
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
