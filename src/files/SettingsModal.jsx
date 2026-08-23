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
import "./SettingsModal.css";

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
    <div className="settings-modal-backdrop" onClick={onClose}>
      <div className="settings-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Ambient Glow */}
        <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-48 w-96 rounded-full bg-cyan-600/15 blur-[100px]" />

        {/* Header */}
        <div className="settings-modal-header">
          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <div className="q-solve-btn" style={{ padding: "0.5rem", borderRadius: "0.75rem", backgroundColor: "var(--cyan-bg)", color: "var(--cyan-accent)", borderColor: "var(--cyan-border)" }}>
              <Settings className="h-5 w-5" />
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <h2 style={{ fontSize: "1.125rem", fontWeight: "bold", color: "#fff", margin: 0 }}>Preferences & Settings</h2>
                <span className="popover-header-badge" style={{ color: "var(--cyan-accent)", backgroundColor: "var(--cyan-bg)", borderColor: "var(--cyan-border)" }}>PrepOS v1.0</span>
              </div>
              <p style={{ fontSize: "11px", color: "var(--text-muted)", margin: 0 }}>Customize your IDE, daily targets, and preferences</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="settings-modal-close-btn"
            style={{ border: "none", background: "none" }}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="categories-nav" style={{ gap: "0.75rem", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "0.5rem" }}>
          {[
            { id: "editor", label: "IDE & Editor", icon: Code2 },
            { id: "goals", label: "Prep Targets", icon: Target },
            { id: "notifications", label: "Audio & Alerts", icon: Bell },
            { id: "data", label: "Data & Storage", icon: Database },
          ].map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`category-tab ${active ? "active" : ""}`}
                style={{ fontSize: "11px", paddingBottom: "0.25rem" }}
              >
                {tab.label}
                {active && <div className="category-indicator" />}
              </button>
            );
          })}
        </div>

        {/* Modal Body */}
        <div className="settings-scroll-body">
          {/* TAB 1: IDE & Editor */}
          {activeTab === "editor" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div className="sysdesign-nodes-grid" style={{ gap: "1rem" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                  <label className="resume-field-lbl" style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                    <Terminal className="h-3.5 w-3.5 text-cyan-400" /> Solution Language
                  </label>
                  <select
                    value={settings.defaultLanguage}
                    onChange={(e) => updateSetting("defaultLanguage", e.target.value)}
                    className="bg-slate-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500 cursor-pointer"
                  >
                    <option value="javascript">JavaScript (ES6+)</option>
                    <option value="python">Python 3.11</option>
                    <option value="cpp">C++ (GCC 13)</option>
                    <option value="java">Java 21</option>
                  </select>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                  <label className="resume-field-lbl" style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                    <Palette className="h-3.5 w-3.5 text-indigo-400" /> Editor Font Size
                  </label>
                  <select
                    value={settings.editorFontSize}
                    onChange={(e) => updateSetting("editorFontSize", e.target.value)}
                    className="bg-slate-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500 cursor-pointer"
                  >
                    <option value="12px">12px (Compact)</option>
                    <option value="13px">13px (Default)</option>
                    <option value="14px">14px (Medium)</option>
                    <option value="16px">16px (Large)</option>
                  </select>
                </div>
              </div>

              <div className="sysdesign-nodes-grid" style={{ gap: "1rem" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                  <label className="resume-field-lbl">Keybinding Emulation</label>
                  <select
                    value={settings.keybinding}
                    onChange={(e) => updateSetting("keybinding", e.target.value)}
                    className="bg-slate-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500 cursor-pointer"
                  >
                    <option value="standard">Standard (VSCode)</option>
                    <option value="vim">Vim Mode</option>
                    <option value="emacs">Emacs</option>
                  </select>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                  <label className="resume-field-lbl">Indentation Tab Size</label>
                  <select
                    value={settings.tabSize}
                    onChange={(e) => updateSetting("tabSize", e.target.value)}
                    className="bg-slate-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500 cursor-pointer"
                  >
                    <option value="2">2 Spaces</option>
                    <option value="4">4 Spaces</option>
                  </select>
                </div>
              </div>

              <div className="practice-streak-card" style={{ padding: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <span style={{ fontSize: "12px", color: "#fff", fontWeight: "bold" }}>Auto-Close Brackets & Quotes</span>
                  <p style={{ fontSize: "10px", color: "var(--text-muted)", margin: 0 }}>Automatically pair brackets and quotes</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.autoCloseBrackets}
                  onChange={(e) => updateSetting("autoCloseBrackets", e.target.checked)}
                  className="h-4 w-4 rounded border-white/20 bg-slate-900 text-indigo-500 focus:ring-indigo-500 cursor-pointer"
                />
              </div>

              {/* Live Preview Box */}
              <div className="practice-streak-card" style={{ padding: "1rem" }}>
                <span className="behavioral-rewrite-header" style={{ color: "var(--cyan-accent)", marginBottom: "0.5rem" }}>Live Editor Preview ({settings.editorFontSize})</span>
                <pre style={{
                  padding: "0.75rem",
                  borderRadius: "0.75rem",
                  backgroundColor: "rgba(0,0,0,0.4)",
                  border: "1px solid var(--panel-border)",
                  fontFamily: "var(--font-mono)",
                  fontSize: settings.editorFontSize || "13px",
                  color: "#cbd5e1",
                  margin: 0
                }}>
                  {`// Live syntax size test\nfunction solveProblem(nums, target) {\n  const map = new Map();\n  return map.get(target);\n}`}
                </pre>
              </div>
            </div>
          )}

          {/* TAB 2: Prep Targets */}
          {activeTab === "goals" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div className="sysdesign-nodes-grid" style={{ gap: "1rem" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                  <label className="resume-field-lbl">Target Tech Company</label>
                  <select
                    value={settings.targetCompany}
                    onChange={(e) => updateSetting("targetCompany", e.target.value)}
                    className="bg-slate-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500 cursor-pointer"
                  >
                    <option value="Meta">Meta (Facebook)</option>
                    <option value="Google">Google</option>
                    <option value="OpenAI">OpenAI</option>
                    <option value="Amazon">Amazon</option>
                  </select>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                  <label className="resume-field-lbl">Target Level / Seniority</label>
                  <select
                    value={settings.targetLevel}
                    onChange={(e) => updateSetting("targetLevel", e.target.value)}
                    className="bg-slate-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500 cursor-pointer"
                  >
                    <option value="L4 - Software Engineer II">L4 - Software Engineer II</option>
                    <option value="L5 - Senior Software Engineer">L5 - Senior Software Engineer</option>
                    <option value="L6 - Staff Engineer">L6 - Staff Engineer</option>
                  </select>
                </div>
              </div>

              <div className="practice-streak-card" style={{ padding: "1rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div>
                  <span style={{ fontSize: "12px", color: "#fff", fontWeight: "bold" }}>Daily Problem Target</span>
                  <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
                    {[3, 5, 8].map((count) => (
                      <button
                        key={count}
                        onClick={() => updateSetting("dailyQuestionTarget", count)}
                        className="sandbox-back-btn"
                        style={{ flex: 1, color: settings.dailyQuestionTarget === count ? "var(--cyan-accent)" : undefined }}
                      >
                        {count} Problems
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <span style={{ fontSize: "12px", color: "#fff", fontWeight: "bold" }}>Streak Milestone Target</span>
                  <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
                    {[30, 60, 100].map((days) => (
                      <button
                        key={days}
                        onClick={() => updateSetting("streakMilestoneTarget", days)}
                        className="sandbox-back-btn"
                        style={{ flex: 1, color: settings.streakMilestoneTarget === days ? "var(--amber-accent)" : undefined }}
                      >
                        {days} Days Goal
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Audio & Alerts */}
          {activeTab === "notifications" && (
            <div className="practice-streak-card" style={{ padding: "1.25rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <span style={{ fontSize: "12px", color: "#fff", fontWeight: "bold" }}>Test Case Sound Effects</span>
                  <p style={{ fontSize: "10px", color: "var(--text-muted)", margin: 0 }}>Play audio chime on test case pass</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.soundEffects}
                  onChange={(e) => updateSetting("soundEffects", e.target.checked)}
                  className="h-4 w-4 rounded border-white/20 bg-slate-900 text-indigo-500 focus:ring-indigo-500 cursor-pointer"
                />
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "1rem" }}>
                <div>
                  <span style={{ fontSize: "12px", color: "#fff", fontWeight: "bold" }}>Daily Prep Reminders</span>
                  <p style={{ fontSize: "10px", color: "var(--text-muted)", margin: 0 }}>Send in-app reminder alerts for daily streak</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.dailyReminderNotification}
                  onChange={(e) => updateSetting("dailyReminderNotification", e.target.checked)}
                  className="h-4 w-4 rounded border-white/20 bg-slate-900 text-indigo-500 focus:ring-indigo-500 cursor-pointer"
                />
              </div>
            </div>
          )}

          {/* TAB 4: Data & Storage */}
          {activeTab === "data" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div className="practice-streak-card" style={{ padding: "1rem" }}>
                <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                  <ShieldCheck className="h-5 w-5 text-emerald-400" />
                  <div>
                    <span style={{ fontSize: "12px", color: "#fff", fontWeight: "bold" }}>Local Storage & Security</span>
                    <p style={{ fontSize: "10px", color: "var(--text-muted)", margin: 0 }}>All user settings are compiled offline inside localStorage.</p>
                  </div>
                </div>
              </div>

              <div className="sysdesign-nodes-grid" style={{ gap: "1rem" }}>
                <button
                  onClick={handleExportData}
                  className="sandbox-back-btn"
                  style={{ display: "inline-flex", gap: "0.5rem", padding: "1rem", justifyContent: "center" }}
                >
                  <Download className="h-4 w-4 text-cyan-400" /> Export Backup (JSON)
                </button>

                <button
                  onClick={handleResetProgress}
                  className="ide-reset-btn"
                  style={{ display: "inline-flex", gap: "0.5rem", padding: "1rem", justifyContent: "center" }}
                >
                  <Trash2 className="h-4 w-4 text-rose-400" /> Reset Local Progress
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--panel-border)", paddingTop: "1rem" }}>
          <div>
            {toastMessage ? (
              <span style={{ fontSize: "11px", color: "var(--emerald-accent)", fontWeight: "bold" }}>{toastMessage}</span>
            ) : (
              <span className="ide-example-label">Auto-saves on modify</span>
            )}
          </div>

          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button
              onClick={onClose}
              className="sandbox-back-btn"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="sysdesign-audit-btn"
            >
              Save & Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
