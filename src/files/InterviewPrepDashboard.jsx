import React, { useState } from "react";
import {
  Terminal,
  Code2,
  Network,
  MessagesSquare,
  FileText,
  Flame,
  ChevronRight,
  ChevronDown,
  Clock,
  Play,
  CheckCircle2,
  Circle,
  Sparkles,
  ArrowUpRight,
  Bell,
  Settings,
  Search,
  BarChart3,
  Database,
  Cpu,
  Server,
  Trophy,
  Medal,
  Calendar,
  Plus
} from "lucide-react";
import DsaSandboxView from "./DsaSandboxView.jsx";
import SystemDesignView from "./SystemDesignView.jsx";
import BehavioralMockView from "./BehavioralMockView.jsx";
import ResumeGraderView from "./ResumeGraderView.jsx";
import CoursesView from "./CoursesView.jsx";
import TutorialsView from "./TutorialsView.jsx";
import AptitudeView from "./AptitudeView.jsx";
import RoadmapView from "./RoadmapView.jsx";
import LeaderboardView from "./LeaderboardView.jsx";
import PrepPlanSchedulerModal from "./PrepPlanSchedulerModal.jsx";
import AddAgendaModal from "./addagendamodel.jsx";
import CalendarModal from "./CalendarModal.jsx";
import PracticeStreakModal, { DAILY_PRACTICE_DATA } from "./PracticeStreakModal.jsx";
import DailyStreakMilestoneModal from "./DailyStreakMilestoneModal.jsx";
import SettingsModal from "./SettingsModal.jsx";
import "./InterviewPrepDashboard.css";





const MODULES = [
  {
    id: "dsa",
    title: "DSA Sandbox & Practice",
    subtitle: "Arrays, Graphs & DP drills",
    icon: Code2,
    completion: 68,
    accent: "indigo",
    stat: "142 problems solved",
  },
  {
    id: "sysdesign",
    title: "System Design Studio",
    subtitle: "Scalability & architecture",
    icon: Network,
    completion: 42,
    accent: "purple",
    stat: "9 designs reviewed",
  },
  {
    id: "behavioral",
    title: "Behavioral Mock AI",
    subtitle: "STAR-method live practice",
    icon: MessagesSquare,
    completion: 85,
    accent: "emerald",
    stat: "22 sessions logged",
  },
  {
    id: "resume",
    title: "Resume Grader & ATS",
    subtitle: "ATS scoring & rewrite tips",
    icon: FileText,
    completion: 30,
    accent: "amber",
    stat: "Last scan: 2 days ago",
  },
];

const INITIAL_AGENDA = [
  {
    id: "agenda-1",
    time: "10:30 AM",
    day: "Today",
    title: "Mock Technical — Backend",
    withWho: "Priya S.",
    type: "Technical",
    avatarColor: "bg-indigo-500",
    done: false,
    date: new Date().toISOString().split("T")[0],
  },
  {
    id: "agenda-2",
    time: "2:00 PM",
    day: "Today",
    title: "Resume Review Sync",
    withWho: "Alex M.",
    type: "Career",
    avatarColor: "bg-amber-500",
    done: false,
    date: new Date().toISOString().split("T")[0],
  },
  {
    id: "agenda-3",
    time: "4:15 PM",
    day: "Tomorrow",
    title: "System Design Practice",
    withWho: "Karan R.",
    type: "System Design",
    avatarColor: "bg-purple-500",
    done: false,
    date: new Date(Date.now() + 86400000).toISOString().split("T")[0],
  },
];





function StreakRing({ value, goal }) {
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(value / goal, 1);
  const strokeDashoffset = circumference - progress * circumference;

  return (
    <div className="streak-ring-container">
      <svg className="streak-ring-svg">
        <circle
          cx="48"
          cy="48"
          r={radius}
          className="streak-ring-circle-bg"
        />
        <circle
          cx="48"
          cy="48"
          r={radius}
          className="streak-ring-circle-fill"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
        />
      </svg>
      <div className="streak-ring-text">
        <span className="streak-ring-value">{value}</span>
        <span className="streak-ring-label">day streak</span>
      </div>
    </div>
  );
}

