"use client";

import { UseErrorId } from "@/lib/store";
import axios from "axios";
import { useEffect, useState } from "react";
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
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function ErrorDrawer({ projectid }: any) {
  const errorId = UseErrorId((state) => state.errorId);
  const isOpen = UseErrorId((state) => state.ErrorDrawer);
  const closeDrawer = UseErrorId((state) => state.setErrorDrawer);

  const [errorDetails, setErrorDetails] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function Geterror() {
      if (!errorId || !isOpen) return;
      setLoading(true);
      try {
        const response = await axios.get(
          `/api/projects/${projectid}/errors/${errorId}`,
        );
        setErrorDetails(response.data.error);
      } catch (err) {
        console.error("Failed to fetch error details", err);
      } finally {
        setLoading(false);
      }
    }

    if (isOpen) {
      Geterror();
    }
  }, [errorId, isOpen, projectid]);

  async function onPress() {
    const response = await axios({
      method: "PUT",
      url: `/api/projects/${projectid}/errors/${errorId}`,
      data: {
        status: "Resolved",
      },
    });
    console.log("this is response from the frontend :-", response);
    alert("function ran successfully");
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Bug":
        return "text-red-400/90 bg-red-400/5 border-red-400/10";
      case "InProcess":
        return "text-yellow-400/90 bg-yellow-400/5 border-yellow-400/10";
      case "Fixed":
        return "text-green-400/90 bg-green-400/5 border-green-400/10";
      default:
        return "text-gray-400 bg-gray-400/5 border-gray-400/10";
    }
  };

  const renderStackTrace = (stack: string) => {
    if (!stack) return null;
    const errorDetails = JSON.parse(stack);
    const lines = stack.split("\n");
    return (
      <div className="bg-[#0c0c0e] rounded-xl border border-white/5 overflow-hidden shadow-xl">
        <div className="flex items-center justify-between px-3 py-2 bg-white/[0.02] border-b border-white/5">
          <div className="flex items-center gap-2 text-[10px] font-bold text-white/40 uppercase tracking-widest">
            <Terminal size={12} className="text-red-500/60" />
            Stack Trace
          </div>
          <span className="text-[10px] text-white/20 font-mono">
            {lines.length} frames
          </span>
        </div>
        <div className="p-3 font-mono text-[12px] overflow-x-auto space-y-1 custom-scrollbar max-h-[400px]">
          {lines.map((line, i) => {
            const isAtLine = line.trim().startsWith("at ");
            return (
              <div
                key={i}
                className={`flex gap-3 group transition-colors duration-150 py-0.5 px-2 rounded ${isAtLine ? "hover:bg-white/[0.02]" : ""}`}
              >
                <span className="w-6 text-right text-white/10 select-none shrink-0 text-[10px] mt-0.5">
                  {i}
                </span>
                <span
                  className={`${isAtLine ? "text-white/60" : "text-red-400/80 font-bold"}`}
                >
                  {errorDetails["stack"]}
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
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => closeDrawer(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-all"
          />
        )}
      </AnimatePresence>

      <div
        className={`fixed top-0 right-0 h-screen w-full sm:w-[450px] md:w-[550px] lg:w-[650px] bg-[#0c0c0e] shadow-2xl
        transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] z-50 border-l border-white/5 flex flex-col
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {!errorDetails && loading ? (
          <div className="flex-1 flex items-center justify-center bg-[#0c0c0e]">
            <div className="flex flex-col items-center gap-4">
              <div className="w-8 h-8 border-2 border-red-500/10 border-t-red-500/60 rounded-full animate-spin" />
              <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.2em] animate-pulse">
                Tracing Error
              </p>
            </div>
          </div>
        ) : errorDetails ? (
          <>
            {/* Header */}
            <div className="p-6 border-b border-white/5 bg-[#0c0c0e] relative shrink-0">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-2xl bg-red-500/5 border border-red-500/10 shadow-inner">
                    <ShieldAlert className="text-red-500/80" size={24} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${errorDetails.severity === "Warning" ? "text-yellow-400 bg-yellow-400/5 border-yellow-400/10" : "text-red-400 bg-red-400/5 border-red-400/10"}`}
                      >
                        {errorDetails.severity}
                      </span>
                      <button
                        onClick={onPress}
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${getStatusColor(errorDetails.status)}`}
                      >
                        {errorDetails.status}
                      </button>
                    </div>
                    <h2 className="text-xl font-bold text-white tracking-tight leading-tight">
                      <span className="text-red-500/90 font-mono text-lg mr-2 opacity-80">
                        {errorDetails.errorType || "Error"}
                      </span>
                      <p className="mt-1 text-white/90 font-medium">
                        {errorDetails.message}
                      </p>
                    </h2>
                  </div>
                </div>
                <button
                  onClick={() => closeDrawer(false)}
                  className="p-2 text-white/20 hover:text-white/60 hover:bg-white/5 rounded-full transition-all"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex flex-wrap gap-2.5">
                <button className="flex items-center gap-2 px-5 py-2 bg-red-500/90 hover:bg-red-500 text-white rounded-xl text-[12px] font-bold transition-all active:scale-95 shadow-lg shadow-red-500/10 cursor-pointer">
                  <CheckCircle2 size={15} />
                  Mark Resolved
                </button>
                <button className="flex items-center gap-2 px-5 py-2 bg-white/5 hover:bg-white/10 text-white/90 border border-white/10 rounded-xl text-[12px] font-bold transition-all active:scale-95 cursor-pointer">
                  <UserPlus size={15} />
                  Assign
                </button>
                <button className="flex items-center gap-2 px-5 py-2 bg-white/[0.02] hover:bg-white/[0.05] text-white/40 border border-white/5 rounded-xl text-[12px] font-bold transition-all active:scale-95 cursor-pointer">
                  <Layers size={15} />
                  Archive
                </button>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
              {/* Stats Bar */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-gradient-to-b from-white/[0.03] to-transparent border border-white/5">
                  <div className="flex items-center gap-1.5 text-white/30 mb-1.5">
                    <Activity size={12} className="text-red-500/50" />
                    <span className="text-[9px] font-bold uppercase tracking-widest">
                      Total
                    </span>
                  </div>
                  <div className="text-lg font-black text-white tracking-tighter">
                    {errorDetails.occurrence?.toLocaleString() || "1"}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-gradient-to-b from-white/[0.03] to-transparent border border-white/5">
                  <div className="flex items-center gap-1.5 text-white/30 mb-1.5">
                    <Clock size={12} className="text-blue-500/50" />
                    <span className="text-[9px] font-bold uppercase tracking-widest">
                      Detected
                    </span>
                  </div>
                  <div className="text-[10px] font-bold text-white/70 leading-tight">
                    {new Date(errorDetails.createdAt).toLocaleDateString(
                      "en-US",
                      { month: "short", day: "numeric" },
                    )}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-gradient-to-b from-white/[0.03] to-transparent border border-white/5 border-red-500/10">
                  <div className="flex items-center gap-1.5 text-white/30 mb-1.5">
                    <History size={12} className="text-orange-500/50" />
                    <span className="text-[9px] font-bold uppercase tracking-widest text-orange-400/60">
                      Updated
                    </span>
                  </div>
                  <div className="text-[10px] font-black text-orange-400/80 leading-tight">
                    2hr ago
                  </div>
                </div>
              </div>

              {/* Source Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">
                  <MapPin size={12} className="text-red-500/60" />
                  Primary Location
                </div>
                {errorDetails.fileName ? (
                  <div className="p-4 bg-white/[0.01] border border-white/5 rounded-2xl flex items-center gap-4 transition-colors hover:bg-white/[0.02]">
                    <div className="w-10 h-10 rounded-xl bg-red-400/5 flex items-center justify-center border border-red-400/10 shrink-0">
                      <FileCode size={20} className="text-red-400/40" />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-[12px] text-white/90 font-mono truncate mb-0.5">
                        {errorDetails.fileName}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-white/20 font-bold uppercase tracking-wider">
                          Line Number:
                        </span>
                        <span className="text-[10px] text-red-400/80 font-mono font-bold">
                          {errorDetails.lineNumber}
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 bg-white/[0.02] rounded-2xl border border-white/5 border-dashed flex items-center gap-3">
                    <AlertCircle size={14} className="text-white/20" />
                    <p className="text-[11px] text-white/30 italic">
                      Runtime event. No specific file metadata available for
                      this trace.
                    </p>
                  </div>
                )}
              </div>

              {/* Stack Trace */}
              {errorDetails.error && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">
                    <Layers size={12} className="text-red-500/60" />
                    Execution Stack
                  </div>
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500/10 to-transparent rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
                    <div className="relative">
                      {renderStackTrace(errorDetails.error)}
                    </div>
                  </div>
                </div>
              )}

              {/* System Context */}
              <div className="p-5 rounded-2xl border border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent space-y-6">
                <div className="flex items-center justify-between">
                  <h4 className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">
                    System Metadata
                  </h4>
                  <div className="flex items-center gap-1.5 px-2 py-0.5 bg-green-500/5 border border-green-500/10 rounded-full">
                    <div className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[8px] font-bold text-green-500/80 uppercase">
                      Active
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-y-6 gap-x-4 text-[11px]">
                  <div className="space-y-1.5">
                    <p className="text-[10px] text-white/20 font-bold uppercase tracking-wider">
                      Environment
                    </p>
                    <p className="text-white/80 font-black tracking-widest uppercase">
                      Production
                    </p>
                  </div>

                  <div className="space-y-1.5 text-right">
                    <p className="text-[10px] text-white/20 font-bold uppercase tracking-wider">
                      Event ID
                    </p>
                    <p className="font-mono text-white/50 bg-white/5 px-2 py-0.5 rounded inline-block">
                      #{errorDetails.id}
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <p className="text-[10px] text-white/20 font-bold uppercase tracking-wider">
                      Project ID
                    </p>
                    <p
                      className="font-mono text-white/50 truncate max-w-[150px]"
                      title={errorDetails.projectId}
                    >
                      {errorDetails.projectId}
                    </p>
                  </div>

                  <div className="space-y-1.5 text-right">
                    <p className="text-[10px] text-white/20 font-bold uppercase tracking-wider">
                      Fingerprint
                    </p>
                    <p
                      className="font-mono text-white/40 truncate text-[9px]"
                      title={errorDetails.issuehashId || "Not hashed"}
                    >
                      {errorDetails.issuehashId
                        ? errorDetails.issuehashId.substring(0, 16) + "..."
                        : "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-white/5 bg-white/[0.01] flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2 opacity-30">
                <Terminal size={12} className="text-red-500" />
                <span className="text-[8px] font-black tracking-[0.4em] uppercase text-white">
                  BugTrace Runtime Index
                </span>
              </div>
              <button
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[9px] font-black text-red-400/40 uppercase tracking-widest hover:text-red-400 hover:bg-red-400/5 transition-all cursor-pointer"
                onClick={() => {
                  /* potential delete logic */
                }}
              >
                <Trash2 size={12} />
                Purge Event
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-[#0c0c0e]">
            <AlertCircle size={32} className="text-white/5 mb-4" />
            <h3 className="text-sm font-bold text-white/60 mb-1">
              Index Missing
            </h3>
            <p className="text-[11px] text-white/20 max-w-[200px]">
              The requested event could not be retrieved from the edge index.
            </p>
          </div>
        )}
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </>
  );
}
