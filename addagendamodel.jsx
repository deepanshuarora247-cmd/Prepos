import React, { useState } from "react";
import { X, Plus, ChevronDown } from "lucide-react";

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
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <style>{`
        select option {
          background-color: #0a0e1a;
          color: #e2e8f0;
          padding: 8px;
        }
        select option:hover {
          background-color: #1e293b;
        }
        select option:checked {
          background-color: #4f46e5;
          color: #ffffff;
        }
      `}</style>
      <div
        className="relative rounded-3xl border border-indigo-500/20 bg-[#0a0e1a] backdrop-blur-2xl shadow-[0_25px_60px_-15px_rgba(99,102,241,0.3)] w-full max-w-md max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ambient Glows */}
        <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 h-44 w-80 rounded-full bg-indigo-600/25 blur-[90px]" />
        <div className="pointer-events-none absolute -bottom-20 right-0 h-40 w-40 rounded-full bg-cyan-600/15 blur-[80px]" />

        <div className="p-8 relative z-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-100">Add New Event</h2>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="p-2 rounded-full border border-white/10 bg-white/5 text-neutral-400 hover:text-slate-100 hover:border-white/20 transition-colors cursor-pointer"
              title="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Event Title */}
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-2 uppercase tracking-wide">
                Event Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Mock Interview"
                className="w-full px-4 py-2.5 rounded-lg border border-white/10 bg-white/5 text-slate-100 placeholder-neutral-500 focus:border-cyan-400/50 focus:bg-white/[0.08] focus:outline-none transition-colors text-sm"
              />
            </div>

            {/* Person Name */}
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-2 uppercase tracking-wide">
                With
              </label>
              <input
                type="text"
                name="withWho"
                value={formData.withWho}
                onChange={handleChange}
                placeholder="e.g., John Doe"
                className="w-full px-4 py-2.5 rounded-lg border border-white/10 bg-white/5 text-slate-100 placeholder-neutral-500 focus:border-cyan-400/50 focus:bg-white/[0.08] focus:outline-none transition-colors text-sm"
              />
            </div>

            {/* Date */}
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-2 uppercase tracking-wide">
                Date
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-white/10 bg-white/5 text-slate-100 focus:border-cyan-400/50 focus:bg-white/[0.08] focus:outline-none transition-colors text-sm"
              />
            </div>

            {/* Time */}
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-2 uppercase tracking-wide">
                Time
              </label>
              <input
                type="text"
                name="time"
                value={formData.time}
                onChange={handleChange}
                placeholder="e.g., 2:00 PM"
                className="w-full px-4 py-2.5 rounded-lg border border-white/10 bg-white/5 text-slate-100 placeholder-neutral-500 focus:border-cyan-400/50 focus:bg-white/[0.08] focus:outline-none transition-colors text-sm"
              />
            </div>

            {/* Event Type - Custom Dropdown */}
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-2 uppercase tracking-wide">
                Event Type
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsTypeDropdownOpen(!isTypeDropdownOpen)}
                  className="w-full px-4 py-2.5 rounded-lg border border-white/10 bg-white/5 text-slate-100 focus:border-cyan-400/50 focus:bg-white/[0.08] focus:outline-none transition-colors text-sm flex items-center justify-between hover:border-white/20 hover:bg-white/[0.08]"
                >
                  <span className={formData.type === "Select" ? "text-neutral-400" : "text-slate-100"}>
                    {formData.type}
                  </span>
                  <ChevronDown className={`h-4 w-4 text-neutral-400 transition-transform ${isTypeDropdownOpen ? 'rotate-180' : ''}`} />
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

            {/* Error Message */}
            {error && (
              <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs">
                {error}
              </div>
            )}

            {/* Buttons */}
            <div className="flex gap-3 pt-5">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2.5 rounded-lg border border-white/10 bg-white/5 text-neutral-300 hover:text-slate-100 hover:border-white/20 transition-colors font-medium text-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-indigo-500 hover:bg-indigo-400 text-white font-medium text-sm transition-colors shadow-[0_0_20px_-4px_rgba(99,102,241,0.5)]"
              >
                <Plus className="h-4 w-3" />
                Add Event
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
