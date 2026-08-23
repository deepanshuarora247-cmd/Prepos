import React, { useState, useEffect } from "react";
import { 
  ArrowLeft, Map, CheckCircle2, Circle, Clock, Sparkles, 
  Compass, Terminal, Shield
} from "lucide-react";
import "./RoadmapView.css";

const ROADMAP_TRACKS = [
  {
    id: "frontend",
    title: "Frontend Engineering",
    duration: "5-7 Weeks",
    description: "Master user interfaces, CSS architectures, performance tuning, React render lifecycles, and build pipelines.",
    color: "cyan",
    milestones: [
      {
        id: "fe-1",
        title: "Modern DOM, Semantic HTML & CSS Layouts",
        desc: "Learn layouts with Flexbox and Grid, responsive typography, and advanced styling using TailwindCSS.",
        duration: "1 Week",
        resources: ["TailwindCSS media rules", "Flexbox vs Grid performance"]
      },
      {
        id: "fe-2",
        title: "React Core, State Flow & Performance",
        desc: "Deep dive into virtual DOM diffing, useMemo/useCallback optimizations, and global state (Redux/Zustand).",
        duration: "2 Weeks",
        resources: ["React Fiber reconciler", "Rerender tracking & profiling"]
      },
      {
        id: "fe-3",
        title: "Web Performance, Core Web Vitals & Hydration",
        desc: "Improve LCP, CLS, FID. Master server-side rendering (SSR), static site generation (SSG), and code splitting.",
        duration: "2 Weeks",
        resources: ["Next.js hydration lifecycle", "Dynamic bundle code splitting"]
      },
      {
        id: "fe-4",
        title: "Build Systems, Monorepos & Bundlers",
        desc: "Configure Vite, Webpack, ESLint, and manage dependencies in custom monorepos (Lerna/Nx).",
        duration: "1 Week",
        resources: ["Webpack bundle optimization", "ESModules vs CommonJS"]
      }
    ]
  },
  {
    id: "backend",
    title: "Backend Engineering",
    duration: "6-8 Weeks",
    description: "Build concurrent APIs, secure backend logic, structure database models, and write distributed network systems.",
    color: "indigo",
    milestones: [
      {
        id: "be-1",
        title: "Server Environments & REST/GraphQL API Design",
        desc: "Write high-throughput APIs using Node/Go/Python. Design resilient endpoints, rate limiting, and CORS headers.",
        duration: "1.5 Weeks",
        resources: ["REST design guidelines", "GraphQL queries & resolvers"]
      },
      {
        id: "be-2",
        title: "Relational DBs, Isolation Levels & SQL Optimization",
        desc: "Master PostgreSQL indexes, explain plans, query tuning, transaction safety (ACID), and concurrency controls.",
        duration: "2 Weeks",
        resources: ["DB index B-Trees", "Read Committed vs Serializable"]
      },
      {
        id: "be-3",
        title: "Distributed Caching & Ring Topology",
        desc: "Speed up response cycles using Redis/Memcached. Design Consistent Hashing rings and prevent cache stamps.",
        duration: "2 Weeks",
        resources: ["Consistent hashing nodes", "Write-through vs Write-back caches"]
      },
      {
        id: "be-4",
        title: "Event Pipelines & Message Queues",
        desc: "Leverage message queues (Kafka, RabbitMQ) to decouple heavy computational workloads asynchronously.",
        duration: "1.5 Weeks",
        resources: ["Kafka stream partitions", "At-least-once deliveries"]
      }
    ]
  },
  {
    id: "fullstack",
    title: "Full Stack Development",
    duration: "7-9 Weeks",
    description: "Align client interfaces and servers, implement secure authentication, and orchestrate automated deployments.",
    color: "purple",
    milestones: [
      {
        id: "fs-1",
        title: "Client-Server Authentication & Sessions",
        desc: "Build secure authentication flows using JWT, sessions, cookie stores, OAuth2, and security headers.",
        duration: "2 Weeks",
        resources: ["CSRF & XSS prevention", "OAuth2 authorization code flow"]
      },
      {
        id: "fs-2",
        title: "Data Syncing, ORMs & Schema Migrations",
        desc: "Sync database schemas with code using Prisma or Mongoose, handling migration scripts without downtime.",
        duration: "2 Weeks",
        resources: ["Prisma schema relationships", "Zero-downtime database updates"]
      },
      {
        id: "fs-3",
        title: "Full-Stack Frameworks & Server Actions",
        desc: "Integrate Next.js Server Components, Server Actions, and client caching mechanisms.",
        duration: "2 Weeks",
        resources: ["React Server Components layout", "Vercel serverless functions"]
      },
      {
        id: "fs-4",
        title: "Containerization, CI/CD & Deployments",
        desc: "Dockerize apps, compile multi-stage builds, and configure GitHub Actions pipelines for automated cloud hosting.",
        duration: "1.5 Weeks",
        resources: ["Docker multi-stage builds", "GitHub Actions deploy scripts"]
      }
    ]
  },
  {
    id: "aiml",
    title: "AI & Machine Learning",
    duration: "8-10 Weeks",
    description: "Deep dive into model architectures, vector embeddings, fine-tuning techniques, and autonomous AI agents.",
    color: "emerald",
    milestones: [
      {
        id: "ai-1",
        title: "Python ML Core Stack & Data Processing",
        desc: "Master array operations in NumPy, data transformation in Pandas, and classical ML models in Scikit-Learn.",
        duration: "2 Weeks",
        resources: ["NumPy matrix dot products", "Pandas query vector filtering"]
      },
      {
        id: "ai-2",
        title: "Neural Networks & Deep Learning Core",
        desc: "Train feedforward networks, configure activation layers, and compute backpropagation steps using PyTorch.",
        duration: "2.5 Weeks",
        resources: ["PyTorch tensors operations", "Loss function gradient updates"]
      },
      {
        id: "ai-3",
        title: "RAG Architectures, Vector DBs & LLMs",
        desc: "Build Retrieval-Augmented Generation pipelines using LangChain, query Pinecone/Chroma, and manage context windows.",
        duration: "2.5 Weeks",
        resources: ["Cosine similarity vector search", "Prompt template context loading"]
      },
      {
        id: "ai-4",
        title: "MLOps, Model Deployment & Optimization",
        desc: "Deploy neural nets for inference, write REST APIs for prediction outputs, and optimize models (quantization/ONNX).",
        duration: "2 Weeks",
        resources: ["ONNX runtime model exports", "FastAPI model prediction endpoints"]
      }
    ]
  },
  {
    id: "dsa",
    title: "Algorithms & Practice",
    duration: "4-6 Weeks",
    description: "Master patterns for Tier-1 coding interviews: from sliding windows to dynamic programming.",
    color: "cyan",
    milestones: [
      {
        id: "dsa-1",
        title: "Arrays, HashMaps & Two Pointers",
        desc: "Learn to reduce O(N^2) checks to O(N) using optimal sliding window boundaries.",
        duration: "1 Week",
        resources: ["Fixed vs Dynamic window patterns", "Map frequencies frequency counts"]
      },
      {
        id: "dsa-2",
        title: "Graphs, Cycles & Topological Sort",
        desc: "Cycle detection inside directed dependency graphs using Kahn's BFS algorithm.",
        duration: "1.5 Weeks",
        resources: ["Kahn's Algorithm theory", "DFS recursive backtracks"]
      },
      {
        id: "dsa-3",
        title: "Dynamic Programming Patterns",
        desc: "Build optimized grid memoization models for knapsack and subsequence constraints.",
        duration: "2 Weeks",
        resources: ["Bottom-up grid state compression", "Iterative DP vs Memoization"]
      }
    ]
  },
  {
    id: "sysdesign",
    title: "Scalable System Design",
    duration: "3-4 Weeks",
    description: "Architect distributed systems handling millions of QPS, failovers, and caching strategies.",
    color: "indigo",
    milestones: [
      {
        id: "sys-1",
        title: "Consistent Hashing Ring & Hot Spots",
        desc: "Scale database and caches with virtual nodes to balance node distributions.",
        duration: "1 Week",
        resources: ["Virtual server replication ring", "MD5 ring node hashes"]
      },
      {
        id: "sys-2",
        title: "Distributed Databases & Sharding",
        desc: "Handle replication lag, leader elections, and key partition strategies.",
        duration: "1 Week",
        resources: ["CAP theorem trade-offs", "Primary-Secondary database sync"]
      },
      {
        id: "sys-3",
        title: "Message Queues & Event Pipelines",
        desc: "Optimize high-throughput ingestion rates using event-driven architectures.",
        duration: "1 Week",
        resources: ["Kafka topic partition logic", "At-least-once message delivery"]
      }
    ]
  }
];

