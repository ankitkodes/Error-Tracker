"use client";
import { motion } from "framer-motion";

export default function CTA() {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: "easeOut" as const }}
      className="bg-gradient-to-b pointer-events-none from-white/12 w-full h-1/10 to-transparent blur-4xl"
    >
      <div className=" py-8 flex item-center  justify-center pointer-events-auto">
        <div className="flex flex-col  text-center gap-7 max-w-lg">
          <p className="font-bold text-3xl sm:text-5xl leading-tight text-white">
            Start catching bugs before your user do.
          </p>
          <p className="text-base  text-[#d5d5d5] leading-relaxed ">
            BugTrace helps you identify and resolve frontend and backend
            errors in real-time. No setup headaches — just add a script and
            go.
          </p>
          <div className="justify-center">
            <button className="border-2 px-4 py-2 bg-[#00ffb2] text-black border-[#00ffb2] rounded-full font-semibold cursor-pointer max-w-max hover:bg-[#081114] hover:text-white transition-colors duration-300">
              Get Started for Free
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
