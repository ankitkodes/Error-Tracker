import HorizontalLine from "../ui/HorizontalLine";
import terminal from "../../../public/Images/Terminal.png";
import t2 from "../../../public/Images/t2.png";
import connect from "../../../public/Images/connect.png";
import bugs from "../../../public/Images/Bugs.png";
import Image from "next/image";

export default function HowitWork() {
  return (
    <section id="howitwork">
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="col-span-2  p-4 border-b-2 md:border-b-0 md:border-r-2 border-[#202026]">
          <div className="text-4xl font-normal">How it Works?</div>
          <div className="text-base py-2 text-[#d5d5d5]">
            Three simple steps to track, fix, and prevent bugs — without slowing
            you down.
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
              <center className="">
                <Image
                  src={t2}
                  width={200}
                  height={200}
                  alt="this is terminal image"
                  className=""
                />
              </center>
              <div className="pt-4">
                <p className="font-semibold">Install</p>
                <p>
                  Add our SDK in seconds — one npm install or a single script
                  tag.
                </p>
              </div>
            </div>
          </div>

          <div className=" border-b-2 md:border-b-0 md:border-r-2 border-[#202026]">
            <div className="bg-gradient-to-b pointer-events-none from-white/12 w-full  p-4 to-transparent blur-4xl">
              <center className="">
                <Image
                  src={connect}
                  width={200}
                  height={200}
                  alt="connect with project"
                  className=""
                />
              </center>
              <div className="pt-4">
                <p className="font-semibold">Connect</p>
                <p>
                  Create a project in your dashboard and paste your unique
                  token.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-1">
            <div className="bg-gradient-to-b pointer-events-none from-white/12 w-full  p-4 to-transparent blur-4xl">
              <center className="">
                <Image
                  src={bugs}
                  width={170}
                  height={170}
                  alt="connect with project"
                  className=""
                />
              </center>
              <div className="pt-4">
                <p className="font-semibold">Monitor & Fix</p>
                <p>
                  See real-time error reports, track status, and mark issues as
                  fixed.
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
