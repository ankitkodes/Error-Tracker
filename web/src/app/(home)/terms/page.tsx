"use client";

import Header from "@/layout/Header";
import Footer from "@/layout/Footer";
import HorizontalLine from "@/components/ui/HorizontalLine";
import { motion } from "framer-motion";
import { Scale, CheckSquare, ShieldAlert, Cpu, Award, AlertCircle, FileCheck, Mail, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function TermsPage() {
  const termsSections = [
    {
      id: "acceptance",
      icon: CheckSquare,
      title: "1. Acceptance of Terms",
      content: (
        <>
          <p>
            By accessing or using <strong>BugTrace</strong> ("Platform", "Service"), including our website, APIs, SDKs, and developer dashboards, you agree to be bound by these Terms of Service ("Terms"). If you are entering into this agreement on behalf of a company or other legal entity, you represent that you have authority to bind such entity to these Terms.
          </p>
          <p>
            If you do not agree to all terms and conditions, you must not access or use the Service.
          </p>
        </>
      ),
    },
    {
      id: "description",
      icon: Cpu,
      title: "2. Description of Service & API Use",
      content: (
        <>
          <p>
            BugTrace provides real-time error tracking, stack trace reporting, error status workflow tools, and application performance analytics for frontend and backend applications.
          </p>
          <div className="space-y-3 pt-2">
            <div className="p-4 rounded-lg bg-[#0a0a0a] border border-[#202026]">
              <h4 className="text-white font-semibold text-sm mb-1 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00ffb2]" /> SDK Integration & Rate Limits
              </h4>
              <p className="text-xs sm:text-sm text-gray-400">
                You are granted a non-exclusive, non-transferable right to integrate the BugTrace SDK into your applications. You agree to adhere to monthly event volumes and API rate limits associated with your active plan tier.
              </p>
            </div>
          </div>
        </>
      ),
    },
    {
      id: "accounts",
      icon: FileCheck,
      title: "3. Account Registration & Security",
      content: (
        <>
          <p>
            To access features, you must register for an account using valid credentials. You are solely responsible for:
          </p>
          <ul className="list-disc list-inside space-y-2 text-[#d5d5d5] marker:text-[#00ffb2]">
            <td>Maintaining the confidentiality of your login credentials and project API keys.</td>
            <td>All activities that occur under your account or API keys.</td>
            <td>Notifying BugTrace immediately of any unauthorized account access or security breaches.</td>
          </ul>
        </>
      ),
    },
    {
      id: "acceptable-use",
      icon: ShieldAlert,
      title: "4. Acceptable Use Policy",
      content: (
        <>
          <p>You agree not to engage in any of the following prohibited activities:</p>
          <ul className="list-disc list-inside space-y-2 text-[#d5d5d5] marker:text-[#00ffb2]">
            <td>Attempting to reverse engineer, decompile, or copy the underlying BugTrace platform or internal APIs.</td>
            <td>Transmitting malware, illegal payload contents, or intentionally flooding the API to cause denial of service.</td>
            <td>Bypassing API rate limits or security controls using unauthorized automated scripts.</td>
            <td>Reselling, sublicensing, or redistributing the Service to third parties without prior written consent.</td>
          </ul>
        </>
      ),
    },
    {
      id: "intellectual-property",
      icon: Award,
      title: "5. Intellectual Property Rights",
      content: (
        <>
          <p>
            BugTrace retains all rights, title, and interest in and to the Service, including logos, source code, UI designs, documentation, and trademarks.
          </p>
          <p>
            You retain all rights to your application code, project data, and telemetry logs submitted to BugTrace. BugTrace claims no ownership over your proprietary application code or error stack metadata.
          </p>
        </>
      ),
    },
    {
      id: "limitation-liability",
      icon: AlertCircle,
      title: "6. Limitation of Liability & Warranties",
      content: (
        <>
          <p>
            The Service is provided on an "AS IS" and "AS AVAILABLE" basis without warranties of any kind, whether express or implied.
          </p>
          <p>
            To the maximum extent permitted by law, BugTrace shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data loss, or business interruption arising out of your use of the Service.
          </p>
        </>
      ),
    },
    {
      id: "termination",
      icon: Scale,
      title: "7. Termination & Account Closure",
      content: (
        <>
          <p>
            You may terminate your account at any time via account settings. BugTrace reserves the right to suspend or terminate access to the Service for accounts that violate these Terms or engage in fraudulent activity.
          </p>
          <p>
            Upon account termination, access to project dashboards will cease and stored error telemetry will be permanently deleted in accordance with our data retention schedule.
          </p>
        </>
      ),
    },
    {
      id: "contact",
      icon: Mail,
      title: "8. Questions & Contact Information",
      content: (
        <>
          <p>
            For questions regarding these Terms of Service or legal inquiries, please contact us:
          </p>
          <div className="pt-3">
            <Link
              href="mailto:terms@bugtrace.in"
              className="inline-flex items-center gap-2 rounded-lg bg-[#0a0a0a] border border-[#202026] hover:border-[#00ffb2] px-4 py-2.5 text-sm text-[#00ffb2] font-medium transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>terms@bugtrace.in</span>
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
            <Scale className="w-3.5 h-3.5" />
            <span>Terms & Conditions</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
            Terms of Service
          </h1>
          <p className="text-sm sm:text-base text-gray-400 max-w-xl mx-auto">
            Effective Date: August 3, 2026. Please read these terms carefully before using the BugTrace error tracking platform.
          </p>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-2 relative overflow-x-hidden md:overflow-visible pb-16">
        <HorizontalLine />
        <div className="border-[#202026] border-x-2 mx-5 px-4 sm:px-8 py-10 md:py-14 space-y-12">
          
          <div className="max-w-3xl mx-auto space-y-10">
            {termsSections.map((sec, idx) => {
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
