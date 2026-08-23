import React, { useState } from "react";
import {
  Terminal,
  Code2,
  Network,
  MessagesSquare,
  FileText,
  Flame,
  ChevronRight,
  ChevronDown,
  Clock,
  Play,
  CheckCircle2,
  Circle,
  Sparkles,
  ArrowUpRight,
  Bell,
  Settings,
  Search,
  BarChart3,
  Database,
  Cpu,
  Server,
  Trophy,
  Medal,
  Calendar,
  Plus
} from "lucide-react";
import DsaSandboxView from "./DsaSandboxView.jsx";
import SystemDesignView from "./SystemDesignView.jsx";
import BehavioralMockView from "./BehavioralMockView.jsx";
import ResumeGraderView from "./ResumeGraderView.jsx";
import CoursesView from "./CoursesView.jsx";
import TutorialsView from "./TutorialsView.jsx";
import AptitudeView from "./AptitudeView.jsx";
import RoadmapView from "./RoadmapView.jsx";
import LeaderboardView from "./LeaderboardView.jsx";
import PrepPlanSchedulerModal from "./PrepPlanSchedulerModal.jsx";
import AddAgendaModal from "./addagendamodel.jsx";
import CalendarModal from "./CalendarModal.jsx";
import PracticeStreakModal, { DAILY_PRACTICE_DATA } from "./PracticeStreakModal.jsx";
import DailyStreakMilestoneModal from "./DailyStreakMilestoneModal.jsx";
import SettingsModal from "./SettingsModal.jsx";

// ---------------------------------------------------------------------------
// Module Cards Data
// ---------------------------------------------------------------------------

const MODULES = [
  {
    id: "dsa",
    title: "DSA Sandbox & Practice",
    subtitle: "Arrays, Graphs & DP drills",
    icon: Code2,
    completion: 68,
    accent: "indigo",
    gradient: "from-indigo-500/20 via-indigo-500/5 to-transparent",
    ring: "stroke-indigo-400",
    glow: "group-hover:shadow-[0_0_40px_-10px_rgba(99,102,241,0.5)]",
    iconColor: "text-indigo-400",
    badgeColor: "bg-indigo-500/10 text-indigo-300 border-indigo-500/20",
    stat: "142 problems solved",
  },
  {
    id: "sysdesign",
    title: "System Design Studio",
    subtitle: "Scalability & architecture",
    icon: Network,
    completion: 42,
    accent: "purple",
    gradient: "from-purple-500/20 via-purple-500/5 to-transparent",
    ring: "stroke-purple-400",
    glow: "group-hover:shadow-[0_0_40px_-10px_rgba(168,85,247,0.5)]",
    iconColor: "text-purple-400",
    badgeColor: "bg-purple-500/10 text-purple-300 border-purple-500/20",
    stat: "9 designs reviewed",
  },
  {
    id: "behavioral",
    title: "Behavioral Mock AI",
    subtitle: "STAR-method live practice",
    icon: MessagesSquare,
    completion: 85,
    accent: "emerald",
    gradient: "from-emerald-500/20 via-emerald-500/5 to-transparent",
    ring: "stroke-emerald-400",
    glow: "group-hover:shadow-[0_0_40px_-10px_rgba(16,185,129,0.5)]",
    iconColor: "text-emerald-400",
    badgeColor: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
    stat: "22 sessions logged",
  },
  {
    id: "resume",
    title: "Resume Grader & ATS",
    subtitle: "ATS scoring & rewrite tips",
    icon: FileText,
    completion: 30,
    accent: "amber",
    gradient: "from-amber-500/20 via-amber-500/5 to-transparent",
    ring: "stroke-amber-400",
    glow: "group-hover:shadow-[0_0_40px_-10px_rgba(245,158,11,0.5)]",
    iconColor: "text-amber-400",
    badgeColor: "bg-amber-500/10 text-amber-300 border-amber-500/20",
    stat: "Last scan: 2 days ago",
  },
];

