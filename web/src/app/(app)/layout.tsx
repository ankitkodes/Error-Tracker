"use client";
import { Sidebar } from "@/components/ui/sidebar";
import { SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { links } from "@/config/sidebarMenu";
import { useState } from "react";
import { cn } from "@/lib/utils";
import DashboardNavbar from "@/components/Dasboard-navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "mx-auto flex w-full bg-background text-foreground flex-1 flex-col overflow-hidden md:flex-row ",
        "h-screen",
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto relative ">
            <div className="mt-2 flex flex-col gap-2 ">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
        </SidebarBody>
      </Sidebar>
      {/* <Dashboard /> */}
      <div className="flex flex-1 overflow-y-auto h-full dark:bg-background dark:text-foreground bg-white text-black border-l border-border">
        <div className="flex w-full flex-1 flex-col gap-2">
          <main className="flex flex-col flex-1 w-full">
            <div className="w-full hidden md:contents">
              <DashboardNavbar />
              <hr />
            </div>
            <div className="p-2 md:p-4 flex-1">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
