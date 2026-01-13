"use client";
import React, { useState, createContext, useContext } from "react";
import { AnimatePresence, motion } from "motion/react";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconFolder,
  IconReport,
  IconAlertHexagon,
  IconUsb,
  IconLayoutSidebar,
  IconBugFilled,
} from "@tabler/icons-react";
import { Zap } from "lucide-react";
import Link from "next/link";

interface Links {
  icon: string;
  label: string;
  href: string;
}

interface SidebarContextProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  animate: boolean;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(
  undefined
);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

export const SidebarProvider = ({
  children,
  open: openProp,
  setOpen: setOpenProp,
  animate = true,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  const [openState, setOpenState] = useState(false);

  const open = openProp !== undefined ? openProp : openState;
  const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState;

  return (
    <SidebarContext.Provider value={{ open, setOpen, animate: animate }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const Sidebar = ({
  children,
  open,
  setOpen,
  animate,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  return (
    <SidebarProvider open={open} setOpen={setOpen} animate={animate}>
      {children}
    </SidebarProvider>
  );
};

export const SidebarBody = (
  props: React.ComponentProps<typeof motion.div> & {
    children?: React.ReactNode;
  }
) => {
  return (
    <div className="bg-white text-black sticky right-0">
      <DesktopSidebar {...props} />
      <MobileSidebar {...(props as React.ComponentProps<"div">)} />
    </div>
  );
};

export const DesktopSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof motion.div> & {
  children?: React.ReactNode;
}) => {
  const { open, setOpen, animate } = useSidebar();
  return (
    <>
      <motion.div
        className={cn(
          "h-full px-4 py-4 hidden  md:flex md:flex-col w-[200px] shrink-0",
          className
        )}
        animate={{
          width: animate ? (open ? "200px" : "60px") : "200px",
        }}
        onClick={() => setOpen(true)}
        {...props}
      >
        <div
          className={cn(
            "mb-4 flex items-center",
            open ? "justify-between" : "justify-center"
          )}
        >
          <div className="flex items-center gap-2">
            <div className=" border-1 border-[#00ffb2] bg-[#00ffb2] p-1  rounded-lg cursor-pointer">
              <Zap className="h-5 w-5 shrink-0" />
            </div>
            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="font-medium text-neutral-800 dark:text-neutral-200 whitespace-pre overflow-hidden"
                >
                  BugTrace
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <IconLayoutSidebar
                  className="text-neutral-800 dark:text-neutral-200 cursor-pointer h-5 w-5"
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpen(false);
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {children}
      </motion.div>
    </>
  );
};

export const MobileSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) => {
  const { open, setOpen } = useSidebar();
  return (
    <>
      <div
        className={cn(
          "h-10 px-4 py-4 flex flex-row md:hidden  items-center justify-between  w-full bg-white border-b border-neutral-200"
        )}
        {...props}
      >
        <div className="font-medium whitespace-pre text-black dark:text-white cursor-pointer">
          BugTrace
        </div>
        <div className="flex justify-end z-20 w-full cursor-pointer">
          <IconMenu2
            className="text-neutral-800 dark:text-neutral-200"
            onClick={() => setOpen(!open)}
          />
        </div>
        <AnimatePresence>
          {open && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 z-[99]"
                onClick={() => setOpen(false)}
              />
              {/* Sidebar */}
              <motion.div
                initial={{ x: "-100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "-100%", opacity: 0 }}
                transition={{
                  duration: 0.3,
                  ease: "easeInOut",
                }}
                className={cn(
                  "fixed h-full w-[80%] max-w-[300px] left-0 top-0 p-10 z-[100] flex flex-col justify-between bg-white dark:bg-neutral-900 shadow-xl",
                  className
                )}
              >
                <div
                  className="absolute right-5 top-5 z-50 text-neutral-800 dark:text-neutral-200 cursor-pointer"
                  onClick={() => setOpen(!open)}
                >
                  <IconX />
                </div>
                {children}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export const SidebarLink = ({
  link,
  className,
  ...props
}: {
  link: Links;
  className?: string;
}) => {
  const { open, animate } = useSidebar();
  // const udpatename = usesetSidebarname((state) => state.updatesidebarname);

  const icon = {
    IconArrowLeft,
    IconBrandTabler,
    IconFolder,
    IconReport,
    IconAlertHexagon,
    IconUsb,
    IconBugFilled,
  };
  type IconName = keyof typeof icon;

  const iconname = link.icon as IconName;
  const Iconcomp = icon[iconname];
  return (
    <Link
      href={link.href}
      className={cn(
        "flex items-center justify-start gap-2  group/sidebar py-2",
        className
      )}
      {...props}
      // onClick={() => udpatename(link.label)}
    >
      <Iconcomp className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200 focus:text-[#00ffb2]" />

      <motion.span
        animate={{
          display: animate ? (open ? "inline-block" : "none") : "inline-block",
          opacity: animate ? (open ? 1 : 0) : 1,
        }}
        className="text-neutral-700 dark:text-neutral-200 text-sm  transition duration-150 whitespace-pre inline-block !p-0 !m-0"
      >
        {link.label}
      </motion.span>
    </Link>
  );
};
