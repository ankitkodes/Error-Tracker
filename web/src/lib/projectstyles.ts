export const EnvStyle: Record<string, string> = {
  Production: "bg-[#FEE2E2] text-[#991B1B] border-[#EF4444]",
  Staging: "bg-[#FEF3C7] text-[#92400E] border-[#F59E0B]",
  Development: "bg-[#DCFCE7] text-[#166534] border-[#22C55E]",
};

export const setactive: Record<string, string> = {
  Active: "bg-emerald-600 text-emerald-50 border-emerald-400",
  InActive: "bg-red-500 text-emerald-50 border-red-700",
};

export const SeverityStyle: Record<string, string> = {
  Error: "bg-red-600 text-[#ffffff] border-[#dc2626]",
  Warning: "bg-yellow-500 text-[#FFFFFF] border-[#F59E0B]",
};

export const StatusStyle: Record<string, string> = {
  Bug: "bg-red-50 border-red-200 text-red-700 dark:bg-red-500/10 dark:border-red-500/20 dark:text-red-400",
  InProcess: "bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-500/10 dark:border-blue-500/20 dark:text-blue-400",
  Resolved: "bg-green-50 border-green-200 text-green-700 dark:bg-green-500/10 dark:border-green-500/20 dark:text-green-400",
};
// export const projectStatus: Record
