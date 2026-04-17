"use client";

import HorizontalLine from "../ui/HorizontalLine";
import installGuide from "../../../public/Images/installGuide.png";
import errorLogs from "../../../public/Images/errorlog.png";
import Image from "next/image";
import errorGraph from "../../../public/Images/errorGraph.png";
import { motion } from "motion/react";

export default function HowitWork() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as any } },
  };

  return (
    <section id="howitwork">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-3"
      >
        <div className="col-span-2 p-4 border-b-2 md:border-b-0 md:border-r-2 border-[#202026]">
          <div className="text-2xl sm:text-3xl md:text-4xl font-sans font-semibold">
            How it Works
          </div>
          <div className="text-sm sm:text-base py-2 text-subheading">
            Install once. Errors get captured automatically. Debug everything
            from a single dashboard.
          </div>
        </div>
        <div className="relative">
          <button className="font-normal text-base sm:text-lg md:text-lg text-[#00ffb2] cursor-pointer border-[#202026] md:border-t-2 w-full md:absolute md:right-0 md:bottom-0 py-4 hover:bg-[#081114]">
            Start Monitoring Now →
          </button>
        </div>
      </motion.div>

      <HorizontalLine />
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 text-sm sm:text-base">
          <motion.div variants={itemVariants} className="border-b-2 md:border-b-0 sm:border-r-2 border-[#202026] text-left">
            <div className="w-full relative h-full bg-gradient-to-b from-[#1a1920] to-[#08070e]">
              <div className="absolute z-10 left-2 rounded-full flex size-18 md:size-12 bg-radial from-[#08070e] from-40% to-[#202026] items-center justify-center text-white m-2">
                1
              </div>
              <div className="pl-8 pt-8">
                <Image
                  src={installGuide}
                  alt="Installation Guide"
                  className="w-full [mask-image:linear-gradient(to_bottom,black,transparent)]"
                />
              </div>
              <div className="flex flex-col gap-2 px-6 pb-4 text-[#f5f5f5] not-italic">
                <h1 className="font-medium text-base sm:text-lg">Add the SDK</h1>
                <p className="font-normal text-sm sm:text-base text-subheading">
                  Install our SDK in your project. Works with JavaScript,
                  TypeScript, React, and Node.js.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="border-b-2 md:border-b-0 md:border-r-2 border-[#202026]">
            <div className="w-full relative h-full bg-gradient-to-b from-[#1a1920] to-[#08070e]">
              <div className="absolute z-10 left-2 rounded-full flex size-18 md:size-12 bg-radial from-[#08070e] from-40% to-[#202026] items-center justify-center text-white m-2">
                2
              </div>
              <div className="pl-8 pt-8">
                <Image
                  src={errorLogs}
                  alt="error log of application"
                  className="w-full [mask-image:linear-gradient(to_bottom,black,transparent)]"
                />
              </div>
              <div className="flex flex-col gap-2 px-6 pb-4 text-[#f5f5f5] not-italic">
                <h1 className="font-medium text-base sm:text-lg">
                  Errors get captured automatically
                </h1>
                <p className="font-normal text-sm sm:text-base text-subheading">
                  Our SDK listens for errors, crashes, and unhandled rejections
                  without extra configuration.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="grid gap-1">
            <div className="w-full relative h-full bg-gradient-to-b from-[#1a1920] to-[#08070e]">
              <div className="absolute z-10 left-2 rounded-full flex size-18 md:size-12 bg-radial from-[#08070e] from-40% to-[#202026] items-center justify-center text-white m-2">
                3
              </div>
              <div className="pl-8 pt-8">
                <Image
                  src={errorGraph}
                  alt="error log of application"
                  className="w-full [mask-image:linear-gradient(to_bottom,black,transparent)]"
                />
              </div>
              <div className="flex flex-col gap-2 px-6 pb-4 text-[#f5f5f5] not-italic">
                <h1 className="font-medium text-base sm:text-lg">
                  View and debug in the dashboard
                </h1>
                <p className="font-normal text-sm sm:text-base text-subheading">
                  See errors in real-time with full stack traces, user context,
                  and environment details.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
      <HorizontalLine />
    </section>
  );
}
