"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import installGuide from "../../../public/Images/installGuide.png";
import errorLogs from "../../../public/Images/errorlog.png";
import errorGraph from "../../../public/Images/errorGraph.png";

const steps = [
  {
    step: "1",
    title: "Add the SDK",
    description:
      "Install our SDK in your project with a single command. Works with JavaScript, TypeScript, React, and Node.js.",
    image: installGuide,
    alt: "Installation Guide",
  },
  {
    step: "2",
    title: "Errors get captured automatically",
    description:
      "Our SDK silently listens for uncaught errors, crashes, and unhandled rejections without extra manual configuration.",
    image: errorLogs,
    alt: "Automatic Error Logs Stream",
  },
  {
    step: "3",
    title: "View and debug in the dashboard",
    description:
      "See errors in real-time with full stack traces, user context, environment details, and actionable status tracking.",
    image: errorGraph,
    alt: "BugTrace Real-Time Dashboard",
  },
];

export default function HowitWork() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  return (
    <section id="howitwork" className="py-16 px-4 max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-white font-heading tracking-tight">
          How it Works
        </h2>
        <p className="mt-3 text-base text-[#d5d5d5]">
          Install once. Errors get captured automatically. Debug everything from a single dashboard.
        </p>
      </div>

      <motion.div
        variants={containerVariants}
        initial={shouldReduceMotion ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {steps.map((item) => (
          <motion.div
            key={item.step}
            variants={itemVariants}
            className="flex flex-col justify-between rounded-xl border border-[#202026] bg-[#0a0a0c] overflow-hidden shadow-xl"
          >
            {/* Window Chrome Framing */}
            <div className="border-b border-[#202026] bg-[#121118]">
              <div className="flex items-center justify-between px-4 py-2.5">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F56]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#27C93F]" />
                </div>
                <span className="text-[11px] font-mono text-gray-400">
                  Step 0{item.step}
                </span>
              </div>
              <div className="relative h-48 sm:h-52 w-full bg-[#08070e] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.alt}
                  className="w-full h-full object-cover object-top opacity-90 transition-transform duration-300 hover:scale-105"
                />
              </div>
            </div>

            {/* Step Content */}
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <div className="rounded-full flex size-10 bg-radial from-[#08070e] from-40% to-[#202026] items-center justify-center text-[#00ffb2] font-mono font-bold text-sm mb-4 border border-[#202026]">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-white font-heading">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-[#d5d5d5] leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
