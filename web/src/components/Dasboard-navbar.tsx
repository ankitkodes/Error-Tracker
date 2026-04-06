import { Sun, Bell, Search, ShieldAlert, AlertTriangle, CheckCircle2, Info, Clock } from "lucide-react";
import React, { useEffect, useState, useRef } from "react";

const notifications = [
  {
    id: "1",
    type: "critical" as const,
    title: "TypeError: Cannot read properties of undefined",
    message: "Occurred 142 times in the last hour",
    project: "payments-api",
    time: "2m ago",
    read: false,
  },
  {
    id: "2",
    type: "critical" as const,
    title: "Unhandled Promise Rejection",
    message: "Database connection pool exhausted",
    project: "auth-service",
    time: "8m ago",
    read: false,
  },
  {
    id: "3",
    type: "warning" as const,
    title: "High memory usage detected",
    message: "Node process exceeding 85% memory limit",
    project: "web-dashboard",
    time: "23m ago",
    read: false,
  },
  {
    id: "4",
    type: "resolved" as const,
    title: "CORS policy error resolved",
    message: "Auto-resolved after config update",
    project: "api-gateway",
    time: "1h ago",
    read: true,
  },
  {
    id: "5",
    type: "info" as const,
    title: "New SDK version available",
    message: "BugTrace SDK v2.4.0 released with performance fixes",
    project: "system",
    time: "3h ago",
    read: true,
  },
];

const typeStyles = {
  critical: { icon: ShieldAlert, dot: "bg-red-500", label: "Critical", labelStyle: "text-red-500 bg-red-500/10" },
  warning: { icon: AlertTriangle, dot: "bg-yellow-500", label: "Warning", labelStyle: "text-yellow-500 bg-yellow-500/10" },
  resolved: { icon: CheckCircle2, dot: "bg-green-500", label: "Resolved", labelStyle: "text-green-500 bg-green-500/10" },
  info: { icon: Info, dot: "bg-blue-500", label: "Info", labelStyle: "text-blue-500 bg-blue-500/10" },
};

export default function DashboardNavbar() {
  const [notification, setOpenNotification] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // sync theme on mount so reloads keep the selected mode
  useEffect(() => {
    const saved = localStorage.getItem("theme-tailwind-playlist");
    if (saved === "dark") {
      document.documentElement.classList.add("dark");
    } else if (saved === "light") {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpenNotification(false);
      }
    }
    if (notification) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [notification]);

  function handleThemeChange(): void {
    const isDark = document.documentElement.classList.contains("dark");
    const newTheme = isDark ? "light" : "dark";
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme-tailwind-playlist", newTheme);
  }

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <>
      <div className="p-4 flex gap-2 relative">
        <div className="relative w-full">
          <Search size={20} className="absolute left-2 top-2 inset-y-0" />

          <input
            type="search"
            placeholder="Search error , Project.."
            className="border rounded-md pl-8 px-4 py-1 w-2xl focus:outline-black dark:focus:outline-white dark:bg-background dark:text-white"
          />
        </div>
        <div className="flex gap-4 absolute right-6">
          <button
            onClick={handleThemeChange}
            className="rounded-lg flex w-10 h-10 hover:bg-gray-100 dark:hover:bg-neutral-800 items-center justify-center cursor-pointer"
          >
            <Sun />
          </button>

          {/* notification bell */}
          <div ref={panelRef} className="relative">
            <button
              onClick={() => setOpenNotification(!notification)}
              className="relative rounded-lg flex w-10 h-10 hover:bg-gray-100 dark:hover:bg-neutral-800 items-center justify-center cursor-pointer"
            >
              <Bell />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* notification dropdown */}
            {notification && (
              <div className="absolute right-0 top-12 z-50 w-[380px] border rounded-md bg-white dark:bg-background shadow-lg overflow-hidden">
                {/* header */}
                <div className="px-4 py-3 border-b flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold">Notifications</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {unreadCount > 0 ? `${unreadCount} unread` : "All caught up"}
                    </p>
                  </div>
                  {unreadCount > 0 && (
                    <button className="text-xs text-blue-500 hover:underline cursor-pointer">
                      Mark all read
                    </button>
                  )}
                </div>

                {/* notification list */}
                <div className="max-h-[360px] overflow-y-auto divide-y dark:divide-neutral-800">
                  {notifications.map((notif) => {
                    const style = typeStyles[notif.type];
                    const Icon = style.icon;
                    return (
                      <div
                        key={notif.id}
                        className={`px-4 py-3 flex gap-3 items-start hover:bg-gray-50 dark:hover:bg-neutral-800/50 cursor-pointer ${!notif.read ? "bg-blue-50/50 dark:bg-neutral-800/30" : ""
                          }`}
                      >
                        {/* icon */}
                        <div className="mt-0.5 shrink-0">
                          <Icon size={18} className={style.dot.replace("bg-", "text-")} />
                        </div>

                        {/* content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className={`text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded ${style.labelStyle}`}>
                              {style.label}
                            </span>
                            <span className="text-[11px] text-gray-400 flex items-center gap-1">
                              <Clock size={10} />
                              {notif.time}
                            </span>
                          </div>
                          <p className="text-sm font-medium truncate">{notif.title}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{notif.message}</p>
                          <p className="text-[11px] text-gray-400 mt-1 font-mono">{notif.project}</p>
                        </div>

                        {/* unread dot */}
                        {!notif.read && (
                          <span className={`mt-2 shrink-0 w-2 h-2 rounded-full ${style.dot}`} />
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* footer */}
                <div className="px-4 py-2.5 border-t text-center">
                  <button className="text-xs font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 cursor-pointer">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
