"use client";

import { motion } from "motion/react";
import { Zap } from "lucide-react";

export const Logo = () => {
  return (
    <a
      href="#"
      className="relative z-20 flex items-center space-x-2  text-sm font-normal text-black"
    >
      <div className=" border-1 border-[#00ffb2] bg-[#00ffb2] p-1  rounded-lg">
        <Zap className="h-5 w-5 shrink-0" />
      </div>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium whitespace-pre text-white dark:text-white text-xl "
      >
        BugTrace
      </motion.span>
    </a>
  );
};
export const LogoIcon = () => {
  return (
    <a
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      (
      <div className="border-1 border-[#00ffb2] bg-[#00ffb2]  rounded-lg">
        <Zap className="h-5 w-5 shrink-0" />
      </div>
    </a>
  );
};
