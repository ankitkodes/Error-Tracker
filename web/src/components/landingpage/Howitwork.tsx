import HorizontalLine from "../ui/HorizontalLine";
import { Download, Zap, Search } from "lucide-react";

export default function HowitWork() {
  return (
    <section id="howitwork">
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="col-span-2  p-4 border-b-2 md:border-b-0 md:border-r-2 border-[#202026]">
          <div className="text-4xl font-semibold">How it Works</div>
          <div className="text-base py-2 text-[#d5d5d5]">
            Start tracking errors in three simple steps.
          </div>
        </div>
        <div className="relative">
          <button className="font-normal  text-lg text-[#00ffb2] cursor-pointer border-[#202026] md:border-t-2 w-full md:absolute md:right-0 md:bottom-0 py-4 hover:bg-[#66ffd1] hover:text-black">
            Start Monitoring Now →
          </button>
        </div>
      </div>

      <HorizontalLine />
      <div className="">
        <div className="grid grid-cols-1 md:grid-cols-3 text-base">
          <div className="border-b-2  md:border-b-0 sm:border-r-2 border-[#202026] text-left">
            <div className="bg-gradient-to-b pointer-events-none from-white/12 w-full  p-4 to-transparent blur-4xl">
              <div className="pt-4">
                <div className="rounded-lg flex w-10 h-10 bg-[#222222] items-center justify-center text-white">
                  <Download />
                </div>
                <p className="font-semibold">Add the SDK</p>
                <p>
                  Install our SDK in your project. Works with JavaScripts,
                  TypeScript, React, Node.js.
                </p>
              </div>
            </div>
          </div>

          <div className=" border-b-2 md:border-b-0 md:border-r-2 border-[#202026]">
            <div className="bg-gradient-to-b pointer-events-none from-white/12 w-full  p-4 to-transparent blur-4xl">
              <div className="rounded-lg flex w-10 h-10 bg-[#222222] items-center justify-center text-white">
                <Zap />
              </div>
              <div className="pt-4">
                <p className="font-semibold">
                  Erros get captured automatically
                </p>
                <p>
                  our SDK listens for error, crashes, and unhandles rejections
                  without extra configuration.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-1">
            <div className="p-4">
              <div className="rounded-lg flex w-10 h-10 bg-[#222222] items-center justify-center text-white">
                <Search />
              </div>
              <div className="pt-4">
                <p className="font-semibold">View and debug in the dashboard</p>
                <p>
                  See errors in real-time with full stack traces, user context,
                  and environment details.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <HorizontalLine />
    </section>
  );
}