function ModuleCard({ mod, onClick }) {
  const Icon = mod.icon;
  return (
    <button
      onClick={onClick}
      className={`module-card accent-${mod.accent} glow-${mod.accent}`}
    >
      <div className="module-card-ambient-glow" />

      <div className="module-card-header">
        <div className="module-card-icon-container">
          <Icon className="module-card-icon" style={{ color: `var(--${mod.accent}-accent)` }} />
        </div>
        <span
          className="module-card-badge"
          style={{
            color: `var(--${mod.accent}-accent)`,
            backgroundColor: `var(--${mod.accent}-bg)`,
            borderColor: `var(--${mod.accent}-border)`
          }}
        >
          {mod.completion}%
        </span>
      </div>

      <h3 className="module-card-title">{mod.title}</h3>
      <p className="module-card-subtitle">{mod.subtitle}</p>

      <div className="module-card-progress-bar">
        <div
          className="module-card-progress-fill"
          style={{ width: `${mod.completion}%` }}
        />
      </div>

      <div className="module-card-footer">
        <span className="module-card-stat">{mod.stat}</span>
        <ArrowUpRight className="module-card-arrow" />
      </div>
    </button>
  );
}

function AgendaItem({ item, isLast, onToggleDone }) {
  const initials = (item.withWho || "Prep")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const getThemeVars = () => {
    switch (item.type) {
      case "Technical":
        return {
          color: "var(--indigo-accent)",
          bg: "var(--indigo-bg)",
          border: "var(--indigo-border)"
        };
      case "Career":
        return {
          color: "var(--amber-accent)",
          bg: "var(--amber-bg)",
          border: "var(--amber-border)"
        };
      default:
        return {
          color: "var(--purple-accent)",
          bg: "var(--purple-bg)",
          border: "var(--purple-border)"
        };
    }
  };

  const themeVars = getThemeVars();

  return (
    <div className="agenda-item">
      {!isLast && <span className="agenda-item-line" />}
      <div
        className={`agenda-item-avatar`}
        style={{
          backgroundColor: item.avatarColor === "bg-indigo-500" ? "var(--indigo-accent)" : item.avatarColor === "bg-amber-500" ? "var(--amber-accent)" : "var(--purple-accent)"
        }}
      >
        {initials}
      </div>

      <div className="agenda-item-body">
        <div className="agenda-item-title-row">
          <p className={`agenda-item-title ${item.done ? "done" : ""}`}>
            {item.title}
          </p>
          <button
            type="button"
            onClick={() => onToggleDone && onToggleDone(item.id)}
            className="agenda-item-done-btn"
            title={item.done ? "Mark as pending" : "Mark as completed"}
          >
            {item.done ? (
              <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" style={{ color: "var(--emerald-accent)" }} />
            ) : (
              <Circle className="h-4 w-4 text-neutral-700 hover:text-neutral-500 shrink-0" style={{ color: "var(--text-muted)" }} />
            )}
          </button>
        </div>
        <div className="agenda-item-meta-row">
          <span className="agenda-item-time">
            <Clock className="h-3 w-3" />
            {item.day} · {item.time}
          </span>
          <span
            className="agenda-item-type"
            style={{
              color: themeVars.color,
              backgroundColor: themeVars.bg,
              borderColor: themeVars.border
            }}
          >
            {item.type}
          </span>
        </div>
      </div>
    </div>
  );
}

