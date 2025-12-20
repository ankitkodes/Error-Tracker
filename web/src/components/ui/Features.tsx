import {
  MonitorSmartphone,
  CodeXml,
  ChartNoAxesCombined,
  FileChartColumnIncreasing,
} from "lucide-react";
import HorizontalLine from "../HorizontalLine";

export default function Features() {
  return (
    <>
      <section id="features">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 text-base">
          <div className="border-b-2  md:border-b-0 sm:border-r-2 border-[#202026] py-8 px-4 text-left grid gap-1">
            <div className="rounded-lg flex w-10 h-10 bg-[#222222] items-center justify-center text-white">
              <MonitorSmartphone />
            </div>
            <p className="font-semibold">Real-time Error Monitoring</p>
            <p className="text-[#d5d5d5]">
              Errors show up in your dashboard instantly as they happen in
              production.
            </p>
          </div>
          <div className=" border-b-2 md:border-b-0 md:border-r-2 border-[#202026] py-8 px-4  grid gap-1">
            <div className="rounded-lg flex w-10 h-10 bg-[#222222] items-center justify-center text-white">
              <CodeXml />
            </div>
            <p className="font-semibold py-2">Stack trace visibility</p>
            <p className="text-[#d5d5d5]">
              Full stack traces with source maps, so you know exactly where
              things broke.
            </p>
          </div>
          <div className="border-b-2 sm:border-b-0 sm:border-r-2 border-[#202026]  py-8 px-4  grid gap-1">
            <div className="rounded-lg flex w-10 h-10 bg-[#222222] items-center justify-center text-white">
              <ChartNoAxesCombined />
            </div>
            <p className="font-semibold py-2">Error Status Tracking</p>
            <p className="text-[#d5d5d5]">
              Mark errors as In Process, Fixed or Bug to manage workflow
              efficiently.
            </p>
          </div>
          <div className="py-8 px-4 grid gap-1">
            <div className="rounded-lg flex w-10 h-10 bg-[#222222] items-center justify-center text-white">
              <FileChartColumnIncreasing />
            </div>
            <p className="font-semibold py-2">Multi-Project Support</p>
            <p className="text-[#d5d5d5]">
              Easily manage errors across multiple projects from a single admin
              dashboard.
            </p>
          </div>
        </div>
      </section>

      <HorizontalLine />
    </>
  );
}
