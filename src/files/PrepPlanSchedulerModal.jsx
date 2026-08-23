import React, { useState } from "react";
import { Calendar, Clock, CheckCircle2, Sparkles, Target, Bell, X, ArrowRight, ShieldCheck, Flame, BookOpen } from "lucide-react";
import "./PrepPlanSchedulerModal.css";

export default function PrepPlanSchedulerModal({ isOpen, onClose, onStartPractice }) {
  const [targetCompany, setTargetCompany] = useState("Meta");
  const [targetRole, setTargetRole] = useState("Senior Fullstack Engineer");
  const [intensity, setIntensity] = useState("Balanced"); // Casual | Balanced | Intensive
  const [dailyGoalHours, setDailyGoalHours] = useState(2.5);
  const [prepTimeSlot, setPrepTimeSlot] = useState("Evening (7:00 PM - 9:30 PM)");
  const [calendarSynced, setCalendarSynced] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  if (!isOpen) return null;

  const handleSaveSchedule = () => {
    setCalendarSynced(true);
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  return (
    <div className="plan-modal-backdrop">
      <div className="plan-modal-card">
        {/* Ambient Top Glow */}
        <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-48 w-96 rounded-full bg-indigo-600/20 blur-[100px]" />

        {/* Header */}
        <div className="plan-modal-header">
          <div className="plan-modal-header-left">
            <div className="q-solve-btn" style={{ padding: "0.25rem 0.5rem", borderRadius: "0.375rem", backgroundColor: "var(--indigo-bg)", color: "var(--indigo-accent)", borderColor: "var(--indigo-border)" }}>
              <Calendar className="h-5 w-5" />
            </div>
            <div>
              <h2>Interview Prep Plan Scheduler</h2>
              <p>Customize your weekly schedule & milestone roadmap</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="plan-modal-close-btn"
            style={{ border: "none", background: "none" }}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="plan-modal-scroll-body">
          {/* Target Company & Role Selection */}
          <div className="sysdesign-nodes-grid" style={{ gap: "1rem" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
              <label className="resume-field-lbl">Target Tech Company</label>
              <select
                value={targetCompany}
                onChange={(e) => setTargetCompany(e.target.value)}
                className="bg-slate-900 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
              >
                <option value="Meta">Meta (Facebook)</option>
                <option value="Google">Google</option>
                <option value="Amazon">Amazon</option>
                <option value="Apple">Apple</option>
                <option value="OpenAI">OpenAI</option>
                <option value="Uber">Uber</option>
              </select>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
              <label className="resume-field-lbl">Target Role Title</label>
              <select
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                className="bg-slate-900 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
              >
                <option value="Senior Fullstack Engineer">Senior Fullstack Engineer</option>
                <option value="Backend Software Engineer">Backend Software Engineer</option>
                <option value="System Architect">System Architect</option>
                <option value="Frontend Lead">Frontend Lead</option>
              </select>
            </div>
          </div>

          {/* Intensity & Daily Hours Slider */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <label className="resume-field-lbl">Daily Prep Intensity</label>
              <span className="player-progress-percent">{dailyGoalHours} Hours / Day</span>
            </div>

            <div className="plan-intensity-btn-row">
              {[
                { label: "Casual", hours: 1, desc: "1h / day (Light)" },
                { label: "Balanced", hours: 2.5, desc: "2.5h / day (Recommended)" },
                { label: "Intensive", hours: 4, desc: "4h / day (Bootcamp)" }
              ].map((lvl) => (
                <button
                  key={lvl.label}
                  onClick={() => {
                    setIntensity(lvl.label);
                    setDailyGoalHours(lvl.hours);
                  }}
                  className={`plan-intensity-option-btn ${intensity === lvl.label ? "active" : ""}`}
                >
                  <p className="plan-intensity-option-btn-lbl">{lvl.label}</p>
                  <p className="plan-intensity-option-btn-desc">{lvl.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Preferred Time Slot */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
            <label className="resume-field-lbl">Preferred Daily Practice Slot</label>
            <select
              value={prepTimeSlot}
              onChange={(e) => setPrepTimeSlot(e.target.value)}
              className="bg-slate-900 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
            >
              <option value="Morning (8:00 AM - 10:30 AM)">Morning (8:00 AM - 10:30 AM)</option>
              <option value="Evening (7:00 PM - 9:30 PM)">Evening (7:00 PM - 9:30 PM)</option>
              <option value="Late Night (10:00 PM - 12:30 AM)">Late Night (10:00 PM - 12:30 AM)</option>
            </select>
          </div>

          {/* 3-Week Milestone Timeline Preview */}
          <div className="practice-streak-card" style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <span className="behavioral-rewrite-header" style={{ color: "var(--indigo-accent)" }}>
              <Target className="h-3.5 w-3.5" /> Scheduled 3-Week Milestone Roadmap
            </span>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", fontSize: "11px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", background: "rgba(255,255,255,0.03)", padding: "0.5rem 0.75rem", borderRadius: "0.5rem" }}>
                <span style={{ fontWeight: "bold", color: "#fff" }}>Week 1: Core DSA Patterns</span>
                <span style={{ color: "var(--emerald-accent)" }}>Arrays, Sliding Window, DP</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", background: "rgba(255,255,255,0.03)", padding: "0.5rem 0.75rem", borderRadius: "0.5rem" }}>
                <span style={{ fontWeight: "bold", color: "#fff" }}>Week 2: High-Scale System Design</span>
                <span style={{ color: "var(--indigo-accent)" }}>Caching, Microservices, DBs</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", background: "rgba(255,255,255,0.03)", padding: "0.5rem 0.75rem", borderRadius: "0.5rem" }}>
                <span style={{ fontWeight: "bold", color: "#fff" }}>Week 3: STAR Behavioral Mocks</span>
                <span style={{ color: "var(--amber-accent)" }}>Mock Interviews & Outages</span>
              </div>
            </div>
          </div>

          {/* Calendar Sync Toggle */}
          <div className="practice-streak-card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.75rem" }}>
            <div style={{ display: "flex", itemsCenter: "center", gap: "0.5rem", fontSize: "11px", color: "var(--text-secondary)" }}>
              <Bell className="h-4 w-4 text-indigo-400" />
              <span>Enable daily reminders & sync with Google Calendar</span>
            </div>
            <input
              type="checkbox"
              checked={notificationsEnabled}
              onChange={(e) => setNotificationsEnabled(e.target.checked)}
              className="h-4 w-4 rounded border-white/20 bg-slate-900 text-indigo-500 focus:ring-indigo-500 cursor-pointer"
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--panel-border)", paddingTop: "1rem", marginTop: "1rem" }}>
          {calendarSynced ? (
            <div style={{ display: "flex", alignItems: "center", gap: "0.375rem", fontSize: "11px", fontWeight: "bold", color: "var(--emerald-accent)" }}>
              <CheckCircle2 className="h-4 w-4" /> Schedule Saved!
            </div>
          ) : (
            <span className="ide-example-label">Next Session: Today @ 7:00 PM</span>
          )}

          <div style={{ display: "flex", gap: "0.75rem" }}>
            <button
              onClick={handleSaveSchedule}
              className="sandbox-back-btn"
            >
              Save Schedule
            </button>
            <button
              onClick={() => {
                onClose();
                onStartPractice();
              }}
              className="sysdesign-audit-btn"
            >
              Start Today's Drills
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
