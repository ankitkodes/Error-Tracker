"use client";

import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { X, ShieldCheck, Lock, Eye, FileText, Database, Server, Mail, Check } from "lucide-react";

export type LegalModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function PrivacyModal({ open, onClose }: LegalModalProps) {
  const sections = [
    {
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
      icon: Database,
      title: "2. Information We Collect",
      content: (
        <>
          <p>We collect information in two main categories:</p>
          <div className="space-y-3 pt-2">
            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
              <h4 className="text-white font-semibold text-xs sm:text-sm mb-1 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00ffb2]" /> Account Information
              </h4>
              <p className="text-xs text-gray-400">
                When you sign up, we collect your name, email address, password hash, and organization details necessary for authentication and account management.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
              <h4 className="text-white font-semibold text-xs sm:text-sm mb-1 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00ffb2]" /> Error & Telemetry Data (via SDK)
              </h4>
              <p className="text-xs text-gray-400">
                When integrated into your application, the BugTrace SDK captures unhandled errors, stack traces, browser/OS metadata, exception messages, and optional custom metadata explicitly sent by your application.
              </p>
            </div>
          </div>
        </>
      ),
    },
    {
      icon: Eye,
      title: "3. How We Use Your Information",
      content: (
        <>
          <p>Your data is processed strictly for the following purposes:</p>
          <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-[#d5d5d5] marker:text-[#00ffb2]">
            <td>Delivering real-time error detection, grouping, and stack trace visualization in your dashboard.</td>
            <td>Sending instant notifications (email, webhooks, or integration alerts) when critical errors occur.</td>
            <td>Monitoring service availability, preventing fraud, and optimizing system latency and performance.</td>
            <td>Communicating product updates, technical advisories, and customer support responses.</td>
          </ul>
        </>
      ),
    },
    {
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
      icon: Server,
      title: "5. Subprocessors & Third-Party Services",
      content: (
        <>
          <p>
            We partner with trusted infrastructure providers to deliver high availability:
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-[#d5d5d5] marker:text-[#00ffb2]">
            <td><strong>Cloud Hosting & DB:</strong> Vercel & Neon PostgreSQL.</td>
            <td><strong>Auth & Security:</strong> NextAuth & JWT token protection.</td>
            <td><strong>Analytics & Monitoring:</strong> Internal error telemetry & GTM.</td>
          </ul>
        </>
      ),
    },
    {
      icon: FileText,
      title: "6. Your Data Rights & Control",
      content: (
        <>
          <p>
            You retain full ownership of your data. Under applicable privacy regulations (GDPR, CCPA), you have the right to export data, scrub project records, or request permanent account deletion.
          </p>
        </>
      ),
    },
    {
      icon: Mail,
      title: "7. Contact & Data Inquiries",
      content: (
        <>
          <p>
            If you have questions regarding this Privacy Policy, reach out to our team at{" "}
            <a href="mailto:privacy@bugtrace.in" className="text-[#00ffb2] underline hover:text-[#66ffd1]">
              privacy@bugtrace.in
            </a>.
          </p>
        </>
      ),
    },
  ];

  return (
    <Dialog open={open} onClose={onClose} className="relative z-[200]">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-2xl bg-[#0a0a0c] border border-white/10 text-left shadow-2xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in my-8 w-full max-w-3xl"
          >
            {/* Top gradient highlight line */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[2px] bg-gradient-to-r from-transparent via-[#00ffb2] to-transparent z-10" />

            {/* Modal Header */}
            <div className="px-6 pt-6 pb-4 border-b border-[#202026] flex items-center justify-between relative">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#00ffb2]/10 border border-[#00ffb2]/20 text-[#00ffb2]">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    Privacy Policy
                  </h3>
                  <p className="text-xs text-gray-400">
                    Last updated: August 3, 2026 • BugTrace Platform
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Modal Content */}
            <div className="px-6 py-6 max-h-[65vh] overflow-y-auto space-y-6 text-sm text-[#d5d5d5] custom-scrollbar">
              {sections.map((sec, idx) => {
                const IconComponent = sec.icon;
                return (
                  <div key={idx} className="space-y-2 pb-5 border-b border-[#202026] last:border-b-0 last:pb-0">
                    <div className="flex items-center gap-2.5">
                      <IconComponent className="w-4 h-4 text-[#00ffb2] shrink-0" />
                      <h4 className="text-base font-semibold text-white">
                        {sec.title}
                      </h4>
                    </div>
                    <div className="space-y-2 leading-relaxed pl-6 text-xs sm:text-sm">
                      {sec.content}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-[#08070e] border-t border-[#202026] flex items-center justify-between gap-3">
              <span className="text-xs text-gray-500">
                BugTrace Security & Compliance
              </span>
              <button
                onClick={onClose}
                className="px-5 py-2 rounded-lg bg-[#00ffb2] hover:bg-[#00e6a0] text-black font-semibold text-sm transition-colors cursor-pointer flex items-center gap-1.5 shadow-md"
              >
                <Check className="w-4 h-4" />
                <span>I Understand</span>
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
