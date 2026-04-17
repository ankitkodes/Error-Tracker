"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { MdArrowOutward } from "react-icons/md";
import Link from "next/link";
import { Bug } from "lucide-react";
import { motion } from "framer-motion";

const navigation = [
  { name: "Features", href: "#features" },
  { name: "How it Works", href: "#howitwork" },
  { name: "Docs", href: "/setup" },
  { name: "GitHub", href: "https://github.com/ankitkodes/Error-Tracker" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className={`fixed top-0 inset-x-0 z-[100] w-full transition-all duration-300 ${
        isScrolled 
          ? "bg-black/60 backdrop-blur-xl border-b border-white/[0.08] shadow-sm py-2" 
          : "bg-transparent border-transparent py-4"
      }`}>
        <nav
          aria-label="Global"
          className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8"
        >
          <div className="flex">
            <a href="#" className="m-1.5 pb-3 p-1.5">
              <div className="flex items-center justify-center gap-2 group">
                <div className="p-2 rounded-lg bg-[#00ffb2] group-hover:shadow-[0_0_15px_rgba(0,255,178,0.4)] transition-shadow">
                  <Bug className="w-5 h-5 text-black" />
                </div>
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">BugTrace</span>
              </div>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 p-2.5 text-gray-400 hover:text-white transition-colors"
            >
              <Bars3Icon
                aria-hidden="true"
                className="size-8 cursor-pointer"
              />
            </button>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex lg:gap-x-8 items-center bg-white/[0.03] px-6 py-2 rounded-full">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-gray-300 hover:text-[#00ffb2] transition-colors duration-200"
                target={item.name === "GitHub" ? "_blank" : undefined}
                rel={item.name === "GitHub" ? "noopener noreferrer" : undefined}
              >
                {item.name}
              </a>
            ))}
          </div>

          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Link
              href="/signin"
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-all duration-300 shadow-md ${
                isScrolled
                  ? "bg-[#00ffb2] hover:bg-[#00e6a0] border border-[#00ffb2] text-black"
                  : "bg-white/10 hover:bg-white/20 border border-white/10 text-white backdrop-blur-md"
              }`}
            >
              Log in
            </Link>
          </div>
        </nav>

        {/* Mobile Menu */}
        <Dialog
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
          className="lg:hidden"
        >
          <div className="fixed inset-0 z-[110] bg-black/60 backdrop-blur-sm" />
          <DialogPanel className="fixed inset-y-0 right-0 z-[120] w-full max-w-sm bg-[#0a0a0c] border-l border-white/5 p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center justify-center gap-2">
                <div className="p-1.5 rounded-lg bg-[#00ffb2] shadow-[0_0_10px_rgba(0,255,178,0.2)]">
                  <Bug className="w-4 h-4 text-black" />
                </div>
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">BugTrace</span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 p-2.5 text-gray-400 hover:text-white transition-colors"
              >
                <XMarkIcon
                  aria-hidden="true"
                  className="size-8 cursor-pointer"
                />
              </button>
            </div>

            <div className="mt-8 divide-y divide-white/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    target={item.name === "GitHub" ? "_blank" : undefined}
                    rel={item.name === "GitHub" ? "noopener noreferrer" : undefined}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block rounded-lg px-4 py-3 text-base font-medium text-gray-300 hover:bg-white/5 hover:text-[#00ffb2] transition-colors"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="py-6 flex flex-col gap-3">
                <Link
                  href="/signin"
                  className="block w-full text-center rounded-lg bg-[#00ffb2] px-4 py-3 text-base font-semibold text-black hover:bg-[#00e6a0] transition-colors shadow-md"
                >
                  Log in
                </Link>
                <Link
                  href="/signup"
                  className="block w-full text-center rounded-lg bg-[#00ffb2] px-4 py-3 text-base font-semibold text-black hover:bg-[#00e6a0] transition-colors shadow-md"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>

      <div className="relative overflow-hidden w-full pt-16 mt-4 md:mt-2">
        <div
          className="absolute top-1/2 -translate-y-1/2 -right-[20%] sm:-right-[30%] lg:-right-[45%]
          w-[400px] sm:w-[600px] lg:w-[1000px] h-[400px] sm:h-[600px] lg:h-[900px] rounded-full
          bg-[radial-gradient(circle,rgba(255,255,255,0.10)_20%,rgba(255,255,255,0.04)_45%,transparent_90%)]
          blur-2xl pointer-events-none"
        />
        <div
          className="absolute -left-[20%] sm:-left-[30%] lg:-left-[50%] -top-[10%] sm:-top-[30%] lg:-top-[50%]
          w-[400px] sm:w-[600px] lg:w-[1000px] h-[400px] sm:h-[600px] lg:h-[900px] rounded-full
          bg-[radial-gradient(circle,rgba(255,255,255,0.10)_20%,rgba(255,255,255,0.04)_45%,transparent_90%)]
          blur-3xl pointer-events-none"
        />

        {/* Hero Section */}
      <div className="relative isolate px-6 pt-10 lg:px-8">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1,
              },
            },
          }}
          className="mx-auto max-w-2xl py-15 sm:py-23 lg:py-30 text-center"
        >
          <motion.h1 
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
            }}
            className="text-4xl tracking-tight text-[#F5F5F5] sm:text-7xl font-bold"
          >
            Catch Bugs Before Your Users Do.
          </motion.h1>
          <motion.p 
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
            }}
            className="mt-8 text-sm text-[#d5d5d5] sm:text-base md:text-lg"
          >
            The modern error tracking platform built for developers who ship
            fast. Get real-time insights, full context, and actionable
            alerts—all in one place.
          </motion.p>
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
            }}
            className="mt-10 flex items-center justify-center gap-x-6"
          >
            <Link
              href="/signup"
              className="rounded-full bg-[#00ffb2] px-4 py-2.5 text-sm font-semibold text-black shadow-md cursor-pointer hover:bg-[#00e6a0] transition-colors"
            >
              <button className="align baseline">
                Get Started Now
                <MdArrowOutward className="pl-1 inline-block" size={22} />
              </button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
    </>
  );
}