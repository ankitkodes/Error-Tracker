"use client";

import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { X, Scale, CheckSquare, ShieldAlert, Cpu, Award, AlertCircle, FileCheck, Mail, Check } from "lucide-react";

export type LegalModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function TermsModal({ open, onClose }: LegalModalProps) {
  const termsSections = [
    {
      icon: CheckSquare,
      title: "1. Acceptance of Terms",
      content: (
        <>
          <p>
            By accessing or using <strong>BugTrace</strong> ("Platform", "Service"), including our website, APIs, SDKs, and developer dashboards, you agree to be bound by these Terms of Service ("Terms"). If you are entering into this agreement on behalf of a company, you represent that you have authority to bind such entity.
          </p>
          <p>
            If you do not agree to all terms and conditions, you must not access or use the Service.
          </p>
        </>
      ),
    },
    {
      icon: Cpu,
      title: "2. Description of Service & API Use",
      content: (
        <>
          <p>
            BugTrace provides real-time error tracking, stack trace reporting, error status workflow tools, and application performance analytics for frontend and backend applications.
          </p>
          <div className="space-y-3 pt-2">
            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
              <h4 className="text-white font-semibold text-xs sm:text-sm mb-1 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00ffb2]" /> SDK Integration & Rate Limits
              </h4>
              <p className="text-xs text-gray-400">
                You are granted a non-exclusive, non-transferable right to integrate the BugTrace SDK into your applications. You agree to adhere to monthly event volumes and API rate limits associated with your active plan.
              </p>
            </div>
          </div>
        </>
      ),
    },
    {
      icon: FileCheck,
      title: "3. Account Registration & Security",
      content: (
        <>
          <p>
            To access features, you must register for an account using valid credentials. You are solely responsible for maintaining credential confidentiality and all activities under your account.
          </p>
        </>
      ),
    },
    {
      icon: ShieldAlert,
      title: "4. Acceptable Use Policy",
      content: (
        <>
          <p>You agree not to engage in any prohibited activities:</p>
          <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-[#d5d5d5] marker:text-[#00ffb2]">
            <td>Attempting to reverse engineer or copy the underlying BugTrace platform.</td>
            <td>Transmitting malicious code or flooding APIs to cause denial of service.</td>
            <td>Bypassing API rate limits or security controls using unauthorized automated scripts.</td>
          </ul>
        </>
      ),
    },
    {
      icon: Award,
      title: "5. Intellectual Property Rights",
      content: (
        <>
          <p>
            BugTrace retains all rights to the Service, source code, logos, and UI designs. You retain full ownership of your application code and error telemetry logs.
          </p>
        </>
      ),
    },
    {
      icon: AlertCircle,
      title: "6. Limitation of Liability",
      content: (
        <>
          <p>
            The Service is provided on an "AS IS" basis. To the maximum extent permitted by law, BugTrace shall not be liable for any indirect, consequential, or punitive damages.
          </p>
        </>
      ),
    },
    {
      icon: Scale,
      title: "7. Termination & Account Closure",
      content: (
        <>
          <p>
            You may terminate your account at any time. BugTrace reserves the right to suspend accounts that violate these Terms.
          </p>
        </>
      ),
    },
    {
      icon: Mail,
      title: "8. Questions & Legal Inquiries",
      content: (
        <>
          <p>
            For questions regarding these Terms, contact us at{" "}
            <a href="mailto:terms@bugtrace.in" className="text-[#00ffb2] underline hover:text-[#66ffd1]">
              terms@bugtrace.in
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
                  <Scale className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    Terms of Service
                  </h3>
                  <p className="text-xs text-gray-400">
                    Effective Date: August 3, 2026 • BugTrace Platform
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
              {termsSections.map((sec, idx) => {
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
                BugTrace Terms & Legal Agreement
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
