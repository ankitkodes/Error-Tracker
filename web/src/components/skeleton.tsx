export function ProjectDetailsSkeleton() {
  return (
    <div className="w-full p-6 border-2 rounded-lg animate-pulse">
      <div className="flex items-center">
        <div className="w-10 h-10 mr-2 bg-slate-800 rounded-lg" />

        <div>
          <div className="h-4 w-32 bg-slate-800 rounded mb-2" />
          <div className="h-3 w-20 bg-slate-800 rounded" />
        </div>
      </div>

      <div className="flex mt-8 items-center">
        <div className="h-4 w-24 bg-slate-800 rounded" />
        <div className="ml-auto h-4 w-10 bg-slate-800 rounded" />
      </div>

      <hr className="mt-4 border-slate-800" />
      <div className="mt-2 h-3 w-40 bg-slate-800 rounded" />
    </div>
  );
}
