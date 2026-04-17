"use client";

import HorizontalLine from "@/components/ui/HorizontalLine";
import { motion } from "framer-motion";
import CTA from "@/components/landingpage/CTA";
import FAQS from "@/components/landingpage/FAQS";
import Features from "@/components/landingpage/Features";
import HowitWork from "@/components/landingpage/Howitwork";
import dashboard from "../../../public/Images/dashboard.png"
import Footer from "@/layout/Footer";
import Image from "next/image";
import Header from "@/layout/Header";

export default function Home() {
  return (
    <div>
      <Header />
      <div className="flex items-center justify-center max-w-7xl mx-auto px-7 relative mt-4 md:-mt-8 lg:-mt-12">
        {/* Soft wide glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[80px] -translate-y-1/2 bg-gradient-to-r from-transparent via-[#00ffb2]/15 to-transparent blur-3xl z-10 pointer-events-none" />
        {/* Core glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4/5 h-[40px] -translate-y-1/2 bg-gradient-to-r from-transparent via-[#00ffb2]/30 to-transparent blur-2xl z-10 pointer-events-none" />
        {/* Sharp edge highlight (White border) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[90%] h-[2px] bg-gradient-to-r from-transparent via-white/50 to-transparent z-10 pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" as const }}
          className="w-full relative"
        >
          <Image
            src={dashboard}
            alt="Dashboard Image"
            className="w-full h-auto shadow-xl mb-20 border border-[#202026] rounded-xl"
          />
        </motion.div>
      </div>
      <div className="max-w-7xl mx-auto pt-2 px-2 relative overflow-x-hidden md:overflow-visible">
        <div>
          <center className="mb-8 px-2">
            <div className="font-semibold text-4xl ">
              Why choose BugTrace?
            </div>
            <p className="py-4 max-w-lg text-base text-[#d5d5d5]">
              Monitoring designed to detect issues instantly, resolve them faster, and keep your product running without interruption.
            </p>
          </center>
          <HorizontalLine />
          <div className="border-[#202026] border-x-2 mx-5 ">
            <Features />
            <div className="mt-[80px]">
              <HorizontalLine />
            </div>
            <HowitWork />
            <div className="mt-[80px]">
              <HorizontalLine />
            </div>
            <CTA />
            <div className="my-[80px]">
              <HorizontalLine />
            </div>

            <FAQS />
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}