export default function RoadmapView({ onBackToDashboard }) {
  const [activeTrack, setActiveTrack] = useState("frontend");
  const [completedMilestones, setCompletedMilestones] = useState(() => {
    try {
      const saved = localStorage.getItem("prepos_completed_roadmap_milestones");
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem("prepos_completed_roadmap_milestones", JSON.stringify(completedMilestones));
  }, [completedMilestones]);

  const toggleMilestone = (id) => {
    setCompletedMilestones(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const currentTrack = ROADMAP_TRACKS.find(t => t.id === activeTrack);

  
  const totalMilestones = ROADMAP_TRACKS.reduce((acc, t) => acc + t.milestones.length, 0);
  const completedCount = Object.values(completedMilestones).filter(Boolean).length;
  const overallProgress = totalMilestones > 0 ? Math.round((completedCount / totalMilestones) * 100) : 0;

  return (
    <div className="roadmap-container">
      
      <div className="glow-blur-top" />
      <div className="glow-blur-bottom" />

      
      <header className="roadmap-header">
        <div className="header-left">
          <button onClick={onBackToDashboard} className="back-button">
            <ArrowLeft className="h-3.5 w-3.5" />
            Dashboard
          </button>
          <span className="divider-slash">/</span>
          <div className="title-badge-group">
            <div className="title-icon-container">
              <Map className="h-4 w-4" />
            </div>
            <h1 className="roadmap-title">Tech Masterclass Roadmap</h1>
          </div>
        </div>

        <div className="header-right">
          <span className="stats-label">Total Milestones Achieved:</span>
          <span className="stats-value-badge">
            {completedCount} / {totalMilestones} ({overallProgress}%)
          </span>
        </div>
      </header>

      <main className="roadmap-main">
        
        
        <div className="intro-banner">
          <div className="intro-content">
            <div className="banner-badges">
              <span className="banner-badge-cyan">Preparation Blueprint</span>
              <span className="banner-badge-indigo">Interactive Timeline</span>
            </div>
            <h2 className="banner-heading">Your Career Prep Roadmap</h2>
            <p className="banner-description">
              Follow this step-by-step master plan designed by veteran interviewers. Track your milestones dynamically to monitor your interview readiness.
            </p>
          </div>

          <div className="progress-card">
            <div className="progress-card-info">
              <span>Overall Progress</span>
              <span className="progress-percent-label">{overallProgress}%</span>
            </div>
            <div className="progress-track-bg">
              <div 
                className="progress-bar-fill"
                style={{ width: `${overallProgress}%` }}
              />
            </div>
          </div>
        </div>

        
        <div className="tabs-container">
          {ROADMAP_TRACKS.map(track => {
            const isActive = activeTrack === track.id;
            const completedInTrack = track.milestones.filter(m => completedMilestones[m.id]).length;
            const trackProgress = Math.round((completedInTrack / track.milestones.length) * 100);

            return (
              <button
                key={track.id}
                onClick={() => setActiveTrack(track.id)}
                className={`tab-button ${isActive ? "tab-button-active" : "tab-button-inactive"}`}
              >
                <span>{track.title}</span>
                <span className={`tab-badge ${isActive ? "tab-badge-active" : "tab-badge-inactive"}`}>
                  {trackProgress}%
                </span>
              </button>
            );
          })}
        </div>

        
        <div className="content-grid">
          
          
          <div className="timeline-column">
            {currentTrack.milestones.map((milestone, idx) => {
              const isCompleted = !!completedMilestones[milestone.id];
              return (
                <div key={milestone.id} className="milestone-item">
                  
                  <button
                    onClick={() => toggleMilestone(milestone.id)}
                    className={`milestone-node ${isCompleted ? "node-active" : "node-inactive"}`}
                  >
                    {isCompleted ? <CheckCircle2 className="h-4 w-4 stroke-[3]" /> : <Circle className="h-3 w-3" />}
                  </button>

                  
                  <div className={`milestone-card ${isCompleted ? "milestone-card-active" : ""}`}>
                    <div className="card-top">
                      <div>
                        <div className="milestone-tag-row">
                          <span className="milestone-badge-number">
                            Milestone 0{idx + 1}
                          </span>
                          <span className="duration-tag">
                            <Clock className="h-3 w-3" />
                            {milestone.duration}
                          </span>
                        </div>
                        <h3 className={`milestone-title ${isCompleted ? "title-line-through" : ""}`}>
                          {milestone.title}
                        </h3>
                        <p className="milestone-desc">
                          {milestone.desc}
                        </p>
                      </div>

                      <button
                        onClick={() => toggleMilestone(milestone.id)}
                        className={`milestone-action-btn ${isCompleted ? "action-btn-complete" : "action-btn-incomplete"}`}
                      >
                        {isCompleted ? "Done" : "Mark Achieved"}
                      </button>
                    </div>

                    
                    <div className="resources-divider">
                      <h4 className="resources-heading">Key Study Areas:</h4>
                      <div className="resources-grid">
                        {milestone.resources.map((res, rIdx) => (
                          <div key={rIdx} className="resource-item">
                            <Terminal className="h-3.5 w-3.5 resource-icon" />
                            <span className="resource-text">{res}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          
          <div className="sidebar-column">
            <div className="sidebar-box">
              <h3 className="sidebar-box-heading">
                <Compass className="h-4 w-4 icon-cyan" />
                Prep Guidance
              </h3>
              <p className="sidebar-box-desc">
                Consistency beats cramming. Dedicate 2-3 hours daily. Complete all modules step-by-step, starting with algorithms, moving to distributed database design, and finishing with mock storytelling templates.
              </p>
              
              <div className="sidebar-alert-box">
                <Sparkles className="h-5 w-5 icon-cyan" />
                <div>
                  <h4 className="alert-heading">Daily Streak Active</h4>
                  <p className="alert-desc">Solve a problem every day to maintain streak multiplier multipliers.</p>
                </div>
              </div>
            </div>

            <div className="sidebar-box">
              <h3 className="sidebar-box-heading">
                <Shield className="h-4 w-4 icon-indigo" />
                Roadmap Overview
              </h3>
              <div className="sidebar-list">
                {ROADMAP_TRACKS.map(t => {
                  const completed = t.milestones.filter(m => completedMilestones[m.id]).length;
                  return (
                    <div key={t.id} className="sidebar-list-row">
                      <span className="sidebar-list-label">{t.title}</span>
                      <span className="sidebar-list-badge">
                        {completed} / {t.milestones.length}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

        </div>

      </main>
    </div>
  );
}
