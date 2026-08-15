"use client";

import { useState } from "react";
import Link from "next/link";
import { Bug, CheckCircle2, ArrowRight } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import HorizontalLine from "@/components/ui/HorizontalLine";
import PrivacyModal from "@/components/Modal/PrivacyModal";
import TermsModal from "@/components/Modal/TermsModal";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);
  const [termsModalOpen, setTermsModalOpen] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="w-full font-sans text-[#d5d5d5] bg-transparent">
      <HorizontalLine />

      <div className="px-4 py-10 md:py-12 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand Block */}
          <div className="md:col-span-6 space-y-5">
            <Link href="/" className="inline-flex items-center gap-2.5 group">
              <div className="p-2 rounded-lg bg-[#00ffb2] group-hover:shadow-[0_0_15px_rgba(0,255,178,0.4)] transition-shadow duration-300">
                <Bug className="w-5 h-5 text-black" />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 font-heading">
                BugTrace
              </span>
            </Link>

            <p className="text-sm md:text-base text-[#d5d5d5] max-w-md leading-relaxed">
              BugTrace helps developers detect, analyze, and resolve bugs in real time whether you&apos;re shipping solo or with a team.
            </p>

            {/* Newsletter */}
            <div className="pt-2 max-w-md">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2.5">
                Subscribe to developer updates
              </p>
              {isSubscribed ? (
                <div className="flex items-center gap-2 text-xs md:text-sm text-[#00ffb2] bg-[#00ffb2]/10 border border-[#00ffb2]/20 rounded-lg p-3">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Thank you for subscribing to BugTrace updates!</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-10 rounded-lg bg-[#0a0a0c] border border-[#202026] px-3.5 text-sm text-white placeholder:text-[#666] focus:outline-none focus:ring-2 focus:ring-[#00ffb2]/50 focus:border-[#00ffb2] transition"
                  />
                  <button
                    type="submit"
                    className="h-10 rounded-lg bg-[#00ffb2] hover:bg-[#00e6a0] text-black font-semibold text-sm px-4 transition-colors duration-200 cursor-pointer shadow-md shrink-0 flex items-center justify-center gap-1.5 focus-visible:ring-2 focus-visible:ring-[#00ffb2]"
                  >
                    <span>Subscribe</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Navigation Links Columns */}
          <div className="md:col-span-6 grid grid-cols-2 gap-8 sm:gap-12">
            <div>
              <p className="text-base font-semibold text-white mb-4 font-heading">Product</p>
              <nav aria-label="Product Links">
                <ul className="flex flex-col gap-2.5 text-sm md:text-base">
                  <li>
                    <Link href="/" className="hover:text-[#00ffb2] transition-colors duration-200 inline-block">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href="#features" className="hover:text-[#00ffb2] transition-colors duration-200 inline-block">
                      Features
                    </Link>
                  </li>
                  <li>
                    <Link href="#howitwork" className="hover:text-[#00ffb2] transition-colors duration-200 inline-block">
                      How it Works
                    </Link>
                  </li>
                  <li>
                    <Link href="#pricing" className="hover:text-[#00ffb2] transition-colors duration-200 inline-block">
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <Link href="/setup" className="hover:text-[#00ffb2] transition-colors duration-200 inline-block">
                      Docs
                    </Link>
                  </li>
                  <li>
                    <Link href="#faq" className="hover:text-[#00ffb2] transition-colors duration-200 inline-block">
                      FAQ
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>

            <div>
              <p className="text-base font-semibold text-white mb-4 font-heading">Developers</p>
              <nav aria-label="Developer Links">
                <ul className="flex flex-col gap-2.5 text-sm md:text-base">
                  <li>
                    <a
                      href="https://github.com/ankitkodes/Error-Tracker"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2.5 hover:text-[#00ffb2] transition-colors duration-200"
                    >
                      <FaGithub className="w-4 h-4 text-gray-400 group-hover:text-[#00ffb2] transition-colors" />
                      <span>GitHub</span>
                    </a>
                  </li>
                  <li>
                    <Link href="/signin" className="hover:text-[#00ffb2] transition-colors duration-200 inline-block">
                      Log in
                    </Link>
                  </li>
                  <li>
                    <Link href="/signup" className="hover:text-[#0071E3] transition-colors duration-200 inline-block">
                      Sign up
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="border-t border-[#202026] mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-gray-400">
          <p>© {new Date().getFullYear()} BugTrace. All rights reserved.</p>

          <p>
            Built by{" "}
            <a
              href="https://ankitkumar.site"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#00ffb2] underline underline-offset-4 transition-colors font-medium"
            >
              Ankit Kumar
            </a>
          </p>

          <div className="flex items-center gap-6">
            <button
              onClick={() => setPrivacyModalOpen(true)}
              className="hover:text-[#00ffb2] transition-colors duration-200 cursor-pointer text-left focus-visible:ring-2 focus-visible:ring-[#00ffb2] rounded"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => setTermsModalOpen(true)}
              className="hover:text-[#00ffb2] transition-colors duration-200 cursor-pointer text-left focus-visible:ring-2 focus-visible:ring-[#00ffb2] rounded"
            >
              Terms of Service
            </button>
          </div>
        </div>
      </div>

      {/* Legal Modals */}
      <PrivacyModal open={privacyModalOpen} onClose={() => setPrivacyModalOpen(false)} />
      <TermsModal open={termsModalOpen} onClose={() => setTermsModalOpen(false)} />
    </footer>
  );
}
