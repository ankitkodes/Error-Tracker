"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Zap, HeartHandshake } from "lucide-react";

export default function CTA() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="py-16 px-4 max-w-5xl mx-auto">
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.97, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, ease: "easeOut" as const }}
        className="relative rounded-2xl border border-[#202026] bg-gradient-to-b from-[#121118] via-[#0a0a0c] to-[#08070e] p-8 sm:p-14 text-center overflow-hidden shadow-2xl"
      >
        {/* Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-[#00ffb2]/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-bold text-white font-heading leading-tight tracking-tight">
            Start Catching Bugs Before Your Users Do.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#d5d5d5] leading-relaxed">
            BugTrace helps you identify and resolve frontend and backend errors in real-time. No setup headaches — just add a script and go.
          </p>

          <div className="mt-8 flex flex-col items-center gap-4">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#00ffb2] px-8 py-3.5 text-base font-semibold text-black shadow-lg hover:bg-[#00e6a0] transition-all hover:scale-[1.02] active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-white"
            >
              <span>Get Started for Free</span>
              <ArrowRight className="w-5 h-5" />
            </Link>

            {/* Reassurance line */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-gray-400 font-mono pt-2">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#00ffb2]" />
                No credit card required
              </span>
              <span className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-yellow-400" />
                Set up in under 2 minutes
              </span>
              <span className="flex items-center gap-1.5">
                <HeartHandshake className="w-4 h-4 text-[#00ffb2]" />
                Free forever plan
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
