import React, { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import "./CalendarModal.css";

// Generate events for upcoming dates
const generateCalendarEvents = () => {
  const today = new Date();
  const events = {};

  const eventTemplates = [
    {
      title: "Mock Technical — Backend",
      withWho: "Priya S.",
      time: "10:30 AM",
      type: "Technical",
      typeColor: "text-indigo-300 bg-indigo-500/10 border-indigo-500/20",
      avatarColor: "bg-indigo-500",
    },
    {
      title: "Resume Review Sync",
      withWho: "Alex M.",
      time: "2:00 PM",
      type: "Career",
      typeColor: "text-amber-300 bg-amber-500/10 border-amber-500/20",
      avatarColor: "bg-amber-500",
    },
    {
      title: "System Design Practice",
      withWho: "Karan R.",
      time: "4:15 PM",
      type: "System Design",
      typeColor: "text-purple-300 bg-purple-500/10 border-purple-500/20",
      avatarColor: "bg-purple-500",
    },
    {
      title: "Behavioral Mock Interview",
      withWho: "Sarah K.",
      time: "9:00 AM",
      type: "Behavioral",
      typeColor: "text-rose-300 bg-rose-500/10 border-rose-500/20",
      avatarColor: "bg-rose-500",
    },
    {
      title: "Code Review Session",
      withWho: "Mike P.",
      time: "3:00 PM",
      type: "Technical",
      typeColor: "text-indigo-300 bg-indigo-500/10 border-indigo-500/20",
      avatarColor: "bg-indigo-500",
    },
    {
      title: "Aptitude Test",
      withWho: "John D.",
      time: "11:00 AM",
      type: "Aptitude",
      typeColor: "text-cyan-300 bg-cyan-500/10 border-cyan-500/20",
      avatarColor: "bg-cyan-500",
    },
    {
      title: "DSA Problem Solving",
      withWho: "Nina R.",
      time: "5:30 PM",
      type: "Practice",
      typeColor: "text-green-300 bg-green-500/10 border-green-500/20",
      avatarColor: "bg-green-500",
    },
  ];

  // Generate events for the next 120 days
  for (let i = 0; i < 120; i++) {
    const eventDate = new Date(today);
    eventDate.setDate(eventDate.getDate() + i);

    // Randomly place events on some days
    if (Math.random() > 0.7) {
      const dateKey = eventDate.toISOString().split("T")[0];
      const numEvents = Math.random() > 0.8 ? 2 : 1;

      events[dateKey] = [];
      for (let j = 0; j < numEvents; j++) {
        const template = eventTemplates[Math.floor(Math.random() * eventTemplates.length)];
        events[dateKey].push({
          id: `${dateKey}-${j}`,
          ...template,
        });
      }
    }
  }

  return events;
};

const CALENDAR_EVENTS = generateCalendarEvents();

export default function CalendarModal({ isOpen, onClose, customEvents = {} }) {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today);
  const [selectedDate, setSelectedDate] = useState(today.toISOString().split("T")[0]);

  // Merge custom events with generated events (calculated directly on render)
  const baseEvents = CALENDAR_EVENTS;
  const mergedEvents = { ...baseEvents };
  const customKeys = Object.keys(customEvents);
  for (let i = 0; i < customKeys.length; i++) {
    const dateKey = customKeys[i];
    const events = customEvents[dateKey];
    if (mergedEvents[dateKey]) {
      mergedEvents[dateKey] = mergedEvents[dateKey].concat(events);
    } else {
      mergedEvents[dateKey] = events;
    }
  }

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const previousYear = () => {
    setCurrentDate(new Date(currentDate.getFullYear() - 1, currentDate.getMonth()));
  };

  const nextYear = () => {
    setCurrentDate(new Date(currentDate.getFullYear() + 1, currentDate.getMonth()));
  };

  const formatDateKey = (year, month, day) => {
    return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDayOfMonth = getFirstDayOfMonth(currentDate);
  const days = [];

  // Empty cells for days before month starts
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null);
  }

  // Days of the month
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const selectedDateEvents =
    selectedDate && mergedEvents[selectedDate] ? mergedEvents[selectedDate] : [];

  const isToday = (year, month, day) => {
    const checkDate = new Date(year, month, day);
    const todayDate = new Date();
    return (
      checkDate.getDate() === todayDate.getDate() &&
      checkDate.getMonth() === todayDate.getMonth() &&
      checkDate.getFullYear() === todayDate.getFullYear()
    );
  };

  if (!isOpen) return null;

  return (
    <div className="cal-modal-backdrop" onClick={onClose}>
      <div className="cal-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Close button */}
        <button
          onClick={onClose}
          className="cal-modal-close-btn"
          style={{ border: "none", background: "none" }}
        >
          <X className="h-5 w-5" />
        </button>

        <div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem", marginBottom: "1rem" }}>
            <span className="popover-header-badge" style={{ color: "var(--cyan-accent)", backgroundColor: "var(--cyan-bg)", borderColor: "var(--cyan-border)", width: "fit-content" }}>Full Schedule</span>
            <h2 style={{ fontSize: "1.25rem", fontWeight: "bold", color: "#fff" }}>Full Calendar</h2>
            <p style={{ fontSize: "11px", color: "var(--text-muted)", margin: 0 }}>Select any date on the calendar to view its scheduled sessions</p>
          </div>

          <div className="cal-modal-grid-12">
            {/* Calendar Grid */}
            <div style={{ gridColumn: "span 7" }}>
              {/* Month & Year Navigation */}
              <div className="cal-nav-bar">
                <button
                  onClick={previousMonth}
                  className="sandbox-back-btn"
                  style={{ padding: "0.5rem" }}
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>

                <div style={{ textAlign: "center", flex: 1 }}>
                  <h3 style={{ fontSize: "1rem", fontWeight: "bold", color: "#fff" }}>
                    {monthNames[currentDate.getMonth()]}
                  </h3>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem", marginTop: "0.25rem" }}>
                    <button
                      onClick={previousYear}
                      className="ide-reset-btn"
                      style={{ padding: "0.125rem 0.25rem", border: "none", fontSize: "10px", background: "none" }}
                    >
                      ←
                    </button>
                    <span style={{ fontSize: "11px", fontWeight: "bold", color: "var(--text-secondary)" }}>
                      {currentDate.getFullYear()}
                    </span>
                    <button
                      onClick={nextYear}
                      className="ide-reset-btn"
                      style={{ padding: "0.125rem 0.25rem", border: "none", fontSize: "10px", background: "none" }}
                    >
                      →
                    </button>
                  </div>
                </div>

                <button
                  onClick={nextMonth}
                  className="sandbox-back-btn"
                  style={{ padding: "0.5rem" }}
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              {/* Day names */}
              <div className="cal-grid-7" style={{ marginBottom: "0.5rem" }}>
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <div
                    key={day}
                    style={{ textAlign: "center", fontSize: "11px", fontWeight: "bold", color: "var(--text-muted)", textTransform: "uppercase" }}
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Days */}
              <div className="cal-grid-7">
                {days.map((day, idx) => {
                  const dateKey =
                    day &&
                    formatDateKey(
                      currentDate.getFullYear(),
                      currentDate.getMonth(),
                      day
                    );
                  const hasEvents = day && mergedEvents[dateKey];
                  const isTodayDate = day && isToday(currentDate.getFullYear(), currentDate.getMonth(), day);

                  if (day === null) {
                    return <div key={idx} className="cal-day-cell empty" />;
                  }

                  let cellClass = "";
                  if (hasEvents) cellClass = "has-events";

                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedDate(dateKey)}
                      className={`cal-day-cell ${cellClass}`}
                    >
                      <div className="cal-day-cell-number">
                        {day}
                      </div>
                      {hasEvents && (
                        <div className="cal-day-cell-dot" />
                      )}
                      {isTodayDate && (
                        <div className="cal-day-cell-today-marker" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Sidebar - Selected Date Events */}
            <div style={{ gridColumn: "span 5" }}>
              <div className="cal-sidebar-card">
                <div className="cal-sidebar-card-header">
                  <div>
                    <span className="popover-header-badge" style={{ color: "var(--cyan-accent)", backgroundColor: "var(--cyan-bg)", borderColor: "var(--cyan-border)", margin: 0 }}>Scheduled Sessions</span>
                    <h3 style={{ fontSize: "12px", color: "#fff", fontWeight: "bold", marginTop: "0.25rem" }}>
                      {selectedDate
                        ? new Date(selectedDate + "T00:00:00").toLocaleDateString("en-US", {
                            weekday: "long",
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })
                        : "Select a date"}
                    </h3>
                  </div>
                  {selectedDateEvents.length > 0 && (
                    <span className="q-api-badge" style={{ backgroundColor: "var(--cyan-bg)", color: "var(--cyan-accent)", borderColor: "var(--cyan-border)" }}>
                      {selectedDateEvents.length} Event(s)
                    </span>
                  )}
                </div>

                {selectedDateEvents.length > 0 ? (
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", overflowY: "auto", maxHeight: "15rem" }}>
                    {selectedDateEvents.map((event) => (
                      <div
                        key={event.id}
                        className="practice-streak-card"
                        style={{ padding: "0.75rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}
                      >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
                            <div
                              className="sandbox-back-btn"
                              style={{ padding: "0.25rem 0.5rem", borderRadius: "50%", minWidth: "1.5rem", height: "1.5rem", fontSize: "9px", display: "flex", alignItems: "center", justifyContent: "center" }}
                            >
                              {event.withWho
                                .split(" ")
                                .map((w) => w[0])
                                .join("")
                                .slice(0, 2)}
                            </div>
                            <span style={{ fontSize: "11px", color: "var(--text-secondary)" }}>{event.withWho}</span>
                          </div>
                          <span className="q-api-badge" style={{ backgroundColor: "rgba(255,255,255,0.03)", color: "#fff" }}>
                            {event.type}
                          </span>
                        </div>
                        <p style={{ fontSize: "12px", color: "#fff", fontWeight: "bold", margin: 0 }}>
                          {event.title}
                        </p>
                        <p style={{ fontSize: "10px", color: "var(--text-muted)", margin: 0 }}>
                          🕒 {event.time}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="popover-body" style={{ color: "var(--text-muted)", borderStyle: "dashed" }}>
                    <p style={{ margin: 0 }}>
                      No events scheduled for this day.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
