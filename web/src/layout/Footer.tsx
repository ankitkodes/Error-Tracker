import HorizontalLine from "@/components/ui/HorizontalLine";
import { Bug } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <>
      <HorizontalLine />
      <div className="grid grid-cols-1 sm:grid-cols-3 font-sans">
        <div className="col-span-2 px-4 py-8">
          {/* <p className="mb-3 text-2xl font-bold text-[#00ffb2]"> */}
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-[#00ffb2]">
              <Bug className="w-5 h-5 text-black" />
            </div>
            <span className="text-xl font-bold">BugTrace</span>
          </div>
          {/* </p> */}
          <p className="text-base text-[#d5d5d5] w-2xs md:w-sm">
            BugTrace helps developers detect, analyze, and resolve bugs in real
            time whether you&apos;re shipping solo or with a team.
          </p>
        </div>
        <div className="grid grid-cols-2 px-4 py-8">
          <div>
            <p className="text-lg font-semibold text-white mb-4">Navigations</p>
            <div className="flex flex-col gap-2 text-base text-[#d5d5d5]">
              <Link href="" className="hover:text-[#00ffb2] transition-colors">
                Home
              </Link>
              <Link href="" className="hover:text-[#00ffb2] transition-colors">
                Features
              </Link>
              <Link href="" className="hover:text-[#00ffb2] transition-colors">
                How it Works
              </Link>
              <Link href="" className="hover:text-[#00ffb2] transition-colors">
                GitHub
              </Link>
              <Link href="" className="hover:text-[#00ffb2] transition-colors">
                Docs
              </Link>
              <Link href="" className="hover:text-[#00ffb2] transition-colors">
                Blog
              </Link>
            </div>
          </div>
          <div>
            <p className="text-lg font-semibold text-white mb-4">
              Social Links
            </p>
            <div className="flex flex-col gap-2 text-base text-[#d5d5d5]">
              <Link href="" className="hover:text-[#00ffb2] transition-colors">
                Twitter(X)
              </Link>
              <Link href="" className="hover:text-[#00ffb2] transition-colors">
                GitHub
              </Link>
              <Link href="" className="hover:text-[#00ffb2] transition-colors">
                Linkedln
              </Link>
              <Link href="" className="hover:text-[#00ffb2] transition-colors">
                Discord
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
