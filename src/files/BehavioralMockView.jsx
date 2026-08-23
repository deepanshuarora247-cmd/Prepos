import React, { useState } from "react";
import {
  ArrowLeft,
  MessagesSquare,
  Mic,
  Send,
  Sparkles,
  Award,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  Bot,
  User,
  Flame,
  Lightbulb,
  Loader2
} from "lucide-react";
import "./BehavioralMockView.css";

const BEHAVIORAL_SCENARIOS = [
  {
    id: "conflict",
    title: "Handling Technical Conflict",
    category: "Leadership & Collaboration",
    question: "Tell me about a time when you strongly disagreed with a senior engineer's architectural proposal. How did you handle the situation and what was the resolution?",
    starPrompts: {
      s: "Describe the situation (company, project, conflict).",
      t: "What was your specific task or objective?",
      a: "What concrete actions did you take to resolve it respectfully?",
      r: "What was the measurable outcome or team impact?"
    }
  },
  {
    id: "outage",
    title: "Production Incident Recovery",
    category: "Ownership & Crisis Management",
    question: "Describe a critical production bug or system outage you caused or diagnosed under intense time pressure. What steps did you take to remediate it?",
    starPrompts: {
      s: "Context of the system outage.",
      t: "Your immediate responsibility during the incident.",
      a: "Technical debugging and rollback actions.",
      r: "Post-mortem learnings and preventive safeguards added."
    }
  },
  {
    id: "deadline",
    title: "Navigating Tight Deadlines",
    category: "Execution & Prioritization",
    question: "Give an example of a project where scope crept up significantly close to product launch. How did you prioritize features and deliver successfully?",
    starPrompts: {
      s: "Project scope and impending deadline.",
      t: "Need to cut scope or optimize workflow.",
      a: "Stakeholder alignment and prioritization actions.",
      r: "On-time delivery metrics and user impact."
    }
  }
];

