import {
  MonitorSmartphone,
  Ban,
  ChartNoAxesCombined,
  FileChartColumnIncreasing,
} from "lucide-react";
import HorizontalLine from "../ui/HorizontalLine";

export default function Features() {
  return (
    <>
      <section id="features">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 text-base">
          <div className="border-b-2  md:border-b-0 sm:border-r-2 border-[#202026] py-8 px-4 text-left grid gap-1">
            <div>
              <MonitorSmartphone size={50} />
            </div>
            <p className="font-semibold">Real-time Error Monitoring</p>
            <p className="text-[#d5d5d5]">
              Instantly track and get notified of crashes, exceptions, and bugs.
            </p>
          </div>
          <div className=" border-b-2 md:border-b-0 md:border-r-2 border-[#202026] py-8 px-4  grid gap-1">
            <div>
              <Ban size={50} />
            </div>
            <p className="font-semibold py-2">Detailed Error Logs</p>
            <p className="text-[#d5d5d5]">
              View full stack traces, environment info, file name, line number,
              and more – all in one place.
            </p>
          </div>
          <div className="border-b-2 sm:border-b-0 sm:border-r-2 border-[#202026]  py-8 px-4  grid gap-1">
            <div>
              <ChartNoAxesCombined size={50} />
            </div>
            <p className="font-semibold py-2">Error Status Tracking</p>
            <p className="text-[#d5d5d5]">
              Mark errors as “In Process,” “Fixed,” or “Bug” to manage workflow
              efficiently.
            </p>
          </div>
          <div className="py-8 px-4 grid gap-1">
            <div>
              <FileChartColumnIncreasing size={50} />
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
