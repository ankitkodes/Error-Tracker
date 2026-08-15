"use client";

import HorizontalLine from "@/components/ui/HorizontalLine";
import Header from "@/layout/Header";
import Hero from "@/components/landingpage/Hero";
import InstallSnippet from "@/components/landingpage/InstallSnippet";
import Features from "@/components/landingpage/Features";
import HowitWork from "@/components/landingpage/Howitwork";
import Comparison from "@/components/landingpage/Comparison";
import Pricing from "@/components/landingpage/Pricing";
import CTA from "@/components/landingpage/CTA";
import FAQS from "@/components/landingpage/FAQS";
import Footer from "@/layout/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#08070e] text-white selection:bg-[#00ffb2] selection:text-black font-sans overflow-x-hidden">
      {/* Sticky Blur Navbar */}
      <Header />

      {/* Main Landing Flow */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <Hero />
        <HorizontalLine />
        <InstallSnippet />
        <HorizontalLine />
        <Features />
        <HorizontalLine />
        <HowitWork />
        <HorizontalLine />
        <Comparison />
        <HorizontalLine />
        <Pricing />
        <HorizontalLine />
        <CTA />
        <HorizontalLine />
        <FAQS />
      </main>

      {/* Footer with Legal Modals & Author Credit */}
      <Footer />
    </div>
  );
}