const INITIAL_AGENDA = [
  {
    id: "agenda-1",
    time: "10:30 AM",
    day: "Today",
    title: "Mock Technical — Backend",
    withWho: "Priya S.",
    type: "Technical",
    typeColor: "text-indigo-300 bg-indigo-500/10 border-indigo-500/20",
    avatarColor: "bg-indigo-500",
    done: false,
    date: new Date().toISOString().split("T")[0],
  },
  {
    id: "agenda-2",
    time: "2:00 PM",
    day: "Today",
    title: "Resume Review Sync",
    withWho: "Alex M.",
    type: "Career",
    typeColor: "text-amber-300 bg-amber-500/10 border-amber-500/20",
    avatarColor: "bg-amber-500",
    done: false,
    date: new Date().toISOString().split("T")[0],
  },
  {
    id: "agenda-3",
    time: "4:15 PM",
    day: "Tomorrow",
    title: "System Design Practice",
    withWho: "Karan R.",
    type: "System Design",
    typeColor: "text-purple-300 bg-purple-500/10 border-purple-500/20",
    avatarColor: "bg-purple-500",
    done: false,
    date: new Date(Date.now() + 86400000).toISOString().split("T")[0],
  },
];

// ---------------------------------------------------------------------------
// Helper Components
// ---------------------------------------------------------------------------

function StreakRing({ value, goal }) {
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(value / goal, 1);
  const strokeDashoffset = circumference - progress * circumference;

  return (
    <div className="relative flex items-center justify-center">
      <svg className="h-24 w-24 -rotate-90 transform">
        <circle
          cx="48"
          cy="48"
          r={radius}
          className="stroke-white/10"
          strokeWidth="6"
          fill="transparent"
        />
        <circle
          cx="48"
          cy="48"
          r={radius}
          className="stroke-cyan-400 transition-all duration-1000 ease-out"
          strokeWidth="6"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="transparent"
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center text-center">
        <span className="text-2xl font-bold text-slate-100 tabular-nums leading-none">{value}</span>
        <span className="text-[10px] uppercase tracking-wider text-neutral-500 mt-1">day streak</span>
      </div>
    </div>
  );
}

