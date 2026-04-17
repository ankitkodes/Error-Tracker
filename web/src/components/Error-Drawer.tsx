"use client";

import { UseErrorId } from "@/lib/store";
import { useGetErrors } from "@/lib/services/errors/errors.query";
import {
  useUpdateErrorStatus,
  useDeleteError,
} from "@/lib/services/errors/error.mutation";
import { StatusStyle, SeverityStyle } from "@/lib/projectstyles";
import { cn } from "@/lib/utils";
import { timeAgo } from "@/utils/timeAgo";
import {
  X,
  AlertCircle,
  Clock,
  Terminal,
  UserPlus,
  CheckCircle2,
  Trash2,
  Activity,
  FileCode,
  Layers,
  ShieldAlert,
  MapPin,
  History,
  Loader2,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import toast from "react-hot-toast";
import { Skeleton } from "./ui/skeleton";

export default function ErrorDrawer() {
  const errorId = UseErrorId((state) => state.errorId);
  const projectId = UseErrorId((state) => state.projectId);
  const isOpen = UseErrorId((state) => state.ErrorDrawer);
  const closeDrawer = UseErrorId((state) => state.setErrorDrawer);

  const { data, isLoading, isError } = useGetErrors({
    projectId,
    errorId: String(errorId),
  });

  const updateStatusMutation = useUpdateErrorStatus();
  const deleteErrorMutation = useDeleteError();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const errorDetails: any = data?.error ?? null;

  async function handleResolve() {
    if (!errorId || !projectId) return;
    updateStatusMutation.mutate(
      { projectId, errorId, status: "Resolved" },
      {
        onSuccess: () => toast.success("Error marked as resolved"),
        onError: () => toast.error("Failed to update status"),
      }
    );
  }

  async function handleDelete() {
    if (!errorId || !projectId) return;
    deleteErrorMutation.mutate(
      { projectId, errorId },
      {
        onSuccess: () => {
          toast.success("Error deleted");
          closeDrawer(false);
        },
        onError: () => toast.error("Failed to delete error"),
      }
    );
  }

  const renderStackTrace = (stack: string) => {
    if (!stack) return null;
    let parsedStack: { stack?: string } = {};
    try {
      parsedStack = JSON.parse(stack);
    } catch {
      return null;
    }
    const stackStr = parsedStack.stack ?? stack;
    const lines = stackStr.split("\n");
    return (
      <div className="rounded-xl border border-black/[0.08] dark:border-white/[0.08] overflow-hidden bg-gray-50 dark:bg-[#13121a]">
        <div className="flex items-center justify-between px-4 py-2.5 bg-gray-100/80 dark:bg-white/[0.03] border-b border-black/[0.06] dark:border-white/[0.06]">
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            <Terminal size={14} className="text-red-500" />
            Stack Trace
          </div>
          <span className="text-[11px] text-gray-400 dark:text-gray-500 font-mono">
            {lines.length} frames
          </span>
        </div>
        <div className="p-3 font-mono text-xs overflow-x-auto max-h-[350px] overflow-y-auto space-y-0.5">
          {lines.map((line, i) => {
            const isAtLine = line.trim().startsWith("at ");
            return (
              <div
                key={i}
                className={cn(
                  "flex gap-3 py-0.5 px-2 rounded transition-colors",
                  isAtLine && "hover:bg-black/[0.03] dark:hover:bg-white/[0.03]"
                )}
              >
                <span className="w-5 text-right text-gray-300 dark:text-gray-600 select-none shrink-0 text-[10px] mt-0.5">
                  {i}
                </span>
                <span
                  className={cn(
                    isAtLine
                      ? "text-gray-600 dark:text-gray-400"
                      : "text-red-600 dark:text-red-400 font-semibold"
                  )}
                >
                  {line}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => closeDrawer(false)}
            className="fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>

      {/* Drawer panel */}
      <div
        className={cn(
          "fixed top-0 right-0 h-screen w-full sm:w-[440px] md:w-[520px] lg:w-[600px] z-50",
          "bg-white dark:bg-[#18171D] border-l border-black/[0.08] dark:border-white/[0.08]",
          "shadow-2xl flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Loading state skeleton */}
        {isLoading && isOpen ? (
          <div className="flex-1 flex flex-col p-6 space-y-8 animate-pulse">
            <div className="flex items-start justify-between">
               <div className="flex gap-4 grow">
                  <Skeleton className="size-12 rounded-xl shrink-0" />
                  <div className="space-y-3 grow">
                     <div className="flex gap-2">
                        <Skeleton className="h-5 w-20" />
                        <Skeleton className="h-5 w-20" />
                     </div>
                     <Skeleton className="h-6 w-3/4" />
                     <Skeleton className="h-4 w-full" />
                  </div>
               </div>
               <Skeleton className="size-8 rounded-lg" />
            </div>
            
            <div className="grid grid-cols-3 gap-4">
               <Skeleton className="h-20 rounded-xl" />
               <Skeleton className="h-20 rounded-xl" />
               <Skeleton className="h-20 rounded-xl" />
            </div>

            <div className="space-y-4">
               <Skeleton className="h-5 w-32" />
               <Skeleton className="h-24 w-full rounded-xl" />
            </div>

            <div className="space-y-4 pt-4">
               <Skeleton className="h-5 w-32" />
               <Skeleton className="h-48 w-full rounded-xl" />
            </div>
          </div>
        ) : isError && isOpen ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <AlertCircle size={36} className="text-gray-300 dark:text-gray-600 mb-3" />
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Failed to load error
            </h3>
            <p className="text-xs text-gray-400 dark:text-gray-500 max-w-[220px]">
              Something went wrong while fetching the error details. Please try again.
            </p>
          </div>
        ) : errorDetails ? (
          <>
            {/* ── Header ── */}
            <div className="p-5 border-b border-black/[0.08] dark:border-white/[0.08] shrink-0">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3 min-w-0">
                  <div className="p-2.5 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 shrink-0 mt-0.5">
                    <ShieldAlert className="text-red-500" size={20} />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <span
                        className={cn(
                          "text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md",
                          SeverityStyle[errorDetails.severity] ??
                            "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                        )}
                      >
                        {errorDetails.severity}
                      </span>
                      <span
                        className={cn(
                          "text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md",
                          StatusStyle[errorDetails.status] ??
                            "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                        )}
                      >
                        {errorDetails.status}
                      </span>
                    </div>
                    <p className="text-base font-bold text-gray-900 dark:text-white leading-snug">
                      <span className="text-red-500 font-mono text-sm mr-1.5">
                        {errorDetails.errorType || "Error"}
                      </span>
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mt-0.5 break-words">
                      {errorDetails.message}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => closeDrawer(false)}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/[0.06] transition-colors shrink-0"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={handleResolve}
                  disabled={
                    updateStatusMutation.isPending ||
                    errorDetails.status === "Resolved"
                  }
                  className={cn(
                    "flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all active:scale-[0.97] cursor-pointer",
                    errorDetails.status === "Resolved"
                      ? "bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 border border-green-200 dark:border-green-500/20 cursor-default"
                      : "bg-red-500 hover:bg-red-600 text-white shadow-sm"
                  )}
                >
                  {updateStatusMutation.isPending ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    <CheckCircle2 size={14} />
                  )}
                  {errorDetails.status === "Resolved"
                    ? "Resolved"
                    : "Mark Resolved"}
                </button>
                <button className="flex items-center gap-1.5 px-4 py-2 bg-gray-100 dark:bg-white/[0.06] hover:bg-gray-200 dark:hover:bg-white/[0.1] text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-white/[0.08] rounded-lg text-xs font-semibold transition-all active:scale-[0.97] cursor-pointer">
                  <UserPlus size={14} />
                  Assign
                </button>
                <button className="flex items-center gap-1.5 px-4 py-2 bg-gray-50 dark:bg-white/[0.03] hover:bg-gray-100 dark:hover:bg-white/[0.06] text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-white/[0.06] rounded-lg text-xs font-semibold transition-all active:scale-[0.97] cursor-pointer">
                  <Layers size={14} />
                  Archive
                </button>
              </div>
            </div>

            {/* ── Content area ── */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6">
              {/* Stats row */}
              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-xl border border-black/[0.08] dark:border-white/[0.08] bg-white dark:bg-[#1e1d24] p-3.5">
                  <div className="flex items-center gap-1.5 text-gray-400 dark:text-gray-500 mb-1.5">
                    <Activity size={13} className="text-red-500" />
                    <span className="text-[10px] font-semibold uppercase tracking-wider">
                      Occurrences
                    </span>
                  </div>
                  <div className="text-lg font-bold text-gray-900 dark:text-white">
                    {errorDetails.occurrence?.toLocaleString() || "1"}
                  </div>
                </div>

                <div className="rounded-xl border border-black/[0.08] dark:border-white/[0.08] bg-white dark:bg-[#1e1d24] p-3.5">
                  <div className="flex items-center gap-1.5 text-gray-400 dark:text-gray-500 mb-1.5">
                    <Clock size={13} className="text-blue-500" />
                    <span className="text-[10px] font-semibold uppercase tracking-wider">
                      First Seen
                    </span>
                  </div>
                  <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    {errorDetails.createdAt
                      ? timeAgo(errorDetails.createdAt)
                      : "—"}
                  </div>
                </div>

                <div className="rounded-xl border border-black/[0.08] dark:border-white/[0.08] bg-white dark:bg-[#1e1d24] p-3.5">
                  <div className="flex items-center gap-1.5 text-gray-400 dark:text-gray-500 mb-1.5">
                    <History size={13} className="text-orange-500" />
                    <span className="text-[10px] font-semibold uppercase tracking-wider">
                      Last Seen
                    </span>
                  </div>
                  <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    {errorDetails.updatedAt
                      ? timeAgo(errorDetails.updatedAt)
                      : "—"}
                  </div>
                </div>
              </div>

              {/* Source info */}
              <div className="space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                  <MapPin size={13} className="text-red-500" />
                  Source Location
                </div>
                {errorDetails.fileName ? (
                  <div className="p-4 rounded-xl border border-black/[0.08] dark:border-white/[0.08] bg-white dark:bg-[#1e1d24] flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 flex items-center justify-center shrink-0">
                      <FileCode size={18} className="text-red-500" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm text-gray-800 dark:text-gray-200 font-mono truncate">
                        {errorDetails.fileName}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] text-gray-400 dark:text-gray-500 font-semibold uppercase tracking-wider">
                          Line
                        </span>
                        <span className="text-[11px] text-red-500 font-mono font-bold">
                          {errorDetails.lineNumber}
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 rounded-xl border border-dashed border-gray-200 dark:border-white/[0.06] bg-gray-50/50 dark:bg-white/[0.02] flex items-center gap-3">
                    <AlertCircle
                      size={16}
                      className="text-gray-300 dark:text-gray-600 shrink-0"
                    />
                    <p className="text-xs text-gray-400 dark:text-gray-500 italic">
                      Runtime event — no specific file metadata available.
                    </p>
                  </div>
                )}
              </div>

              {/* Stack trace */}
              {errorDetails.error && (
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                    <Layers size={13} className="text-red-500" />
                    Stack Trace
                  </div>
                  {renderStackTrace(errorDetails.error)}
                </div>
              )}

              {/* System metadata */}
              <div className="rounded-xl border border-black/[0.08] dark:border-white/[0.08] bg-white dark:bg-[#1e1d24] p-5 space-y-5">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                    System Metadata
                  </h4>
                  <div className="flex items-center gap-1.5 px-2 py-0.5 bg-green-50 dark:bg-green-500/10 border border-green-100 dark:border-green-500/20 rounded-full">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[10px] font-semibold text-green-600 dark:text-green-400 uppercase">
                      Active
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-y-5 gap-x-4 text-sm">
                  <div>
                    <p className="text-[10px] text-gray-400 dark:text-gray-500 font-semibold uppercase tracking-wider mb-1">
                      Environment
                    </p>
                    <p className="text-gray-800 dark:text-gray-200 font-bold uppercase tracking-wide text-xs">
                      Production
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-[10px] text-gray-400 dark:text-gray-500 font-semibold uppercase tracking-wider mb-1">
                      Event ID
                    </p>
                    <span className="font-mono text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-white/[0.06] px-2 py-0.5 rounded">
                      #{errorDetails.id}
                    </span>
                  </div>

                  <div>
                    <p className="text-[10px] text-gray-400 dark:text-gray-500 font-semibold uppercase tracking-wider mb-1">
                      Project ID
                    </p>
                    <p
                      className="font-mono text-xs text-gray-500 dark:text-gray-400 truncate max-w-[160px]"
                      title={errorDetails.projectId}
                    >
                      {errorDetails.projectId}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-[10px] text-gray-400 dark:text-gray-500 font-semibold uppercase tracking-wider mb-1">
                      Fingerprint
                    </p>
                    <p
                      className="font-mono text-[10px] text-gray-400 dark:text-gray-500 truncate"
                      title={errorDetails.issuehashId || "Not hashed"}
                    >
                      {errorDetails.issuehashId
                        ? errorDetails.issuehashId.substring(0, 16) + "…"
                        : "N/A"}
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] text-gray-400 dark:text-gray-500 font-semibold uppercase tracking-wider mb-1">
                      Created
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                      {errorDetails.createdAt
                        ? timeAgo(errorDetails.createdAt)
                        : "—"}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-[10px] text-gray-400 dark:text-gray-500 font-semibold uppercase tracking-wider mb-1">
                      Updated
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                      {errorDetails.updatedAt
                        ? timeAgo(errorDetails.updatedAt)
                        : "—"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Footer ── */}
            <div className="p-4 border-t border-black/[0.08] dark:border-white/[0.08] flex items-center justify-between shrink-0 bg-gray-50/50 dark:bg-white/[0.01]">
              <div className="flex items-center gap-2">
                <Terminal size={14} className="text-red-500/60" />
                <span className="text-[10px] font-bold tracking-widest uppercase text-gray-400 dark:text-gray-600">
                  BugTrace
                </span>
              </div>
              <button
                onClick={handleDelete}
                disabled={deleteErrorMutation.isPending}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-red-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all cursor-pointer"
              >
                {deleteErrorMutation.isPending ? (
                  <Loader2 size={13} className="animate-spin" />
                ) : (
                  <Trash2 size={13} />
                )}
                Delete
              </button>
            </div>
          </>
        ) : isOpen ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <AlertCircle
              size={36}
              className="text-gray-300 dark:text-gray-600 mb-3"
            />
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
              No Error Selected
            </h3>
            <p className="text-xs text-gray-400 dark:text-gray-500 max-w-[220px]">
              Select an error from the list to view its details.
            </p>
          </div>
        ) : null}
      </div>
    </>
  );
}
