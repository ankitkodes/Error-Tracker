"use client";

import { useState } from "react";
import { 
  Bell, 
  Mail, 
  MessageSquare, 
  Webhook, 
  Plus, 
  Search, 
  MoreVertical, 
  CheckCircle2, 
  AlertTriangle, 
  Clock,
  Activity,
  Filter
} from "lucide-react";

export default function Alerts() {
  const [activeTab, setActiveTab] = useState<"rules" | "history">("rules");

  const alertRules = [
    {
      id: "1",
      name: "High Error Rate spike",
      project: "production-api",
      condition: "Error count > 100 in 5m",
      destinations: ["Slack", "Email"],
      active: true,
      lastTriggered: "2 hours ago",
    },
    {
      id: "2",
      name: "New Critical Issue",
      project: "frontend-app",
      condition: "Severity is Critical",
      destinations: ["Email"],
      active: true,
      lastTriggered: "1 day ago",
    },
    {
      id: "3",
      name: "API Latency Degradation",
      project: "payment-service",
      condition: "p95 latency > 2000ms",
      destinations: ["Webhook"],
      active: false,
      lastTriggered: "Never",
    }
  ];

  const alertHistory = [
    {
      id: "1",
      ruleName: "High Error Rate spike",
      project: "production-api",
      triggeredAt: "2 hours ago",
      status: "Resolved",
      details: "Observed 145 errors in 5m window",
    },
    {
      id: "2",
      ruleName: "New Critical Issue",
      project: "frontend-app",
      triggeredAt: "1 day ago",
      status: "Triggered",
      details: "ReferenceError: process is not defined",
    },
    {
      id: "3",
      ruleName: "High Error Rate spike",
      project: "production-api",
      triggeredAt: "3 days ago",
      status: "Resolved",
      details: "Observed 112 errors in 5m window",
    }
  ];

  const getDestinationIcon = (dest: string) => {
    switch (dest) {
      case "Slack": return <MessageSquare className="w-4 h-4" />;
      case "Email": return <Mail className="w-4 h-4" />;
      case "Webhook": return <Webhook className="w-4 h-4" />;
      default: return <Bell className="w-4 h-4" />;
    }
  };

  return (
    <div className="w-full">
      {/* Header section */}
      <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 w-full">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Alerts</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage notification rules and view alert history
          </p>
        </div>
        <div className="shrink-0 flex items-center gap-3">
          <button className="flex items-center justify-center gap-2 border border-black/[0.08] dark:border-white/[0.08] bg-white dark:bg-[#18171D] hover:bg-gray-50 dark:hover:bg-white/5 transition-colors px-4 py-2 rounded-lg text-sm font-medium">
            <Filter className="w-4 h-4" />
            <span className="hidden sm:inline">Filter</span>
          </button>
          <button className="flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors px-4 py-2 rounded-lg text-sm font-medium shadow-sm">
            <Plus className="w-4 h-4" />
            <span>Create Rule</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-6 border-b border-black/[0.08] dark:border-white/[0.08] mt-4 mb-6">
        <button
          onClick={() => setActiveTab("rules")}
          className={`pb-3 text-sm font-medium border-b-2 transition-colors relative top-[1px] ${
            activeTab === "rules"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground hover:border-black/20 dark:hover:border-white/20"
          }`}
        >
          Alert Rules
        </button>
        <button
          onClick={() => setActiveTab("history")}
          className={`pb-3 text-sm font-medium border-b-2 transition-colors relative top-[1px] ${
            activeTab === "history"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground hover:border-black/20 dark:hover:border-white/20"
          }`}
        >
          Alert History
        </button>
      </div>

      {/* Content */}
      <div className="w-full animate-in fade-in slide-in-from-bottom-2 duration-500">
        {activeTab === "rules" && (
          <div className="space-y-4">
            <div className="relative w-full sm:max-w-md mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search alert rules..."
                className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-[#18171D] border border-black/[0.08] dark:border-white/[0.08] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-shadow"
              />
            </div>

            <div className="grid grid-cols-1 gap-4">
              {alertRules.map((rule) => (
                <div
                  key={rule.id}
                  className="group flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 lg:p-6 bg-white dark:bg-[#18171D] border border-black/[0.08] dark:border-white/[0.08] rounded-xl hover:border-primary/30 transition-all shadow-sm hover:shadow-md"
                >
                  <div className="flex items-start gap-4 flex-1">
                    <div className={`mt-1 flex items-center justify-center w-10 h-10 rounded-full shrink-0 transition-colors ${rule.active ? "bg-primary/10 text-primary" : "bg-gray-100 dark:bg-white/5 text-muted-foreground"}`}>
                      <Bell className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-base flex items-center gap-2 text-foreground">
                        {rule.name}
                        {!rule.active && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 dark:bg-white/10 text-muted-foreground uppercase font-bold tracking-wider">
                            Disabled
                          </span>
                        )}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 mt-2 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1.5 bg-gray-50 dark:bg-white/5 border border-black/[0.05] dark:border-white/[0.05] px-2.5 py-1 rounded-md text-xs font-medium">
                          <Activity className="w-3.5 h-3.5" />
                          {rule.project}
                        </span>
                        <span className="text-gray-300 dark:text-gray-600">•</span>
                        <span>{rule.condition}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between lg:justify-end gap-6 w-full lg:w-auto mt-2 lg:mt-0 pt-4 lg:pt-0 border-t border-black/[0.05] dark:border-white/[0.05] lg:border-t-0">
                    <div className="flex flex-col gap-1 lg:items-end">
                      <div className="flex items-center -space-x-2">
                        {rule.destinations.map((dest, i) => (
                          <div
                            key={i}
                            className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-white dark:border-[#18171D] bg-gray-50 dark:bg-gray-800 text-muted-foreground hover:text-foreground hover:z-10 transition-colors cursor-help"
                            title={dest}
                          >
                            {getDestinationIcon(dest)}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="hidden lg:flex flex-col text-right">
                        <span className="text-xs text-muted-foreground">Last triggered</span>
                        <span className="text-sm font-medium text-foreground">{rule.lastTriggered}</span>
                      </div>
                      
                      <div className="w-px h-8 bg-black/[0.08] dark:bg-white/[0.08] hidden lg:block"></div>
                      
                      <button className="text-muted-foreground hover:text-foreground transition-colors p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-md">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "history" && (
          <div className="space-y-4">
            <div className="bg-white dark:bg-[#18171D] border border-black/[0.08] dark:border-white/[0.08] rounded-xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-muted-foreground uppercase bg-gray-50/50 dark:bg-white/[0.02] border-b border-black/[0.08] dark:border-white/[0.08]">
                    <tr>
                      <th className="px-6 py-4 font-medium">Alert Rule</th>
                      <th className="px-6 py-4 font-medium">Details</th>
                      <th className="px-6 py-4 font-medium">Time</th>
                      <th className="px-6 py-4 font-medium">Status</th>
                      <th className="px-6 py-4 font-medium text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/[0.05] dark:divide-white/[0.05]">
                    {alertHistory.map((history) => (
                      <tr key={history.id} className="hover:bg-gray-50/50 dark:hover:bg-white/[0.02] transition-colors group">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg transition-colors ${history.status === "Triggered" ? "bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 group-hover:bg-red-100 dark:group-hover:bg-red-500/20" : "bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 group-hover:bg-green-100 dark:group-hover:bg-green-500/20"}`}>
                              {history.status === "Triggered" ? <AlertTriangle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
                            </div>
                            <div>
                              <div className="font-medium text-foreground">{history.ruleName}</div>
                              <div className="text-xs text-muted-foreground mt-0.5">{history.project}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-muted-foreground max-w-xs truncate">
                          {history.details}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            {history.triggeredAt}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
                            history.status === "Triggered" 
                              ? "bg-red-50 border-red-200 text-red-700 dark:bg-red-500/10 dark:border-red-500/20 dark:text-red-400" 
                              : "bg-green-50 border-green-200 text-green-700 dark:bg-green-500/10 dark:border-green-500/20 dark:text-green-400"
                          }`}>
                            {history.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                            View details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