function ModuleCard({ mod, onClick }) {
  const Icon = mod.icon;
  return (
    <button
      onClick={onClick}
      className={`group relative text-left rounded-2xl border border-white/10 bg-gradient-to-br ${mod.gradient} bg-slate-900/50 backdrop-blur-md p-5 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-white/20 ${mod.glow}`}
    >
      <div
        className={`pointer-events-none absolute -top-10 -right-10 h-32 w-32 rounded-full blur-3xl opacity-30 bg-${mod.accent}-500`}
      />

      <div className="relative flex items-start justify-between">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 border border-white/10 transition-all duration-300 group-hover:scale-110 group-hover:border-white/20`}
        >
          <Icon className={`h-5 w-5 ${mod.iconColor} transition-all duration-300 group-hover:drop-shadow-[0_0_6px_currentColor]`} />
        </div>
        <span className={`text-[11px] font-medium px-2 py-1 rounded-full border ${mod.badgeColor}`}>
          {mod.completion}%
        </span>
      </div>

      <h3 className="relative mt-4 text-[15px] font-semibold text-white/90">{mod.title}</h3>
      <p className="relative text-xs text-neutral-400 mt-0.5">{mod.subtitle}</p>

      <div className="relative mt-4 h-1.5 w-full rounded-full bg-white/5 overflow-hidden">
        <div
          className={`h-full rounded-full bg-gradient-to-r from-${mod.accent}-500 to-${mod.accent}-300`}
          style={{ width: `${mod.completion}%` }}
        />
      </div>

      <div className="relative mt-3 flex items-center justify-between">
        <span className="text-[11px] text-neutral-500">{mod.stat}</span>
        <ArrowUpRight className="h-3.5 w-3.5 text-neutral-500 transition-all duration-300 group-hover:text-slate-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
    </button>
  );
}

function AgendaItem({ item, isLast, onToggleDone }) {
  const initials = (item.withWho || "Prep")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="relative flex gap-3 pb-5 last:pb-0">
      {!isLast && (
        <span className="absolute left-[15px] top-8 bottom-0 w-px bg-gradient-to-b from-white/10 to-transparent" />
      )}
      <div
        className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold text-white ${item.avatarColor || "bg-indigo-500"} ring-4 ring-[#0a0e1a]`}
      >
        {initials}
      </div>

      <div className="flex-1 min-w-0 pt-0.5">
        <div className="flex items-center justify-between gap-2">
          <p className={`text-sm font-medium truncate ${item.done ? "text-neutral-500 line-through" : "text-white/90"}`}>
            {item.title}
          </p>
          <button
            type="button"
            onClick={() => onToggleDone && onToggleDone(item.id)}
            className="hover:scale-110 transition-transform p-0.5 cursor-pointer"
            title={item.done ? "Mark as pending" : "Mark as completed"}
          >
            {item.done ? (
              <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
            ) : (
              <Circle className="h-4 w-4 text-neutral-700 hover:text-neutral-500 shrink-0 transition-colors" />
            )}
          </button>
        </div>
        <div className="mt-1.5 flex items-center gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1 text-[11px] text-neutral-500">
            <Clock className="h-3 w-3" />
            {item.day} · {item.time}
          </span>
          <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded border ${item.typeColor || "text-indigo-300 bg-indigo-500/10 border-indigo-500/20"}`}>
            {item.type}
          </span>
        </div>
      </div>
    </div>
  );
}

function QuestionTerminal({ onSolveNow }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#0b0f1c] overflow-hidden shadow-[0_0_60px_-15px_rgba(99,102,241,0.15)]">
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-white/[0.02]">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
          <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
          <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-cyan-300/80 font-mono">
          <Terminal className="h-3 w-3" />
          question-of-the-day.ts
        </div>
        <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          Medium
        </span>
      </div>

      <div className="p-5 font-mono text-[13px] leading-relaxed overflow-x-auto">
        <p>
          <span className="text-neutral-600">01</span>
          <span className="ml-4 text-neutral-500">{"/**"}</span>
        </p>
        <p>
          <span className="text-neutral-600">02</span>
          <span className="ml-4 text-neutral-500"> * Longest Substring Without Repeating Characters</span>
        </p>
        <p>
          <span className="text-neutral-600">03</span>
          <span className="ml-4 text-neutral-500"> * Given a string s, find the length of the longest</span>
        </p>
        <p>
          <span className="text-neutral-600">04</span>
          <span className="ml-4 text-neutral-500"> * substring without repeating characters.</span>
        </p>
        <p>
          <span className="text-neutral-600">05</span>
          <span className="ml-4 text-neutral-500"> {"*/"}</span>
        </p>
        <p className="mt-2">
          <span className="text-neutral-600">06</span>
          <span className="ml-4 text-purple-400">function</span>{" "}
          <span className="text-indigo-300">lengthOfLongestSubstring</span>
          <span className="text-neutral-300">(</span>
          <span className="text-orange-300">s</span>
          <span className="text-neutral-500">: string</span>
          <span className="text-neutral-300">)</span>
          <span className="text-neutral-500">: number {"{"}</span>
        </p>
        <p>
          <span className="text-neutral-600">07</span>
          <span className="ml-8 text-purple-400">const</span>{" "}
          <span className="text-sky-300">seen</span> <span className="text-neutral-400">=</span>{" "}
          <span className="text-purple-400">new</span> <span className="text-indigo-300">Set</span>
          <span className="text-neutral-500">&lt;string&gt;();</span>
        </p>
        <p>
          <span className="text-neutral-600">08</span>
          <span className="ml-8 text-purple-400">let</span> <span className="text-sky-300">left</span>{" "}
          <span className="text-neutral-400">=</span> <span className="text-amber-300">0</span>
          <span className="text-neutral-500">,</span> <span className="text-sky-300">best</span>{" "}
          <span className="text-neutral-400">=</span> <span className="text-amber-300">0</span>
          <span className="text-neutral-500">;</span>
        </p>
        <p>
          <span className="text-neutral-600">09</span>
          <span className="ml-8 text-neutral-600">{"// two-pointer sliding window ->"}</span>
        </p>
        <p>
          <span className="text-neutral-600">10</span>
          <span className="ml-4 text-neutral-500">{"}"}</span>
        </p>
        <p className="mt-3 flex items-center gap-1.5 text-emerald-400">
          <span className="text-neutral-600 font-mono text-[13px] mr-2">$</span>
          <span className="animate-pulse">▍</span>
          <span className="text-neutral-500">awaiting your solution...</span>
        </p>
      </div>

      <div className="flex items-center justify-between px-5 py-3 border-t border-white/5 bg-white/[0.02]">
        <div className="flex items-center gap-3 text-[11px] text-neutral-500">
          <span>Acceptance 34.2%</span>
          <span className="h-1 w-1 rounded-full bg-neutral-700" />
          <span>Companies: Meta, Amazon, Google</span>
        </div>
        <button
          onClick={onSolveNow}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-white bg-indigo-500 hover:bg-indigo-400 transition-colors px-3 py-1.5 rounded-lg shadow-[0_0_20px_-4px_rgba(99,102,241,0.8)]"
        >
          <Play className="h-3.5 w-3.5" fill="currentColor" />
          Solve now
        </button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Dashboard
// ---------------------------------------------------------------------------

export default function InterviewPrepDashboard() {
  const [activeView, setActiveView] = useState("dashboard"); // "dashboard" | "dsa" | "sysdesign" | "behavioral" | "resume" | "courses" | "tutorials" | "aptitude" | "leaderboard" | "roadmap"
  const [initialQuestionId, setInitialQuestionId] = useState(null);
  const [initialCategory, setInitialCategory] = useState("All");

  // Modals state
  const [isSchedulerOpen, setIsSchedulerOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isAddAgendaOpen, setIsAddAgendaOpen] = useState(false);
  const [isStreakModalOpen, setIsStreakModalOpen] = useState(false);
  const [isMilestoneModalOpen, setIsMilestoneModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  // Agenda items state with persistence
  const [agendaItems, setAgendaItems] = useState(() => {
    const saved = localStorage.getItem("prepos_agenda_items_v1");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return INITIAL_AGENDA;
  });

  // Calendar custom events state with persistence
  const [customCalendarEvents, setCustomCalendarEvents] = useState(() => {
    const saved = localStorage.getItem("prepos_custom_calendar_events_v1");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    const todayStr = new Date().toISOString().split("T")[0];
    const tomorrowStr = new Date(Date.now() + 86400000).toISOString().split("T")[0];
    return {
      [todayStr]: [
        {
          id: "cal-init-1",
          title: "Mock Technical — Backend",
          withWho: "Priya S.",
          time: "10:30 AM",
          type: "Technical",
          typeColor: "text-indigo-300 bg-indigo-500/10 border-indigo-500/20",
          avatarColor: "bg-indigo-500",
        },
        {
          id: "cal-init-2",
          title: "Resume Review Sync",
          withWho: "Alex M.",
          time: "2:00 PM",
          type: "Career",
          typeColor: "text-amber-300 bg-amber-500/10 border-amber-500/20",
          avatarColor: "bg-amber-500",
        }
      ],
      [tomorrowStr]: [
        {
          id: "cal-init-3",
          title: "System Design Practice",
          withWho: "Karan R.",
          time: "4:15 PM",
          type: "System Design",
          typeColor: "text-purple-300 bg-purple-500/10 border-purple-500/20",
          avatarColor: "bg-purple-500",
        }
      ]
    };
  });

  const handleToggleAgendaDone = (id) => {
    setAgendaItems((prev) => {
      const updated = prev.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item
      );
      localStorage.setItem("prepos_agenda_items_v1", JSON.stringify(updated));
      return updated;
    });
  };

  const handleAddAgendaEvent = (newEvent) => {
    let dayLabel = "Scheduled";
    if (newEvent.date) {
      const todayStr = new Date().toISOString().split("T")[0];
      const tomorrowStr = new Date(Date.now() + 86400000).toISOString().split("T")[0];

      if (newEvent.date === todayStr) {
        dayLabel = "Today";
      } else if (newEvent.date === tomorrowStr) {
        dayLabel = "Tomorrow";
      } else {
        const parts = newEvent.date.split("-");
        if (parts.length === 3) {
          const d = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
          dayLabel = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
        }
      }
    }

    const formattedAgendaItem = {
      ...newEvent,
      day: dayLabel,
      done: false,
    };

    setAgendaItems((prev) => {
      const updated = [formattedAgendaItem, ...prev];
      localStorage.setItem("prepos_agenda_items_v1", JSON.stringify(updated));
      return updated;
    });

    if (newEvent.date) {
      setCustomCalendarEvents((prev) => {
        const updated = {
          ...prev,
          [newEvent.date]: [...(prev[newEvent.date] || []), newEvent],
        };
        localStorage.setItem("prepos_custom_calendar_events_v1", JSON.stringify(updated));
        return updated;
      });
    }

    setIsAddAgendaOpen(false);
  };

  const handleOpenDsa = (qId = null, category = "All") => {
    setInitialQuestionId(qId);
    setInitialCategory(category);
    setActiveView("dsa");
  };

  if (activeView === "dsa") {
    return (
      <DsaSandboxView
        onBackToDashboard={() => setActiveView("dashboard")}
        initialQuestionId={initialQuestionId}
        initialCategory={initialCategory}
      />
    );
  }

  if (activeView === "sysdesign") {
    return <SystemDesignView onBackToDashboard={() => setActiveView("dashboard")} />;
  }

  if (activeView === "behavioral") {
    return <BehavioralMockView onBackToDashboard={() => setActiveView("dashboard")} />;
  }

  if (activeView === "resume") {
    return <ResumeGraderView onBackToDashboard={() => setActiveView("dashboard")} />;
  }

  if (activeView === "courses") {
    return <CoursesView onBackToDashboard={() => setActiveView("dashboard")} />;
  }

  if (activeView === "tutorials") {
    return <TutorialsView onBackToDashboard={() => setActiveView("dashboard")} />;
  }

  if (activeView === "aptitude") {
    return <AptitudeView onBackToDashboard={() => setActiveView("dashboard")} />;
  }

  if (activeView === "leaderboard") {
    return <LeaderboardView onBackToDashboard={() => setActiveView("dashboard")} />;
  }

  if (activeView === "roadmap") {
    return <RoadmapView onBackToDashboard={() => setActiveView("dashboard")} />;
  }

  return (
    <div className="min-h-screen w-full bg-[#0a0e1a] text-slate-100/90 font-sans antialiased relative overflow-hidden">
      {/* Scheduler Modal */}
      <PrepPlanSchedulerModal
        isOpen={isSchedulerOpen}
        onClose={() => setIsSchedulerOpen(false)}
        onStartPractice={() => handleOpenDsa(null, "All")}
      />

      {/* Calendar Modal */}
      <CalendarModal
        isOpen={isCalendarOpen}
        onClose={() => setIsCalendarOpen(false)}
        customEvents={customCalendarEvents}
      />

      {/* Add Agenda Modal */}
      <AddAgendaModal
        isOpen={isAddAgendaOpen}
        onClose={() => setIsAddAgendaOpen(false)}
        onAddEvent={handleAddAgendaEvent}
      />

      {/* Practice Streak & Analytics Modal */}
      <PracticeStreakModal
        isOpen={isStreakModalOpen}
        onClose={() => setIsStreakModalOpen(false)}
        onStartPractice={() => handleOpenDsa(null, "All")}
      />

      {/* Daily Streak & Milestone Journey Modal */}
      <DailyStreakMilestoneModal
        isOpen={isMilestoneModalOpen}
        onClose={() => setIsMilestoneModalOpen(false)}
        onStartPractice={() => handleOpenDsa(null, "All")}
      />

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />

      {/* signature accent hairline */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-70" />
      {/* ambient background glows */}
      <div className="pointer-events-none absolute -top-40 left-1/4 h-[500px] w-[500px] rounded-full bg-indigo-600/10 blur-[140px]" />
      <div className="pointer-events-none absolute top-1/3 -right-32 h-[420px] w-[420px] rounded-full bg-purple-600/10 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-[380px] w-[380px] rounded-full bg-emerald-600/5 blur-[140px]" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 py-8">
        {/* Top nav */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3.5 cursor-pointer" onClick={() => setActiveView("dashboard")}>
            <svg viewBox="0 0 58 34" className="h-9 w-auto">
              <circle cx="11" cy="12" r="7.5" fill="none" stroke="#38bdf8" strokeWidth="2.8" className="drop-shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
              <circle cx="29" cy="22" r="7.5" fill="none" stroke="#eab308" strokeWidth="2.8" className="drop-shadow-[0_0_8px_rgba(234,179,8,0.8)]" />
              <circle cx="47" cy="12" r="7.5" fill="none" stroke="#f43f5e" strokeWidth="2.8" className="drop-shadow-[0_0_8px_rgba(244,63,94,0.8)]" />
            </svg>
            <span className="text-3xl font-extrabold tracking-tighter text-slate-100 drop-shadow-sm ml-1">PrepOS</span>
          </div>

          <div className="hidden md:flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 w-80 text-neutral-500">
            <Search className="h-3.5 w-3.5" />
            <span className="text-xs">Search courses, practice, roadmap...</span>
          </div>

          <div className="flex items-center gap-3">
            {/* Notification Button & Popover */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                className={`relative h-9 w-9 rounded-full border transition-all flex items-center justify-center cursor-pointer ${
                  isNotificationOpen
                    ? "border-cyan-400/50 bg-cyan-500/10 text-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.3)]"
                    : "border-white/10 bg-white/5 text-neutral-400 hover:text-slate-100 hover:border-white/20"
                }`}
                title="Notifications"
              >
                <Bell className="h-4 w-4" />
                <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_1px_rgba(34,211,238,0.9)]" />
              </button>

              {/* Notification Popover Dropdown */}
              {isNotificationOpen && (
                <>
                  {/* Backdrop to close when clicking outside */}
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsNotificationOpen(false)}
                  />

                  <div className="absolute right-0 top-full mt-2.5 w-80 rounded-2xl border border-white/10 bg-[#090d19]/95 backdrop-blur-2xl p-4 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] z-50 animate-fadeIn">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                      <div className="flex items-center gap-2">
                        <Bell className="h-4 w-4 text-cyan-400" />
                        <h3 className="text-sm font-semibold text-white">Notifications</h3>
                      </div>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/5 text-neutral-400 border border-white/10">
                        0 New
                      </span>
                    </div>

                    <div className="py-6 flex flex-col items-center justify-center text-center">
                      <div className="h-12 w-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-500 mb-3">
                        <Bell className="h-5 w-5 stroke-[1.5]" />
                      </div>
                      <p className="text-sm font-semibold text-slate-200">No notifications yet</p>
                      <p className="text-xs text-neutral-400 mt-1 max-w-[200px]">
                        You're all caught up! Session reminders and practice alerts will show up here.
                      </p>
                    </div>

                    <div className="border-t border-white/5 pt-2.5 mt-2 flex items-center justify-between text-[11px] text-neutral-500">
                      <span>PrepOS Alerts</span>
                      <button
                        type="button"
                        onClick={() => setIsNotificationOpen(false)}
                        className="text-cyan-400 hover:text-cyan-300 font-medium cursor-pointer"
                      >
                        Dismiss
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

            <button
              onClick={() => setIsSettingsOpen(true)}
              className="h-9 w-9 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-neutral-400 hover:text-slate-100 hover:border-white/20 transition-colors cursor-pointer"
              title="Settings"
            >
              <Settings className="h-4 w-4" />
            </button>
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 ring-2 ring-cyan-400/40" />
          </div>
        </div>

        {/* Categories Nav */}
        <nav className="flex items-center gap-8 mb-8 border-b border-white/10 overflow-x-auto hide-scrollbar relative">
          {[
            { id: "dashboard", label: "Overview", action: () => setActiveView("dashboard") },
            { id: "courses", label: "Courses", action: () => setActiveView("courses") },
            { id: "tutorials", label: "Tutorials", action: () => setActiveView("tutorials") },
            { id: "dsa", label: "Practice", action: () => handleOpenDsa(null, "All") },
            { id: "aptitude", label: "Aptitude", action: () => setActiveView("aptitude") },
            { id: "resume", label: "Resume Review", action: () => setActiveView("resume") },
            { id: "leaderboard", label: "Leaderboard", action: () => setActiveView("leaderboard") },
            { id: "roadmap", label: "Roadmap", action: () => setActiveView("roadmap") },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={cat.action}
              className={`relative text-sm font-medium whitespace-nowrap transition-colors pb-4 cursor-pointer ${
                activeView === cat.id
                  ? "text-slate-100 font-semibold"
                  : "text-neutral-400 hover:text-slate-200"
              }`}
            >
              {cat.label}
              {activeView === cat.id && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
              )}
            </button>
          ))}
        </nav>

        {/* Hero */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10 rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-7 lg:p-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/[0.06] via-transparent to-transparent" />
          <div className="relative">
            <p className="text-xs font-medium text-indigo-300 tracking-wide uppercase mb-2">Good evening</p>
            <h1 className="text-3xl lg:text-[2.15rem] font-bold text-slate-100 tracking-tight leading-tight">
              Ready to sharpen up, Arjun?
            </h1>
            <p className="text-sm text-neutral-400 mt-2 max-w-md">
              You're 3 sessions from your best week yet. Your next mock interview starts in{" "}
              <span className="text-white/90 font-medium">2h 14m</span>.
            </p>
            <button
              onClick={() => setIsSchedulerOpen(true)}
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white bg-indigo-500 hover:bg-indigo-400 transition-colors px-4 py-2.5 rounded-xl shadow-[0_0_24px_-6px_rgba(99,102,241,0.8)] cursor-pointer"
            >
              <Calendar className="h-4 w-4" />
              Resume prep plan & schedule
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <button
            type="button"
            onClick={() => setIsMilestoneModalOpen(true)}
            className="relative flex items-center gap-6 rounded-2xl border border-white/10 bg-black/30 hover:bg-black/40 hover:border-orange-500/40 px-6 py-5 transition-all duration-300 group cursor-pointer text-left shadow-lg hover:shadow-[0_0_30px_-5px_rgba(249,115,22,0.2)]"
          >
            <StreakRing value={12} goal={30} />
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-white/90 group-hover:text-orange-300 transition-colors">Daily Interview Streak</p>
                <ArrowUpRight className="h-3.5 w-3.5 text-neutral-500 group-hover:text-orange-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>
              <p className="text-xs text-neutral-400 max-w-[160px]">2 days to 14-Day Algorithm Master badge</p>
              <div className="flex items-center gap-1.5 text-xs text-orange-300 font-medium">
                <span className="h-1.5 w-1.5 rounded-full bg-orange-400 animate-pulse shadow-[0_0_6px_1px_rgba(249,115,22,0.8)]" />
                Click for Milestone Journey & Badges
              </div>
            </div>
          </button>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-white/90 tracking-tight">Prep modules</h2>
                <button
                  onClick={() => handleOpenDsa(null, "All")}
                  className="text-xs text-neutral-500 hover:text-slate-100 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  View all <ChevronRight className="h-3 w-3" />
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {MODULES.map((mod) => (
                  <ModuleCard
                    key={mod.id}
                    mod={mod}
                    onClick={() => setActiveView(mod.id)}
                  />
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-white/90 tracking-tight">Question of the day</h2>
                <span className="text-xs text-neutral-500">Refreshes in 6h 42m</span>
              </div>
              <QuestionTerminal onSolveNow={() => handleOpenDsa("longest-substring", "All")} />
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-6">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-5">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-sm font-semibold text-white/90 tracking-tight">Upcoming agenda</h2>
                <span className="text-[11px] text-neutral-500 px-2 py-0.5 rounded-full border border-white/10">
                  {agendaItems.length} items
                </span>
              </div>
              <div>
                {agendaItems.length > 0 ? (
                  agendaItems.map((item, i) => (
                    <AgendaItem
                      key={item.id}
                      item={item}
                      isLast={i === agendaItems.length - 1}
                      onToggleDone={handleToggleAgendaDone}
                    />
                  ))
                ) : (
                  <p className="text-xs text-neutral-500 py-4 text-center">No upcoming agenda items</p>
                )}
              </div>
              <div className="mt-4 space-y-2">
                <button
                  type="button"
                  onClick={() => setIsAddAgendaOpen(true)}
                  className="w-full text-center text-xs font-semibold text-white bg-indigo-500 hover:bg-indigo-400 transition-all py-2 rounded-lg border border-indigo-500/40 hover:border-indigo-400 shadow-[0_0_16px_-4px_rgba(99,102,241,0.5)] flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Plus className="h-3.5 w-3.5" />
                  Add Event
                </button>
                <button
                  type="button"
                  onClick={() => setIsCalendarOpen(true)}
                  className="w-full text-center text-xs font-medium text-indigo-300 hover:text-indigo-200 transition-colors py-2 rounded-lg border border-white/5 hover:border-indigo-500/30 hover:bg-indigo-500/5 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calendar className="h-3.5 w-3.5" />
                  View full calendar
                </button>
              </div>
            </div>

            {/* Practice Streak Box */}
            <div className="rounded-2xl border border-orange-500/20 bg-gradient-to-br from-orange-500/10 via-white/[0.02] to-transparent backdrop-blur-md p-5 relative overflow-hidden group hover:border-orange-500/40 transition-all duration-300">
              <div className="pointer-events-none absolute -top-10 -right-10 h-28 w-28 rounded-full bg-orange-500/15 blur-2xl group-hover:bg-orange-500/25 transition-all" />
              
              <div className="relative flex items-center justify-between mb-3.5">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-orange-500/20 text-orange-400 border border-orange-500/30 shadow-[0_0_12px_rgba(249,115,22,0.3)]">
                    <Flame className="h-4 w-4 fill-orange-500/30 text-orange-400 animate-pulse" />
                  </div>
                  <h2 className="text-sm font-semibold text-white/90 tracking-tight">Practice Streak</h2>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/30">
                  {DAILY_PRACTICE_DATA.currentStreak} Days
                </span>
              </div>

              <div className="relative grid grid-cols-2 gap-2.5 mb-3.5">
                <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                  <span className="text-[10px] text-neutral-400 block font-medium">Today's Solved</span>
                  <div className="text-sm font-bold text-white mt-0.5 flex items-baseline gap-1">
                    <span>{DAILY_PRACTICE_DATA.today.questionsCount}</span>
                    <span className="text-[10px] text-emerald-400 font-normal">/ {DAILY_PRACTICE_DATA.today.goalQuestions} goal</span>
                  </div>
                </div>
                <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                  <span className="text-[10px] text-neutral-400 block font-medium">Focused Time</span>
                  <div className="text-sm font-bold text-orange-300 mt-0.5">
                    1h 45m
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsStreakModalOpen(true)}
                className="relative w-full text-center text-xs font-semibold text-orange-300 hover:text-orange-200 bg-orange-500/10 hover:bg-orange-500/20 transition-all py-2 rounded-lg border border-orange-500/30 hover:border-orange-500/50 shadow-[0_0_14px_-4px_rgba(249,115,22,0.3)] flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Flame className="h-3.5 w-3.5 fill-orange-500/30" />
                View Streak & Time Analytics
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-emerald-500/10 via-white/[0.02] to-transparent backdrop-blur-md p-5">
              <p className="text-xs font-medium text-emerald-300 uppercase tracking-wide mb-2">Readiness score</p>
              <div className="flex items-end gap-2 mb-1">
                <span className="text-3xl font-bold text-slate-100">78</span>
                <span className="text-sm text-neutral-500 mb-1">/ 100</span>
              </div>
              <p className="text-xs text-neutral-400 mb-4">Up 6 pts since last week</p>
              <div className="flex gap-1">
                {[62, 70, 65, 74, 71, 78, 78].map((v, i) => (
                  <div key={i} className="flex-1 h-8 rounded-sm bg-white/5 relative overflow-hidden">
                    <div
                      className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-emerald-500 to-emerald-300/70 rounded-sm"
                      style={{ height: `${v}%` }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
