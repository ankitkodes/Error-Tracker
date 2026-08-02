"use client";

import Header from "@/layout/Header";
import Footer from "@/layout/Footer";
import HorizontalLine from "@/components/ui/HorizontalLine";
import { motion } from "framer-motion";
import { ShieldCheck, Lock, Eye, FileText, Database, Server, Mail, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function PrivacyPage() {
  const sections = [
    {
      id: "overview",
      icon: ShieldCheck,
      title: "1. Overview & Commitment",
      content: (
        <>
          <p>
            At <strong>BugTrace</strong> ("we", "our", or "us"), protecting developer and user data is at the core of everything we build. This Privacy Policy explains how we collect, use, store, and safeguard your information when you use our website, SDKs, APIs, and real-time error monitoring services.
          </p>
          <p>
            Whether you are a solo developer or an enterprise team, we ensure that error payloads, stack traces, and account information are treated with the highest security standards.
          </p>
        </>
      ),
    },
    {
      id: "information-collected",
      icon: Database,
      title: "2. Information We Collect",
      content: (
        <>
          <p>We collect information in two main categories:</p>
          <div className="space-y-3 pt-2">
            <div className="p-4 rounded-lg bg-[#0a0a0a] border border-[#202026]">
              <h4 className="text-white font-semibold text-sm mb-1 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00ffb2]" /> Account Information
              </h4>
              <p className="text-xs sm:text-sm text-gray-400">
                When you sign up, we collect your name, email address, password hash, and organization details necessary for authentication and account management.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-[#0a0a0a] border border-[#202026]">
              <h4 className="text-white font-semibold text-sm mb-1 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00ffb2]" /> Error & Telemetry Data (via SDK)
              </h4>
              <p className="text-xs sm:text-sm text-gray-400">
                When integrated into your application, the BugTrace SDK captures unhandled errors, stack traces, browser/OS metadata, exception messages, and optional custom metadata explicitly sent by your application.
              </p>
            </div>
          </div>
        </>
      ),
    },
    {
      id: "how-we-use-data",
      icon: Eye,
      title: "3. How We Use Your Information",
      content: (
        <>
          <p>Your data is processed strictly for the following purposes:</p>
          <ul className="list-disc list-inside space-y-2 text-[#d5d5d5] marker:text-[#00ffb2]">
            <td>Delivering real-time error detection, grouping, and stack trace visualization in your dashboard.</td>
            <td>Sending instant notifications (email, webhooks, or integration alerts) when critical errors occur.</td>
            <td>Monitoring service availability, preventing fraud, and optimizing system latency and performance.</td>
            <td>Communicating product updates, technical advisories, and customer support responses.</td>
          </ul>
        </>
      ),
    },
    {
      id: "security-retention",
      icon: Lock,
      title: "4. Data Security & Retention",
      content: (
        <>
          <p>
            Security is engineered into our architecture. All data sent between your application and BugTrace is encrypted in transit using HTTPS/TLS 1.3. Stored database records are encrypted at rest.
          </p>
          <p>
            Error telemetry payloads are retained for 30 to 90 days depending on your subscription tier, after which they are automatically purged from primary storage.
          </p>
        </>
      ),
    },
    {
      id: "subprocessors",
      icon: Server,
      title: "5. Subprocessors & Third-Party Services",
      content: (
        <>
          <p>
            We partner with trusted infrastructure providers to deliver high availability and reliability:
          </p>
          <ul className="list-disc list-inside space-y-2 text-[#d5d5d5] marker:text-[#00ffb2]">
            <td><strong>Cloud Hosting & Edge CDN:</strong> Vercel & Neon Database for resilient storage and computing.</td>
            <td><strong>Authentication & Security:</strong> NextAuth & JWT token protection.</td>
            <td><strong>Analytics & Monitoring:</strong> Internal error telemetry and Google Tag Manager.</td>
          </ul>
        </>
      ),
    },
    {
      id: "your-rights",
      icon: FileText,
      title: "6. Your Data Rights & Control",
      content: (
        <>
          <p>
            You retain full ownership of your data. Under applicable privacy regulations (GDPR, CCPA), you have the right to:
          </p>
          <ul className="list-disc list-inside space-y-2 text-[#d5d5d5] marker:text-[#00ffb2]">
            <td>Request a full export of your account data and project error logs.</td>
            <td>Delete any project or permanently close your account and scrub all associated data.</td>
            <td>Opt out of non-essential marketing emails at any time.</td>
          </ul>
        </>
      ),
    },
    {
      id: "contact",
      icon: Mail,
      title: "7. Contact & Data Inquiries",
      content: (
        <>
          <p>
            If you have questions regarding this Privacy Policy or wish to exercise your data privacy rights, please reach out to our team:
          </p>
          <div className="pt-3">
            <Link
              href="mailto:privacy@bugtrace.in"
              className="inline-flex items-center gap-2 rounded-lg bg-[#0a0a0a] border border-[#202026] hover:border-[#00ffb2] px-4 py-2.5 text-sm text-[#00ffb2] font-medium transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>privacy@bugtrace.in</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-[#08070e] text-[#d5d5d5] font-sans">
      <Header showHero={false} />

      {/* Top Page Header Banner */}
      <div className="relative pt-28 pb-12 px-6 overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-r from-transparent via-[#00ffb2]/10 to-transparent blur-3xl pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00ffb2]/10 border border-[#00ffb2]/20 text-[#00ffb2] text-xs font-semibold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Legal & Security</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-sm sm:text-base text-gray-400 max-w-xl mx-auto">
            Last updated: August 3, 2026. Learn how BugTrace collects, uses, and safeguards developer and error telemetry data.
          </p>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-2 relative overflow-x-hidden md:overflow-visible pb-16">
        <HorizontalLine />
        <div className="border-[#202026] border-x-2 mx-5 px-4 sm:px-8 py-10 md:py-14 space-y-12">
          
          <div className="max-w-3xl mx-auto space-y-10">
            {sections.map((sec, idx) => {
              const IconComp = sec.icon;
              return (
                <motion.div
                  key={sec.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  className="space-y-4 border-b border-[#202026] pb-8 last:border-b-0"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-[#0a0a0a] border border-[#202026] text-[#00ffb2]">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white">
                      {sec.title}
                    </h2>
                  </div>
                  <div className="text-sm sm:text-base leading-relaxed text-[#d5d5d5] space-y-3 pl-0 sm:pl-11">
                    {sec.content}
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
        <Footer />
      </div>
    </div>
  );
}
