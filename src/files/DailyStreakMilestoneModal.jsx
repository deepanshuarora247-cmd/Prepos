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
import "./DailyStreakMilestoneModal.css";

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
    description: "Complete DSA, System Design, and Behavioral tracks",
    tier: "Diamond",
    unlocked: false,
    progress: "2/3 Tracks",
    icon: Sparkles,
    color: "from-pink-500/10 to-indigo-500/10 border-white/10 text-neutral-400"
  }
];

export default function DailyStreakMilestoneModal({ isOpen, onClose, onStartPractice }) {
  const [activeTab, setActiveTab] = useState("milestones"); 
  const [hasShield, setHasShield] = useState(true);

  if (!isOpen) return null;

  const currentStreak = 12;
  const bestStreak = 24;
  const nextMilestone = 14;
  const progressPercent = Math.round((currentStreak / nextMilestone) * 100);

  return (
    <div className="milestone-modal-backdrop" onClick={onClose}>
      <div className="milestone-modal-card" onClick={(e) => e.stopPropagation()}>
        
        <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-48 w-96 rounded-full bg-orange-600/25 blur-[100px]" />

        
        <div className="milestone-modal-header">
          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <div className="q-solve-btn" style={{ padding: "0.5rem", borderRadius: "0.75rem", backgroundColor: "var(--orange-bg)", color: "var(--orange-accent)", borderColor: "var(--orange-border)" }}>
              <Flame className="h-6 w-6 fill-orange-500/30 text-orange-400" />
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <h2 style={{ fontSize: "1.125rem", fontWeight: "bold", color: "#fff", margin: 0 }}>Streak Journey & Milestones</h2>
                <span className="popover-header-badge" style={{ color: "var(--orange-accent)", backgroundColor: "var(--orange-bg)", borderColor: "var(--orange-border)" }}>{currentStreak} Days</span>
              </div>
              <p style={{ fontSize: "11px", color: "var(--text-muted)", margin: 0 }}>Track your milestone rewards, streak freeze shields, and collectible badges</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="milestone-modal-close-btn"
            style={{ border: "none", background: "none" }}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        
        <div className="categories-nav" style={{ gap: "0.75rem", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "0.5rem" }}>
          <button
            onClick={() => setActiveTab("milestones")}
            className={`category-tab ${activeTab === "milestones" ? "active" : ""}`}
            style={{ fontSize: "11px", paddingBottom: "0.25rem" }}
          >
            Milestone Roadmap
            {activeTab === "milestones" && <div className="category-indicator" />}
          </button>
          <button
            onClick={() => setActiveTab("badges")}
            className={`category-tab ${activeTab === "badges" ? "active" : ""}`}
            style={{ fontSize: "11px", paddingBottom: "0.25rem" }}
          >
            Achievements & Badges
            {activeTab === "badges" && <div className="category-indicator" />}
          </button>
        </div>

        
        <div className="milestone-scroll-body">
          {activeTab === "milestones" ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              
              <div className="practice-streak-card" style={{ padding: "1.25rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <Trophy className="h-4 w-4 text-orange-400" />
                    <span style={{ fontWeight: "bold", color: "#fff" }}>Next Goal: 14-Day Algorithm Specialist</span>
                  </div>
                  <span className="player-progress-percent">{currentStreak} / {nextMilestone} Days</span>
                </div>

                <div className="player-progress-bar-slot" style={{ width: "100%", height: "8px", marginTop: "0.75rem" }}>
                  <div
                    className="player-progress-bar-fill"
                    style={{ width: `${progressPercent}%`, background: "linear-gradient(to right, var(--orange-accent), var(--amber-accent))" }}
                  />
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "var(--text-muted)", marginTop: "0.5rem" }}>
                  <span>Only <strong style={{ color: "#fff" }}>2 more consecutive days</strong> to unlock the 14-Day Gold Trophy</span>
                  <span style={{ color: "var(--orange-accent)" }}>{progressPercent}% complete</span>
                </div>
              </div>

              
              <div className="sysdesign-nodes-grid" style={{ gap: "1rem" }}>
                
                <div className="practice-streak-card" style={{ padding: "1rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <span className="behavioral-rewrite-header" style={{ color: "var(--cyan-accent)", justifyContent: "space-between" }}>
                      <span style={{ display: "flex", gap: "0.25rem" }}><Sparkles className="h-3.5 w-3.5" /> Streak Quest</span>
                      <span className="q-api-badge" style={{ backgroundColor: "var(--emerald-bg)", color: "var(--emerald-accent)", borderColor: "var(--emerald-border)" }}>Active</span>
                    </span>
                    <p style={{ fontSize: "11px", color: "var(--text-secondary)", marginTop: "0.5rem" }}>
                      Complete 1 practice drill or review session today to lock in Day 13.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      onClose();
                      onStartPractice();
                    }}
                    className="sysdesign-audit-btn"
                    style={{ marginTop: "1rem", backgroundColor: "var(--orange-accent)", borderColor: "var(--orange-border)", width: "100%" }}
                  >
                    <Play className="h-3.5 w-3.5 fill-white" />
                    Lock In Day 13 Drill
                  </button>
                </div>

                
                <div className="practice-streak-card" style={{ padding: "1rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <span className="behavioral-rewrite-header" style={{ color: "var(--emerald-accent)", justifyContent: "space-between" }}>
                      <span style={{ display: "flex", gap: "0.25rem" }}><Shield className="h-3.5 w-3.5" /> Streak Freeze Shield</span>
                      <span className={`q-api-badge ${hasShield ? "active" : ""}`} style={{ backgroundColor: hasShield ? "var(--emerald-bg)" : undefined, color: hasShield ? "var(--emerald-accent)" : undefined, borderColor: hasShield ? "var(--emerald-border)" : undefined }}>
                        {hasShield ? "1 Ready" : "Depleted"}
                      </span>
                    </span>
                    <p style={{ fontSize: "11px", color: "var(--text-secondary)", marginTop: "0.5rem" }}>
                      Automatically protects your 12-day streak if you miss a busy day.
                    </p>
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "var(--text-muted)", marginTop: "1rem" }}>
                    <span>Streak Protection:</span>
                    <span style={{ color: "var(--emerald-accent)", fontWeight: "bold" }}>Active & Armed</span>
                  </div>
                </div>
              </div>

              
              <div className="practice-streak-card" style={{ padding: "1rem" }}>
                <h3 className="behavioral-rewrite-header" style={{ color: "var(--indigo-accent)", marginBottom: "0.75rem" }}>
                  Milestone Progression Path
                </h3>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  {STREAK_MILESTONES.map((m, idx) => {
                    const Icon = m.icon;
                    return (
                      <div
                        key={idx}
                        className="table-row-item"
                        style={{
                          padding: "0.75rem",
                          border: "1px solid var(--panel-border)",
                          borderRadius: "0.75rem",
                          gridTemplateColumns: "1fr",
                          backgroundColor: m.current ? "rgba(249, 115, 22, 0.08)" : undefined,
                          borderColor: m.current ? "var(--orange-border)" : undefined
                        }}
                      >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                            <div className="sandbox-back-btn" style={{ padding: "0.25rem", borderRadius: "0.5rem", color: m.unlocked ? "var(--emerald-accent)" : m.current ? "var(--orange-accent)" : undefined }}>
                              <Icon className="h-4 w-4" />
                            </div>
                            <div>
                              <span style={{ fontSize: "12px", color: "#fff", fontWeight: "bold" }}>{m.title}</span>
                              <p style={{ fontSize: "10px", color: "var(--text-muted)", margin: 0 }}>{m.desc} ({m.days} Days)</p>
                            </div>
                          </div>

                          {m.unlocked ? (
                            <span className="q-api-badge" style={{ backgroundColor: "var(--emerald-bg)", color: "var(--emerald-accent)", borderColor: "var(--emerald-border)" }}>Earned</span>
                          ) : m.current ? (
                            <span className="q-api-badge" style={{ backgroundColor: "var(--orange-bg)", color: "var(--orange-accent)", borderColor: "var(--orange-border)" }}>Active Goal</span>
                          ) : (
                            <span className="q-api-badge" style={{ backgroundColor: "rgba(255,255,255,0.03)", color: "var(--text-muted)" }}>Locked</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            
            <div className="sysdesign-nodes-grid" style={{ gap: "1rem" }}>
              {BADGES_DATA.map((b) => {
                const Icon = b.icon;
                return (
                  <div
                    key={b.id}
                    className="practice-streak-card"
                    style={{ padding: "1rem", display: "flex", flexDirection: "column", justifyContent: "space-between", opacity: b.unlocked ? 1 : 0.6 }}
                  >
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                        <div className="sandbox-back-btn" style={{ padding: "0.25rem", borderRadius: "0.5rem" }}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <span className="q-api-badge">{b.tier}</span>
                      </div>
                      <span style={{ fontSize: "12px", color: "#fff", fontWeight: "bold" }}>{b.title}</span>
                      <p style={{ fontSize: "10px", color: "var(--text-muted)", marginTop: "0.25rem", margin: 0 }}>{b.description}</p>
                    </div>

                    <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "0.5rem", marginTop: "0.75rem", fontSize: "10px" }}>
                      {b.unlocked ? (
                        <span style={{ color: "var(--emerald-accent)", fontWeight: "bold" }}>Unlocked {b.date}</span>
                      ) : (
                        <span style={{ color: "var(--text-muted)" }}>{b.progress}</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--panel-border)", paddingTop: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", fontSize: "11px", color: "var(--text-secondary)" }}>
            <Flame className="h-4 w-4 text-orange-400" />
            <span>Best All-Time Streak: <strong style={{ color: "#fff" }}>{bestStreak} Days</strong></span>
          </div>
          <button
            onClick={onClose}
            className="sandbox-back-btn"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
