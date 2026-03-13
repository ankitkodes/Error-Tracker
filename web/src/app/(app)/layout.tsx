"use client";
import { Sidebar } from "@/components/ui/sidebar";
import { SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { links } from "@/config/sidebarMenu";
import { useState } from "react";
import { cn } from "@/lib/utils";
import DashboardNavbar from "@/components/Dasboard-navbar";
import { useSession, signOut } from "next-auth/react";
import { LogOut} from "lucide-react";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <div
      className={cn(
        "mx-auto flex w-full bg-background text-foreground flex-1 flex-col overflow-hidden md:flex-row ",
        "h-screen",
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="flex flex-col h-full justify-between">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto relative ">
            <div className="mt-2 flex flex-col gap-2 ">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-2 border-t border-border pt-4">
            {open ? (
              <div className="flex items-center justify-between px-2 overflow-hidden">
                <Link href="/profile" className="flex flex-col truncate w-full pr-2">
                  <span className="text-sm text-foreground font-medium truncate">
                    {session?.user?.name || "User"}
                  </span>
                  <span className="text-xs text-muted-foreground truncate">
                    {session?.user?.email || "No Email"}
                  </span>
                </Link>
                <button
                  onClick={() => signOut()}
                  className="p-1 text-muted-foreground hover:text-foreground transition-colors cursor-pointer shrink-0"
                  title="Sign out"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <div className="flex justify-center">
                <button
                  onClick={() => signOut()}
                  className="p-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                  title="Sign out"
                >
                  <LogOut size={20} />
                </button>
              </div>
            )}
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
