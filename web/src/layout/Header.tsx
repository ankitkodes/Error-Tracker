"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Bug } from "lucide-react";
import { FaGithub } from "react-icons/fa6";

const navigation = [
  { name: "Features", href: "#features" },
  { name: "How it Works", href: "#howitwork" },
  { name: "Pricing", href: "#pricing" },
  { name: "Docs", href: "/setup" },
  { name: "FAQ", href: "#faq" },
];

export default function Header({ showHero }: { showHero?: boolean } = {}) {
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
    <header
      className={`fixed top-0 inset-x-0 z-[100] w-full transition-all duration-300 ${
        isScrolled
          ? "bg-black/80 backdrop-blur-xl border-b border-[#202026] shadow-lg py-2.5"
          : "bg-transparent border-b border-transparent py-4"
      }`}
    >
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group focus-visible:ring-2 focus-visible:ring-[#00ffb2] rounded-lg">
          <div className="p-2 rounded-lg bg-[#00ffb2] group-hover:shadow-[0_0_15px_rgba(0,255,178,0.4)] transition-shadow">
            <Bug className="w-5 h-5 text-black" />
          </div>
          <span className="text-xl font-bold font-heading bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 tracking-tight">
            BugTrace
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-gray-300 hover:text-[#00ffb2] transition-colors focus-visible:ring-2 focus-visible:ring-[#00ffb2] rounded"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Right Action Controls: GitHub icon + Log in + Get Started */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href="https://github.com/ankitkodes/Error-Tracker"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View BugTrace repository on GitHub"
            className="p-2 rounded-lg border border-[#202026] bg-[#0a0a0c] text-gray-300 hover:text-[#00ffb2] hover:border-[#00ffb2] transition-all focus-visible:ring-2 focus-visible:ring-[#00ffb2]"
          >
            <FaGithub className="w-4.5 h-4.5" />
          </a>

          <Link
            href="/signin"
            className="text-sm font-medium text-gray-300 hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-[#00ffb2] px-3 py-2 rounded-lg"
          >
            Log in
          </Link>

          <Link
            href="/signup"
            className="rounded-full bg-[#00ffb2] px-5 py-2 text-sm font-semibold text-black shadow-md hover:bg-[#00e6a0] transition-all hover:scale-[1.02] focus-visible:ring-2 focus-visible:ring-white"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 text-gray-400 hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-[#00ffb2] rounded-lg"
            aria-label="Open navigation menu"
          >
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-[110] bg-black/70 backdrop-blur-sm" />
        <DialogPanel className="fixed inset-y-0 right-0 z-[120] w-full max-w-xs bg-[#0a0a0c] border-l border-[#202026] p-6 shadow-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-6 border-b border-[#202026]">
              <Link href="/" className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-[#00ffb2]">
                  <Bug className="w-4 h-4 text-black" />
                </div>
                <span className="text-lg font-bold text-white font-heading">
                  BugTrace
                </span>
              </Link>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-gray-400 hover:text-white transition-colors"
                aria-label="Close navigation menu"
              >
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            <div className="py-6 space-y-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block rounded-lg px-3 py-2 text-base font-medium text-gray-300 hover:bg-[#141222] hover:text-[#00ffb2] transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-[#202026] space-y-3">
            <a
              href="https://github.com/ankitkodes/Error-Tracker"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full rounded-lg border border-[#202026] bg-[#121118] py-2.5 text-sm font-medium text-gray-300 hover:text-[#00ffb2]"
            >
              <FaGithub className="w-4 h-4" />
              <span>GitHub Repository</span>
            </a>

            <Link
              href="/signin"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center rounded-lg border border-[#202026] py-2.5 text-sm font-medium text-white hover:bg-[#121118]"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center rounded-full bg-[#00ffb2] py-2.5 text-sm font-semibold text-black shadow-md hover:bg-[#00e6a0]"
            >
              Get Started
            </Link>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}