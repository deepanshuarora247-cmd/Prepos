import React, { useState, useEffect } from "react";
import {
  Terminal,
  Code2,
  Network,
  MessagesSquare,
  FileText,
  Flame,
  ChevronRight,
  Clock,
  Play,
  CheckCircle2,
  Circle,
  Sparkles,
  ArrowUpRight,
  Bell,
  Settings,
  Search,
} from "lucide-react";
import DsaSandboxView from "./DsaSandboxView.jsx";

// ---------------------------------------------------------------------------
// Dummy data
// ---------------------------------------------------------------------------

const MODULES = [
  {
    id: "dsa",
    title: "DSA Sandbox",
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
    title: "System Design",
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
    title: "Resume Grader",
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

const AGENDA = [
  {
    id: 1,
    time: "10:30 AM",
    day: "Today",
    title: "Mock Technical — Backend",
    withWho: "Priya S.",
    type: "Technical",
    typeColor: "text-indigo-300 bg-indigo-500/10 border-indigo-500/20",
    avatarColor: "bg-indigo-500",
    done: false,
  },
  {
    id: 2,
    time: "2:00 PM",
    day: "Today",
    title: "Resume Review Sync",
    withWho: "Alex M.",
    type: "Career",
    typeColor: "text-amber-300 bg-amber-500/10 border-amber-500/20",
    avatarColor: "bg-amber-500",
    done: false,
  },
  {
    id: 3,
    time: "4:15 PM",
    day: "Tomorrow",
    title: "System Design Practice",
    withWho: "Karan R.",
    type: "System Design",
    typeColor: "text-purple-300 bg-purple-500/10 border-purple-500/20",
    avatarColor: "bg-purple-500",
    done: false,
  },
];

// ---------------------------------------------------------------------------
// Helper components
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
      {/* ambient corner glow */}
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

function AgendaItem({ item, isLast }) {
  return (
    <div className="relative flex gap-3 pb-5 last:pb-0">
      {!isLast && (
        <span className="absolute left-[15px] top-8 bottom-0 w-px bg-gradient-to-b from-white/10 to-transparent" />
      )}
      <div
        className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold text-white ${item.avatarColor} ring-4 ring-[#0a0e1a]`}
      >
        {item.withWho
          .split(" ")
          .map((w) => w[0])
          .join("")
          .slice(0, 2)}
      </div>

      <div className="flex-1 min-w-0 pt-0.5">
        <div className="flex items-center justify-between gap-2">
          <p className={`text-sm font-medium truncate ${item.done ? "text-neutral-500 line-through" : "text-white/90"}`}>
            {item.title}
          </p>
          {item.done ? (
            <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
          ) : (
            <Circle className="h-4 w-4 text-neutral-700 shrink-0" />
          )}
        </div>
        <div className="mt-1.5 flex items-center gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1 text-[11px] text-neutral-500">
            <Clock className="h-3 w-3" />
            {item.day} · {item.time}
          </span>
          <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded border ${item.typeColor}`}>
            {item.type}
          </span>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Terminal / Question of the day block
// ---------------------------------------------------------------------------

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
// Main dashboard
// ---------------------------------------------------------------------------

export default function InterviewPrepDashboard() {
  const [activeView, setActiveView] = useState("dashboard"); // "dashboard" | "dsa"
  const [initialQuestionId, setInitialQuestionId] = useState(null);

  const handleOpenDsa = (qId = null) => {
    setInitialQuestionId(qId);
    setActiveView("dsa");
  };

  if (activeView === "dsa") {
    return (
      <DsaSandboxView
        onBackToDashboard={() => setActiveView("dashboard")}
        initialQuestionId={initialQuestionId}
      />
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#0a0e1a] text-slate-100/90 font-sans antialiased relative overflow-hidden">
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
              {/* Circle 1: Blue / Cyan */}
              <circle cx="11" cy="12" r="7.5" fill="none" stroke="#38bdf8" strokeWidth="2.8" className="drop-shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
              {/* Circle 2: Yellow / Gold */}
              <circle cx="29" cy="22" r="7.5" fill="none" stroke="#eab308" strokeWidth="2.8" className="drop-shadow-[0_0_8px_rgba(234,179,8,0.8)]" />
              {/* Circle 3: Red / Rose */}
              <circle cx="47" cy="12" r="7.5" fill="none" stroke="#f43f5e" strokeWidth="2.8" className="drop-shadow-[0_0_8px_rgba(244,63,94,0.8)]" />
            </svg>
            <span className="text-3xl font-extrabold tracking-tighter text-slate-100 drop-shadow-sm ml-1">PrepOS</span>
            <span className="text-[10px] font-bold tracking-wider text-cyan-300 border border-cyan-400/30 bg-cyan-400/10 rounded-full px-2.5 py-0.5 leading-none translate-y-[-10px] shadow-[0_0_12px_-2px_rgba(34,211,238,0.6)]">
              PRO
            </span>
          </div>

          <div className="hidden md:flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 w-80 text-neutral-500">
            <Search className="h-3.5 w-3.5" />
            <span className="text-xs">Search modules, questions, mentors...</span>
          </div>

          <div className="flex items-center gap-3">
            <button className="relative h-9 w-9 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-neutral-400 hover:text-slate-100 hover:border-white/20 transition-colors">
              <Bell className="h-4 w-4" />
              <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_1px_rgba(34,211,238,0.9)]" />
            </button>
            <button className="h-9 w-9 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-neutral-400 hover:text-slate-100 hover:border-white/20 transition-colors">
              <Settings className="h-4 w-4" />
            </button>
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 ring-2 ring-cyan-400/40" />
          </div>
        </div>

        {/* Categories Nav */}
        <nav className="flex items-center gap-8 mb-8 border-b border-white/10 overflow-x-auto hide-scrollbar">
          {[
            { label: "Overview", action: () => setActiveView("dashboard") },
            { label: "Practice Modules (DSA Sandbox)", action: () => handleOpenDsa(null) },
            { label: "System Design", action: () => {} },
            { label: "Behavioral Mocks", action: () => {} },
            { label: "Resume Review", action: () => {} },
            { label: "Community", action: () => {} },
          ].map((cat, i) => (
            <button
              key={cat.label}
              onClick={cat.action}
              className={`relative text-sm font-medium whitespace-nowrap transition-colors pb-4 ${
                i === 0
                  ? "text-slate-100"
                  : "text-neutral-400 hover:text-slate-200"
              }`}
            >
              {cat.label}
              {i === 0 && (
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
              onClick={() => handleOpenDsa(null)}
              className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-400 transition-colors px-4 py-2.5 rounded-xl shadow-[0_0_24px_-6px_rgba(99,102,241,0.8)]"
            >
              Resume prep plan
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="relative flex items-center gap-6 rounded-2xl border border-white/10 bg-black/30 px-6 py-5">
            <StreakRing value={12} goal={30} />
            <div className="flex flex-col gap-2.5">
              <p className="text-sm font-semibold text-white/90">Daily Interview Streak</p>
              <p className="text-xs text-neutral-500 max-w-[160px]">18 days to your next milestone badge</p>
              <div className="flex items-center gap-1.5 text-xs text-cyan-300 font-medium">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_6px_1px_rgba(34,211,238,0.8)]" />
                On track — keep it lit
              </div>
            </div>
          </div>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left / main column */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-white/90 tracking-tight">Prep modules</h2>
                <button
                  onClick={() => handleOpenDsa(null)}
                  className="text-xs text-neutral-500 hover:text-slate-100 transition-colors flex items-center gap-1"
                >
                  View all <ChevronRight className="h-3 w-3" />
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {MODULES.map((mod) => (
                  <ModuleCard
                    key={mod.id}
                    mod={mod}
                    onClick={() => {
                      if (mod.id === "dsa") handleOpenDsa(null);
                    }}
                  />
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-white/90 tracking-tight">Question of the day</h2>
                <span className="text-xs text-neutral-500">Refreshes in 6h 42m</span>
              </div>
              <QuestionTerminal onSolveNow={() => handleOpenDsa("longest-substring")} />
            </div>
          </div>

          {/* Right / sidebar */}
          <div className="flex flex-col gap-6">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-5">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-sm font-semibold text-white/90 tracking-tight">Upcoming agenda</h2>
                <span className="text-[11px] text-neutral-500 px-2 py-0.5 rounded-full border border-white/10">
                  {AGENDA.length} items
                </span>
              </div>
              <div>
                {AGENDA.map((item, i) => (
                  <AgendaItem key={item.id} item={item} isLast={i === AGENDA.length - 1} />
                ))}
              </div>
              <button className="mt-2 w-full text-center text-xs font-medium text-indigo-300 hover:text-indigo-200 transition-colors py-2 rounded-lg border border-white/5 hover:border-indigo-500/30 hover:bg-indigo-500/5">
                View full calendar
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
