"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Plus, Minus, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "What types of errors does BugTrace detect?",
    answer:
      "BugTrace captures uncaught JavaScript runtime exceptions, unhandled Promise rejections, API fetch failures, and backend server crashes across Next.js, React, and Node.js applications.",
  },
  {
    question: "Is there a free plan available?",
    answer:
      "Yes — our Developer Free tier includes 10,000 error events per month for 1 active project with full stack trace inspection and 7 days of log data retention.",
  },
  {
    question: "How quickly will I see error reports in my dashboard?",
    answer:
      "Error payloads are processed asynchronously and ingested into your dashboard in real-time — typically appearing within 10 to 50 milliseconds of occurring.",
  },
  {
    question: "Will the BugTrace SDK impact my application's performance?",
    answer:
      "No. The SDK is under 5KB, executes completely asynchronously outside the critical render loop, and uses non-blocking beacon batching so your site load speed remains unchanged.",
  },
  {
    question: "Can I track errors from specific environments only?",
    answer:
      "Yes — you can pass environmental variables (e.g. environment: 'production') to the init function or filter out local development traffic altogether.",
  },
  {
    question: "How do I get started with integration?",
    answer:
      "Simply run `npm install bugtrace-sdk`, copy your project API key from the dashboard, and invoke `initBugTrace({ apiKey })` at your application entry point.",
  },
];

export default function FAQS() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 px-4 max-w-4xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00ffb2]/40 bg-[#00ffb2]/10 text-xs font-mono text-[#00ffb2] mb-4">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Frequently Asked Questions</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-white font-heading tracking-tight">
          Frequently Asked Questions
        </h2>
        <p className="mt-3 text-base text-[#d5d5d5]">
          Find everything you need to know about BugTrace SDK setup, performance, and features.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <motion.div
              key={index}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="rounded-xl border border-[#202026] bg-[#0a0a0c] overflow-hidden transition-colors hover:border-[#00ffb2]/40"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full p-6 text-left flex items-center justify-between gap-4 focus-visible:ring-2 focus-visible:ring-[#00ffb2] focus-visible:outline-none cursor-pointer"
                aria-expanded={isOpen}
              >
                <span className="text-base sm:text-lg font-semibold text-white font-heading">
                  {faq.question}
                </span>
                <span className="p-1.5 rounded-lg border border-[#202026] bg-[#121118] text-[#00ffb2] shrink-0">
                  {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-0 text-xs sm:text-sm text-[#d5d5d5] leading-relaxed border-t border-[#202026] mt-2">
                      <p className="pt-4">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
