import React, { useState } from "react";
import {
  Flame,
  Shield,
  Award,
  Sparkles,
  CheckCircle2,
  Lock,
  ArrowRight,
  Zap,
  Target,
  Trophy,
  Star,
  Clock,
  X,
  Play,
  Check,
  RotateCcw
} from "lucide-react";

export const STREAK_MILESTONES = [
  { days: 3, title: "Rookie Starter", desc: "First 3 days of consistent practice", unlocked: true, icon: Zap, color: "text-blue-400" },
  { days: 7, title: "Consistency Grinder", desc: "1 full week of daily interview preparation", unlocked: true, icon: Flame, color: "text-amber-400" },
  { days: 14, title: "Algorithm Specialist", desc: "2 weeks of algorithmic drills (2 days left!)", unlocked: false, current: true, icon: Target, color: "text-orange-400" },
  { days: 30, title: "FAANG Ready", desc: "1 month of rigorous daily engineering workouts", unlocked: false, icon: Trophy, color: "text-emerald-400" },
  { days: 60, title: "System Architect", desc: "2 months of continuous system design & DSA", unlocked: false, icon: Star, color: "text-purple-400" },
  { days: 100, title: "Tech Titan", desc: "100 days of elite interview readiness", unlocked: false, icon: Award, color: "text-pink-400" }
];

export const BADGES_DATA = [
  {
    id: "first_flame",
    title: "First Flame",
    description: "Completed your very first interview practice drill",
    tier: "Bronze",
    unlocked: true,
    date: "Aug 02, 2026",
    icon: Flame,
    color: "from-amber-500/20 to-orange-500/20 border-orange-500/30 text-orange-400"
  },
  {
    id: "7_day_warrior",
    title: "7-Day Warrior",
    description: "Maintained a continuous 7-day interview streak",
    tier: "Silver",
    unlocked: true,
    date: "Aug 09, 2026",
    icon: Zap,
    color: "from-cyan-500/20 to-blue-500/20 border-cyan-500/30 text-cyan-300"
  },
  {
    id: "algo_ninja",
    title: "Code Ninja",
    description: "Solved over 25 algorithmic problems",
    tier: "Silver",
    unlocked: true,
    date: "Aug 11, 2026",
    icon: Target,
    color: "from-indigo-500/20 to-purple-500/20 border-indigo-500/30 text-indigo-300"
  },
  {
    id: "shield_bearer",
    title: "Streak Guardian",
    description: "Equipped an active Streak Freeze Shield",
    tier: "Bronze",
    unlocked: true,
    date: "Aug 12, 2026",
    icon: Shield,
    color: "from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-400"
  },
  {
    id: "14_day_master",
    title: "14-Day Master",
    description: "Reach a 14-day streak milestone",
    tier: "Gold",
    unlocked: false,
    progress: "12/14 Days (85%)",
    icon: Award,
    color: "from-amber-500/10 to-yellow-500/10 border-white/10 text-neutral-400"
  },
  {
    id: "speed_demon",
    title: "Speed Demon",
    description: "Solve a Medium difficulty problem in under 15 minutes",
    tier: "Gold",
    unlocked: false,
    progress: "Locked",
    icon: Star,
    color: "from-rose-500/10 to-pink-500/10 border-white/10 text-neutral-400"
  },
  {
    id: "30_day_legend",
    title: "30-Day Legend",
    description: "Reach the 30-day elite FAANG ready milestone",
    tier: "Diamond",
    unlocked: false,
    progress: "12/30 Days",
    icon: Trophy,
    color: "from-purple-500/10 to-cyan-500/10 border-white/10 text-neutral-400"
  },
  {
    id: "grandmaster",
    title: "Full-Stack Titan",
    description: "Complete DSA, System Design, and Behavioral modules",
    tier: "Diamond",
    unlocked: false,
    progress: "2/3 Tracks",
    icon: Sparkles,
    color: "from-pink-500/10 to-indigo-500/10 border-white/10 text-neutral-400"
  }
];

