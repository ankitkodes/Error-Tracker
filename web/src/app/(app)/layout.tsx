"use client";
import { Geist, Geist_Mono } from "next/font/google";
import { Sidebar } from "@/components/ui/sidebar";
import { SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { links } from "@/config/sidebarMenu";
import { useState } from "react";
import { cn } from "@/lib/utils";
import DashboardNavbar from "@/components/Dasboard-navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} `}>
        <div
          className={cn(
            "mx-auto flex w-full  flex-1 flex-col overflow-hidden   text-black  md:flex-row ",
            "h-screen" // for your use case, use `h-screen` instead of `h-[60vh]`
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
          <div className="flex flex-1 text-black bg-white overflow-y-auto">
            <div className="flex min-h-full w-full flex-1 flex-col gap-2  border border-neutral-200">
              <main className="text-black bg-white">
                <div className="w-full hidden md:contents">
                  <DashboardNavbar />
                  <hr />
                </div>
                <div className="p-2 md:p-4">{children}</div>
              </main>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
