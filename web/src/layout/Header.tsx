"use client";

import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { MdArrowOutward } from "react-icons/md";
import Link from "next/link";

const navigation = [
  { name: "Features", href: "#features" },
  { name: "Docs", href: "#" },
  { name: "How It Works", href: "#howitwork" },
  { name: "GitHub", href: "https://github.com/ankitdeveloper7/Error-Tracker" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div>
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          aria-label="Global"
          className="flex items-center justify-between p-6 lg:px-8"
        >
          <div className="flex lg:flex-1">
            <a href="#" className="m-1.5 p-1.5">
              <span className="text-2xl font-semibold text-[#00ffb2]">
                BugTrace
              </span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 p-2.5 text-gray-700"
            >
              <Bars3Icon
                aria-hidden="true"
                className="size-8 text-white cursor-pointer"
              />
            </button>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-semibold text-white hover:text-[#00ffb2]"
                target="_blank"
              >
                {item.name}
              </a>
            ))}
          </div>

          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Link
              href="/signin"
              className="text-sm font-semibold text-white hover:text-[#00ffb2]"
            >
              Start Free <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </nav>

        {/* Mobile Menu */}
        <Dialog
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
          className="lg:hidden"
        >
          <div className="fixed inset-0 z-50 bg-black/80" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-black p-6">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-semibold text-[#00ffb2]">
                BugTrace
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 p-2.5 text-gray-700"
              >
                <XMarkIcon
                  aria-hidden="true"
                  className="size-8 text-white cursor-pointer"
                />
              </button>
            </div>

            <div className="mt-6 divide-y divide-gray-700">
              <div className="space-y-4 py-6">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    className="block rounded-lg px-3 py-2 text-base font-medium text-white hover:bg-gray-100 hover:text-black"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="py-6">
                <Link
                  href="/signin"
                  className="block w-full rounded-lg bg-[#00ffb2] px-3 py-2.5 text-base font-semibold text-black"
                >
                  Start Free
                </Link>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>

      {/* Hero Section */}
      <div className="relative isolate px-6 pt-20 lg:px-8">
        <div className="mx-auto max-w-2xl py-20 sm:py-28 lg:py-36 text-center">
          <h1 className="text-5xl tracking-tight text-[#F5F5F5] sm:text-7xl">
            Catch Bugs Before Your Users Do.
          </h1>
          <p className="mt-8 text-sm text-[#d5d5d5] sm:text-base md:text-lg">
            Get real-time error tracking, detailed stack traces, and instant
            alerts — all in one blazing-fast dashboard.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/signup"
              className="rounded-full bg-[#00ffb2] px-4 py-2.5 text-sm font-semibold text-black shadow-md cursor-pointer"
            >
              <div className="align baseline">
                Get Started Now
                <MdArrowOutward className="pl-1 inline-block" size={22} />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
