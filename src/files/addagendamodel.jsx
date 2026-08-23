import React, { useState } from "react";
import { X, Plus, ChevronDown } from "lucide-react";
import "./addagendamodel.css";

const EVENT_TYPES = [
  { label: "Technical", color: "text-indigo-300 bg-indigo-500/10 border-indigo-500/20", avatarColor: "bg-indigo-500" },
  { label: "Career", color: "text-amber-300 bg-amber-500/10 border-amber-500/20", avatarColor: "bg-amber-500" },
  { label: "System Design", color: "text-purple-300 bg-purple-500/10 border-purple-500/20", avatarColor: "bg-purple-500" },
  { label: "Behavioral", color: "text-rose-300 bg-rose-500/10 border-rose-500/20", avatarColor: "bg-rose-500" },
  { label: "Practice", color: "text-green-300 bg-green-500/10 border-green-500/20", avatarColor: "bg-green-500" },
  { label: "Aptitude", color: "text-cyan-300 bg-cyan-500/10 border-cyan-500/20", avatarColor: "bg-cyan-500" },
];

export default function AddAgendaModal({ isOpen, onClose, onAddEvent }) {
  const [formData, setFormData] = useState({
    title: "",
    withWho: "",
    date: "",
    time: "",
    type: "Select",
  });

  const [error, setError] = useState("");
  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleTypeSelect = (type) => {
    setFormData((prev) => ({
      ...prev,
      type,
    }));
    setIsTypeDropdownOpen(false);
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.title.trim() ||
      !formData.withWho.trim() ||
      !formData.date ||
      !formData.time.trim() ||
      !formData.type ||
      formData.type === "Select"
    ) {
      setError("Please fill in all fields and select an event type");
      return;
    }

    const selectedType = EVENT_TYPES.find((t) => t.label === formData.type) || {
      color: "text-indigo-300 bg-indigo-500/10 border-indigo-500/20",
      avatarColor: "bg-indigo-500",
    };

    const newEvent = {
      id: `event-${Date.now()}`,
      title: formData.title,
      withWho: formData.withWho,
      date: formData.date,
      time: formData.time,
      type: formData.type,
      typeColor: selectedType.color,
      avatarColor: selectedType.avatarColor,
    };

    onAddEvent(newEvent);
    setFormData({
      title: "",
      withWho: "",
      date: "",
      time: "",
      type: "Select",
    });
  };

  if (!isOpen) return null;

  return (
    <div className="agenda-modal-backdrop" onClick={onClose}>
      <div className="agenda-modal-card" onClick={(e) => e.stopPropagation()}>
        
        <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 h-44 w-80 rounded-full bg-indigo-600/25 blur-[90px]" />

        <div className="agenda-modal-header">
          <h2>Add New Event</h2>
          <button
            type="button"
            onClick={onClose}
            className="agenda-modal-close-btn"
            style={{ border: "none", background: "none" }}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="agenda-modal-form">
          <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
            <label className="resume-field-lbl">Event Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Mock Interview"
              className="resume-input-text"
              style={{ padding: "0.5rem" }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
            <label className="resume-field-lbl">With</label>
            <input
              type="text"
              name="withWho"
              value={formData.withWho}
              onChange={handleChange}
              placeholder="e.g., John Doe"
              className="resume-input-text"
              style={{ padding: "0.5rem" }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
            <label className="resume-field-lbl">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="resume-input-text"
              style={{ padding: "0.5rem" }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
            <label className="resume-field-lbl">Time</label>
            <input
              type="text"
              name="time"
              value={formData.time}
              onChange={handleChange}
              placeholder="e.g., 2:00 PM"
              className="resume-input-text"
              style={{ padding: "0.5rem" }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
            <label className="resume-field-lbl">Event Type</label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsTypeDropdownOpen(!isTypeDropdownOpen)}
                className="resume-input-text"
                style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", padding: "0.5rem", background: "rgba(255,255,255,0.05)" }}
              >
                <span style={{ color: formData.type === "Select" ? "var(--text-muted)" : "#fff" }}>
                  {formData.type}
                </span>
                <ChevronDown className="h-4 w-4 text-neutral-400" />
              </button>

              {isTypeDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 rounded-xl border border-indigo-500/30 bg-[#0f1419]/95 backdrop-blur-xl shadow-[0_15px_35px_-5px_rgba(0,0,0,0.8)] z-20 max-h-48 overflow-y-auto">
                  <button
                    type="button"
                    onClick={() => handleTypeSelect("Select")}
                    className="w-full text-left px-4 py-2.5 text-sm text-neutral-400 hover:bg-white/10 hover:text-slate-100 transition-colors first:rounded-t-xl border-b border-white/5"
                  >
                    Select
                  </button>
                  {EVENT_TYPES.map((type) => (
                    <button
                      key={type.label}
                      type="button"
                      onClick={() => handleTypeSelect(type.label)}
                      className="w-full text-left px-4 py-2.5 text-sm text-slate-100 hover:bg-indigo-600/20 hover:text-indigo-200 transition-colors last:rounded-b-xl border-b border-white/5 last:border-b-0"
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {error && (
            <div className="popover-body" style={{ color: "var(--rose-accent)", padding: "0.5rem 1rem" }}>
              {error}
            </div>
          )}

          <div style={{ display: "flex", gap: "0.75rem", marginTop: "1rem" }}>
            <button
              type="button"
              onClick={onClose}
              className="sandbox-back-btn"
              style={{ flex: 1 }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="sysdesign-audit-btn"
              style={{ flex: 1, padding: "0.5rem" }}
            >
              Add Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