function QuestionTerminal({ onSolveNow }) {
  return (
    <div className="question-terminal-box">
      <div className="terminal-titlebar">
        <div className="terminal-window-buttons">
          <span className="terminal-dot-red" />
          <span className="terminal-dot-yellow" />
          <span className="terminal-dot-green" />
        </div>
        <div className="terminal-filename">
          <Terminal className="h-3 w-3" />
          question-of-the-day.ts
        </div>
        <span className="terminal-badge">
          Medium
        </span>
      </div>

      <div className="terminal-code-body">
        <div className="terminal-line">
          <span className="terminal-line-num">01</span>
          <span className="terminal-code-comment">{"/**"}</span>
        </div>
        <div className="terminal-line">
          <span className="terminal-line-num">02</span>
          <span className="terminal-code-comment"> * Longest Substring Without Repeating Characters</span>
        </div>
        <div className="terminal-line">
          <span className="terminal-line-num">03</span>
          <span className="terminal-code-comment"> * Given a string s, find the length of the longest</span>
        </div>
        <div className="terminal-line">
          <span className="terminal-line-num">04</span>
          <span className="terminal-code-comment"> * substring without repeating characters.</span>
        </div>
        <div className="terminal-line">
          <span className="terminal-line-num">05</span>
          <span className="terminal-code-comment"> {"*/"}</span>
        </div>
        <div className="terminal-line" style={{ marginTop: "0.5rem" }}>
          <span className="terminal-line-num">06</span>
          <span className="terminal-code-indent-1">
            <span className="terminal-code-keyword">function</span>{" "}
            <span className="terminal-code-function">lengthOfLongestSubstring</span>
            <span className="terminal-code-symbol">(</span>
            <span className="terminal-code-variable">s</span>
            <span className="terminal-code-type">: string</span>
            <span className="terminal-code-symbol">)</span>
            <span className="terminal-code-symbol">: number {"{"}</span>
          </span>
        </div>
        <div className="terminal-line">
          <span className="terminal-line-num">07</span>
          <span className="terminal-code-indent-2">
            <span className="terminal-code-keyword">const</span>{" "}
            <span className="terminal-code-variable">seen</span>{" "}
            <span className="terminal-code-symbol">=</span>{" "}
            <span className="terminal-code-keyword">new</span>{" "}
            <span className="terminal-code-function">Set</span>
            <span className="terminal-code-type">&lt;string&gt;();</span>
          </span>
        </div>
        <div className="terminal-line">
          <span className="terminal-line-num">08</span>
          <span className="terminal-code-indent-2">
            <span className="terminal-code-keyword">let</span>{" "}
            <span className="terminal-code-variable">left</span>{" "}
            <span className="terminal-code-symbol">=</span>{" "}
            <span className="terminal-code-string">0</span>
            <span className="terminal-code-symbol">,</span>{" "}
            <span className="terminal-code-variable">best</span>{" "}
            <span className="terminal-code-symbol">=</span>{" "}
            <span className="terminal-code-string">0</span>
            <span className="terminal-code-symbol">;</span>
          </span>
        </div>
        <div className="terminal-line">
          <span className="terminal-line-num">09</span>
          <span className="terminal-code-indent-2">
            <span className="terminal-code-comment">{"// two-pointer sliding window ->"}</span>
          </span>
        </div>
        <div className="terminal-line">
          <span className="terminal-line-num">10</span>
          <span className="terminal-code-indent-1">
            <span className="terminal-code-symbol">{"}"}</span>
          </span>
        </div>
        <div className="terminal-cursor-prompt">
          <span className="terminal-symbol">$</span>
          <span className="terminal-cursor">▍</span>
          <span className="terminal-cursor-text">awaiting your solution...</span>
        </div>
      </div>

      <div className="terminal-footer">
        <div className="terminal-meta">
          <span>Acceptance 34.2%</span>
          <span className="terminal-meta-dot" />
          <span>Companies: Meta, Amazon, Google</span>
        </div>
        <button
          onClick={onSolveNow}
          className="terminal-action-btn"
        >
          <Play className="h-3.5 w-3.5" fill="currentColor" />
          Solve now
        </button>
      </div>
    </div>
  );
}





