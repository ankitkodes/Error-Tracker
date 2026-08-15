"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  MonitorSmartphone,
  CodeXml,
  ChartNoAxesCombined,
  FileChartColumnIncreasing,
  AlertCircle,
} from "lucide-react";

const features = [
  {
    id: "realtime",
    title: "Real-time Error Monitoring",
    description:
      "Errors show up in your dashboard instantly with <15ms ingestion latency as they happen in production.",
    icon: MonitorSmartphone,
    visual: (
      <div className="rounded-lg border border-[#202026] bg-[#08070e] p-3 font-mono text-xs text-gray-300">
        <div className="flex items-center justify-between border-b border-[#202026] pb-1.5 mb-2 text-[11px] text-gray-400">
          <span className="text-[#00ffb2] font-semibold">● INGESTING</span>
          <span>14ms latency</span>
        </div>
        <div className="flex items-center gap-2 text-red-400 font-medium">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">TypeError: undefined is not a function</span>
        </div>
      </div>
    ),
  },
  {
    id: "stacktrace",
    title: "Stack Trace Visibility",
    description:
      "Full stack traces with source maps, so you know the exact file path and line number where things broke.",
    icon: CodeXml,
    visual: (
      <div className="rounded-lg border border-[#202026] bg-[#08070e] p-3 font-mono text-[11px]">
        <p className="text-purple-400">at calculateTotal (cart.ts:48:12)</p>
        <p className="text-[#00ffb2] pl-2">at async CheckoutHandler (route.ts:104:5)</p>
        <p className="text-gray-500 pl-4">at Layer.handle (express/router.js:174)</p>
      </div>
    ),
  },
  {
    id: "status",
    title: "Error Status Tracking",
    description:
      "Mark errors as In Process, Fixed, or Bug to manage workflow efficiently without duplicate triage effort.",
    icon: ChartNoAxesCombined,
    visual: (
      <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
        <span className="px-2.5 py-1 rounded-md border border-red-500/40 bg-red-500/10 text-red-400 font-medium">
          ● Unresolved (14)
        </span>
        <span className="px-2.5 py-1 rounded-md border border-yellow-500/40 bg-yellow-500/10 text-yellow-400 font-medium">
          ◐ In Process (3)
        </span>
        <span className="px-2.5 py-1 rounded-md border border-[#00ffb2]/40 bg-[#00ffb2]/10 text-[#00ffb2] font-medium">
          ✓ Fixed (89)
        </span>
      </div>
    ),
  },
  {
    id: "multiproject",
    title: "Multi-Project Support",
    description:
      "Easily manage errors across multiple projects and environments from a single unified admin dashboard.",
    icon: FileChartColumnIncreasing,
    visual: (
      <div className="grid grid-cols-2 gap-1.5 font-mono text-[11px]">
        <div className="rounded-md border border-[#00ffb2]/40 bg-[#00ffb2]/10 px-2 py-1.5 text-gray-200">
          <span className="text-[#00ffb2] font-semibold">prod-web</span>
          <span className="block text-[10px] text-gray-400">Env: Production</span>
        </div>
        <div className="rounded-md border border-[#202026] bg-[#08070e] px-2 py-1.5 text-gray-300">
          <span className="text-gray-300 font-semibold">auth-api</span>
          <span className="block text-[10px] text-gray-400">Env: Staging</span>
        </div>
      </div>
    ),
  },
];

export default function Features() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
  };

  return (
    <section id="features" className="py-16 px-4 max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-white font-heading tracking-tight">
          Why Choose BugTrace?
        </h2>
        <p className="mt-3 text-base text-[#d5d5d5]">
          Monitoring designed to detect issues instantly, resolve them faster, and keep your product running without interruption.
        </p>
      </div>

      <motion.div
        variants={containerVariants}
        initial={shouldReduceMotion ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={feature.id}
              variants={itemVariants}
              whileHover={shouldReduceMotion ? {} : { y: -3 }}
              className="flex flex-col justify-between rounded-xl border border-[#202026] bg-[#0a0a0c] p-6 shadow-xl hover:border-[#00ffb2]/50 transition-all duration-200"
            >
              <div>
                <div className="rounded-full flex w-14 h-14 bg-radial from-[#08070e] from-40% to-[#202026] items-center justify-center text-[#00ffb2] mb-4 border border-[#202026]">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-lg text-white font-heading">
                  {feature.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-[#d5d5d5] leading-relaxed">
                  {feature.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#202026]">
                {feature.visual}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
