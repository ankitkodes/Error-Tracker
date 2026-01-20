import HorizontalLine from "../ui/HorizontalLine";
import installGuide from "../../../public/Images/installGuide.png";
import errorLogs from "../../../public/Images/errorlog.png";
import Image from "next/image";
import errorGraph from "../../../public/Images/errorGraph.png";

// interface howSDKWorkType{
//   id:number,
//   imageurl:string,
//   title:string,
//   description:string
// }

// const howSDKWork:howSDKWorkType = [
//   {
//     id:1,
//     imageurl:"installGuide",
//     title:"Add the SDK",
//     description:"Install our SDK in your project. Works with JavaScript,TypeScript, React, and Node.js."
//   }
// ]

export default function HowitWork() {
  return (
    <section id="howitwork">
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="col-span-2  p-4 border-b-2 md:border-b-0 md:border-r-2 border-[#202026]">
          <div className="text-2xl sm:text-3xl md:text-4xl font-sans font-semibold">
            How it Works
          </div>
          <div className="text-sm sm:text-base py-2 text-[#d5d5d5]">
            Install once. Errors get captured automatically. Debug everything
            from a single dashboard.
          </div>
        </div>
        <div className="relative">
          <button className="font-normal  text-base sm:text-lg md:text-lg text-[#00ffb2] cursor-pointer border-[#202026] md:border-t-2 w-full md:absolute md:right-0 md:bottom-0 py-4 hover:bg-[#66ffd1] hover:text-black">
            Start Monitoring Now →
          </button>
        </div>
      </div>

      <HorizontalLine />
      <div className="">
        <div className="grid grid-cols-1 md:grid-cols-3 text-sm sm:text-base">
          <div className="border-b-2  md:border-b-0 sm:border-r-2 border-[#202026] text-left">
            <div className="w-full relative   bg-gradient-to-b from-[#1a1920] to-[#08070e]">
              <div className="absolute z-10 left-2 rounded-full flex size-18 md:size-12 bg-radial from-[#08070e] from-40% to-[#202026] items-center justify-center text-white m-2">
                1
              </div>
              <div className="pl-8 pt-8">
                <Image
                  src={installGuide}
                  alt="Installation Guide"
                  className="w-full  [mask-image:linear-gradient(to_bottom,black,transparent)]"
                />
              </div>

              {/* Text content */}
              <div className="flex flex-col gap-2 px-6 pb-4 text-[#f5f5f5]  not-italic">
                <p className="font-medium text-base sm:text-lg">Add the SDK</p>
                <p className="font-normal text-sm sm:text-base">
                  Install our SDK in your project. Works with JavaScript,
                  TypeScript, React, and Node.js.
                </p>
              </div>
            </div>
          </div>

          <div className="border-b-2 md:border-b-0 md:border-r-2 border-[#202026]">
            {/* <div className="p-4"> */}
            <div className="w-full relative   bg-gradient-to-b from-[#1a1920] to-[#08070e]">
              <div className="absolute z-10 left-2 rounded-full flex size-18 md:size-12 bg-radial from-[#08070e] from-40% to-[#202026] items-center justify-center text-white m-2">
                2
              </div>
              <div className="pl-8 pt-8">
                <Image
                  src={errorLogs}
                  alt="error log of application"
                  className="w-full  [mask-image:linear-gradient(to_bottom,black,transparent)]"
                />
              </div>
              <div className="flex flex-col gap-2 px-6 pb-4 text-[#f5f5f5]  not-italic">
                <p className="font-medium text-base sm:text-lg">
                  Erros get captured automatically
                </p>
                <p className="font-normal text-sm sm:text-base">
                  our SDK listens for error, crashes, and unhandles rejections
                  without extra configuration.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-1">
            <div className="w-full relative   bg-gradient-to-b from-[#1a1920] to-[#08070e]">
              <div className="absolute z-10 left-2 rounded-full flex size-18 md:size-12 bg-radial from-[#08070e] from-40% to-[#202026] items-center justify-center text-white m-2">
                3
              </div>
              <div className="pl-8 pt-8">
                <Image
                  src={errorGraph}
                  alt="error log of application"
                  className="w-full  [mask-image:linear-gradient(to_bottom,black,transparent)]"
                />
              </div>
              <div className="flex flex-col gap-2 px-6 pb-4 text-[#f5f5f5]  not-italic">
                <p className="font-medium text-base sm:text-lg">
                  View and debug in the dashboard
                </p>
                <p className="font-normal text-sm sm:text-base">
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