export default function InterviewPrepDashboard() {
  const [activeView, setActiveView] = useState("dashboard"); 
  const [initialQuestionId, setInitialQuestionId] = useState(null);
  const [initialCategory, setInitialCategory] = useState("All");

  
  const [isSchedulerOpen, setIsSchedulerOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isAddAgendaOpen, setIsAddAgendaOpen] = useState(false);
  const [isStreakModalOpen, setIsStreakModalOpen] = useState(false);
  const [isMilestoneModalOpen, setIsMilestoneModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  
  const [agendaItems, setAgendaItems] = useState(() => {
    const saved = localStorage.getItem("prepos_agenda_items_v1");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return INITIAL_AGENDA;
  });

  
  const [customCalendarEvents, setCustomCalendarEvents] = useState(() => {
    const saved = localStorage.getItem("prepos_custom_calendar_events_v1");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    const todayStr = new Date().toISOString().split("T")[0];
    const tomorrowStr = new Date(Date.now() + 86400000).toISOString().split("T")[0];
    return {
      [todayStr]: [
        {
          id: "cal-init-1",
          title: "Mock Technical — Backend",
          withWho: "Priya S.",
          time: "10:30 AM",
          type: "Technical",
          avatarColor: "bg-indigo-500",
        },
        {
          id: "cal-init-2",
          title: "Resume Review Sync",
          withWho: "Alex M.",
          time: "2:00 PM",
          type: "Career",
          avatarColor: "bg-amber-500",
        }
      ],
      [tomorrowStr]: [
        {
          id: "cal-init-3",
          title: "System Design Practice",
          withWho: "Karan R.",
          time: "4:15 PM",
          type: "System Design",
          avatarColor: "bg-purple-500",
        }
      ]
    };
  });

  const handleToggleAgendaDone = (id) => {
    setAgendaItems((prev) => {
      const updated = prev.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item
      );
      localStorage.setItem("prepos_agenda_items_v1", JSON.stringify(updated));
      return updated;
    });
  };

  const handleAddAgendaEvent = (newEvent) => {
    let dayLabel = "Scheduled";
    if (newEvent.date) {
      const todayStr = new Date().toISOString().split("T")[0];
      const tomorrowStr = new Date(Date.now() + 86400000).toISOString().split("T")[0];

      if (newEvent.date === todayStr) {
        dayLabel = "Today";
      } else if (newEvent.date === tomorrowStr) {
        dayLabel = "Tomorrow";
      } else {
        const parts = newEvent.date.split("-");
        if (parts.length === 3) {
          const d = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
          dayLabel = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
        }
      }
    }

    const formattedAgendaItem = {
      ...newEvent,
      day: dayLabel,
      done: false,
    };

    setAgendaItems((prev) => {
      const updated = [formattedAgendaItem, ...prev];
      localStorage.setItem("prepos_agenda_items_v1", JSON.stringify(updated));
      return updated;
    });

    if (newEvent.date) {
      setCustomCalendarEvents((prev) => {
        const updated = {
          ...prev,
          [newEvent.date]: [...(prev[newEvent.date] || []), newEvent],
        };
        localStorage.setItem("prepos_custom_calendar_events_v1", JSON.stringify(updated));
        return updated;
      });
    }

    setIsAddAgendaOpen(false);
  };

  const handleOpenDsa = (qId = null, category = "All") => {
    setInitialQuestionId(qId);
    setInitialCategory(category);
    setActiveView("dsa");
  };

  if (activeView === "dsa") {
    return (
      <DsaSandboxView
        onBackToDashboard={() => setActiveView("dashboard")}
        initialQuestionId={initialQuestionId}
        initialCategory={initialCategory}
      />
    );
  }

  if (activeView === "sysdesign") {
    return <SystemDesignView onBackToDashboard={() => setActiveView("dashboard")} />;
  }

  if (activeView === "behavioral") {
    return <BehavioralMockView onBackToDashboard={() => setActiveView("dashboard")} />;
  }

  if (activeView === "resume") {
    return <ResumeGraderView onBackToDashboard={() => setActiveView("dashboard")} />;
  }

  if (activeView === "courses") {
    return <CoursesView onBackToDashboard={() => setActiveView("dashboard")} />;
  }

  if (activeView === "tutorials") {
    return <TutorialsView onBackToDashboard={() => setActiveView("dashboard")} />;
  }

  if (activeView === "aptitude") {
    return <AptitudeView onBackToDashboard={() => setActiveView("dashboard")} />;
  }

  if (activeView === "leaderboard") {
    return <LeaderboardView onBackToDashboard={() => setActiveView("dashboard")} />;
  }

  if (activeView === "roadmap") {
    return <RoadmapView onBackToDashboard={() => setActiveView("dashboard")} />;
  }

  return (
    <div className="dashboard-container">
      
      <PrepPlanSchedulerModal
        isOpen={isSchedulerOpen}
        onClose={() => setIsSchedulerOpen(false)}
        onStartPractice={() => handleOpenDsa(null, "All")}
      />

      
      <CalendarModal
        isOpen={isCalendarOpen}
        onClose={() => setIsCalendarOpen(false)}
        customEvents={customCalendarEvents}
      />

      
      <AddAgendaModal
        isOpen={isAddAgendaOpen}
        onClose={() => setIsAddAgendaOpen(false)}
        onAddEvent={handleAddAgendaEvent}
      />

      
      <PracticeStreakModal
        isOpen={isStreakModalOpen}
        onClose={() => setIsStreakModalOpen(false)}
        onStartPractice={() => handleOpenDsa(null, "All")}
      />

      
      <DailyStreakMilestoneModal
        isOpen={isMilestoneModalOpen}
        onClose={() => setIsMilestoneModalOpen(false)}
        onStartPractice={() => handleOpenDsa(null, "All")}
      />

      
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />

      
      <div className="dashboard-hairline" />
      
      <div className="glow-bg-1" />
      <div className="glow-bg-2" />
      <div className="glow-bg-3" />

      <div className="dashboard-inner">
        
        <div className="nav-header">
          <div className="nav-logo" onClick={() => setActiveView("dashboard")}>
            <svg viewBox="0 0 58 34">
              <circle cx="11" cy="12" r="7.5" fill="none" stroke="#38bdf8" strokeWidth="2.8" style={{ filter: "drop-shadow(0 0 8px rgba(56,189,248,0.8))" }} />
              <circle cx="29" cy="22" r="7.5" fill="none" stroke="#eab308" strokeWidth="2.8" style={{ filter: "drop-shadow(0 0 8px rgba(234,179,8,0.8))" }} />
              <circle cx="47" cy="12" r="7.5" fill="none" stroke="#f43f5e" strokeWidth="2.8" style={{ filter: "drop-shadow(0 0 8px rgba(244,63,94,0.8))" }} />
            </svg>
            <span>PrepOS</span>
          </div>

          <div className="search-bar">
            <Search className="h-3.5 w-3.5" />
            <span>Search courses, practice, roadmap...</span>
          </div>

          <div className="nav-right">
            
            <div className="notification-wrapper">
              <button
                type="button"
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                className={`notification-btn ${isNotificationOpen ? "active" : ""}`}
                title="Notifications"
              >
                <Bell className="h-4 w-4" />
                <span className="notification-badge" />
              </button>

              
              {isNotificationOpen && (
                <>
                  <div
                    className="notification-popover-backdrop"
                    onClick={() => setIsNotificationOpen(false)}
                  />

                  <div className="notification-popover">
                    <div className="popover-header">
                      <div className="popover-header-title">
                        <Bell className="h-4 w-4" style={{ color: "var(--cyan-accent)" }} />
                        <h3>Notifications</h3>
                      </div>
                      <span className="popover-header-badge">0 New</span>
                    </div>

                    <div className="popover-body">
                      <div className="popover-body-icon">
                        <Bell className="h-5 w-5" />
                      </div>
                      <p className="popover-body-text-main">No notifications yet</p>
                      <p className="popover-body-text-sub">
                        You're all caught up! Session reminders and practice alerts will show up here.
                      </p>
                    </div>

                    <div className="popover-footer">
                      <span>PrepOS Alerts</span>
                      <button
                        type="button"
                        onClick={() => setIsNotificationOpen(false)}
                        className="popover-dismiss-btn"
                      >
                        Dismiss
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

            <button
              onClick={() => setIsSettingsOpen(true)}
              className="settings-btn"
              title="Settings"
            >
              <Settings className="h-4 w-4" />
            </button>
            <div className="avatar" />
          </div>
        </div>

        {/* Categories Nav */}
        <nav className="categories-nav">
          {[
            { id: "dashboard", label: "Overview", action: () => setActiveView("dashboard") },
            { id: "courses", label: "Courses", action: () => setActiveView("courses") },
            { id: "tutorials", label: "Tutorials", action: () => setActiveView("tutorials") },
            { id: "dsa", label: "Practice", action: () => handleOpenDsa(null, "All") },
            { id: "aptitude", label: "Aptitude", action: () => setActiveView("aptitude") },
            { id: "resume", label: "Resume Review", action: () => setActiveView("resume") },
            { id: "leaderboard", label: "Leaderboard", action: () => setActiveView("leaderboard") },
            { id: "roadmap", label: "Roadmap", action: () => setActiveView("roadmap") },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={cat.action}
              className={`category-tab ${activeView === cat.id ? "active" : ""}`}
            >
              {cat.label}
              {activeView === cat.id && (
                <div className="category-indicator" />
              )}
            </button>
          ))}
        </nav>

        {/* Hero */}
        <div className="hero-section">
          <div className="hero-overlay" />
          <div className="hero-content">
            <p className="hero-tag">Good evening</p>
            <h1 className="hero-title">Ready to sharpen up, Deepanshu?</h1>
            <p className="hero-subtitle">
              You're 3 sessions from your best week yet. Your next mock interview starts in{" "}
              <span className="hero-subtitle-highlight">2h 14m</span>.
            </p>
            <button
              onClick={() => setIsSchedulerOpen(true)}
              className="hero-btn"
            >
              <Calendar className="h-4 w-4" />
              Schedule Plan
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <button
            type="button"
            onClick={() => setIsMilestoneModalOpen(true)}
            className="streak-widget"
          >
            <StreakRing value={12} goal={30} />
            <div className="streak-details">
              <div className="streak-title-row">
                <p className="streak-title">Daily Interview Streak</p>
                <ArrowUpRight className="h-3.5 w-3.5" style={{ color: "var(--text-muted)" }} />
              </div>
              <p className="streak-desc">2 days to 14-Day Algorithm Master badge</p>
              <div className="streak-badges-btn">
                <span className="streak-pulse-indicator" />
                Click for Milestone Journey & Badges
              </div>
            </div>
          </button>
        </div>

        
        <div className="main-grid">
          
          <div className="grid-col-left">
            <div className="modules-section">
              <div className="modules-header">
                <h2>Prep modules</h2>
                <button
                  onClick={() => handleOpenDsa(null, "All")}
                  className="modules-view-all-btn"
                >
                  View all <ChevronRight className="h-3 w-3" />
                </button>
              </div>
              <div className="modules-grid">
                {MODULES.map((mod) => (
                  <ModuleCard
                    key={mod.id}
                    mod={mod}
                    onClick={() => setActiveView(mod.id)}
                  />
                ))}
              </div>
            </div>

            <div className="question-of-the-day-section">
              <div className="question-header">
                <h2>Question of the day</h2>
                <span className="question-time-limit">Refreshes in 6h 42m</span>
              </div>
              <QuestionTerminal onSolveNow={() => handleOpenDsa("longest-substring", "All")} />
            </div>
          </div>

          
          <div className="grid-col-right">
            <div className="agenda-widget">
              <div className="agenda-header">
                <h2>Upcoming agenda</h2>
                <span className="agenda-badge">{agendaItems.length} items</span>
              </div>
              <div className="agenda-items">
                {agendaItems.length > 0 ? (
                  agendaItems.map((item, i) => (
                    <AgendaItem
                      key={item.id}
                      item={item}
                      isLast={i === agendaItems.length - 1}
                      onToggleDone={handleToggleAgendaDone}
                    />
                  ))
                ) : (
                  <p className="agenda-item-title" style={{ textAlign: "center", padding: "1rem 0", color: "var(--text-muted)" }}>No upcoming agenda items</p>
                )}
              </div>
              <div className="agenda-actions">
                <button
                  type="button"
                  onClick={() => setIsAddAgendaOpen(true)}
                  className="agenda-btn-primary"
                >
                  <Plus className="h-3.5 w-3.5" />
                  Add Event
                </button>
                <button
                  type="button"
                  onClick={() => setIsCalendarOpen(true)}
                  className="agenda-btn-secondary"
                >
                  <Calendar className="h-3.5 w-3.5" />
                  View full calendar
                </button>
              </div>
            </div>

            
            <div className="practice-streak-widget">
              <div className="practice-streak-glow" />
              
              <div className="practice-streak-header">
                <div className="practice-streak-title-area">
                  <div className="practice-streak-icon-box">
                    <Flame className="h-4 w-4" style={{ fill: "rgba(249, 115, 22, 0.3)" }} />
                  </div>
                  <h2>Practice Streak</h2>
                </div>
                <span className="practice-streak-badge">
                  {DAILY_PRACTICE_DATA.currentStreak} Days
                </span>
              </div>

              <div className="practice-streak-grid">
                <div className="practice-streak-card">
                  <span className="practice-streak-card-title">Today's Solved</span>
                  <div className="practice-streak-card-value">
                    <span>{DAILY_PRACTICE_DATA.today.questionsCount}</span>
                    <span className="practice-streak-goal-subtext">/ {DAILY_PRACTICE_DATA.today.goalQuestions} goal</span>
                  </div>
                </div>
                <div className="practice-streak-card">
                  <span className="practice-streak-card-title">Focused Time</span>
                  <div className="practice-streak-time-val">1h 45m</div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsStreakModalOpen(true)}
                className="practice-streak-btn"
              >
                <Flame className="h-3.5 w-3.5" style={{ fill: "rgba(249, 115, 22, 0.3)" }} />
                View Streak & Time Analytics
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>

            
            <div className="readiness-widget">
              <p className="readiness-title">Readiness score</p>
              <div className="readiness-score-row">
                <span className="readiness-value">78</span>
                <span className="readiness-max">/ 100</span>
              </div>
              <p className="readiness-comparison">Up 6 pts since last week</p>
              <div className="readiness-chart">
                {[62, 70, 65, 74, 71, 78, 78].map((v, i) => (
                  <div key={i} className="readiness-chart-bar-slot">
                    <div
                      className="readiness-chart-bar-fill"
                      style={{ height: `${v}%` }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        
        <footer className="dashboard-footer">
          <div className="footer-top">
            <div className="footer-brand">
              <div className="footer-brand-logo" onClick={() => setActiveView("dashboard")}>
                <svg viewBox="0 0 58 34">
                  <circle cx="11" cy="12" r="7.5" fill="none" stroke="#38bdf8" strokeWidth="2.8" style={{ filter: "drop-shadow(0 0 8px rgba(56,189,248,0.8))" }} />
                  <circle cx="29" cy="22" r="7.5" fill="none" stroke="#eab308" strokeWidth="2.8" style={{ filter: "drop-shadow(0 0 8px rgba(234,179,8,0.8))" }} />
                  <circle cx="47" cy="12" r="7.5" fill="none" stroke="#f43f5e" strokeWidth="2.8" style={{ filter: "drop-shadow(0 0 8px rgba(244,63,94,0.8))" }} />
                </svg>
                <span>PrepOS</span>
              </div>
              <p className="footer-brand-desc">
                PrepOS is an premium developer-centric environment built to help software engineers master technical loops, system design, behavioral mocks, and resume evaluation.
              </p>
            </div>

            <div className="footer-col">
              <h4>Practice Areas</h4>
              <ul>
                <li><button onClick={() => handleOpenDsa(null, "All")} style={{ cursor: "pointer" }}>DSA Sandbox</button></li>
                <li><button onClick={() => setActiveView("sysdesign")} style={{ cursor: "pointer" }}>System Design</button></li>
                <li><button onClick={() => setActiveView("behavioral")} style={{ cursor: "pointer" }}>Behavioral AI</button></li>
                <li><button onClick={() => setActiveView("aptitude")} style={{ cursor: "pointer" }}>Aptitude Drills</button></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Resources</h4>
              <ul>
                <li><button onClick={() => setActiveView("courses")} style={{ cursor: "pointer" }}>Masterclass Courses</button></li>
                <li><button onClick={() => setActiveView("tutorials")} style={{ cursor: "pointer" }}>Cheat Sheets</button></li>
                <li><button onClick={() => setActiveView("roadmap")} style={{ cursor: "pointer" }}>Prep Roadmap</button></li>
                <li><button onClick={() => setActiveView("leaderboard")} style={{ cursor: "pointer" }}>Peer Leaderboard</button></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Company</h4>
              <ul>
                <li><a href="#about" onClick={(e) => e.preventDefault()}>About Us</a></li>
                <li><a href="#careers" onClick={(e) => e.preventDefault()}>Careers</a></li>
                <li><a href="#contact" onClick={(e) => e.preventDefault()}>Contact Support</a></li>
                <li><a href="#github" onClick={(e) => e.preventDefault()}>Open Source</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <span className="footer-copy">
              &copy; {new Date().getFullYear()} PrepOS. All rights reserved.
            </span>
            <div className="footer-bottom-links">
              <a href="#privacy" onClick={(e) => e.preventDefault()}>Privacy Policy</a>
              <a href="#terms" onClick={(e) => e.preventDefault()}>Terms of Service</a>
              <a href="#cookies" onClick={(e) => e.preventDefault()}>Cookies settings</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
