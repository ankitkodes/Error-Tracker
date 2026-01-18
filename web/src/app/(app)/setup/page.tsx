"use client";
import { Hexagon } from "lucide-react";
import nextjsicon from "../../../../public/Images/logo/nextjs.png";
import Image from "next/image";
import reacticon from "../../../../public/Images/logo/reactjs.png";
import NodeSetup from "@/components/sdk-setup/Node-sdk-setup";

export default function Setup() {
  return (
    <>
      <div className="">
        <div className="py-2 pb-4">
          <h1 className="text-2xl font-bold">SDK & Integrations</h1>
          <p className="text-sm text-gray-500">
            Install the SDK and start capturing errors in minutes.
          </p>
        </div>
        <hr />
        <div className="py-4">
          <div className="font-medium text-xs text-gray-500 py-2">PLATFORM</div>
          <div className=" flex gap-2">
            <button className=" text-sm   border px-2 py-2 rounded-md cursor-pointer focus:dark:text-black focus:dark:bg-white focus:text-white focus:bg-black flex items-center gap-1">
              <Hexagon size={14} />
              Node.js
            </button>
            <button
              className=" text-sm   border px-2 py-2 rounded-md cursor-pointer focus:text-white focus:bg-black flex items-center gap-1"
              disabled
            >
              <Image
                src={reacticon}
                width={18}
                height={18}
                alt="reactjs icon"
              />
              React
            </button>
            <button
              className=" text-sm   border px-2 py-2 rounded-md cursor-pointer focus:text-white focus:bg-black flex items-center gap-1"
              disabled
            >
              <Image
                src={nextjsicon}
                width={20}
                height={20}
                alt="nextjs icon"
              />{" "}
              Next.js
            </button>
          </div>
          <div>
            <NodeSetup />
          </div>
        </div>
      </div>
    </>
  );
}
