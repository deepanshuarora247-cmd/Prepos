# PrepOS 💻🚀

PrepOS is a developer-centric, ultra-premium, dark-mode technical interview preparation dashboard designed to help developers land their dream engineering roles. Built with a custom glassmorphism style, glowing accents, and an interactive cyberpunk command center interface, it serves as a complete preparation environment.

---

## ⚡ Key Features

PrepOS integrates multiple specialized views and tools to cover every aspect of the modern software engineering interview loop:

### 1. 🖥️ Dashboard Command Center
- **Readiness Score Analytics**: Real-time performance tracking (e.g., historical chart showing score gains).
- **Daily Interview Streak**: Gamified progress ring detailing streak milestones and upcoming badge unlocks.
- **Question of the Day Terminal**: A sleek, terminal-style preview component featuring active coding challenges.
- **Upcoming Agenda**: Study events tracker with quick-actions to add mock sessions, career syncs, and custom prep events.
- **Practice Streak Heatmap**: Analytics box highlighting daily goals, focused hours, and consistency charts.

### 2. 💻 DSA Sandbox & Practice Workspace (`DsaSandboxView`)
- Fully-interactive coding environment simulating a real-world compiler.
- Code editor interface with syntax highlighting, custom test cases, run execution simulator, and diagnostic logs.
- Curated challenges categorized by **Arrays, Dynamic Programming, Graphs, Trees, Strings, Linked Lists, and Sorting**.
- Search and filtering by difficulty levels (**Easy, Medium, Hard**) and completion status.

### 3. 🌐 System Design Studio (`SystemDesignView`)
- Architectural canvas with visual templates for scalable system design.
- Interactive requirements analyzer split into Functional & Non-Functional requirements.
- Back-of-the-envelope estimation calculator and latency calculators.
- Diagnostic architectural review notes and structural design checklists.

### 4. 🗣️ Behavioral Mock AI Simulator (`BehavioralMockView`)
- **STAR Method Framework**: Structure response blocks around **Situation, Task, Action, and Result**.
- Speech-to-text audio transcription simulator with live speech duration.
- Real-time AI evaluation dashboard providing feedback on clarity, impact, leadership traits, and technical focus.

### 5. 📄 Resume Grader & ATS Analyzer (`ResumeGraderView`)
- PDF / Document upload simulator assessing formatting, word count, and impact.
- **ATS Scoring Engine**: Detailed breakdown of keyword optimization, action verb density, and layout style.
- Interactive **ATS Recommendation Editor** providing inline rewrite suggestions and comparative previews.

### 6. 📚 Masterclass Courses & Player (`CoursesView` / `CoursePlayerView`)
- Comprehensive curriculum paths (e.g., "DSA Fundamentals Masterclass", "System Design Patterns").
- Integrated multi-panel video player with chapter lists, dynamic video bookmarking, personal code scratchpads, and side-by-side terminal compilers.

### 7. 📖 Cheat Sheet Guides (`TutorialsView`)
- Concept breakdowns and high-performance cheat sheets.
- Detailed cheat sheets for time/space complexity (Big-O notation) and design patterns.

### 8. 📊 Aptitude & Logical Reasoning (`AptitudeView`)
- Quantitative, logical, and verbal reasoning challenge modules.
- Practice drills with active countdown timers, score tracking, and detailed step-by-step mathematical explanations.

### 9. 📈 Peer Leaderboard & Progress (`LeaderboardView`)
- Global rank matching, peer performance stats, active XP levels, and unlocked achievement badges.

### 10. 🗺️ Custom Role Roadmaps (`RoadmapView`)
- Visual timelines tailored for specific career paths: **Frontend, Backend, Fullstack, and Mobile Engineering**.
- Step-by-step checkpoints tracking complete, in-progress, and locked milestones.

### 11. 🗓️ Preparation Scheduler (`CalendarModal` / `PrepPlanSchedulerModal`)
- Full calendar view to plan study blocks, mock interviews, and resume reviews.
- Custom weekly scheduler targeting specific focus hours, daily problem goals, and topics.

---

## 🛠️ Tech Stack

- **Core Library**: [React 18](https://react.dev/)
- **Build Tool & Bundler**: [Vite 5](https://vitejs.dev/)
- **Styling**: Pure **Vanilla CSS** with a comprehensive, centralized design system using CSS Variables (`src/index.css`), custom animations, and responsive media queries.
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 📂 Project Structure

```
Prepos/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── index.css                     # Global design variables & reset rules
    ├── main.jsx                      # Application entry point
    ├── InterviewPrepDashboard.jsx     # Main workspace sidebar & router
    ├── InterviewPrepDashboard.css    # Dashboard view layout styles
    │
    # Prep Module Views
    ├── DsaSandboxView.jsx            # DSA compiler & code editor component
    ├── SystemDesignView.jsx          # Architecture workspace component
    ├── BehavioralMockView.jsx        # STAR method behavioral audio simulator
    ├── ResumeGraderView.jsx          # ATS score checker & resume optimizer
    ├── CoursesView.jsx               # Learning tracks list view
    ├── CoursePlayerView.jsx          # Video playback & split-terminal playground
    ├── TutorialsView.jsx             # Cheat sheets & guides
    ├── AptitudeView.jsx              # Logical reasoning interactive quizzes
    ├── LeaderboardView.jsx           # Peer leaderboard & profile badges
    ├── RoadmapView.jsx               # Career roadmap node timeline view
    │
    # Utility Modals & Popups
    ├── CalendarModal.jsx             # Smart calendar agenda view
    ├── PrepPlanSchedulerModal.jsx    # Target study hour weekly planner
    ├── AddAgendaModal.jsx            # Event scheduler dialog
    ├── PracticeStreakModal.jsx       # Analytics dashboard for study sessions
    ├── DailyStreakMilestoneModal.jsx # Visual milestone reward selector
    └── SettingsModal.jsx             # Profile, theme, & notification settings
```

---

## 🚀 Getting Started

Follow these steps to set up and run PrepOS on your local machine:

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v16.x or newer recommended) and [npm](https://www.npmjs.com/) installed.

### Setup Instructions

1. **Clone and navigate to the project directory**:
   ```bash
   cd Prepos
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Access the application**:
   Open [http://localhost:5173](http://localhost:5173) in your web browser.

---

## 🤝 Contributing

Contributions are always welcome! Feel free to open issues or submit pull requests to enhance the interview prep command center modules.

## 📝 License

This project is open-source and available under the [MIT License](LICENSE).