export default function DailyStreakMilestoneModal({ isOpen, onClose, onStartPractice }) {
  const [activeTab, setActiveTab] = useState("milestones"); // "milestones" | "badges"
  const [hasShield, setHasShield] = useState(true);

  if (!isOpen) return null;

  const currentStreak = 12;
  const bestStreak = 24;
  const nextMilestone = 14;
  const progressPercent = Math.round((currentStreak / nextMilestone) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl rounded-3xl border border-orange-500/30 bg-[#0c101d] p-6 md:p-8 shadow-[0_25px_60px_-15px_rgba(249,115,22,0.25)] text-slate-100 overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-48 w-96 rounded-full bg-orange-600/25 blur-[100px]" />

        {/* Header */}
        <div className="flex items-start justify-between border-b border-white/10 pb-5 relative z-10">
          <div className="flex items-center gap-3.5">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500/20 to-amber-500/20 text-orange-400 border border-orange-500/40 shadow-[0_0_24px_rgba(249,115,22,0.35)]">
              <Flame className="h-6 w-6 fill-orange-500/30 text-orange-400 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white tracking-tight">Streak Journey & Milestones</h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/30">
                  {currentStreak} Days
                </span>
              </div>
              <p className="text-xs text-neutral-400 mt-0.5">Track your milestone rewards, streak freeze shields, and collectible badges</p>
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
            onClick={() => setActiveTab("milestones")}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === "milestones"
                ? "bg-orange-500 text-white shadow-[0_0_14px_rgba(249,115,22,0.5)]"
                : "text-neutral-400 hover:text-white bg-white/5 hover:bg-white/10"
            }`}
          >
            <Target className="h-3.5 w-3.5" />
            Milestone Roadmap & Quests
          </button>
          <button
            onClick={() => setActiveTab("badges")}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === "badges"
                ? "bg-orange-500 text-white shadow-[0_0_14px_rgba(249,115,22,0.5)]"
                : "text-neutral-400 hover:text-white bg-white/5 hover:bg-white/10"
            }`}
          >
            <Award className="h-3.5 w-3.5" />
            Achievements & Badges ({BADGES_DATA.filter((b) => b.unlocked).length}/{BADGES_DATA.length})
          </button>
        </div>

        {/* Modal Body */}
        <div className="mt-5 space-y-5 max-h-[58vh] overflow-y-auto pr-1 relative z-10 text-xs">
          {activeTab === "milestones" ? (
            <div className="space-y-4">
              {/* Active Milestone Card */}
              <div className="p-4 rounded-2xl border border-orange-500/30 bg-gradient-to-r from-orange-500/10 via-amber-500/5 to-transparent space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-orange-400" />
                    <span className="font-semibold text-white">Next Goal: 14-Day Algorithm Specialist</span>
                  </div>
                  <span className="text-[11px] font-bold text-orange-300">{currentStreak} / {nextMilestone} Days</span>
                </div>

                <div className="h-2 w-full rounded-full bg-black/40 overflow-hidden border border-white/5">
                  <div
                    className="h-full bg-gradient-to-r from-orange-500 to-amber-400 rounded-full transition-all duration-500 shadow-[0_0_12px_rgba(249,115,22,0.6)]"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] text-neutral-400">
                  <span>Only <strong className="text-white">2 more consecutive days</strong> to unlock the 14-Day Gold Trophy</span>
                  <span className="text-orange-400 font-medium">{progressPercent}% complete</span>
                </div>
              </div>

              {/* Today's Streak Quest & Freeze Shield Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {/* Daily Quest */}
                <div className="p-4 rounded-2xl border border-white/10 bg-white/[0.02] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-white flex items-center gap-1.5">
                      <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
                      Today's Streak Quest
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      Day 12 Active
                    </span>
                  </div>

                  <p className="text-[11px] text-neutral-300 leading-relaxed">
                    Complete 1 practice drill or review session today to lock in Day 13.
                  </p>

                  <button
                    onClick={() => {
                      onClose();
                      onStartPractice();
                    }}
                    className="w-full flex items-center justify-center gap-2 text-xs font-semibold text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 py-2.5 rounded-xl shadow-[0_0_16px_rgba(249,115,22,0.4)] transition-all cursor-pointer"
                  >
                    <Play className="h-3.5 w-3.5 fill-white" />
                    Lock In Day 13 Drill
                  </button>
                </div>

                {/* Streak Shield / Freeze */}
                <div className="p-4 rounded-2xl border border-white/10 bg-white/[0.02] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-white flex items-center gap-1.5">
                      <Shield className="h-3.5 w-3.5 text-emerald-400" />
                      Streak Freeze Shield
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      hasShield ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/20" : "bg-neutral-800 text-neutral-400 border-neutral-700"
                    }`}>
                      {hasShield ? "1 Shield Ready" : "Depleted"}
                    </span>
                  </div>

                  <p className="text-[11px] text-neutral-300 leading-relaxed">
                    Automatically protects your 12-day streak if you miss a busy day.
                  </p>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[10px] text-neutral-400">Streak Protection:</span>
                    <span className="text-[11px] font-semibold text-emerald-400">Active & Armed ???</span>
                  </div>
                </div>
              </div>

              {/* Milestone Roadmap */}
              <div className="p-4 rounded-2xl border border-white/10 bg-white/[0.02] space-y-3">
                <h3 className="font-semibold text-white text-xs uppercase tracking-wider text-neutral-400">
                  Milestone Progression Path
                </h3>

                <div className="space-y-2.5">
                  {STREAK_MILESTONES.map((m, idx) => {
                    const Icon = m.icon;
                    return (
                      <div
                        key={idx}
                        className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                          m.unlocked
                            ? "bg-white/[0.03] border-white/10 text-white"
                            : m.current
                            ? "bg-orange-500/10 border-orange-500/30 text-white shadow-[0_0_12px_rgba(249,115,22,0.2)]"
                            : "bg-white/[0.01] border-white/5 text-neutral-500 opacity-60"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex h-8 w-8 items-center justify-center rounded-lg border ${
                              m.unlocked
                                ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                                : m.current
                                ? "bg-orange-500/20 border-orange-500/30 text-orange-400"
                                : "bg-white/5 border-white/5 text-neutral-600"
                            }`}
                          >
                            <Icon className="h-4 w-4" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-xs text-white">{m.title}</span>
                              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-white/5 text-neutral-400 border border-white/5">
                                {m.days} Days
                              </span>
                            </div>
                            <p className="text-[10px] text-neutral-400 mt-0.5">{m.desc}</p>
                          </div>
                        </div>

                        {m.unlocked ? (
                          <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400">
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            Earned
                          </span>
                        ) : m.current ? (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/30">
                            Active Goal
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-[10px] text-neutral-600">
                            <Lock className="h-3 w-3" />
                            Locked
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            /* TAB 2: Achievements & Badges */
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {BADGES_DATA.map((b) => {
                const Icon = b.icon;
                return (
                  <div
                    key={b.id}
                    className={`p-4 rounded-2xl border bg-gradient-to-br transition-all relative overflow-hidden ${
                      b.unlocked
                        ? `${b.color} hover:border-white/30 shadow-lg`
                        : "from-white/[0.02] to-transparent border-white/5 opacity-60"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2.5">
                      <div className={`p-2.5 rounded-xl border ${b.unlocked ? "bg-black/30 border-white/10" : "bg-black/20 border-white/5 text-neutral-600"}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${
                        b.unlocked
                          ? "bg-white/10 text-white border-white/20"
                          : "bg-white/5 text-neutral-500 border-white/5"
                      }`}>
                        {b.tier}
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-white tracking-tight">{b.title}</h4>
                    <p className="text-[10px] text-neutral-400 mt-1 leading-relaxed">{b.description}</p>

                    <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between text-[10px]">
                      {b.unlocked ? (
                        <span className="text-emerald-400 font-medium flex items-center gap-1">
                          <Check className="h-3 w-3" /> Unlocked {b.date}
                        </span>
                      ) : (
                        <span className="text-neutral-500 font-medium flex items-center gap-1">
                          <Lock className="h-3 w-3" /> {b.progress}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between relative z-10 text-xs">
          <div className="flex items-center gap-2 text-neutral-400">
            <Flame className="h-4 w-4 text-orange-400" />
            <span>Best All-Time Streak: <strong className="text-white">{bestStreak} Days</strong></span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-medium transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
