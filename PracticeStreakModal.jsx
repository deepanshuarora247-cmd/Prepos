import React, { useState } from "react";
import {
  Flame,
  Clock,
  Code2,
  CheckCircle2,
  Calendar,
  X,
  TrendingUp,
  Target,
  Sparkles,
  Zap,
  ArrowUpRight,
  Play,
  Award
} from "lucide-react";

export const DAILY_PRACTICE_DATA = {
  currentStreak: 12,
  streakMilestone: 30,
  today: {
    questionsCount: 6,
    goalQuestions: 5,
    timeSpentMinutes: 105, // 1h 45m
    timeGoalMinutes: 90,
    categories: [
      { name: "Algorithms (Sliding Window & DP)", count: 3, time: "55m" },
      { name: "System Design (Rate Limiter)", count: 1, time: "25m" },
      { name: "Databases (SQL N-th Salary)", count: 1, time: "15m" },
      { name: "Behavioral (STAR Method)", count: 1, time: "10m" },
    ],
  },
  weekly: {
    totalQuestions: 38,
    totalTimeMinutes: 680, // 11h 20m
    avgTimePerQuestion: "17.8 min",
    days: [
      { day: "Mon", date: "Aug 12", questions: 5, time: "1h 20m", minutes: 80, completed: true },
      { day: "Tue", date: "Aug 13", questions: 6, time: "1h 45m", minutes: 105, completed: true, isToday: true },
      { day: "Wed", date: "Aug 14", questions: 4, time: "1h 10m", minutes: 70, completed: true },
      { day: "Thu", date: "Aug 15", questions: 7, time: "2h 05m", minutes: 125, completed: true },
      { day: "Fri", date: "Aug 16", questions: 5, time: "1h 30m", minutes: 90, completed: true },
      { day: "Sat", date: "Aug 17", questions: 6, time: "1h 50m", minutes: 110, completed: true },
      { day: "Sun", date: "Aug 18", questions: 5, time: "1h 40m", minutes: 100, completed: true },
    ],
    difficultyBreakdown: {
      easy: { count: 14, label: "Easy", color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
      medium: { count: 19, label: "Medium", color: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
      hard: { count: 5, label: "Hard", color: "text-rose-400 bg-rose-500/10 border-rose-500/20" },
    }
  }
};

export default function PracticeStreakModal({ isOpen, onClose, onStartPractice }) {
  const [activeTab, setActiveTab] = useState("overview"); // "overview" | "history"

  if (!isOpen) return null;

  const data = DAILY_PRACTICE_DATA;

  const formatHours = (mins) => {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    if (h === 0) return `${m}m`;
    if (m === 0) return `${h}h`;
    return `${h}h ${m}m`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl rounded-3xl border border-orange-500/30 bg-[#0c101d] p-6 md:p-8 shadow-[0_25px_60px_-15px_rgba(249,115,22,0.25)] text-slate-100 overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-48 w-96 rounded-full bg-orange-600/20 blur-[100px]" />

        {/* Header */}
        <div className="flex items-start justify-between border-b border-white/10 pb-5 relative z-10">
          <div className="flex items-center gap-3.5">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500/20 to-amber-500/20 text-orange-400 border border-orange-500/30 shadow-[0_0_20px_rgba(249,115,22,0.3)]">
              <Flame className="h-6 w-6 fill-orange-500/30 text-orange-400 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white tracking-tight">Daily Practice Streak & Time Analytics</h2>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/30">
                  {data.currentStreak} Days Active
                </span>
              </div>
              <p className="text-xs text-neutral-400 mt-0.5">Detailed log of questions practiced and time applied</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-white p-1.5 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 mt-5 border-b border-white/10 pb-3 relative z-10">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === "overview"
                ? "bg-orange-500 text-slate-950 font-bold shadow-[0_0_14px_rgba(249,115,22,0.5)]"
                : "text-neutral-400 hover:text-white bg-white/5"
            }`}
          >
            Today's Practice Session
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === "history"
                ? "bg-orange-500 text-slate-950 font-bold shadow-[0_0_14px_rgba(249,115,22,0.5)]"
                : "text-neutral-400 hover:text-white bg-white/5"
            }`}
          >
            7-Day Activity & Time Log
          </button>
        </div>

        {/* Modal Body */}
        <div className="mt-5 space-y-6 max-h-[62vh] overflow-y-auto pr-1 relative z-10">
          {/* Top Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-center">
              <span className="text-[10px] uppercase tracking-wider font-semibold text-neutral-400">Questions Today</span>
              <div className="text-2xl font-bold text-white mt-1 flex items-center justify-center gap-1">
                <span>{data.today.questionsCount}</span>
                <span className="text-xs text-emerald-400 font-normal">/ {data.today.goalQuestions} goal</span>
              </div>
              <span className="text-[10px] text-emerald-400 mt-1 block">Goal Achieved (+120%)</span>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-center">
              <span className="text-[10px] uppercase tracking-wider font-semibold text-neutral-400">Time Applied Today</span>
              <div className="text-2xl font-bold text-orange-300 mt-1">
                {formatHours(data.today.timeSpentMinutes)}
              </div>
              <span className="text-[10px] text-neutral-400 mt-1 block">Active Focused Time</span>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-center">
              <span className="text-[10px] uppercase tracking-wider font-semibold text-neutral-400">Weekly Problems</span>
              <div className="text-2xl font-bold text-cyan-300 mt-1">
                {data.weekly.totalQuestions}
              </div>
              <span className="text-[10px] text-neutral-400 mt-1 block">38 Solved this week</span>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-center">
              <span className="text-[10px] uppercase tracking-wider font-semibold text-neutral-400">Weekly Practice Time</span>
              <div className="text-2xl font-bold text-amber-300 mt-1">
                {formatHours(data.weekly.totalTimeMinutes)}
              </div>
              <span className="text-[10px] text-neutral-400 mt-1 block">Avg {data.weekly.avgTimePerQuestion}/problem</span>
            </div>
          </div>

          {activeTab === "overview" ? (
            /* TAB 1: Today's Detailed Breakdown */
            <div className="space-y-4">
              {/* Category-wise distribution */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-300 flex items-center gap-1.5">
                    <Code2 className="h-4 w-4 text-indigo-400" />
                    Today's Practiced Questions & Time Allocation
                  </h3>
                  <span className="text-xs font-mono text-neutral-400">
                    Total: {formatHours(data.today.timeSpentMinutes)}
                  </span>
                </div>

                <div className="space-y-2.5">
                  {data.today.categories.map((cat, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/15 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-orange-400 shadow-[0_0_6px_rgba(249,115,22,0.8)]" />
                        <div>
                          <p className="text-xs font-medium text-white">{cat.name}</p>
                          <p className="text-[11px] text-neutral-400">{cat.count} question{cat.count > 1 ? "s" : ""} completed</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-semibold text-orange-300 bg-orange-500/10 px-2.5 py-1 rounded-lg border border-orange-500/20">
                          {cat.time}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Weekly Difficulty Breakdown */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-300 mb-3 flex items-center gap-1.5">
                  <Target className="h-4 w-4 text-emerald-400" />
                  Difficulty Distribution (This Week)
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  {Object.entries(data.weekly.difficultyBreakdown).map(([key, diff]) => (
                    <div key={key} className={`p-3.5 rounded-xl border ${diff.color} text-center`}>
                      <span className="text-xs font-bold block">{diff.label}</span>
                      <span className="text-lg font-extrabold mt-0.5 block">{diff.count} Questions</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* TAB 2: 7-Day Day-by-Day Activity & Time Log */
            <div className="space-y-4">
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-300 mb-4 flex items-center gap-1.5">
                  <Calendar className="h-4 w-4 text-cyan-400" />
                  Last 7 Days Practice & Time Log
                </h3>

                <div className="space-y-2">
                  {data.weekly.days.map((d, i) => (
                    <div
                      key={i}
                      className={`flex items-center justify-between p-3.5 rounded-xl border transition-colors ${
                        d.isToday
                          ? "bg-orange-500/10 border-orange-500/30"
                          : "bg-white/[0.02] border-white/5 hover:border-white/10"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 border border-white/10 text-xs font-bold text-white">
                          {d.day}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-white">{d.date}</span>
                            {d.isToday && (
                              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-orange-500 text-slate-950">
                                TODAY
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-neutral-400 mt-0.5">
                            {d.questions} questions solved
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <span className="text-xs font-mono font-bold text-orange-300 flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {d.time}
                          </span>
                          <span className="text-[10px] text-neutral-500 block">{d.minutes} mins active</span>
                        </div>
                        <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-2 text-xs text-neutral-400">
            <Sparkles className="h-3.5 w-3.5 text-orange-400" />
            <span>18 days remaining until 30-Day Badge</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-medium text-neutral-300 hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                if (onStartPractice) onStartPractice();
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-orange-500 hover:bg-orange-400 transition-colors shadow-[0_0_16px_rgba(249,115,22,0.6)]"
            >
              <Play className="h-3.5 w-3.5" fill="currentColor" />
              Practice Next Question
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
