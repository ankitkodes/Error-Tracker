import { Sun, Bell, User } from "lucide-react";

export default function DashboardNavbar() {
  return (
    <>
      <div className="p-4 flex gap-2 relative">
        <div>
          <input
            type="search"
            placeholder="Search error , Project.."
            className="border-2 rounded px-4 py-1 w-64 focus:outline-black"
          />
        </div>
        <div className="flex gap-4 absolute right-6">
          <div className="rounded-lg flex w-10 h-10 hover:bg-gray-100 items-center justify-center cursor-pointer">
            <Sun />
          </div>
          <div className="rounded-lg flex w-10 h-10 hover:bg-gray-100 items-center justify-center cursor-pointer">
            <Bell />
          </div>
          <div className="rounded-lg flex w-10 h-10 hover:bg-gray-100 items-center justify-center cursor-pointer">
            <User />
          </div>
        </div>
      </div>
    </>
  );
}
