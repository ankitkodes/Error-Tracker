"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check, X, ShieldAlert, Zap } from "lucide-react";

const comparisonData = [
  {
    feature: "SDK Footprint & Overhead",
    bugtrace: "< 5KB (Zero-dependency async collector)",
    others: "100KB+ (Heavy bundled SDKs & session replay)",
    highlight: true,
  },
  {
    feature: "Setup Complexity",
    bugtrace: "< 2 Minutes (Install package & paste API key)",
    others: "30+ Minutes (Complex project configurations)",
    highlight: true,
  },
  {
    feature: "Pricing Model",
    bugtrace: "Simple, predictable free plan with flat limits",
    others: "Complex usage spikes & unexpected seat invoices",
    highlight: false,
  },
  {
    feature: "Core Focus",
    bugtrace: "Streamlined real-time error tracking & stack traces",
    others: "Heavy enterprise APM suites & profiling overhead",
    highlight: false,
  },
  {
    feature: "Developer Experience",
    bugtrace: "Open-source friendly, minimal & instant setup",
    others: "Proprietary black-box enterprise platform",
    highlight: true,
  },
];

export default function Comparison() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="py-16 px-4 max-w-5xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00ffb2]/40 bg-[#00ffb2]/10 text-xs font-mono text-[#00ffb2] mb-4">
          <Zap className="w-3.5 h-3.5" />
          <span>Honest Comparison</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-white font-heading tracking-tight">
          How is BugTrace Different?
        </h2>
        <p className="mt-3 text-base text-[#d5d5d5]">
          We intentionally skip enterprise bloat to focus on what matters: lightweight setup, instant stack traces, and zero performance penalty.
        </p>
      </div>

      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
        className="rounded-xl border border-[#202026] bg-[#0a0a0c] shadow-2xl overflow-hidden"
      >
        {/* Table Header */}
        <div className="grid grid-cols-12 border-b border-[#202026] bg-[#121118] p-4 sm:p-6 text-xs sm:text-sm font-semibold font-heading">
          <div className="col-span-5 text-gray-300">Feature / Dimension</div>
          <div className="col-span-4 text-[#00ffb2] flex items-center gap-1.5 font-bold">
            <span className="h-2 w-2 rounded-full bg-[#00ffb2]" />
            BugTrace
          </div>
          <div className="col-span-3 text-gray-400">Legacy APM / Sentry</div>
        </div>

        {/* Rows */}
        <div className="divide-y divide-[#202026] text-xs sm:text-sm">
          {comparisonData.map((row, idx) => (
            <div
              key={idx}
              className={`grid grid-cols-12 p-4 sm:p-6 items-center transition-colors ${
                row.highlight ? "bg-[#00ffb2]/5" : "hover:bg-[#121118]"
              }`}
            >
              <div className="col-span-5 font-medium text-white pr-2">
                {row.feature}
              </div>
              <div className="col-span-4 text-[#00ffb2] font-mono flex items-start gap-2 pr-2">
                <Check className="w-4 h-4 text-[#00ffb2] shrink-0 mt-0.5" />
                <span>{row.bugtrace}</span>
              </div>
              <div className="col-span-3 text-gray-400 font-mono flex items-start gap-2">
                <X className="w-4 h-4 text-gray-500 shrink-0 mt-0.5" />
                <span className="line-through text-gray-400">{row.others}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Footnote */}
        <div className="border-t border-[#202026] bg-[#121118] p-4 sm:p-6 text-xs sm:text-sm text-gray-400 flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-white">Honest Note: </span>
            If you require full video session replays or complex enterprise SAML/SSO profiling, big APM platforms may fit your team better today. If you want a fast, clean, zero-bloat error tracker for web apps, BugTrace is built for you.
          </div>
        </div>
      </motion.div>
    </section>
  );
}
