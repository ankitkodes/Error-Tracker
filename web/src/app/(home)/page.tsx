import HorizontalLine from "@/components/ui/HorizontalLine";
import CTA from "@/components/landingpage/CTA";
import FAQS from "@/components/landingpage/FAQS";
import Features from "@/components/landingpage/Features";
import HowitWork from "@/components/landingpage/Howitwork";
import Footer from "@/layout/Footer";
import Header from "@/layout/Header";

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-2 relative">
      <Header />
      {/* <div className=" flex justify-center font-semibold text-3xl w-20  py-4">
        <div className="min-w-lg">
          Cut the noise. Get the insights you need, right when you need them.
        </div>
      </div> */}
      <div>
        <center className="mb-4 px-2">
          <div className="font-normal text-4xl ">
            Powerful Features Built for Developers
          </div>
          <p className="py-2 text-base text-[#d5d5d5]">
            Track, debug, and resolve errors — all in one sleek,
            developer-friendly dashboard.
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
