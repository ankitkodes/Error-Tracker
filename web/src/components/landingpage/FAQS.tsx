"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus } from "lucide-react";
import HorizontalLine from "../ui/HorizontalLine";

const faqs = [
  {
    question: "What types of errors does BugTrace detect?",
    answer:
      "BugTrace captures frontend JavaScript errors, API failures, server crashes, and post-production bugs like API limit exceed or service downtime.",
  },
  {
    question: "How is BugTrace different from Sentry or LogRocket?",
    answer:
      "BugTrace is lightweight, fast to set up, and focuses on delivering exactly what you need without extra complexity or bloat.",
  },
  {
    question: "Is there a free plan?",
    answer:
      "Yes — our free plan includes X tracked errors per month for 1 project. Upgrade for more projects and higher limits.",
  },
  {
    question: "How quickly will I see error reports?",
    answer:
      "All errors are processed and displayed in your dashboard in real-time — usually within a few milliseconds of occurring.",
  },

  {
    question: "Will BugTrace impact my app’s performance?",
    answer:
      "No. Our lightweight SDK is optimized to run asynchronously, so it won’t block rendering or slow down your site.",
  },
  {
    question: "Can I use BugTrace with a team?",
    answer:
      "Absolutely — you can invite multiple team members to a project and collaborate on fixing bugs.",
  },
  {
    question: "Can I track errors from production only?",
    answer:
      "Yes — you can configure environments (development, staging, production) and choose which ones to monitor.",
  },
  {
    question: "How do I get started?",
    answer:
      "Sign up, create a project, copy the script tag or SDK init code, and start tracking bugs in minutes.",
  },
];

export default function FAQS() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section>
      <HorizontalLine />
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="col-span-2 p-6  border-b border-[#202026] md:border-b-0 md:border-r">
          <h2 className="text-4xl  font-normal leading-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-base text-gray-400 mt-4 ">
            Find everything you need to know about BugTrace, from security to
            supported assets.
          </p>
        </div>
        <div className="relative">
          <button className="font-normal  text-lg text-[#00ffb2] cursor-pointer border-[#202026] md:border-t-2 w-full md:absolute md:right-0 md:bottom-0 py-4 hover:bg-customHover">
            Start Monitoring Now →
          </button>
        </div>
      </div>

      <HorizontalLine />

      <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#202026]">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`
              border-[#202026] 
              ${index % 2 === 0 ? "md:border-r" : ""} 
              ${index < faqs.length - (faqs.length % 2 === 0 ? 2 : 1) ? "border-b" : "border-b md:border-b-0"}
              // Mobile: all have bottom border except last one
              ${index === faqs.length - 1 ? "border-b-0" : ""}
            `}
          >
            <div
              className="p-4 md:p-6 cursor-pointer group hover:bg-[#17161c] transition-colors"
              onClick={() => toggleFAQ(index)}
            >
              <div className="flex justify-between items-start gap-4">
                <h3 className="text-lg md:text-xl font-normal text-white   transition-colors">
                  {faq.question}
                </h3>
                <motion.div
                  animate={{ rotate: openIndex === index ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0 mt-1"
                >
                  <Plus
                    className={`w-6 h-6 transition-colors ${
                      openIndex === index ? "text-[#00ffb2]" : "text-[#00ffb2]"
                    }`}
                  />
                </motion.div>
              </div>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="pt-4 text-base text-[#d5d5d5] leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
