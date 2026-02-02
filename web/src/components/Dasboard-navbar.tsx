import { Sun, Bell, User, Search } from "lucide-react";

export default function DashboardNavbar() {
  function handleThemeChange(): void {
    const currentTheme = document.documentElement.classList.contains("dark")
      ? "light"
      : "dark";
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme-tailwind-playlist", currentTheme);
  }

  return (
    <>
      <div className="p-4 flex gap-2 relative">
        <div className="relative w-full">
          <Search size={20} className="absolute left-2 top-2 inset-y-0" />

          <input
            type="search"
            placeholder="Search error , Project.."
            className="border-2 rounded-md pl-8 px-4 py-1 w-2xl focus:outline-black dark:focus:outline-white dark:bg-black dark:text-white"
          />
        </div>
        <div className="flex gap-4 absolute right-6">
          <button
            onClick={handleThemeChange}
            className="rounded-lg flex w-10 h-10 hover:bg-gray-100 dark:hover:bg-neutral-800 items-center justify-center cursor-pointer"
          >
            <Sun />
          </button>
          <button className="rounded-lg flex w-10 h-10 hover:bg-gray-100 dark:hover:bg-neutral-800 items-center justify-center cursor-pointer">
            <Bell />
          </button>
          <button className="rounded-lg flex w-10 h-10 hover:bg-gray-100 dark:hover:bg-neutral-800 items-center justify-center cursor-pointer">
            <User />
          </button>
        </div>
      </div>
    </>
  );
}