export default function BehavioralMockView({ onBackToDashboard }) {
  const [selectedScenarioId, setSelectedScenarioId] = useState(null);
  const [userResponse, setUserResponse] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [starAnalysis, setStarAnalysis] = useState(null);

  const activeScenario = BEHAVIORAL_SCENARIOS.find((s) => s.id === selectedScenarioId) || null;

  const handleAnalyzeResponse = () => {
    if (!userResponse || userResponse.trim().length < 20) return;
    setIsAnalyzing(true);

    setTimeout(() => {
      setIsAnalyzing(false);
      const score = Math.floor(Math.random() * 10) + 88;
      setStarAnalysis({
        score,
        starBreakdown: {
          situation: { status: "Pass", feedback: "Clear context provided with team setting." },
          task: { status: "Pass", feedback: "Explicitly defined your responsibility." },
          action: { status: "Strong", feedback: "Quantifiable step-by-step technical execution highlighted." },
          result: { status: "Excellent", feedback: "Great metrics included (e.g. reduced latency, team consensus)." }
        },
        improvedSummary: `In my previous role, during a high-stakes migration, I proposed an asynchronous event-driven architecture using Kafka over synchronous REST. I conducted benchmark tests showing a 40% throughput increase, presented data to the tech lead, and achieved 100% test pass rate with zero production downtime.`
      });
    }, 700);
  };

  return (
    <div className="behavioral-container">
      
      <div className="glow-bg-1" style={{ backgroundColor: "rgba(16, 185, 129, 0.08)" }} />

      
      <header className="behavioral-header">
        <div className="behavioral-header-left">
          <button onClick={onBackToDashboard} className="behavioral-back-btn">
            <ArrowLeft className="h-3.5 w-3.5" />
            Dashboard
          </button>
          <span className="behavioral-header-divider">/</span>
          <div className="behavioral-header-title">
            <div className="q-solve-btn" style={{ padding: "0.25rem 0.5rem", borderRadius: "0.375rem", backgroundColor: "var(--emerald-bg)", color: "var(--emerald-accent)", borderColor: "var(--emerald-border)" }}>
              <MessagesSquare className="h-4 w-4" />
            </div>
            <span>Behavioral Mock AI</span>
          </div>
        </div>
      </header>

      {!activeScenario ? (
        
        <main className="behavioral-main">
          <div className="behavioral-banner">
            <div className="behavioral-banner-content">
              <span className="behavioral-banner-tag">
                STAR Method Interview Simulator
              </span>
              <h2 className="behavioral-banner-title">
                AI Behavioral Mock Practice
              </h2>
              <p className="behavioral-banner-desc">
                Practice answering behavioral interview questions using the STAR framework. Get instant AI breakdown on Situation, Task, Action, and Result.
              </p>
            </div>
          </div>

          <div className="behavioral-grid">
            {BEHAVIORAL_SCENARIOS.map((sc) => (
              <div
                key={sc.id}
                className="behavioral-card"
              >
                <div>
                  <span className="behavioral-card-category">
                    {sc.category}
                  </span>
                  <h3 className="behavioral-card-title">
                    {sc.title}
                  </h3>
                  <p className="behavioral-card-question">
                    "{sc.question}"
                  </p>
                </div>

                <button
                  onClick={() => {
                    setSelectedScenarioId(sc.id);
                    setUserResponse("");
                    setStarAnalysis(null);
                  }}
                  className="behavioral-start-btn"
                >
                  <Bot className="h-4 w-4" />
                  Start AI Mock Session
                </button>
              </div>
            ))}
          </div>
        </main>
      ) : (
        
        <main className="behavioral-active-layout">
          <div className="behavioral-active-actions-row">
            <button
              onClick={() => setSelectedScenarioId(null)}
              className="ide-back-to-list-btn"
            >
              <ArrowLeft className="h-3 w-3" /> All Questions
            </button>
            <span className="behavioral-active-category-label">{activeScenario.category}</span>
          </div>

          
          <div className="behavioral-prompt-card">
            <div className="behavioral-prompt-avatar">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <h3 className="behavioral-prompt-title">AI Mock Interviewer Prompt:</h3>
              <p className="behavioral-prompt-text">
                "{activeScenario.question}"
              </p>
            </div>
          </div>

          
          <div className="behavioral-editor-card">
            <div className="behavioral-editor-header">
              <span className="behavioral-editor-label">
                <User className="h-4 w-4" style={{ color: "var(--indigo-accent)" }} /> Your Response (STAR Method)
              </span>
              <span>Min 50 words recommended</span>
            </div>

            <textarea
              value={userResponse}
              onChange={(e) => setUserResponse(e.target.value)}
              placeholder="Structure your answer: Situation, Task, Action, and Result..."
              className="behavioral-textarea-field"
            />

            <div className="behavioral-editor-footer">
              <div className="behavioral-word-counter">
                {userResponse.trim().split(/\s+/).filter(Boolean).length} words
              </div>

              <button
                onClick={handleAnalyzeResponse}
                disabled={isAnalyzing || userResponse.trim().length < 20}
                className="sysdesign-audit-btn"
                style={{ backgroundColor: "var(--emerald-accent)", borderColor: "var(--emerald-border)", boxShadow: "0 0 16px rgba(16, 185, 129, 0.5)" }}
              >
                <Sparkles className="h-4 w-4" />
                Analyze Answer with AI
              </button>
            </div>
          </div>

          
          {isAnalyzing ? (
            <div className="popover-body" style={{ color: "var(--emerald-accent)" }}>
              <Loader2 className="search-loader" style={{ position: "static", margin: "1rem", color: "var(--emerald-accent)" }} />
              Evaluating STAR Framework alignment and impact metrics...
            </div>
          ) : starAnalysis ? (
            <div className="behavioral-eval-card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div className="behavioral-eval-header-title">
                  <span className="popover-header-badge" style={{ color: "var(--emerald-accent)", backgroundColor: "var(--emerald-bg)", borderColor: "var(--emerald-border)", width: "fit-content" }}>STAR Evaluation Score</span>
                  <h4>FAANG Interview Ready</h4>
                </div>
                <div style={{ textAlign: "right" }}>
                  <span style={{ fontSize: "1.875rem", fontWeight: "bold", color: "var(--emerald-accent)" }}>{starAnalysis.score}</span>
                  <span className="ide-example-label"> / 100</span>
                </div>
              </div>

              <div className="behavioral-eval-grid">
                {Object.entries(starAnalysis.starBreakdown).map(([key, val]) => (
                  <div key={key} className="behavioral-eval-pill">
                    <span className="behavioral-eval-pill-lbl">{key}</span>
                    <p className="behavioral-eval-pill-status">{val.status}</p>
                    <p className="behavioral-eval-pill-desc">{val.feedback}</p>
                  </div>
                ))}
              </div>

              <div className="behavioral-rewrite-panel">
                <span className="behavioral-rewrite-header">
                  <Lightbulb className="h-3.5 w-3.5" /> High-Impact Rewrite Suggestion:
                </span>
                <p className="behavioral-rewrite-text">{starAnalysis.improvedSummary}</p>
              </div>
            </div>
          ) : null}
        </main>
      )}
    </div>
  );
}
