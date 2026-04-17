import { CircleAlert } from "lucide-react";
import { cn } from "@/lib/utils";
import { EnvStyle } from "@/lib/projectstyles";
import { getProjectColor } from "@/utils/randomColor";
import { timeAgo } from "@/utils/timeAgo";

interface projecttype {
  name: string;
  environment: string;
  totalErrors: number;
  lastErrorDate: string | null;
}

export default function ProjectDetails({ name, environment, totalErrors, lastErrorDate }: projecttype) {
  const ColorCode = getProjectColor(name);
  const firstLetter = name.charAt(0).toUpperCase();

  return (
    <div className="w-full p-6 border border-black/[0.08] dark:border-white/[0.08] rounded-lg bg-white dark:bg-[#18171D] hover:border-primary/50 transition-colors">
      <div className="flex items-center">
        <div 
          className="mr-3 w-10 h-10 rounded-lg flex items-center justify-center shrink-0 font-bold text-white text-lg shadow-sm"
          style={{ backgroundColor: ColorCode }}
        >
          {firstLetter}
        </div>
        <div>
          <div className="font-semibold">{name}</div>
          <div
            className={cn(
              "rounded-md inline-block text-xs px-2 py-[1px] mt-0.5",
              EnvStyle[environment]
            )}
          >
            {environment}
          </div>
        </div>
      </div>

      <div className="flex mt-8 relative items-center text-sm font-medium">
        <CircleAlert size={16} className="text-gray-500" />
        <p className="ml-2 text-gray-700 dark:text-gray-300">Total Errors</p>
        <p className="absolute right-2 font-bold text-gray-900 dark:text-gray-100">{totalErrors.toLocaleString()}</p>
      </div>
      
      <hr className="mt-4 border-black/[0.08] dark:border-white/[0.08]" />
      
      <div className="mt-4 text-xs text-muted-foreground flex justify-between items-center">
        <span>Last error</span>
        <span className="font-medium text-gray-700 dark:text-gray-400">
          {lastErrorDate ? timeAgo(lastErrorDate) : "—"}
        </span>
      </div>
    </div>
  );
}

