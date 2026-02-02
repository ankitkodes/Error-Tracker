import HorizontalLine from "@/components/ui/HorizontalLine";
import CTA from "@/components/landingpage/CTA";
import FAQS from "@/components/landingpage/FAQS";
import Features from "@/components/landingpage/Features";
import HowitWork from "@/components/landingpage/Howitwork";
import Footer from "@/layout/Footer";
import Header from "@/layout/Header";

export default function Home() {
  return (
    <div>
      <Header />
      <div className="max-w-7xl mx-auto px-2 relative overflow-x-hidden md:overflow-visible">
        <div>
          <center className="mb-4 px-2">
            <div className="font-semibold text-4xl ">
              Essential features for tracking errors
            </div>
            <p className="py-2 text-base text-[#d5d5d5]">
              Everything you need to catch and fig bugs. Nothing you don&apos;t.
            </p>
          </center>
          <HorizontalLine />
          <div className="border-[#202026] border-x-2 mx-5 ">
            <Features />
            <div className="mt-[80px]">
              <HorizontalLine />
            </div>
            <HowitWork />
            <div className="mt-[80px]">
              <HorizontalLine />
            </div>
            <CTA />
            <div className="my-[80px]">
              <HorizontalLine />
            </div>

            <FAQS />
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}
