"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { MdArrowOutward } from "react-icons/md";
import { Terminal, Activity, CheckCircle2, FileCode, AlertTriangle } from "lucide-react";
import dashboard from "../../../public/Images/dashboard.png";

// Real-time simulated error telemetry queue for hero visual moment
const mockErrorEvents = [
  {
    id: 1,
    type: "TypeError",
    message: "Cannot read properties of undefined (reading 'user')",
    file: "app/api/auth/route.ts:42",
    timestamp: "Just now",
    latency: "12ms",
    severity: "CRITICAL",
  },
  {
    id: 2,
    type: "UnhandledRejection",
    message: "PostgreSQL Query Timeout after 5000ms",
    file: "lib/db/query.ts:108",
    timestamp: "2s ago",
    latency: "8ms",
    severity: "HIGH",
  },
  {
    id: 3,
    type: "NetworkError",
    message: "Failed to fetch /api/ingest (503 Service Unavailable)",
    file: "sdk/ingest.ts:19",
    timestamp: "5s ago",
    latency: "15ms",
    severity: "MEDIUM",
  },
];

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const [activeErrorIndex, setActiveErrorIndex] = useState(0);

  useEffect(() => {
    if (shouldReduceMotion) return;
    const interval = setInterval(() => {
      setActiveErrorIndex((prev) => (prev + 1) % mockErrorEvents.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [shouldReduceMotion]);

  const activeError = mockErrorEvents[activeErrorIndex];

  return (
    <section className="relative pt-24 pb-12 overflow-hidden">
      {/* Background ambient lighting from original theme */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[120px] -translate-y-1/2 bg-gradient-to-r from-transparent via-[#00ffb2]/15 to-transparent blur-3xl z-10 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4/5 h-[60px] -translate-y-1/2 bg-gradient-to-r from-transparent via-[#00ffb2]/30 to-transparent blur-2xl z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-20">
        {/* Badge */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#00ffb2]/40 bg-[#00ffb2]/10 text-xs sm:text-sm text-[#00ffb2] font-mono mb-6"
        >
          <span className="flex h-2 w-2 rounded-full bg-[#00ffb2] animate-pulse" />
          <span>BugTrace SDK v1.0 Live</span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#F5F5F5] max-w-4xl mx-auto font-heading leading-tight"
        >
          Catch Bugs Before Your Users Do.
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-base sm:text-lg md:text-xl text-[#d5d5d5] max-w-2xl mx-auto leading-relaxed"
        >
          The modern error tracking platform built for developers who ship fast. Get real-time insights, full context, and actionable alerts—all in one place.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/signup"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#00ffb2] px-6 py-3 text-base font-semibold text-black shadow-md hover:bg-[#00e6a0] transition-all hover:scale-[1.02] active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-white cursor-pointer"
          >
            <span>Get Started Free</span>
            <MdArrowOutward size={20} />
          </Link>
          <Link
            href="/setup"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-[#202026] bg-[#0a0a0c] px-6 py-3 text-base font-medium text-white hover:border-[#00ffb2] transition-all focus-visible:ring-2 focus-visible:ring-[#00ffb2]"
          >
            <Terminal className="w-4 h-4 text-[#00ffb2]" />
            <span>Read the Docs</span>
          </Link>
        </motion.div>

        {/* Framework & Language Trust Row */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 pt-6 border-t border-[#202026] max-w-3xl mx-auto"
        >
          <p className="text-xs uppercase tracking-widest text-gray-400 font-mono mb-4">
            Works seamlessly with your stack
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-gray-300 text-xs sm:text-sm font-mono">
            <span className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#202026] bg-[#0a0a0c]">
              <span className="h-2 w-2 rounded-full bg-yellow-400" />
              JavaScript
            </span>
            <span className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#202026] bg-[#0a0a0c]">
              <span className="h-2 w-2 rounded-full bg-blue-400" />
              TypeScript
            </span>
            <span className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#202026] bg-[#0a0a0c]">
              <span className="h-2 w-2 rounded-full bg-cyan-400" />
              React
            </span>
            <span className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#202026] bg-[#0a0a0c]">
              <span className="h-2 w-2 rounded-full bg-[#00ffb2]" />
              Node.js
            </span>
            <span className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#202026] bg-[#0a0a0c]">
              <span className="h-2 w-2 rounded-full bg-white" />
              Next.js
            </span>
          </div>
        </motion.div>

        {/* Hero Visual Mockup with Browser Chrome */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-12 relative max-w-5xl mx-auto"
        >
          <div className="rounded-xl border border-[#202026] bg-[#0a0a0c] shadow-2xl overflow-hidden text-left">
            {/* macOS Browser Chrome Bar */}
            <div className="flex items-center justify-between border-b border-[#202026] bg-[#121118] px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-[#FF5F56]" />
                <span className="h-3 w-3 rounded-full bg-[#FFBD2E]" />
                <span className="h-3 w-3 rounded-full bg-[#27C93F]" />
              </div>
              <div className="flex items-center gap-2 rounded-md bg-[#08070e] px-3 py-1 text-xs font-mono text-gray-400 border border-[#202026]">
                <span className="text-[#00ffb2]">https://</span>app.bugtrace.in/issues
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
                <Activity className="w-3.5 h-3.5 text-[#00ffb2] animate-pulse" />
                <span>Live Ingestion</span>
              </div>
            </div>

            {/* Dashboard Content & Live Error Overlay */}
            <div className="relative">
              <Image
                src={dashboard}
                alt="BugTrace Dashboard Overview"
                className="w-full h-auto object-cover opacity-90"
                priority
              />

              {/* Animated Toast Card Overlay */}
              <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:bottom-6 sm:w-96 z-20">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeError.id}
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 15, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={shouldReduceMotion ? undefined : { opacity: 0, y: -10, scale: 0.96 }}
                    transition={{ duration: 0.35 }}
                    className="p-4 rounded-xl border border-red-500/30 bg-[#0a0a0c]/95 backdrop-blur-md shadow-2xl text-left"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className="p-1.5 rounded-md bg-red-500/20 text-red-400">
                          <AlertTriangle className="w-4 h-4" />
                        </span>
                        <span className="text-xs font-mono font-semibold text-red-400">
                          {activeError.severity}
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-gray-400">
                        {activeError.timestamp} ({activeError.latency})
                      </span>
                    </div>

                    <p className="mt-2 text-xs sm:text-sm font-mono font-medium text-white line-clamp-1">
                      <span className="text-red-400">{activeError.type}: </span>
                      {activeError.message}
                    </p>

                    <div className="mt-2.5 flex items-center justify-between text-[11px] font-mono text-gray-400 border-t border-[#202026] pt-2">
                      <span className="flex items-center gap-1">
                        <FileCode className="w-3 h-3 text-[#00ffb2]" />
                        {activeError.file}
                      </span>
                      <span className="text-[#00ffb2] flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Captured
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
