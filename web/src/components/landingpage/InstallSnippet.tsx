"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check, Copy, Terminal, Zap } from "lucide-react";

export default function InstallSnippet() {
  const [activeTab, setActiveTab] = useState<"install" | "init">("install");
  const [copied, setCopied] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const installCode = `npm install bugtrace-sdk`;
  const initCode = `import { initBugTrace } from 'bugtrace-sdk';

initBugTrace({
  apiKey: process.env.NEXT_PUBLIC_BUGTRACE_KEY,
  environment: process.env.NODE_ENV,
});`;

  const currentCode = activeTab === "install" ? installCode : initCode;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-12 px-4 max-w-5xl mx-auto">
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
        className="rounded-xl border border-[#202026] bg-[#0a0a0c] shadow-2xl overflow-hidden"
      >
        {/* Terminal Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#202026] bg-[#121118] px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <span className="h-3 w-3 rounded-full bg-[#FF5F56]/80 inline-block" />
              <span className="h-3 w-3 rounded-full bg-[#FFBD2E]/80 inline-block" />
              <span className="h-3 w-3 rounded-full bg-[#27C93F]/80 inline-block" />
            </div>
            <div className="flex items-center gap-2 pl-2 text-xs font-mono text-gray-400">
              <Terminal className="w-3.5 h-3.5 text-[#00ffb2]" />
              <span>quickstart.ts</span>
            </div>
          </div>

          {/* Code Tabs */}
          <div className="flex items-center gap-1 rounded-lg bg-[#08070e] p-1 border border-[#202026]">
            <button
              onClick={() => setActiveTab("install")}
              className={`rounded-md px-3 py-1 text-xs font-mono font-medium transition-all focus-visible:ring-2 focus-visible:ring-[#00ffb2] ${
                activeTab === "install"
                  ? "bg-[#00ffb2] text-black shadow-sm"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              1. Install SDK
            </button>
            <button
              onClick={() => setActiveTab("init")}
              className={`rounded-md px-3 py-1 text-xs font-mono font-medium transition-all focus-visible:ring-2 focus-visible:ring-[#00ffb2] ${
                activeTab === "init"
                  ? "bg-[#00ffb2] text-black shadow-sm"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              2. Initialize
            </button>
          </div>
        </div>

        {/* Code Content */}
        <div className="relative p-6 font-mono text-sm sm:text-base leading-relaxed bg-[#08070e] text-gray-200">
          <button
            onClick={handleCopy}
            className="absolute top-4 right-4 flex items-center gap-1.5 rounded-lg border border-[#202026] bg-[#121118] px-3 py-1.5 text-xs text-gray-300 hover:text-white hover:border-[#00ffb2] transition-all focus-visible:ring-2 focus-visible:ring-[#00ffb2]"
            aria-label="Copy code to clipboard"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#00ffb2]" />
                <span className="text-[#00ffb2] font-sans">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span className="font-sans">Copy</span>
              </>
            )}
          </button>

          <pre className="overflow-x-auto text-sm text-gray-200 pt-2 pb-1">
            <code>
              {activeTab === "install" ? (
                <span className="text-[#00ffb2]">
                  <span className="text-gray-500 select-none">$ </span>
                  npm install bugtrace-sdk
                </span>
              ) : (
                <>
                  <span className="text-purple-400">import</span> {"{"}{" "}
                  <span className="text-yellow-300">initBugTrace</span> {"}"}{" "}
                  <span className="text-purple-400">from</span>{" "}
                  <span className="text-[#00ffb2]">&apos;bugtrace-sdk&apos;</span>;
                  {"\n\n"}
                  <span className="text-yellow-300">initBugTrace</span>({"{"}
                  {"\n  "}apiKey:{" "}
                  <span className="text-blue-400">process.env</span>.NEXT_PUBLIC_BUGTRACE_KEY,
                  {"\n  "}environment:{" "}
                  <span className="text-blue-400">process.env</span>.NODE_ENV,
                  {"\n"}{"}"});
                </>
              )}
            </code>
          </pre>
        </div>

        {/* Footer info line */}
        <div className="flex items-center gap-2 border-t border-[#202026] bg-[#0a0a0c] px-6 py-2.5 text-xs text-gray-400 font-mono">
          <Zap className="w-3.5 h-3.5 text-[#00ffb2] shrink-0" />
          <span>Zero dependencies • Under 5KB bundle footprint • Automatic uncaught exception catching</span>
        </div>
      </motion.div>
    </section>
  );
}
