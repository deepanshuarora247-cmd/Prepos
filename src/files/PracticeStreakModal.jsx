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
import "./PracticeStreakModal.css";

export const DAILY_PRACTICE_DATA = {
  currentStreak: 12,
  streakMilestone: 30,
  today: {
    questionsCount: 6,
    goalQuestions: 5,
    timeSpentMinutes: 105, 
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
    totalTimeMinutes: 680, 
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
  const [activeTab, setActiveTab] = useState("overview"); 

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
    <div className="streak-modal-backdrop" onClick={onClose}>
      <div className="streak-modal-card" onClick={(e) => e.stopPropagation()}>
        
        <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-48 w-96 rounded-full bg-orange-600/20 blur-[100px]" />

        
        <div className="streak-modal-header">
          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <div className="q-solve-btn" style={{ padding: "0.5rem", borderRadius: "0.75rem", backgroundColor: "var(--orange-bg)", color: "var(--orange-accent)", borderColor: "var(--orange-border)" }}>
              <Flame className="h-6 w-6 fill-orange-500/30 text-orange-400" />
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <h2 style={{ fontSize: "1.125rem", fontWeight: "bold", color: "#fff", margin: 0 }}>Practice Streak & Analytics</h2>
                <span className="popover-header-badge" style={{ color: "var(--orange-accent)", backgroundColor: "var(--orange-bg)", borderColor: "var(--orange-border)" }}>{data.currentStreak} Days Active</span>
              </div>
              <p style={{ fontSize: "11px", color: "var(--text-muted)", margin: 0 }}>Detailed log of questions practiced and time applied</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="streak-modal-close-btn"
            style={{ border: "none", background: "none" }}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        
        <div className="categories-nav" style={{ gap: "0.75rem", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "0.5rem" }}>
          <button
            onClick={() => setActiveTab("overview")}
            className={`category-tab ${activeTab === "overview" ? "active" : ""}`}
            style={{ fontSize: "11px", paddingBottom: "0.25rem" }}
          >
            Today's Session
            {activeTab === "overview" && <div className="category-indicator" />}
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`category-tab ${activeTab === "history" ? "active" : ""}`}
            style={{ fontSize: "11px", paddingBottom: "0.25rem" }}
          >
            7-Day Activity Log
            {activeTab === "history" && <div className="category-indicator" />}
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="streak-scroll-body">
          {/* Top Quick Stats Grid */}
          <div className="sysdesign-nodes-grid" style={{ gridTemplateColumns: "repeat(4, 1fr)", gap: "0.75rem" }}>
            <div className="practice-streak-card" style={{ padding: "0.75rem", textAlign: "center" }}>
              <span style={{ fontSize: "9px", textTransform: "uppercase", color: "var(--text-muted)" }}>Questions Today</span>
              <div style={{ fontSize: "1.25rem", fontWeight: "bold", color: "#fff", marginTop: "0.25rem" }}>
                {data.today.questionsCount}
                <span className="ide-example-label">/ {data.today.goalQuestions}</span>
              </div>
            </div>

            <div className="practice-streak-card" style={{ padding: "0.75rem", textAlign: "center" }}>
              <span style={{ fontSize: "9px", textTransform: "uppercase", color: "var(--text-muted)" }}>Time Applied</span>
              <div style={{ fontSize: "1.25rem", fontWeight: "bold", color: "var(--orange-accent)", marginTop: "0.25rem" }}>
                {formatHours(data.today.timeSpentMinutes)}
              </div>
            </div>

            <div className="practice-streak-card" style={{ padding: "0.75rem", textAlign: "center" }}>
              <span style={{ fontSize: "9px", textTransform: "uppercase", color: "var(--text-muted)" }}>Weekly Problems</span>
              <div style={{ fontSize: "1.25rem", fontWeight: "bold", color: "var(--cyan-accent)", marginTop: "0.25rem" }}>
                {data.weekly.totalQuestions}
              </div>
            </div>

            <div className="practice-streak-card" style={{ padding: "0.75rem", textAlign: "center" }}>
              <span style={{ fontSize: "9px", textTransform: "uppercase", color: "var(--text-muted)" }}>Weekly Time</span>
              <div style={{ fontSize: "1.25rem", fontWeight: "bold", color: "var(--amber-accent)", marginTop: "0.25rem" }}>
                {formatHours(data.weekly.totalTimeMinutes)}
              </div>
            </div>
          </div>

          {activeTab === "overview" ? (
            /* TAB 1: Today's Breakdown */
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div className="practice-streak-card" style={{ padding: "1rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                  <h3 className="behavioral-rewrite-header" style={{ color: "var(--indigo-accent)" }}>
                    <Code2 className="h-4 w-4" /> Today's Practiced Allocation
                  </h3>
                  <span className="player-progress-percent">{formatHours(data.today.timeSpentMinutes)}</span>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  {data.today.categories.map((cat, idx) => (
                    <div
                      key={idx}
                      className="table-row-item"
                      style={{ padding: "0.5rem 0.75rem", border: "1px solid var(--panel-border)", borderRadius: "0.5rem", gridTemplateColumns: "1fr" }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                          <div className="cal-day-cell-today-marker" style={{ position: "static" }} />
                          <div>
                            <span style={{ fontSize: "12px", color: "#fff", fontWeight: "600" }}>{cat.name}</span>
                            <p style={{ fontSize: "10px", color: "var(--text-muted)", margin: 0 }}>{cat.count} question(s) completed</p>
                          </div>
                        </div>
                        <span className="q-api-badge" style={{ backgroundColor: "var(--orange-bg)", color: "var(--orange-accent)", borderColor: "var(--orange-border)" }}>{cat.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              
              <div className="practice-streak-card" style={{ padding: "1rem" }}>
                <h3 className="behavioral-rewrite-header" style={{ color: "var(--emerald-accent)", marginBottom: "0.75rem" }}>
                  <Target className="h-4 w-4" /> Difficulty Distribution (This Week)
                </h3>
                <div className="sysdesign-nodes-grid" style={{ gap: "0.75rem" }}>
                  {Object.entries(data.weekly.difficultyBreakdown).map(([key, diff]) => (
                    <div key={key} className="table-row-item" style={{ padding: "0.75rem", border: "1px solid var(--panel-border)", borderRadius: "0.75rem", display: "flex", flexDirection: "column", alignItems: "center" }}>
                      <span style={{ fontSize: "11px", fontWeight: "bold" }}>{diff.label}</span>
                      <span style={{ fontSize: "14px", fontWeight: "black", marginTop: "0.25rem", color: "#fff" }}>{diff.count} Solved</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            
            <div className="practice-streak-card" style={{ padding: "1rem" }}>
              <h3 className="behavioral-rewrite-header" style={{ color: "var(--cyan-accent)", marginBottom: "0.75rem" }}>
                <Calendar className="h-4 w-4" /> Last 7 Days Time Log
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {data.weekly.days.map((d, i) => (
                  <div
                    key={i}
                    className="table-row-item"
                    style={{
                      padding: "0.75rem",
                      border: "1px solid var(--panel-border)",
                      borderRadius: "0.75rem",
                      gridTemplateColumns: "1fr",
                      backgroundColor: d.isToday ? "rgba(249, 115, 22, 0.08)" : undefined,
                      borderColor: d.isToday ? "var(--orange-border)" : undefined
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <div className="sandbox-back-btn" style={{ padding: "0.25rem 0.5rem", borderRadius: "0.5rem", fontSize: "10px", fontWeight: "bold" }}>{d.day}</div>
                        <div>
                          <span style={{ fontSize: "12px", color: "#fff", fontWeight: "bold" }}>{d.date}</span>
                          <p style={{ fontSize: "10px", color: "var(--text-muted)", margin: 0 }}>{d.questions} questions solved</p>
                        </div>
                      </div>

                      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                        <div style={{ textAlign: "right" }}>
                          <span style={{ fontSize: "11px", color: "var(--orange-accent)", fontWeight: "bold" }}>🕒 {d.time}</span>
                          <p style={{ fontSize: "9px", color: "var(--text-muted)", margin: 0 }}>{d.minutes} mins active</p>
                        </div>
                        <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--panel-border)", paddingTop: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.375rem", fontSize: "11px", color: "var(--text-secondary)" }}>
            <Sparkles className="h-3.5 w-3.5 text-orange-400" />
            <span>18 days remaining until 30-Day Badge</span>
          </div>

          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button
              onClick={onClose}
              className="sandbox-back-btn"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                if (onStartPractice) onStartPractice();
              }}
              className="sysdesign-audit-btn"
              style={{ backgroundColor: "var(--orange-accent)", borderColor: "var(--orange-border)", boxShadow: "0 0 16px rgba(249,115,22,0.4)" }}
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
