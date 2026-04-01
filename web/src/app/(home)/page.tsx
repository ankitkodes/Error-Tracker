import HorizontalLine from "@/components/ui/HorizontalLine";
import CTA from "@/components/landingpage/CTA";
import FAQS from "@/components/landingpage/FAQS";
import Features from "@/components/landingpage/Features";
import HowitWork from "@/components/landingpage/Howitwork";
import dashboard from "../../../public/Images/dashboard.png"
import Footer from "@/layout/Footer";
import Image from "next/image";
import Header from "@/layout/Header";

export default function Home() {
  return (
    <div>
      <Header />
      <div className="hidden md:flex items-center justify-center max-w-7xl mx-auto px-7">

        <Image
          src={dashboard}
          alt="Installation Guide"
          className="w-full shadow-xl mt-[-200px] mb-20 border border-[#202026] rounded-xl"
        />
      </div>
      <div className="max-w-7xl mx-auto pt-2 px-2 relative overflow-x-hidden md:overflow-visible">
        <div>
          <center className="mb-4 px-2">
            <div className="font-semibold text-4xl ">
              Debug at the speed of thought
            </div>
            <p className="py-2 text-base text-[#d5d5d5]">
              A high-performance toolkit designed to help you identify, trace, and resolve bottlenecks before they reach your users.
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
