import React, { useState, useEffect } from "react";
import {
  User,
  X,
  Target,
  Briefcase,
  Building2,
  Sparkles,
  ShieldCheck,
  Award,
  Github,
  Linkedin,
  Plus,
  Trash2,
  Save,
  Flame,
  CheckCircle2,
  Trophy,
  ExternalLink,
  Palette
} from "lucide-react";
import "./ProfileModal.css";

export const AVATAR_GRADIENTS = [
  { id: "sunset", label: "Cyber Sunset", value: "linear-gradient(135deg, #fb923c, #ec4899)" },
  { id: "neon-cyan", label: "Neon Cyan", value: "linear-gradient(135deg, #06b6d4, #3b82f6)" },
  { id: "emerald", label: "Matrix Emerald", value: "linear-gradient(135deg, #10b981, #06b6d4)" },
  { id: "violet", label: "Deep Violet", value: "linear-gradient(135deg, #8b5cf6, #ec4899)" },
  { id: "solar", label: "Solar Flare", value: "linear-gradient(135deg, #eab308, #ef4444)" },
  { id: "cosmic", label: "Cosmic Indigo", value: "linear-gradient(135deg, #6366f1, #a855f7)" }
];

export const DEFAULT_PROFILE = {
  name: "Deepanshu Arora",
  headline: "Senior Full-Stack Engineer",
  targetCompany: "Meta",
  targetLevel: "L5 - Senior Software Engineer",
  bio: "Preparing for Tier-1 engineering interview loops. Focusing on distributed systems scalability, graph traversal patterns, and behavioral STAR stories.",
  github: "github.com/deepanshu-dev",
  linkedin: "linkedin.com/in/deepanshu-arora",
  avatarGradient: "linear-gradient(135deg, #fb923c, #ec4899)",
  skills: ["React 18", "TypeScript", "Node.js", "System Design", "Dynamic Programming", "Python"],
  streakDays: 14,
  solvedCount: 142,
  rank: 42,
  readinessScore: 84
};

