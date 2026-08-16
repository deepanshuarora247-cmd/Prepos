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
  Lightbulb
} from "lucide-react";

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
    <div className="min-h-screen w-full bg-[#0a0e1a] text-slate-100/90 font-sans antialiased relative">
      {/* Ambient Lighting */}
      <div className="pointer-events-none fixed -top-40 left-1/3 h-[500px] w-[500px] rounded-full bg-emerald-600/10 blur-[150px]" />

      {/* Top Navbar */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0a0e1a]/90 backdrop-blur-md px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onBackToDashboard}
            className="flex items-center gap-2 text-xs font-medium text-neutral-400 hover:text-slate-100 bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg border border-white/10 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Dashboard
          </button>
          <span className="text-neutral-600">/</span>
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <MessagesSquare className="h-4 w-4" />
            </div>
            <h1 className="text-base font-bold text-white tracking-tight">Behavioral Mock AI</h1>
          </div>
        </div>
      </header>

      {!activeScenario ? (
        /* Scenario Selection List */
        <main className="max-w-7xl mx-auto px-6 py-8 relative">
          <div className="mb-8 rounded-3xl border border-white/10 bg-gradient-to-r from-emerald-900/30 via-slate-900/50 to-indigo-900/30 backdrop-blur-md p-8 relative overflow-hidden">
            <div className="relative z-10 max-w-2xl">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                STAR Method Interview Simulator
              </span>
              <h2 className="text-3xl font-extrabold text-white mt-3 tracking-tight">
                AI Behavioral Mock Practice
              </h2>
              <p className="text-sm text-neutral-300 mt-2 leading-relaxed">
                Practice answering behavioral interview questions using the STAR framework. Get instant AI breakdown on Situation, Task, Action, and Result.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BEHAVIORAL_SCENARIOS.map((sc) => (
              <div
                key={sc.id}
                className="rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-md p-6 flex flex-col justify-between hover:border-emerald-500/40 hover:-translate-y-1 transition-all duration-300 group"
              >
                <div>
                  <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full border bg-emerald-500/10 text-emerald-300 border-emerald-500/20">
                    {sc.category}
                  </span>
                  <h3 className="text-lg font-bold text-white mt-3 group-hover:text-emerald-300 transition-colors">
                    {sc.title}
                  </h3>
                  <p className="text-xs text-neutral-300 mt-3 leading-relaxed bg-white/[0.02] p-3 rounded-xl border border-white/5 italic">
                    "{sc.question}"
                  </p>
                </div>

                <button
                  onClick={() => {
                    setSelectedScenarioId(sc.id);
                    setUserResponse("");
                    setStarAnalysis(null);
                  }}
                  className="mt-6 w-full inline-flex items-center justify-center gap-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 transition-colors py-2.5 rounded-xl shadow-[0_0_16px_rgba(16,185,129,0.5)]"
                >
                  <Bot className="h-4 w-4" />
                  Start AI Mock Session
                </button>
              </div>
            ))}
          </div>
        </main>
      ) : (
        /* Active Behavioral Practice View */
        <main className="max-w-5xl mx-auto px-6 py-8 relative space-y-6">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSelectedScenarioId(null)}
              className="text-xs text-neutral-400 hover:text-white flex items-center gap-1 bg-white/5 px-2.5 py-1 rounded border border-white/10"
            >
              <ArrowLeft className="h-3 w-3" /> All Questions
            </button>
            <span className="text-xs text-emerald-400 font-mono">{activeScenario.category}</span>
          </div>

          {/* AI Question Prompt Card */}
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-6 flex items-start gap-4">
            <div className="h-10 w-10 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center shrink-0">
              <Bot className="h-5 w-5 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-emerald-300">AI Mock Interviewer Prompt:</h3>
              <p className="text-base font-medium text-white mt-1 leading-relaxed">
                "{activeScenario.question}"
              </p>
            </div>
          </div>

          {/* Response Textarea */}
          <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-6 space-y-4">
            <div className="flex items-center justify-between text-xs text-neutral-400">
              <span className="flex items-center gap-1.5 font-semibold text-white">
                <User className="h-4 w-4 text-indigo-400" /> Your Response (STAR Method)
              </span>
              <span>Min 50 words recommended</span>
            </div>

            <textarea
              value={userResponse}
              onChange={(e) => setUserResponse(e.target.value)}
              placeholder="Structure your answer: Situation, Task, Action, and Result..."
              className="w-full h-44 bg-black/40 border border-white/10 rounded-xl p-4 text-xs text-slate-100 placeholder-neutral-500 focus:outline-none focus:border-emerald-500 leading-relaxed resize-none font-sans"
            />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-neutral-500 font-mono">
                  {userResponse.trim().split(/\s+/).filter(Boolean).length} words
                </span>
              </div>

              <button
                onClick={handleAnalyzeResponse}
                disabled={isAnalyzing || userResponse.trim().length < 20}
                className="flex items-center gap-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 border border-emerald-500/30 px-5 py-2 rounded-xl shadow-[0_0_16px_rgba(16,185,129,0.5)] transition-all disabled:opacity-50"
              >
                <Sparkles className="h-4 w-4" />
                Analyze Answer with AI
              </button>
            </div>
          </div>

          {/* AI Analysis Feedback Card */}
          {isAnalyzing ? (
            <div className="p-8 text-center text-xs text-emerald-400 flex items-center justify-center gap-2">
              <div className="h-4 w-4 rounded-full border-2 border-emerald-400 border-t-transparent animate-spin" />
              Evaluating STAR Framework alignment and impact metrics...
            </div>
          ) : starAnalysis ? (
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">STAR Evaluation Score</span>
                  <h4 className="text-xl font-bold text-white mt-0.5">FAANG Interview Ready</h4>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-bold text-emerald-400">{starAnalysis.score}</span>
                  <span className="text-xs text-neutral-500"> / 100</span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {Object.entries(starAnalysis.starBreakdown).map(([key, val]) => (
                  <div key={key} className="bg-black/30 p-3 rounded-xl border border-white/10">
                    <span className="text-[10px] uppercase font-bold text-emerald-400">{key}</span>
                    <p className="text-xs font-semibold text-white mt-0.5">{val.status}</p>
                    <p className="text-[11px] text-neutral-400 mt-1">{val.feedback}</p>
                  </div>
                ))}
              </div>

              <div className="bg-black/40 p-4 rounded-xl border border-white/10 space-y-1">
                <span className="text-xs font-bold text-cyan-300 flex items-center gap-1">
                  <Lightbulb className="h-3.5 w-3.5" /> High-Impact Rewrite Suggestion:
                </span>
                <p className="text-xs text-neutral-200 leading-relaxed font-sans">{starAnalysis.improvedSummary}</p>
              </div>
            </div>
          ) : null}
        </main>
      )}
    </div>
  );
}
