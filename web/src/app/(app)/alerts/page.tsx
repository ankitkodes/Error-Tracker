"use client";

import { useState, useMemo } from "react";
import { useCreateAlert } from "@/lib/services/alerts/alerts.mutation";
import { useGetAlerts } from "@/lib/services/alerts/alerts.query";
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
  Filter,
  BellRing,
  X,
  BellPlus,
  ChevronDown
} from "lucide-react";
import { timeAgo } from "@/utils/timeAgo";
import { useGetProjects } from "@/lib/services/projects/projects.query";

type AlertRuleType = {
  id: string;
  name: string;
  project: string;
  condition: string;
  destinations: string[];
  active: boolean;
  lastTriggered: string;
};

export default function Alerts() {
  const [activeTab, setActiveTab] = useState<"rules" | "history">("rules");
  const { mutate: createAlertRule, isPending: isCreatingRule } = useCreateAlert();
  const { data: dbAlerts } = useGetAlerts();
  const { data } = useGetProjects()
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterProject, setFilterProject] = useState("All");
  const [ruleType, setRuleType] = useState("project_errors");

  const [ruleFormState, setRuleFormState] = useState({
    name: "",
    project: "",
    errorName: "",
    errorCount: "100",
    timeWindow: "5m"
  });

  const handleRuleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setRuleFormState(prev => {
      const newState = { ...prev, [name]: value };
      console.log(`[Create Rule Modal] ${name} changed to:`, value);
      console.log(`[Create Rule Modal] Current stored state:`, newState);
      return newState;
    });

    if (name === "ruleType") {
      setRuleType(value);
    }
  };

  const alertRules: AlertRuleType[] = useMemo(() => {
    if (!Array.isArray(dbAlerts)) return [];
    return dbAlerts.map((rule: { id: string | number; name: string; project: string; condition: string; active?: boolean; lastTriggered?: string }) => ({
      id: String(rule.id),
      name: String(rule.name),
      project: String(rule.project),
      condition: String(rule.condition),
      destinations: ["Email"],
      active: rule.active !== false,
      lastTriggered: rule.lastTriggered ? new Date(rule.lastTriggered).toLocaleString() : "Never",
    }));
  }, [dbAlerts]);

  const [alertHistory, setAlertHistory] = useState([
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
  ]);

  const getDestinationIcon = (dest: string) => {
    switch (dest) {
      case "Slack": return <MessageSquare className="w-4 h-4" />;
      case "Email": return <Mail className="w-4 h-4" />;
      case "Webhook": return <Webhook className="w-4 h-4" />;
      default: return <Bell className="w-4 h-4" />;
    }
  };

  const handleAlertAll = () => {
    const newHistory = alertRules.map((rule, idx) => ({
      id: Date.now().toString() + idx,
      ruleName: rule.name,
      project: rule.project,
      triggeredAt: "Just now",
      status: "Triggered",
      details: "Manual Alert All triggered",
    }));
    setAlertHistory(prev => [...newHistory, ...prev]);
  };

  const handleCreateRule = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const rType = formData.get("ruleType") as string;
    const tWindow = formData.get("timeWindow") as string;
    const eCount = formData.get("errorCount") as string;

    let conditionStr = "";
    if (rType === "project_errors") {
      conditionStr = `Error count > ${eCount} in ${tWindow}`;
    } else if (rType === "specific_error") {
      const eName = formData.get("errorName") as string;
      conditionStr = `'${eName}' occurrences > ${eCount} in ${tWindow}`;
    } else {
      conditionStr = `Severity is Critical`;
    }

    const _newRule = {
      id: Date.now().toString(),
      name: formData.get("name") as string,
      project: formData.get("project") as string,
      condition: conditionStr,
      destinations: (formData.getAll("destinations") as string[]),
      active: true,
      lastTriggered: "Never",
    };

    createAlertRule({
      name: ruleFormState.name,
      projectId: ruleFormState.project,
      condition: conditionStr,
    }, {
      onSuccess: () => {
        setRuleFormState({ name: "", project: "", errorName: "", errorCount: "100", timeWindow: "5m" });
        setIsCreateModalOpen(false);
      },
      onError: (error) => {
        console.error("Failed to create alert rule", error);
      }
    });
  };

  const filteredRules = useMemo(() => {
    return alertRules.filter(rule => {
      const matchesSearch = rule.name.toLowerCase().includes(searchQuery.toLowerCase()) || rule.project.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesProject = filterProject === "All" || rule.project === filterProject;
      return matchesSearch && matchesProject;
    });
  }, [alertRules, searchQuery, filterProject]);

  const uniqueProjects = useMemo(() => {
    const projects = new Set(alertRules.map(r => r.project));
    return ["All", ...Array.from(projects)];
  }, [alertRules]);

  return (
    <div className="w-full">
      {/* Header section */}
      <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 w-full px-1">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Alerts</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage notification rules and view alert history
          </p>
        </div>
        <div className="shrink-0 flex flex-wrap items-center gap-3 relative">
          <button
            onClick={handleAlertAll}
            className="flex items-center justify-center gap-2 border-2 border-black/[0.08] dark:border-white/[0.08] bg-white dark:bg-[#18171D] hover:bg-orange-50 dark:hover:bg-orange-500/10 text-orange-600 dark:text-orange-400 transition-colors px-4 py-2 rounded text-sm font-medium"
          >
            <BellRing className="w-4 h-4" />
            <span className="hidden sm:inline">Alert All</span>
          </button>

          <div>
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center justify-center gap-2 border-2 border-black/[0.08] dark:border-white/[0.08] bg-white dark:bg-[#18171D] hover:bg-gray-50 dark:hover:bg-white/5 transition-colors px-4 py-2 rounded text-sm font-medium"
            >
              <Filter className="w-4 h-4" />
              <span className="hidden sm:inline">Filter {filterProject !== "All" && `(${filterProject})`}</span>
            </button>

            {isFilterOpen && (
              <div className="absolute top-14 right-32 mt-2 w-48 bg-white dark:bg-[#18171D] border border-black/[0.08] dark:border-white/[0.08] rounded-lg shadow-lg z-50 p-2">
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-2">Project</div>
                {uniqueProjects.map(proj => (
                  <button
                    key={proj}
                    onClick={() => { setFilterProject(proj); setIsFilterOpen(false); }}
                    className={`w-full text-left px-2 py-1.5 rounded text-sm ${filterProject === proj ? 'bg-primary/10 text-primary' : 'hover:bg-gray-50 dark:hover:bg-white/5'}`}
                  >
                    {proj}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center justify-center gap-2 border-2 border-primary/20 hover:border-primary rounded px-4 py-2 cursor-pointer hover:bg-primary hover:text-primary-foreground transition text-primary text-sm font-medium"
          >
            <Plus className="w-4 h-4" />
            <span>Create Rule</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-6 border-b border-black/[0.08] dark:border-white/[0.08] mt-4 mb-6 px-1">
        <button
          onClick={() => setActiveTab("rules")}
          className={`pb-3 text-sm font-medium border-b-2 transition-colors relative top-[1px] ${activeTab === "rules"
            ? "border-primary text-primary"
            : "border-transparent text-muted-foreground hover:text-foreground hover:border-black/20 dark:hover:border-white/20"
            }`}
        >
          Alert Rules
        </button>
        <button
          onClick={() => setActiveTab("history")}
          className={`pb-3 text-sm font-medium border-b-2 transition-colors relative top-[1px] ${activeTab === "history"
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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-[#18171D] border border-black/[0.08] dark:border-white/[0.08] rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#00ffb2]/40 transition-shadow transition-colors focus:border-[#00ffb2]/60"
              />
            </div>

            <div className="grid grid-cols-1 gap-4">
              {filteredRules.map((rule) => (
                <div
                  key={rule.id}
                  className="group flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-6 bg-white dark:bg-[#18171D] border border-black/[0.08] dark:border-white/[0.08] rounded-lg hover:border-primary/50 transition-colors shadow-none"
                >
                  <div className="flex items-start gap-4 flex-1">
                    <div className={`mt-1 flex items-center justify-center w-10 h-10 rounded-lg shrink-0 transition-colors ${rule.active ? "bg-primary/10 text-primary" : "bg-gray-100 dark:bg-white/5 text-muted-foreground"}`}>
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
                        <span className="flex items-center gap-1.5 bg-gray-50 dark:bg-white/5 border border-black/[0.05] dark:border-white/[0.05] px-2.5 py-1 rounded text-xs font-medium">
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
                        <span className="text-sm font-medium text-foreground">{timeAgo(rule.lastTriggered)}</span>
                      </div>

                      <div className="w-px h-8 bg-black/[0.08] dark:bg-white/[0.08] hidden lg:block"></div>

                      <button className="text-muted-foreground hover:text-foreground transition-colors p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {filteredRules.length === 0 && (
                <div className="text-center py-12 text-muted-foreground border border-dashed border-black/[0.08] dark:border-white/[0.08] rounded-lg">
                  No alert rules found matching your filters.
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "history" && (
          <div className="space-y-4">
            <div className="bg-white dark:bg-[#18171D] border border-black/[0.08] dark:border-white/[0.08] rounded-lg overflow-hidden">
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
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${history.status === "Triggered"
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

                    {alertHistory.length === 0 && (
                      <tr>
                        <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                          No alert history found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Create Rule Modal (Matched EXACTLY with AddProjectModal styling) */}
      {isCreateModalOpen && (
        <div className="relative z-50">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" />

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <div className="relative transform overflow-hidden rounded-2xl bg-white dark:bg-[#13121a] border border-black/[0.08] dark:border-white/[0.08] text-left shadow-2xl transition-all sm:my-8 w-full max-w-[480px]">

                {/* Subtle gradient glow at top */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[#00ffb2]/40 to-transparent" />

                <div className="px-6 pb-6 pt-8 relative">
                  {/* Close button */}
                  <button
                    onClick={() => {
                      setIsCreateModalOpen(false);
                      setRuleFormState({ name: "", project: "", errorName: "", errorCount: "100", timeWindow: "5m" });
                    }}
                    className="absolute right-5 top-5 cursor-pointer text-muted-foreground hover:text-foreground transition-colors duration-200 hover:bg-black/[0.06] dark:hover:bg-white/[0.06] rounded-lg p-1"
                  >
                    <X size={18} strokeWidth={2} />
                  </button>

                  {/* Header icon */}
                  <div className="flex items-center justify-center mb-5">
                    <div className="bg-[#00ffb2]/10 border border-[#00ffb2]/20 p-3.5 rounded-2xl flex items-center justify-center">
                      <BellPlus className="text-[#00ffb2] w-6 h-6" strokeWidth={2} />
                    </div>
                  </div>

                  {/* Title & subtitle */}
                  <div className="text-center mb-6">
                    <h3 className="text-[22px] font-semibold text-foreground mb-1.5 tracking-tight">
                      Create Alert Rule
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Set up a new notification rule for your project
                    </p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleCreateRule} className="space-y-4">
                    {/* Rule Name */}
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-1.5">
                        Rule Name <span className="text-[#00ffb2]">*</span>
                      </label>
                      <input
                        required
                        name="name"
                        type="text"
                        value={ruleFormState.name}
                        onChange={handleRuleFormChange}
                        placeholder="e.g., High CPU Usage"
                        className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-white/[0.04] border border-black/[0.08] dark:border-white/[0.08] text-foreground placeholder:text-gray-500 focus:outline-none focus:border-[#00ffb2]/40 focus:ring-1 focus:ring-[#00ffb2]/20 transition-all duration-200 text-sm"
                      />
                    </div>

                    {/* Project */}
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-1.5">
                        Project <span className="text-[#00ffb2]">*</span>
                      </label>
                      <div className="relative">
                        <select
                          required
                          name="ruleType"
                          value={ruleType}
                          onChange={handleRuleFormChange}
                          className="w-full appearance-none px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-white/[0.04] border border-black/[0.08] dark:border-white/[0.08] text-foreground focus:outline-none focus:border-[#00ffb2]/40 focus:ring-1 focus:ring-[#00ffb2]/20 transition-all duration-200 text-sm cursor-pointer"
                        >
                          {data?.projectdetails.map((item: { id: string; name: string }) => (
                            <option key={item.id} value={item.id} className="bg-white dark:bg-[#13121a] text-foreground">{item.name}</option>
                          ))}
                        </select>
                        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                      </div>
                    </div>

                    {/* Condition Builder */}
                    <div className="space-y-4 bg-gray-50/50 dark:bg-white/[0.02] p-4 rounded-xl border border-black/[0.04] dark:border-white/[0.04]">
                      <div className="flex items-center gap-2 mb-2">
                        <Activity className="w-4 h-4 text-[#00ffb2]" />
                        <span className="text-sm font-medium text-foreground">Trigger Condition</span>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-muted-foreground mb-1.5">When does it trigger?</label>
                        <div className="relative">
                          <select
                            required
                            name="ruleType"
                            value={ruleType}
                            onChange={handleRuleFormChange}
                            className="w-full appearance-none px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-white/[0.04] border border-black/[0.08] dark:border-white/[0.08] text-foreground focus:outline-none focus:border-[#00ffb2]/40 focus:ring-1 focus:ring-[#00ffb2]/20 transition-all duration-200 text-sm cursor-pointer"
                          >
                            <option value="project_errors" className="bg-white dark:bg-[#13121a] text-foreground">Project Error Spike</option>
                            <option value="specific_error" className="bg-white dark:bg-[#13121a] text-foreground">Specific Error Occurrences</option>
                            <option value="critical_severity" className="bg-white dark:bg-[#13121a] text-foreground">Any Critical Severity Issue</option>
                          </select>
                          <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                        </div>
                      </div>

                      {ruleType === "specific_error" && (
                        <div>
                          <label className="block text-xs font-medium text-muted-foreground mb-1.5">Error contains</label>
                          <input
                            required
                            name="errorName"
                            type="text"
                            value={ruleFormState.errorName}
                            onChange={handleRuleFormChange}
                            placeholder="e.g., ReferenceError"
                            className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-white/[0.04] border border-black/[0.08] dark:border-white/[0.08] text-foreground placeholder:text-gray-500 focus:outline-none focus:border-[#00ffb2]/40 focus:ring-1 focus:ring-[#00ffb2]/20 transition-all duration-200 text-sm"
                          />
                        </div>
                      )}

                      {ruleType !== "critical_severity" && (
                        <div className="flex gap-3">
                          <div className="flex-1">
                            <label className="block text-xs font-medium text-muted-foreground mb-1.5">Occurrences &gt;</label>
                            <input
                              required
                              name="errorCount"
                              type="number"
                              min="1"
                              value={ruleFormState.errorCount}
                              onChange={handleRuleFormChange}
                              className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-white/[0.04] border border-black/[0.08] dark:border-white/[0.08] text-foreground placeholder:text-gray-500 focus:outline-none focus:border-[#00ffb2]/40 focus:ring-1 focus:ring-[#00ffb2]/20 transition-all duration-200 text-sm"
                            />
                          </div>
                          <div className="flex-1">
                            <label className="block text-xs font-medium text-muted-foreground mb-1.5">Time window</label>
                            <div className="relative">
                              <select
                                required
                                name="timeWindow"
                                className="w-full appearance-none px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-white/[0.04] border border-black/[0.08] dark:border-white/[0.08] text-foreground focus:outline-none focus:border-[#00ffb2]/40 focus:ring-1 focus:ring-[#00ffb2]/20 transition-all duration-200 text-sm cursor-pointer"
                                value={ruleFormState.timeWindow}
                                onChange={handleRuleFormChange}
                              >
                                <option value="5m" className="bg-white dark:bg-[#13121a] text-foreground">5 minutes</option>
                                <option value="15m" className="bg-white dark:bg-[#13121a] text-foreground">15 minutes</option>
                                <option value="1h" className="bg-white dark:bg-[#13121a] text-foreground">1 hour</option>
                                <option value="24h" className="bg-white dark:bg-[#13121a] text-foreground">24 hours</option>
                              </select>
                              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Destinations */}
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-1.5">
                        Destinations
                      </label>
                      <div className="flex flex-col gap-2 mt-2">
                        <label className="flex items-center gap-2 text-sm text-foreground cursor-not-allowed group opacity-80">
                          <input type="checkbox" name="destinations" value="Email" checked readOnly className="w-4 h-4 rounded border-gray-300 dark:border-white/[0.08] bg-transparent text-[#00ffb2] focus:ring-[#00ffb2] cursor-not-allowed" />
                          Email (Default)
                        </label>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-row gap-3 mt-6 pt-2">
                      <button
                        className="flex-1 py-2.5 px-4 bg-gray-50 dark:bg-white/[0.04] border border-black/[0.08] dark:border-white/[0.08] hover:bg-gray-100 dark:hover:bg-white/[0.08] text-muted-foreground hover:text-foreground font-medium rounded-xl transition-all duration-200 flex items-center justify-center text-sm cursor-pointer"
                        onClick={() => {
                          setIsCreateModalOpen(false);
                          setRuleFormState({ name: "", project: "", errorName: "", errorCount: "100", timeWindow: "5m" });
                        }}
                        type="button"
                      >
                        Cancel
                      </button>
                      <button
                        className="flex-1 py-2.5 px-4 bg-[#00ffb2] hover:bg-[#00e6a0] text-[#0a0a0a] font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 text-sm cursor-pointer hover:shadow-lg hover:shadow-[#00ffb2]/20 disabled:opacity-50 disabled:cursor-not-allowed"
                        type="submit"
                        disabled={isCreatingRule}
                      >
                        {isCreatingRule ? (
                          <div className="w-4 h-4 border-2 border-[#0a0a0a]/80 border-t-[#0a0a0a] rounded-full animate-spin"></div>
                        ) : (
                          <BellPlus size={16} strokeWidth={2.5} />
                        )}
                        {isCreatingRule ? "Creating..." : "Create"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
