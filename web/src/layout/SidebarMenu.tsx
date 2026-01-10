"use client";
import { Zap } from "lucide-react";

export const Logo = () => {
  return (
    <a
      href="#"
      className="relative z-20 flex items-center space-x-2  text-sm font-normal text-black"
    >
      <div className=" border-1 border-[#00ffb2] bg-[#00ffb2] p-1  rounded-lg">
        <Zap className="h-5 w-5 shrink-0" />
      </div>
    </a>
  );
};
export const LogoIcon = () => {
  return (
    <a
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      (
      <div className="border-1 border-[#00ffb2] bg-[#00ffb2]  rounded-lg">
        <Zap className="h-5 w-5 shrink-0" />
      </div>
    </a>
  );
};
