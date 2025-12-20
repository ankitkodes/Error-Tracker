"use client";
// import React, { useEffect, useState } from "react";
// import { Sidebar, SidebarBody, SidebarLink } from "../../components/ui/sidebar";

import { motion } from "motion/react";
import { Zap } from "lucide-react";
// import { cn } from "@/lib/utils";
import { usesetSidebarname } from "@/store/sidebarname";

export const Logo = () => {
  return (
    <a
      href="#"
      className="relative z-20 flex items-center space-x-2  text-sm font-normal text-black"
    >
      <div className=" border-1 border-[#00ffb2] bg-[#00ffb2] p-1  rounded-lg">
        <Zap className="h-5 w-5 shrink-0" />
      </div>

    </a>
  );
};
export const LogoIcon = () => {
  return (
    <a
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      (
      <div className="border-1 border-[#00ffb2] bg-[#00ffb2]  rounded-lg">
        <Zap className="h-5 w-5 shrink-0" />
      </div>
    </a>
  );
};

// Dummy dashboard component with content
const Dashboard = () => {
  const dashboarname = usesetSidebarname((state) => state.name);
  if (dashboarname == "Project") {
    return (
      <div className="flex flex-1">
        <div className="flex h-full w-full flex-1 flex-col gap-2 rounded-tl-2xl border border-neutral-200 bg-white p-2 md:p-10 dark:border-neutral-700 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200">
          {/* <div className="flex gap-2">
          {[...new Array(4)].map((i, idx) => (
            <div
              key={"first-array-demo-1" + idx}
              className="h-20 w-full animate-pulse rounded-lg bg-gray-100 dark:bg-neutral-800"
            ></div>
          ))}
        </div>
        <div className="flex flex-1 gap-2">
          {[...new Array(2)].map((i, idx) => (
            <div
              key={"second-array-demo-1" + idx}
              className="h-full w-full animate-pulse rounded-lg bg-gray-100 dark:bg-neutral-800"
            ></div>
          ))}
        </div> */}
          <p>this is project section</p>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-1">
      <div className="flex h-full w-full flex-1 flex-col gap-2 rounded-tl-2xl border border-neutral-200 bg-white p-2 md:p-10 dark:border-neutral-700 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200">
        {/* <div className="flex gap-2">
          {[...new Array(4)].map((i, idx) => (
            <div
              key={"first-array-demo-1" + idx}
              className="h-20 w-full animate-pulse rounded-lg bg-gray-100 dark:bg-neutral-800"
            ></div>
          ))}
        </div>
        <div className="flex flex-1 gap-2">
          {[...new Array(2)].map((i, idx) => (
            <div
              key={"second-array-demo-1" + idx}
              className="h-full w-full animate-pulse rounded-lg bg-gray-100 dark:bg-neutral-800"
            ></div>
          ))}
        </div> */}
        <p>this is dashboard section</p>
      </div>
    </div>
  );
};
