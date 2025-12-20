import HorizontalLine from "@/components/HorizontalLine";
import CTA from "@/components/ui/CTA";
import FAQS from "@/components/ui/FAQS";
import Features from "@/components/ui/Features";
import HowitWork from "@/components/ui/Howitwork";
import Footer from "@/layout/Footer";
import Header from "@/layout/Header";


export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-2 relative">
      <Header />
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
  );
}
