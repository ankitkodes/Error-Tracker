"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { Check, Sparkles, Clock, ArrowRight } from "lucide-react";

export default function Pricing() {
  const shouldReduceMotion = useReducedMotion();
  const [waitlistSuccess, setWaitlistSuccess] = useState(false);
  const [waitlistEmail, setWaitlistEmail] = useState("");

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (waitlistEmail.trim()) {
      setWaitlistSuccess(true);
      setWaitlistEmail("");
    }
  };

  return (
    <section id="pricing" className="py-16 px-4 max-w-5xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-white font-heading tracking-tight">
          Simple, Transparent Pricing
        </h2>
        <p className="mt-3 text-base text-[#d5d5d5]">
          Start for free today. Upgrade as your application traffic and engineering team grows.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        {/* Free Plan Card */}
        <motion.div
          whileHover={shouldReduceMotion ? {} : { y: -4 }}
          transition={{ duration: 0.2 }}
          className="flex flex-col justify-between rounded-xl border-2 border-[#00ffb2] bg-[#0a0a0c] p-8 shadow-2xl relative"
        >
          <div className="absolute -top-3.5 right-6 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00ffb2] text-xs font-semibold text-black shadow-md font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Active Free Tier</span>
          </div>

          <div>
            <h3 className="text-xl font-bold text-white font-heading">
              Developer Free
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-[#d5d5d5] leading-relaxed">
              Ideal for indie developers, personal projects, and early MVPs needing real-time error tracking.
            </p>

            <div className="mt-6 flex items-baseline gap-1">
              <span className="text-4xl font-extrabold text-white font-heading">$0</span>
              <span className="text-sm font-mono text-gray-400">/ forever</span>
            </div>

            <ul className="mt-8 space-y-3 text-xs sm:text-sm text-gray-300">
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#00ffb2] shrink-0" />
                <span><strong>1 Active Project</strong></span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#00ffb2] shrink-0" />
                <span><strong>10,000 Error Events</strong> / month</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#00ffb2] shrink-0" />
                <span>Real-Time Ingestion & Stack Traces</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#00ffb2] shrink-0" />
                <span>7-Day Log Data Retention</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#00ffb2] shrink-0" />
                <span>Community & GitHub Support</span>
              </li>
            </ul>
          </div>

          <div className="mt-10 pt-6 border-t border-[#202026]">
            <Link
              href="/signup"
              className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-[#00ffb2] px-6 py-3.5 text-sm font-semibold text-black shadow-md hover:bg-[#00e6a0] transition-all focus-visible:ring-2 focus-visible:ring-white"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>

        {/* Pro Plan Card (Coming Soon / Waitlist) */}
        <motion.div
          whileHover={shouldReduceMotion ? {} : { y: -4 }}
          transition={{ duration: 0.2 }}
          className="flex flex-col justify-between rounded-xl border border-[#202026] bg-[#0a0a0c]/80 p-8 shadow-xl relative opacity-90"
        >
          <div className="absolute -top-3.5 right-6 inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-gray-600 bg-[#121118] text-xs font-mono text-gray-300 shadow-md">
            <Clock className="w-3.5 h-3.5 text-yellow-400" />
            <span>Coming Soon</span>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-200 font-heading">
              Pro Team
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-[#d5d5d5] leading-relaxed">
              Designed for scaling startups and engineering teams needing instant alert webhooks & high event limits.
            </p>

            <div className="mt-6 flex items-baseline gap-1">
              <span className="text-4xl font-extrabold text-gray-300 font-heading">$19</span>
              <span className="text-sm font-mono text-gray-400">/ month</span>
            </div>

            <ul className="mt-8 space-y-3 text-xs sm:text-sm text-gray-400">
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#00ffb2] shrink-0" />
                <span><strong>Unlimited Projects & Environments</strong></span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#00ffb2] shrink-0" />
                <span><strong>250,000 Error Events</strong> / month</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#00ffb2] shrink-0" />
                <span>Slack, Discord & Custom Webhooks</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#00ffb2] shrink-0" />
                <span>30-Day Extended Log Retention</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#00ffb2] shrink-0" />
                <span>Priority Email Support & SLA</span>
              </li>
            </ul>
          </div>

          <div className="mt-10 pt-6 border-t border-[#202026]">
            {waitlistSuccess ? (
              <div className="rounded-lg border border-[#00ffb2]/30 bg-[#00ffb2]/10 p-3.5 text-center text-xs font-mono text-[#00ffb2]">
                ✓ You&apos;re on the Pro waitlist! We&apos;ll notify you at launch.
              </div>
            ) : (
              <form onSubmit={handleWaitlistSubmit} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter email for early access"
                  value={waitlistEmail}
                  onChange={(e) => setWaitlistEmail(e.target.value)}
                  className="w-full h-11 rounded-lg bg-[#08070e] border border-[#202026] px-3.5 text-xs text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00ffb2]"
                />
                <button
                  type="submit"
                  className="h-11 rounded-lg bg-[#141222] hover:bg-[#1f1d32] border border-[#202026] text-white font-medium text-xs px-4 transition-all shrink-0 focus-visible:ring-2 focus-visible:ring-[#00ffb2]"
                >
                  Join Waitlist
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
