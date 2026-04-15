import { Activity, CircleAlert } from "lucide-react";
import { cn } from "@/lib/utils";
import { EnvStyle } from "@/lib/projectstyles";
import { randomColor } from "@/utils/randomColor";

interface projecttype {
  name: string;
  environment: string;
}
export default function ProjectDetails({ name, environment }: projecttype) {
  const ColorCode = randomColor();

  return (
    <>
      <div className="w-full p-6 border border-black/[0.08] dark:border-white/[0.08] rounded-lg bg-white dark:bg-[#18171D]">
        <div className="flex items-center">
          <div className="p-2 mr-2 w-10 h-10 rounded-lg" style={{ backgroundColor: ColorCode }}>
            <Activity />
          </div>
          <div>
            <div className="font-semibold">{name}</div>
            <div
              className={cn(
                "rounded-md inline-block text-xs text-yellow-200 px-2 py-[1px]",
                EnvStyle[environment]
              )}
            >
              {environment}
            </div>
          </div>
        </div>

        <div className="flex mt-8 relative items-center">
          <CircleAlert size={18} /> <p className="ml-2">Total Errors</p>
          <p className="absolute right-2">234</p>
        </div>
        <hr className="mt-4" />
        <div className="mt-2">Last error 15 minutes ago</div>
      </div>
    </>
  );
}