export default function ProfileModal({ isOpen, onClose, profile, onUpdateProfile, onNavigate }) {
  const [formData, setFormData] = useState(DEFAULT_PROFILE);
  const [activeTab, setActiveTab] = useState("general");
  const [newSkill, setNewSkill] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    if (profile) {
      setFormData({ ...DEFAULT_PROFILE, ...profile });
    }
  }, [profile, isOpen]);

  if (!isOpen) return null;

  const handleChange = (field, val) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
  };

  const handleAddSkill = (e) => {
    e.preventDefault();
    const trimmed = newSkill.trim();
    if (trimmed && !formData.skills.includes(trimmed)) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, trimmed]
      }));
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skillToRemove)
    }));
  };

  const handleSave = () => {
    onUpdateProfile(formData);
    setToastMessage("Profile updated successfully!");
    setTimeout(() => {
      setToastMessage("");
      onClose();
    }, 800);
  };

  // Get 2-character initials
  const initials = (formData.name || "User")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="profile-modal-backdrop" onClick={onClose}>
      <div className="profile-modal-card" onClick={(e) => e.stopPropagation()}>
        
        {/* Glow Element */}
        <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-48 w-96 rounded-full bg-cyan-600/15 blur-[100px]" />

        {/* Modal Header */}
        <div className="profile-modal-header">
          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <div
              className="q-solve-btn"
              style={{
                padding: "0.5rem",
                borderRadius: "0.75rem",
                backgroundColor: "var(--cyan-bg)",
                color: "var(--cyan-accent)",
                borderColor: "var(--cyan-border)"
              }}
            >
              <User className="h-5 w-5" />
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <h2 style={{ fontSize: "1.125rem", fontWeight: "bold", color: "#fff", margin: 0 }}>
                  Candidate Profile
                </h2>
                <span
                  className="popover-header-badge"
                  style={{
                    color: "var(--cyan-accent)",
                    backgroundColor: "var(--cyan-bg)",
                    borderColor: "var(--cyan-border)"
                  }}
                >
                  PrepOS Verified
                </span>
              </div>
              <p style={{ fontSize: "11px", color: "var(--text-muted)", margin: 0 }}>
                Manage your candidate persona, target roles, and interview readiness
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="profile-modal-close-btn"
            title="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Hero Card Preview */}
        <div className="profile-hero-card">
          <div className="profile-hero-glow" />
          <div
            className="profile-avatar-large"
            style={{ background: formData.avatarGradient || DEFAULT_PROFILE.avatarGradient }}
          >
            {initials}
            <span className="profile-avatar-badge" title="Status: Online & Ready" />
          </div>

          <div className="profile-hero-meta">
            <h3 className="profile-hero-name">
              {formData.name || "Anonymous Engineer"}
              <span className="popover-header-badge" style={{ color: "#38bdf8", borderColor: "rgba(56,189,248,0.3)" }}>
                {formData.targetCompany || "Meta"} Candidate
              </span>
            </h3>
            <p className="profile-hero-headline">{formData.headline || "Software Engineer"}</p>
            <div className="profile-hero-tags">
              <span className="profile-tag highlight">🎯 {formData.targetLevel || "L5 Senior"}</span>
              <span className="profile-tag">🔥 {formData.streakDays || 14}d Streak</span>
              <span className="profile-tag">⚡ Readiness {formData.readinessScore || 84}%</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="categories-nav" style={{ gap: "0.75rem", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "0.5rem", marginBottom: "0.5rem" }}>
          {[
            { id: "general", label: "Details & Bio", icon: User },
            { id: "goals", label: "Target Goals", icon: Target },
            { id: "skills", label: "Skills & Style", icon: Palette },
            { id: "badges", label: "Achievements", icon: Award }
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

        {/* Body Content */}
        <div className="profile-scroll-body">
          {activeTab === "general" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div className="profile-form-grid">
                <div className="profile-field">
                  <label>Full Display Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    placeholder="e.g. Rakshit Sharma"
                  />
                </div>

                <div className="profile-field">
                  <label>Professional Headline</label>
                  <input
                    type="text"
                    value={formData.headline}
                    onChange={(e) => handleChange("headline", e.target.value)}
                    placeholder="e.g. Senior Frontend / Full-Stack Engineer"
                  />
                </div>
              </div>

              <div className="profile-field">
                <label>Candidate Bio & Prep Summary</label>
                <textarea
                  rows={3}
                  value={formData.bio}
                  onChange={(e) => handleChange("bio", e.target.value)}
                  placeholder="Share a short bio summarizing your key strengths and focus areas..."
                />
              </div>

              <div className="profile-form-grid">
                <div className="profile-field">
                  <label><Github className="h-3 w-3 text-cyan-400" /> GitHub Profile</label>
                  <input
                    type="text"
                    value={formData.github}
                    onChange={(e) => handleChange("github", e.target.value)}
                    placeholder="github.com/username"
                  />
                </div>

                <div className="profile-field">
                  <label><Linkedin className="h-3 w-3 text-indigo-400" /> LinkedIn Profile</label>
                  <input
                    type="text"
                    value={formData.linkedin}
                    onChange={(e) => handleChange("linkedin", e.target.value)}
                    placeholder="linkedin.com/in/username"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === "goals" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <div className="profile-form-grid">
                <div className="profile-field">
                  <label><Building2 className="h-3 w-3 text-indigo-400" /> Target Company</label>
                  <select
                    value={formData.targetCompany}
                    onChange={(e) => handleChange("targetCompany", e.target.value)}
                  >
                    <option value="Meta">Meta (Facebook)</option>
                    <option value="Google">Google</option>
                    <option value="OpenAI">OpenAI</option>
                    <option value="Amazon">Amazon AWS</option>
                    <option value="Microsoft">Microsoft</option>
                    <option value="Apple">Apple</option>
                    <option value="Netflix">Netflix</option>
                  </select>
                </div>

                <div className="profile-field">
                  <label><Briefcase className="h-3 w-3 text-cyan-400" /> Target Level / Seniority</label>
                  <select
                    value={formData.targetLevel}
                    onChange={(e) => handleChange("targetLevel", e.target.value)}
                  >
                    <option value="L3 - Junior Software Engineer">L3 - Junior Software Engineer</option>
                    <option value="L4 - Software Engineer II">L4 - Software Engineer II</option>
                    <option value="L5 - Senior Software Engineer">L5 - Senior Software Engineer</option>
                    <option value="L6 - Staff Engineer">L6 - Staff Engineer</option>
                    <option value="Principal / Architect">Principal / Architect</option>
                  </select>
                </div>
              </div>

              {/* Stats Grid */}
              <div>
                <span style={{ fontSize: "11px", fontWeight: "600", color: "#cbd5e1", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Current Performance Metrics
                </span>
                <div className="profile-stats-grid" style={{ marginTop: "0.5rem" }}>
                  <div className="profile-stat-box">
                    <span className="profile-stat-box-val" style={{ color: "var(--amber-accent)" }}>
                      {formData.streakDays} Days
                    </span>
                    <span className="profile-stat-box-lbl">Active Streak</span>
                  </div>
                  <div className="profile-stat-box">
                    <span className="profile-stat-box-val" style={{ color: "var(--cyan-accent)" }}>
                      {formData.solvedCount}
                    </span>
                    <span className="profile-stat-box-lbl">DSA Solved</span>
                  </div>
                  <div className="profile-stat-box">
                    <span className="profile-stat-box-val" style={{ color: "var(--indigo-accent)" }}>
                      #{formData.rank}
                    </span>
                    <span className="profile-stat-box-lbl">Global Rank</span>
                  </div>
                  <div className="profile-stat-box">
                    <span className="profile-stat-box-val" style={{ color: "var(--emerald-accent)" }}>
                      {formData.readinessScore}%
                    </span>
                    <span className="profile-stat-box-lbl">Interview Ready</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "skills" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {/* Avatar Color Themes */}
              <div className="profile-field">
                <label><Palette className="h-3 w-3 text-purple-400" /> Avatar Hologram Gradient</label>
                <div className="avatar-theme-picker">
                  {AVATAR_GRADIENTS.map((g) => (
                    <button
                      key={g.id}
                      type="button"
                      onClick={() => handleChange("avatarGradient", g.value)}
                      className={`avatar-theme-option ${formData.avatarGradient === g.value ? "selected" : ""}`}
                      style={{ background: g.value }}
                      title={g.label}
                    />
                  ))}
                </div>
              </div>

              {/* Skills Editor */}
              <div className="profile-field">
                <label>Focus Skills & Competencies</label>
                <form onSubmit={handleAddSkill} style={{ display: "flex", gap: "0.5rem", marginTop: "0.25rem" }}>
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Add a new skill (e.g. Distributed Caching, Redis, Graphs)..."
                    style={{ flex: 1 }}
                  />
                  <button
                    type="submit"
                    className="sandbox-back-btn"
                    style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem", whiteSpace: "nowrap" }}
                  >
                    <Plus className="h-3.5 w-3.5" /> Add
                  </button>
                </form>

                <div className="profile-skills-wrap">
                  {formData.skills.map((skill) => (
                    <span key={skill} className="profile-skill-chip">
                      {skill}
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(skill)}
                        title="Remove skill"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "badges" && (
            <div>
              <span style={{ fontSize: "11px", fontWeight: "600", color: "#cbd5e1", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Unlocked Prep Badges & Trophies
              </span>
              <div className="profile-badges-grid">
                <div className="profile-badge-item">
                  <span className="profile-badge-icon">🔥</span>
                  <span className="profile-badge-name">14-Day Streak</span>
                  <span className="profile-badge-desc">Consistent practice</span>
                </div>
                <div className="profile-badge-item">
                  <span className="profile-badge-icon">🧠</span>
                  <span className="profile-badge-name">DP Master</span>
                  <span className="profile-badge-desc">Solved 30+ DP problems</span>
                </div>
                <div className="profile-badge-item">
                  <span className="profile-badge-icon">🌐</span>
                  <span className="profile-badge-name">Architect L5</span>
                  <span className="profile-badge-desc">9 System designs audited</span>
                </div>
                <div className="profile-badge-item">
                  <span className="profile-badge-icon">🎤</span>
                  <span className="profile-badge-name">STAR Storyteller</span>
                  <span className="profile-badge-desc">22 Behavioral mocks</span>
                </div>
                <div className="profile-badge-item">
                  <span className="profile-badge-icon">📄</span>
                  <span className="profile-badge-name">ATS 90+ Score</span>
                  <span className="profile-badge-desc">Top resume optimization</span>
                </div>
                <div className="profile-badge-item">
                  <span className="profile-badge-icon">⚡</span>
                  <span className="profile-badge-name">Quick Solver</span>
                  <span className="profile-badge-desc">Median runtime &lt; 15m</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--panel-border)", paddingTop: "1rem" }}>
          <div>
            {toastMessage ? (
              <span style={{ fontSize: "12px", color: "var(--emerald-accent)", fontWeight: "bold" }}>
                ✓ {toastMessage}
              </span>
            ) : (
              <span className="ide-example-label">Candidate identity syncs locally</span>
            )}
          </div>

          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button onClick={onClose} className="sandbox-back-btn">
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="sysdesign-audit-btn"
              style={{ display: "inline-flex", alignItems: "center", gap: "0.375rem" }}
            >
              <Save className="h-4 w-4" /> Save Profile
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
