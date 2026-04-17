"use client";

import {
  MonitorSmartphone,
  CodeXml,
  ChartNoAxesCombined,
  FileChartColumnIncreasing,
} from "lucide-react";
import HorizontalLine from "../ui/HorizontalLine";
import { motion } from "framer-motion";

export default function Features() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
  };

  return (
    <>
      <section id="features">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 text-base"
        >
          <motion.div variants={itemVariants} className="border-b-2 md:border-b-0 sm:border-r-2 border-[#202026] py-8 px-4 text-left grid gap-1">
            <div className="rounded-full flex w-20 h-20 bg-radial from-[#08070e] from-40% to-[#202026] items-center justify-center text-white">
              <MonitorSmartphone />
            </div>
            <p className="font-semibold">Real-time Error Monitoring</p>
            <p className="text-[#d5d5d5]">
              Errors show up in your dashboard instantly as they happen in
              production.
            </p>
          </motion.div>
          <motion.div variants={itemVariants} className=" border-b-2 md:border-b-0 md:border-r-2 border-[#202026] py-8 px-4  grid gap-1">
            <div className="rounded-full flex w-20 h-20 bg-radial from-[#08070e] from-40% to-[#202026] items-center justify-center text-white">
              <CodeXml />
            </div>
            <p className="font-semibold py-2">Stack trace visibility</p>
            <p className="text-[#d5d5d5]">
              Full stack traces with source maps, so you know exactly where
              things broke.
            </p>
          </motion.div>
          <motion.div variants={itemVariants} className="border-b-2 sm:border-b-0 sm:border-r-2 border-[#202026]  py-8 px-4  grid gap-1">
            <div className="rounded-full flex w-20 h-20 bg-radial from-[#08070e] from-40% to-[#202026] items-center justify-center text-white">
              <ChartNoAxesCombined />
            </div>
            <p className="font-semibold py-2">Error Status Tracking</p>
            <p className="text-[#d5d5d5]">
              Mark errors as In Process, Fixed or Bug to manage workflow
              efficiently.
            </p>
          </motion.div>
          <motion.div variants={itemVariants} className="py-8 px-4 grid gap-1">
            <div className="rounded-full flex w-20 h-20 bg-radial from-[#08070e] from-40% to-[#202026] items-center justify-center text-white">
              <FileChartColumnIncreasing />
            </div>
            <p className="font-semibold py-2">Multi-Project Support</p>
            <p className="text-[#d5d5d5]">
              Easily manage errors across multiple projects from a single admin
              dashboard.
            </p>
          </motion.div>
        </motion.div>
      </section>

      <HorizontalLine />
    </>
  );
}
