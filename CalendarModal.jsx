import React, { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

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

  // Merge custom events with generated events
  const mergedEvents = useMemo(() => {
    const baseEvents = generateCalendarEvents();
    const merged = { ...baseEvents };

    Object.entries(customEvents).forEach(([dateKey, events]) => {
      if (merged[dateKey]) {
        merged[dateKey] = [...merged[dateKey], ...events];
      } else {
        merged[dateKey] = events;
      }
    });

    return merged;
  }, [customEvents]);

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

  // Get upcoming events (next 7 days)
  const getUpcomingEvents = () => {
    const upcoming = [];
    const currentDate = new Date();

    for (let i = 0; i < 14; i++) {
      const date = new Date(currentDate);
      date.setDate(date.getDate() + i);
      const dateKey = date.toISOString().split("T")[0];

      if (mergedEvents[dateKey]) {
        mergedEvents[dateKey].forEach((event) => {
          upcoming.push({
            ...event,
            date: dateKey,
            dateDisplay: date.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              weekday: "short",
            }),
          });
        });
      }
    }

    return upcoming;
  };

  const upcomingEvents = useMemo(getUpcomingEvents, [mergedEvents]);

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="relative rounded-3xl border border-white/10 bg-[#0a0e1a] backdrop-blur-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 p-2 rounded-full border border-white/10 bg-white/5 text-neutral-400 hover:text-slate-100 hover:border-white/20 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="p-8">
          <h2 className="text-2xl font-bold text-slate-100 mb-6">Full Calendar</h2>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Calendar Grid */}
            <div className="lg:col-span-2">
              {/* Month & Year Navigation */}
              <div className="flex items-center justify-between mb-6 rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <button
                  onClick={previousMonth}
                  className="p-2 rounded-lg border border-white/10 bg-white/5 text-neutral-400 hover:text-slate-100 hover:border-white/20 transition-colors"
                  title="Previous month"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>

                <div className="text-center flex-1">
                  <h3 className="text-lg font-semibold text-slate-100">
                    {monthNames[currentDate.getMonth()]}
                  </h3>
                  <div className="flex items-center justify-center gap-3 mt-2">
                    <button
                      onClick={previousYear}
                      className="px-2 py-1 text-xs font-medium text-neutral-400 hover:text-slate-100 hover:bg-white/10 rounded transition-colors"
                      title="Previous year"
                    >
                      ←
                    </button>
                    <span className="text-sm font-medium text-neutral-300 w-12">
                      {currentDate.getFullYear()}
                    </span>
                    <button
                      onClick={nextYear}
                      className="px-2 py-1 text-xs font-medium text-neutral-400 hover:text-slate-100 hover:bg-white/10 rounded transition-colors"
                      title="Next year"
                    >
                      →
                    </button>
                  </div>
                </div>

                <button
                  onClick={nextMonth}
                  className="p-2 rounded-lg border border-white/10 bg-white/5 text-neutral-400 hover:text-slate-100 hover:border-white/20 transition-colors"
                  title="Next month"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              {/* Day names */}
              <div className="grid grid-cols-7 gap-2 mb-4">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <div
                    key={day}
                    className="text-center text-xs font-semibold text-neutral-500 uppercase tracking-wide py-2"
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7 gap-2 mb-6">
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

                  return (
                    <button
                      key={idx}
                      onClick={() => day && setSelectedDate(dateKey)}
                      className={`relative aspect-square p-2 rounded-lg border transition-all duration-200 ${
                        day === null
                          ? "border-white/5 bg-transparent text-neutral-600"
                          : hasEvents
                          ? "border-cyan-400/50 bg-cyan-500/10 hover:border-cyan-300 hover:bg-cyan-500/20"
                          : isTodayDate
                          ? "border-cyan-400/50 bg-cyan-500/10 hover:border-cyan-300 hover:bg-cyan-500/20"
                          : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.08]"
                      }`}
                    >
                      <div className={`text-xs font-semibold ${day === null ? "text-neutral-600" : "text-slate-100"}`}>
                        {day}
                      </div>
                      {hasEvents && (
                        <div className="absolute bottom-1 left-2 right-2 h-1 bg-gradient-to-r from-indigo-400 to-cyan-400 rounded-full" />
                      )}
                      {isTodayDate && (
                        <div className="absolute top-1 right-1 h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-4 text-xs text-neutral-400">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-sm bg-gradient-to-r from-indigo-400 to-cyan-400" />
                  <span>Has events</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  <span>Today</span>
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              {/* Events for selected date */}
              <div className="rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-5">
                <h3 className="text-sm font-semibold text-white/90 mb-4">
                  {selectedDate
                    ? new Date(selectedDate + "T00:00:00").toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "Select a date"}
                </h3>

                {selectedDateEvents.length > 0 ? (
                  <div className="space-y-3 max-h-80 overflow-y-auto">
                    {selectedDateEvents.map((event) => (
                      <div
                        key={event.id}
                        className="p-3 rounded-lg border border-white/10 bg-white/[0.05] hover:bg-white/[0.08] transition-colors"
                      >
                        <div className="flex items-start gap-2 mb-2">
                          <div
                            className={`h-6 w-6 rounded-full shrink-0 flex items-center justify-center text-[9px] font-semibold text-white ${event.avatarColor} ring-2 ring-[#0a0e1a]`}
                          >
                            {event.withWho
                              .split(" ")
                              .map((w) => w[0])
                              .join("")
                              .slice(0, 2)}
                          </div>
                          <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded border ${event.typeColor}`}>
                            {event.type}
                          </span>
                        </div>
                        <p className="text-xs font-medium text-white/90 leading-tight mb-1">
                          {event.title}
                        </p>
                        <div className="flex items-center gap-2 text-[10px] text-neutral-500">
                          <span>{event.withWho}</span>
                          <span className="h-0.5 w-0.5 rounded-full bg-neutral-600" />
                          <span>{event.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-neutral-500 italic">
                    {selectedDate ? "No events scheduled" : "Choose a date to view events"}
                  </p>
                )}
              </div>

              {/* Upcoming Events */}
              <div className="rounded-xl border border-white/10 bg-gradient-to-br from-indigo-500/10 via-white/[0.02] to-transparent backdrop-blur-md p-5">
                <h3 className="text-sm font-semibold text-indigo-300 mb-4">Upcoming Events</h3>
                {upcomingEvents.length > 0 ? (
                  <div className="space-y-2.5 max-h-80 overflow-y-auto">
                    {upcomingEvents.slice(0, 10).map((event) => (
                      <div
                        key={event.id}
                        className="p-2.5 rounded-lg border border-white/10 bg-white/[0.05] hover:bg-white/[0.08] transition-colors cursor-pointer"
                        onClick={() => setSelectedDate(event.date)}
                      >
                        <div className="flex items-start gap-2 mb-1">
                          <div className="flex-1">
                            <p className="text-xs font-medium text-white/90">{event.title}</p>
                            <p className="text-[10px] text-cyan-300 font-medium">{event.dateDisplay}</p>
                          </div>
                          <span className={`text-[9px] font-medium px-1.5 py-0.5 rounded border whitespace-nowrap ${event.typeColor}`}>
                            {event.type}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-[10px] text-neutral-500">
                          <span>{event.withWho}</span>
                          <span>•</span>
                          <span>{event.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-neutral-500 italic">No upcoming events</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
