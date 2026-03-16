import { Sun, Bell,Search } from "lucide-react";
import React, { useEffect } from "react";

export default function DashboardNavbar() {
  // sync theme on mount so reloads keep the selected mode
  useEffect(() => {
    const saved = localStorage.getItem("theme-tailwind-playlist");
    if (saved === "dark") {
      document.documentElement.classList.add("dark");
    } else if (saved === "light") {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  function handleThemeChange(): void {
    const isDark = document.documentElement.classList.contains("dark");
    const newTheme = isDark ? "light" : "dark";
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme-tailwind-playlist", newTheme);
  }

  return (
    <>
      <div className="p-4 flex gap-2 relative">
        <div className="relative w-full">
          <Search size={20} className="absolute left-2 top-2 inset-y-0" />

          <input
            type="search"
            placeholder="Search error , Project.."
            className="border-2 rounded-md pl-8 px-4 py-1 w-2xl focus:outline-black dark:focus:outline-white dark:bg-background dark:text-white"
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
        </div>
      </div>
    </>
  );
}
