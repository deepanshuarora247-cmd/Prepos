import React, { useState } from "react";
import { Calendar, Clock, CheckCircle2, Sparkles, Target, Bell, X, ArrowRight, ShieldCheck, Flame, BookOpen } from "lucide-react";

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl rounded-3xl border border-white/10 bg-[#0c101d] p-6 md:p-8 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] text-slate-100 overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-48 w-96 rounded-full bg-indigo-600/20 blur-[100px]" />

        {/* Header */}
        <div className="flex items-start justify-between border-b border-white/10 pb-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              <Calendar className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">Interview Prep Plan Scheduler</h2>
              <p className="text-xs text-neutral-400 mt-0.5">Customize your weekly schedule & milestone roadmap</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-white p-1 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="mt-6 space-y-6 max-h-[70vh] overflow-y-auto pr-1">
          {/* Target Company & Role Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-neutral-300">Target Tech Company</label>
              <select
                value={targetCompany}
                onChange={(e) => setTargetCompany(e.target.value)}
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
              >
                <option value="Meta">Meta (Facebook)</option>
                <option value="Google">Google</option>
                <option value="Amazon">Amazon</option>
                <option value="Apple">Apple</option>
                <option value="OpenAI">OpenAI</option>
                <option value="Uber">Uber</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-neutral-300">Target Role Title</label>
              <select
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
              >
                <option value="Senior Fullstack Engineer">Senior Fullstack Engineer</option>
                <option value="Backend Software Engineer">Backend Software Engineer</option>
                <option value="System Architect">System Architect</option>
                <option value="Frontend Lead">Frontend Lead</option>
              </select>
            </div>
          </div>

          {/* Intensity & Daily Hours Slider */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-neutral-300">Daily Prep Intensity</label>
              <span className="text-xs font-mono font-bold text-indigo-400">{dailyGoalHours} Hours / Day</span>
            </div>

            <div className="grid grid-cols-3 gap-3">
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
                  className={`p-3 rounded-xl border text-left transition-all ${
                    intensity === lvl.label
                      ? "bg-indigo-500/20 border-indigo-500 text-white shadow-[0_0_12px_rgba(99,102,241,0.4)]"
                      : "bg-white/[0.02] border-white/10 text-neutral-400 hover:text-white"
                  }`}
                >
                  <p className="text-xs font-bold">{lvl.label}</p>
                  <p className="text-[10px] opacity-70 mt-0.5">{lvl.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Preferred Time Slot */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-neutral-300">Preferred Daily Practice Slot</label>
            <select
              value={prepTimeSlot}
              onChange={(e) => setPrepTimeSlot(e.target.value)}
              className="w-full bg-slate-900 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
            >
              <option value="Morning (8:00 AM - 10:30 AM)">Morning (8:00 AM - 10:30 AM)</option>
              <option value="Evening (7:00 PM - 9:30 PM)">Evening (7:00 PM - 9:30 PM)</option>
              <option value="Late Night (10:00 PM - 12:30 AM)">Late Night (10:00 PM - 12:30 AM)</option>
            </select>
          </div>

          {/* 3-Week Milestone Timeline Preview */}
          <div className="rounded-2xl border border-white/10 bg-black/40 p-4 space-y-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
              <Target className="h-3.5 w-3.5" /> Scheduled 3-Week Milestone Roadmap
            </span>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between bg-white/5 p-2.5 rounded-lg border border-white/5">
                <span className="font-semibold text-white">Week 1: Core DSA Patterns</span>
                <span className="text-emerald-400 font-mono text-[11px]">Arrays, Sliding Window, DP</span>
              </div>
              <div className="flex items-center justify-between bg-white/5 p-2.5 rounded-lg border border-white/5">
                <span className="font-semibold text-white">Week 2: High-Scale System Design</span>
                <span className="text-purple-400 font-mono text-[11px]">Caching, Microservices, DBs</span>
              </div>
              <div className="flex items-center justify-between bg-white/5 p-2.5 rounded-lg border border-white/5">
                <span className="font-semibold text-white">Week 3: STAR Behavioral Mocks</span>
                <span className="text-amber-400 font-mono text-[11px]">Mock Interviews & Outages</span>
              </div>
            </div>
          </div>

          {/* Calendar Sync Toggle */}
          <div className="flex items-center justify-between p-3.5 rounded-xl border border-white/10 bg-white/[0.02]">
            <div className="flex items-center gap-2 text-xs text-neutral-300">
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
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-white/10">
          {calendarSynced ? (
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
              <CheckCircle2 className="h-4 w-4" /> Schedule Saved & Synced to Calendar!
            </div>
          ) : (
            <span className="text-xs text-neutral-400 font-mono">Next Session: Today @ 7:00 PM</span>
          )}

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handleSaveSchedule}
              className="flex-1 sm:flex-initial text-xs font-semibold text-neutral-300 bg-white/10 hover:bg-white/15 border border-white/10 px-4 py-2.5 rounded-xl transition-colors"
            >
              Save Schedule
            </button>
            <button
              onClick={() => {
                onClose();
                onStartPractice();
              }}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 border border-indigo-500/30 px-5 py-2.5 rounded-xl shadow-[0_0_20px_rgba(99,102,241,0.6)] transition-all"
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
