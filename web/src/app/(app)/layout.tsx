"use client"; // Make this layout a client component

// import SidebarMenu, { Logo, LogoIcon } from "@/layout/SidebarMenu";
import { Geist, Geist_Mono } from "next/font/google";
import type { Metadata } from "next";
import { Sidebar } from "@/components/ui/sidebar";
import { SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { links } from "@/config/sidebarMenu";
import { useState } from "react";
import { cn } from "@/lib/utils";
import t1 from "../../../public/Images/logo/3.png";
import Image from "next/image";
import { Logo, LogoIcon } from "@/layout/SidebarMenu";
import HorizontalLine from "@/components/ui/HorizontalLine";

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
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-black text-red-500`}
      >
        <div
          className={cn(
            "mx-auto flex w-full  flex-1 flex-col overflow-hidden   text-gray-500  md:flex-row ",
            "min-h-screen" // for your use case, use `h-screen` instead of `h-[60vh]`
          )}
        >
          <Sidebar open={open} setOpen={setOpen}>
            <SidebarBody className="justify-between gap-10">
              <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto relative">
                {/* <hr /> */}
                {open ? <Logo /> : <LogoIcon />}
                <div className="mt-4 flex flex-col gap-2 ">
                  {links.map((link, idx) => (
                    <SidebarLink key={idx} link={link} />
                  ))}
                </div>
                {/* <div className="fixed bottom-2 left-2">LogOut</div> */}
              </div>
            </SidebarBody>
          </Sidebar>
          {/* <Dashboard /> */}
          <div className="flex flex-1">
            <div className="flex h-full w-full flex-1 flex-col gap-2  border border-[#202026]  p-2 md:p-10">
              <p>this is body of the sidebar section of all</p>
              <main className="text-[#d5d5d5]">{children}</main>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
