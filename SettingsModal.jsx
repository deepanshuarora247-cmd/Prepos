import React, { useState, useEffect } from "react";
import {
  Settings,
  X,
  Code2,
  Sliders,
  Bell,
  Volume2,
  Database,
  Check,
  RotateCcw,
  Sparkles,
  Laptop,
  ShieldCheck,
  Download,
  Trash2,
  Target,
  Terminal,
  Palette
} from "lucide-react";

export default function SettingsModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState("editor"); // "editor" | "goals" | "notifications" | "data"
  
  // Settings states with persistence in localStorage
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem("prepos_user_settings_v1");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return {
      defaultLanguage: "javascript",
      editorFontSize: "13px",
      keybinding: "standard",
      tabSize: "2",
      lineNumbers: true,
      autoCloseBrackets: true,
      targetCompany: "Meta",
      targetLevel: "L5 - Senior Software Engineer",
      dailyQuestionTarget: 5,
      streakMilestoneTarget: 30,
      soundEffects: true,
      dailyReminderNotification: true,
      aiTutorSuggestions: true,
      theme: "dark-cyberpunk"
    };
  });

  const [toastMessage, setToastMessage] = useState("");

  const updateSetting = (key, value) => {
    setSettings((prev) => {
      const updated = { ...prev, [key]: value };
      localStorage.setItem("prepos_user_settings_v1", JSON.stringify(updated));
      try {
        window.dispatchEvent(new Event("storage"));
      } catch (e) {}
      return updated;
    });
  };

  const handleSave = () => {
    localStorage.setItem("prepos_user_settings_v1", JSON.stringify(settings));
    setToastMessage("Settings saved successfully!");
    setTimeout(() => {
      setToastMessage("");
      onClose();
    }, 900);
  };

  const handleResetProgress = () => {
    if (window.confirm("Are you sure you want to reset your local course progress and custom schedule events?")) {
      localStorage.removeItem("prepos_course_progress_v1");
      setToastMessage("Progress cache cleared!");
      setTimeout(() => setToastMessage(""), 2000);
    }
  };

  const handleExportData = () => {
    const exportPayload = {
      settings,
      exportedAt: new Date().toISOString(),
      platform: "PrepOS Interview Dashboard"
    };
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportPayload, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `prepos_backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    setToastMessage("Data backup downloaded!");
    setTimeout(() => setToastMessage(""), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl rounded-3xl border border-white/10 bg-[#0c101d] p-6 md:p-8 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] text-slate-100 overflow-hidden">
        {/* Ambient Glow */}
        <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-48 w-96 rounded-full bg-cyan-600/15 blur-[100px]" />

        {/* Header */}
        <div className="flex items-start justify-between border-b border-white/10 pb-5 relative z-10">
          <div className="flex items-center gap-3.5">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/5 text-cyan-400 border border-white/10 shadow-inner">
              <Settings className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white tracking-tight">Preferences & Settings</h2>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                  PrepOS v1.0
                </span>
              </div>
              <p className="text-xs text-neutral-400 mt-0.5">Customize your IDE, daily prep targets, and platform preferences</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-white p-1.5 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1.5 mt-5 border-b border-white/10 pb-3 overflow-x-auto hide-scrollbar relative z-10">
          {[
            { id: "editor", label: "IDE & Editor", icon: Code2 },
            { id: "goals", label: "Prep Targets", icon: Target },
            { id: "notifications", label: "Audio & Alerts", icon: Bell },
            { id: "data", label: "Data & Storage", icon: Database },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? "bg-cyan-500 text-slate-950 shadow-[0_0_14px_rgba(6,182,212,0.5)]"
                    : "text-neutral-400 hover:text-white bg-white/5 hover:bg-white/10"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Modal Body */}
        <div className="mt-5 space-y-5 max-h-[58vh] overflow-y-auto pr-1 relative z-10 text-xs">
          {/* TAB 1: IDE & Editor */}
          {activeTab === "editor" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-neutral-300 font-semibold flex items-center gap-1.5">
                    <Terminal className="h-3.5 w-3.5 text-cyan-400" />
                    Default Solution Language
                  </label>
                  <select
                    value={settings.defaultLanguage}
                    onChange={(e) => updateSetting("defaultLanguage", e.target.value)}
                    className="w-full bg-slate-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-500 cursor-pointer"
                  >
                    <option value="javascript">JavaScript (ES6+)</option>
                    <option value="python">Python 3.11</option>
                    <option value="cpp">C++ (GCC 13)</option>
                    <option value="java">Java 21</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-neutral-300 font-semibold flex items-center gap-1.5">
                    <Palette className="h-3.5 w-3.5 text-indigo-400" />
                    Editor Font Size
                  </label>
                  <select
                    value={settings.editorFontSize}
                    onChange={(e) => updateSetting("editorFontSize", e.target.value)}
                    className="w-full bg-slate-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-500 cursor-pointer"
                  >
                    <option value="12px">12px (Compact)</option>
                    <option value="13px">13px (Default)</option>
                    <option value="14px">14px (Medium)</option>
                    <option value="16px">16px (Large)</option>
                    <option value="18px">18px (Extra Large)</option>
                    <option value="20px">20px (Huge)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-neutral-300 font-semibold">Keybinding Emulation</label>
                  <select
                    value={settings.keybinding}
                    onChange={(e) => updateSetting("keybinding", e.target.value)}
                    className="w-full bg-slate-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-500 cursor-pointer"
                  >
                    <option value="standard">Standard (VSCode Default)</option>
                    <option value="vim">Vim Mode (hjkl navigation)</option>
                    <option value="emacs">Emacs</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-neutral-300 font-semibold">Indentation Tab Size</label>
                  <select
                    value={settings.tabSize}
                    onChange={(e) => updateSetting("tabSize", e.target.value)}
                    className="w-full bg-slate-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-500 cursor-pointer"
                  >
                    <option value="2">2 Spaces (Standard JS/TS)</option>
                    <option value="4">4 Spaces (Standard Python/C++)</option>
                  </select>
                </div>
              </div>

              <div className="p-4 rounded-2xl border border-white/10 bg-white/[0.02] space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-white">Auto-Close Brackets & Quotes</span>
                    <p className="text-[11px] text-neutral-400">Automatically pair (), [], {}, and "" in editor</p>
                  </div>
                  <button
                    onClick={() => updateSetting("autoCloseBrackets", !settings.autoCloseBrackets)}
                    className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                      settings.autoCloseBrackets ? "bg-cyan-500 justify-end" : "bg-white/10 justify-start"
                    }`}
                  >
                    <div className="bg-slate-950 w-4 h-4 rounded-full shadow-md transform" />
                  </button>
                </div>
              </div>

              {/* Live Preview Box */}
              <div className="rounded-2xl border border-cyan-500/20 bg-black/40 p-4 space-y-2">
                <div className="flex items-center justify-between text-[11px] text-neutral-400">
                  <span className="font-semibold text-cyan-300">Live Editor Size Preview ({settings.editorFontSize})</span>
                  <span className="text-[10px] font-mono text-neutral-500">Updates Sandbox In Realtime</span>
                </div>
                <div
                  className="p-3.5 rounded-xl bg-[#070b16] border border-white/10 font-mono text-slate-200 overflow-x-auto"
                  style={{ fontSize: settings.editorFontSize || "13px" }}
                >
                  <div className="text-neutral-500">// Live size test preview</div>
                  <div><span className="text-purple-400">function</span> <span className="text-cyan-400">solveProblem</span>(nums, target) &#123;</div>
                  <div className="pl-4 text-emerald-400">const map = new Map();</div>
                  <div className="pl-4 text-neutral-300"><span className="text-purple-400">return</span> map.get(target);</div>
                  <div>&#125;</div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Prep Targets */}
          {activeTab === "goals" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-neutral-300 font-semibold">Primary Target Company</label>
                  <select
                    value={settings.targetCompany}
                    onChange={(e) => updateSetting("targetCompany", e.target.value)}
                    className="w-full bg-slate-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-500 cursor-pointer"
                  >
                    <option value="Meta">Meta (Facebook)</option>
                    <option value="Google">Google</option>
                    <option value="OpenAI">OpenAI</option>
                    <option value="Amazon">Amazon</option>
                    <option value="Apple">Apple</option>
                    <option value="Netflix">Netflix</option>
                    <option value="Uber">Uber</option>
                    <option value="Stripe">Stripe</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-neutral-300 font-semibold">Seniority & Target Level</label>
                  <select
                    value={settings.targetLevel}
                    onChange={(e) => updateSetting("targetLevel", e.target.value)}
                    className="w-full bg-slate-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-500 cursor-pointer"
                  >
                    <option value="L4 - Mid Level Software Engineer">L4 - Mid Level Software Engineer</option>
                    <option value="L5 - Senior Software Engineer">L5 - Senior Software Engineer</option>
                    <option value="L6 - Staff / Principal Engineer">L6 - Staff / Principal Engineer</option>
                    <option value="Architect - Distributed Systems">Architect - Distributed Systems</option>
                  </select>
                </div>
              </div>

              <div className="p-4 rounded-2xl border border-white/10 bg-white/[0.02] space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-white">Daily Problem Target</span>
                    <span className="font-mono text-cyan-400 font-bold">{settings.dailyQuestionTarget} problems / day</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {[3, 5, 8].map((count) => (
                      <button
                        key={count}
                        onClick={() => updateSetting("dailyQuestionTarget", count)}
                        className={`py-2 rounded-xl border text-center transition-all ${
                          settings.dailyQuestionTarget === count
                            ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/40 font-bold"
                            : "bg-white/5 border-white/10 text-neutral-400 hover:text-white"
                        }`}
                      >
                        {count} Problems {count === 5 && "(Recommended)"}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="h-px bg-white/5" />

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-white">Streak Milestone Target</span>
                    <span className="font-mono text-amber-400 font-bold">{settings.streakMilestoneTarget} Days</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {[30, 60, 100].map((days) => (
                      <button
                        key={days}
                        onClick={() => updateSetting("streakMilestoneTarget", days)}
                        className={`py-2 rounded-xl border text-center transition-all ${
                          settings.streakMilestoneTarget === days
                            ? "bg-amber-500/20 text-amber-300 border-amber-500/40 font-bold"
                            : "bg-white/5 border-white/10 text-neutral-400 hover:text-white"
                        }`}
                      >
                        {days} Day Goal
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Audio & Alerts */}
          {activeTab === "notifications" && (
            <div className="space-y-3">
              <div className="p-4 rounded-2xl border border-white/10 bg-white/[0.02] space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-white flex items-center gap-1.5">
                      <Volume2 className="h-3.5 w-3.5 text-emerald-400" />
                      Test Case Sound Effects
                    </span>
                    <p className="text-[11px] text-neutral-400">Play audio chime on test case pass / execution finish</p>
                  </div>
                  <button
                    onClick={() => updateSetting("soundEffects", !settings.soundEffects)}
                    className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                      settings.soundEffects ? "bg-emerald-500 justify-end" : "bg-white/10 justify-start"
                    }`}
                  >
                    <div className="bg-slate-950 w-4 h-4 rounded-full shadow-md transform" />
                  </button>
                </div>

                <div className="h-px bg-white/5" />

                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-white flex items-center gap-1.5">
                      <Bell className="h-3.5 w-3.5 text-cyan-400" />
                      Daily Prep Reminders
                    </span>
                    <p className="text-[11px] text-neutral-400">Send in-app reminder notifications for daily streak</p>
                  </div>
                  <button
                    onClick={() => updateSetting("dailyReminderNotification", !settings.dailyReminderNotification)}
                    className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                      settings.dailyReminderNotification ? "bg-cyan-500 justify-end" : "bg-white/10 justify-start"
                    }`}
                  >
                    <div className="bg-slate-950 w-4 h-4 rounded-full shadow-md transform" />
                  </button>
                </div>

                <div className="h-px bg-white/5" />

                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-white flex items-center gap-1.5">
                      <Sparkles className="h-3.5 w-3.5 text-purple-400" />
                      Auto Suggestions
                    </span>
                    <p className="text-[11px] text-neutral-400">Provide complexity hints and trade-off tips while coding</p>
                  </div>
                  <button
                    onClick={() => updateSetting("aiTutorSuggestions", !settings.aiTutorSuggestions)}
                    className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                      settings.aiTutorSuggestions ? "bg-purple-500 justify-end" : "bg-white/10 justify-start"
                    }`}
                  >
                    <div className="bg-slate-950 w-4 h-4 rounded-full shadow-md transform" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Data & Storage */}
          {activeTab === "data" && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl border border-white/10 bg-white/[0.02] space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <ShieldCheck className="h-5 w-5 text-emerald-400" />
                    <div>
                      <span className="font-semibold text-white">Local Storage & Privacy</span>
                      <p className="text-[11px] text-neutral-400">All data stored locally in your browser.</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    Offline Ready
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={handleExportData}
                  className="flex items-center justify-center gap-2 p-3.5 rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-cyan-500/30 text-slate-200 transition-all"
                >
                  <Download className="h-4 w-4 text-cyan-400" />
                  <span>Export Prep Data (JSON)</span>
                </button>

                <button
                  onClick={handleResetProgress}
                  className="flex items-center justify-center gap-2 p-3.5 rounded-2xl border border-rose-500/20 bg-rose-500/5 hover:bg-rose-500/15 hover:border-rose-500/40 text-rose-300 transition-all"
                >
                  <Trash2 className="h-4 w-4 text-rose-400" />
                  <span>Reset Local Progress</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between relative z-10">
          <div>
            {toastMessage ? (
              <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                <Check className="h-4 w-4" />
                {toastMessage}
              </span>
            ) : (
              <span className="text-[11px] text-neutral-500">Preferences auto-save on change</span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-medium text-neutral-300 hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-all shadow-[0_0_16px_rgba(34,211,238,0.6)]"
            >
              <Check className="h-3.5 w-3.5 stroke-[2.5]" />
              Save & Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
