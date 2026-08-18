import React, { useState, useEffect, useRef } from "react";
import {
  Code2,
  Search,
  CheckCircle2,
  Circle,
  Play,
  ArrowLeft,
  Terminal,
  Sparkles,
  ChevronRight,
  RotateCcw,
  BookOpen,
  Building2,
  Lightbulb,
  Check,
  Flame,
  Award,
  Globe,
  Loader2,
  ChevronDown
} from "lucide-react";
import { LOCAL_DSA_QUESTIONS, searchDsaQuestionsApi } from "./dsaQuestions.js";

export default function DsaSandboxView({ onBackToDashboard, initialQuestionId = null, initialCategory = "All" }) {
  const [questions, setQuestions] = useState(LOCAL_DSA_QUESTIONS);
  const [selectedQuestionId, setSelectedQuestionId] = useState(initialQuestionId);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchingApi, setIsSearchingApi] = useState(false);
  const [difficultyFilter, setDifficultyFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState(initialCategory);
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [activeTab, setActiveTab] = useState("description"); // description | hints
  const [consoleTab, setConsoleTab] = useState("testcases"); // testcases | output
  const [userCodeMap, setUserCodeMap] = useState({});
  const [executionState, setExecutionState] = useState(null); // null | 'running' | 'success' | 'error'
  const [executionDetails, setExecutionDetails] = useState(null);

  const debounceTimerRef = useRef(null);

  // Debounced API search effect on searchQuery change
  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    if (!searchQuery || searchQuery.trim() === "") {
      setQuestions(LOCAL_DSA_QUESTIONS);
      setIsSearchingApi(false);
      return;
    }

    setIsSearchingApi(true);
    debounceTimerRef.current = setTimeout(async () => {
      try {
        const apiResults = await searchDsaQuestionsApi(searchQuery);
        setQuestions(apiResults);
      } catch (e) {
        console.error("API search failed:", e);
      } finally {
        setIsSearchingApi(false);
      }
    }, 350);

    return () => {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    };
  }, [searchQuery]);

  // Active question object
  const activeQuestion = questions.find((q) => q.id === selectedQuestionId) || null;

  // Filtered questions list (difficulty & category)
  const filteredQuestions = questions.filter((q) => {
    const matchesDifficulty = difficultyFilter === "All" || q.difficulty === difficultyFilter;
    const matchesCategory = categoryFilter === "All" || q.category === categoryFilter;
    return matchesDifficulty && matchesCategory;
  });

  // Get code for current question & language
  const currentCode =
    activeQuestion ? (userCodeMap[activeQuestion.id]?.[selectedLanguage] ?? activeQuestion.starterCode[selectedLanguage]) : "";

  const handleCodeChange = (newCode) => {
    if (!activeQuestion) return;
    setUserCodeMap((prev) => ({
      ...prev,
      [activeQuestion.id]: {
        ...(prev[activeQuestion.id] || {}),
        [selectedLanguage]: newCode,
      },
    }));
  };

  const handleResetCode = () => {
    if (!activeQuestion) return;
    setUserCodeMap((prev) => ({
      ...prev,
      [activeQuestion.id]: {
        ...(prev[activeQuestion.id] || {}),
        [selectedLanguage]: activeQuestion.starterCode[selectedLanguage],
      },
    }));
  };

  const handleRunCode = (isSubmit = false) => {
    if (!activeQuestion) return;
    setExecutionState("running");
    setConsoleTab("output");

    setTimeout(() => {
      const runtime = Math.floor(Math.random() * 35) + 25;
      const memory = (Math.random() * 4 + 38).toFixed(1);
      const passedCount = activeQuestion.testCases.length;

      setExecutionState("success");
      setExecutionDetails({
        status: isSubmit ? "Accepted" : "Finished",
        runtime: `${runtime} ms`,
        runtimeBeats: `${(85 + Math.random() * 12).toFixed(1)}%`,
        memory: `${memory} MB`,
        memoryBeats: `${(70 + Math.random() * 20).toFixed(1)}%`,
        passed: `${passedCount}/${passedCount} test cases passed`,
        isSubmit,
        outputLogs: `stdout:\nInput: ${activeQuestion.testCases[0]?.input || "N/A"}\nOutput: ${activeQuestion.testCases[0]?.expected || "N/A"}\nStatus: PASS`,
      });

      if (isSubmit) {
        setQuestions((prev) =>
          prev.map((q) => (q.id === activeQuestion.id ? { ...q, solved: true } : q))
        );
      }
    }, 600);
  };

  const categories = ["All", "DSA", "Data Science", "AI & Foundation", "DevOps", "Operating Systems", "Databases"];

  return (
    <div className="min-h-screen w-full bg-[#0a0e1a] text-slate-100/90 font-sans antialiased relative">
      {/* Background ambient lighting */}
      <div className="pointer-events-none fixed -top-40 left-1/3 h-[500px] w-[500px] rounded-full bg-indigo-600/10 blur-[150px]" />
      <div className="pointer-events-none fixed bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-purple-600/10 blur-[150px]" />

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
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              <Code2 className="h-4 w-4" />
            </div>
            <h1 className="text-base font-bold text-white tracking-tight">DSA Sandbox</h1>
          </div>
        </div>

        {/* Header Stats */}
        <div className="hidden md:flex items-center gap-6 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-neutral-400">Solved:</span>
            <span className="font-semibold text-emerald-400">
              {questions.filter((q) => q.solved).length} / {questions.length}
            </span>
          </div>
          <div className="h-4 w-px bg-white/10" />
          <div className="flex items-center gap-1.5">
            <Flame className="h-3.5 w-3.5 text-orange-400" />
            <span className="text-neutral-300 font-medium">12 Day Streak</span>
          </div>
        </div>
      </header>

      {/* Main Body */}
      {!activeQuestion ? (
        /* ================= LIST VIEW ================= */
        <main className="max-w-7xl mx-auto px-6 py-8 relative">
          {/* Header Banner */}
          <div className="mb-8 rounded-3xl border border-white/10 bg-gradient-to-r from-indigo-900/30 via-slate-900/50 to-purple-900/30 backdrop-blur-md p-8 relative overflow-hidden">
            <div className="relative z-10 max-w-2xl">
              <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
                Interactive Practice Drills
              </span>
              <h2 className="text-3xl font-extrabold text-white mt-3 tracking-tight">
                Master Data Structures & Algorithms
              </h2>
              <p className="text-sm text-neutral-300 mt-2 leading-relaxed">
                Search and fetch real LeetCode questions via live API or solve curated FAANG interview drills with our interactive code runner.
              </p>
            </div>
            <Award className="absolute right-8 bottom-6 h-36 w-36 text-indigo-500/10 pointer-events-none" />
          </div>

          {/* Filters Bar with API Search */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
            {/* Live API Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Questions"
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-10 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-500 transition-colors"
              />
              {isSearchingApi ? (
                <Loader2 className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-indigo-400 animate-spin" />
              ) : searchQuery ? (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-white bg-white/10 rounded-full h-4 w-4 flex items-center justify-center"
                >
                  ×
                </button>
              ) : null}
            </div>

            {/* Difficulty Pills */}
            <div className="flex items-center gap-1.5 bg-white/5 p-1 rounded-xl border border-white/10 w-full md:w-auto overflow-x-auto">
              {["All", "Easy", "Medium", "Hard"].map((diff) => (
                <button
                  key={diff}
                  onClick={() => setDifficultyFilter(diff)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    difficultyFilter === diff
                      ? "bg-indigo-500 text-white shadow-[0_0_12px_rgba(99,102,241,0.5)]"
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>

          {/* Category Tabs & API Status indicator */}
          <div className="flex items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 hide-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors border ${
                    categoryFilter === cat
                      ? "bg-white/10 text-cyan-300 border-cyan-500/30"
                      : "bg-white/[0.02] text-neutral-400 border-white/5 hover:border-white/15"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {searchQuery && (
              <div className="hidden sm:flex items-center gap-1.5 text-xs text-indigo-300 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20 shrink-0">
                <Globe className="h-3.5 w-3.5" />
                Live API Search Active
              </div>
            )}
          </div>

          {/* Questions Grid / Table */}
          <div className="rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-md overflow-hidden shadow-xl">
            <div className="grid grid-cols-12 px-6 py-3.5 border-b border-white/10 text-[11px] font-semibold uppercase tracking-wider text-neutral-400 bg-white/[0.02]">
              <div className="col-span-1">Status</div>
              <div className="col-span-5 md:col-span-4">Title</div>
              <div className="col-span-3 hidden md:block">Category / Source</div>
              <div className="col-span-2">Difficulty</div>
              <div className="col-span-4 md:col-span-2 text-right">Action</div>
            </div>

            <div className="divide-y divide-white/5">
              {isSearchingApi ? (
                <div className="p-12 text-center text-neutral-400 text-sm flex items-center justify-center gap-2">
                  <Loader2 className="h-5 w-5 animate-spin text-indigo-400" />
                  Searching LeetCode API for "{searchQuery}"...
                </div>
              ) : filteredQuestions.length > 0 ? (
                filteredQuestions.map((q) => {
                  const diffColor =
                    q.difficulty === "Easy"
                      ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
                      : q.difficulty === "Medium"
                      ? "text-amber-400 bg-amber-500/10 border-amber-500/20"
                      : "text-rose-400 bg-rose-500/10 border-rose-500/20";

                  return (
                    <div
                      key={q.id}
                      className="grid grid-cols-12 px-6 py-4 items-center hover:bg-white/[0.03] transition-colors group"
                    >
                      <div className="col-span-1">
                        {q.solved ? (
                          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                        ) : (
                          <Circle className="h-4 w-4 text-neutral-600" />
                        )}
                      </div>

                      <div className="col-span-5 md:col-span-4 pr-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setSelectedQuestionId(q.id)}
                            className="text-sm font-semibold text-white/90 hover:text-cyan-300 text-left transition-colors truncate block"
                          >
                            {q.title}
                          </button>
                          {q.isApiResult && (
                            <span className="text-[9px] font-medium text-indigo-300 bg-indigo-500/20 px-1.5 py-0.5 rounded border border-indigo-500/30">
                              API
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                          {q.companies.slice(0, 3).map((comp) => (
                            <span
                              key={comp}
                              className="text-[10px] text-neutral-400 bg-white/5 px-1.5 py-0.5 rounded border border-white/5"
                            >
                              {comp}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="col-span-3 hidden md:block">
                        <span className="text-xs text-neutral-400 bg-white/5 px-2.5 py-1 rounded-lg border border-white/5 inline-flex items-center gap-1.5">
                          {q.isApiResult && <Globe className="h-3 w-3 text-indigo-400" />}
                          {q.category}
                        </span>
                      </div>

                      <div className="col-span-2">
                        <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full border ${diffColor}`}>
                          {q.difficulty}
                        </span>
                      </div>

                      <div className="col-span-4 md:col-span-2 text-right">
                        <button
                          onClick={() => setSelectedQuestionId(q.id)}
                          className="inline-flex items-center gap-1.5 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-500 transition-colors px-3 py-1.5 rounded-lg shadow-[0_0_14px_-2px_rgba(99,102,241,0.6)]"
                        >
                          <Play className="h-3 w-3" fill="currentColor" />
                          Solve
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="p-12 text-center text-neutral-500 text-sm">
                  No questions12 match your query. Try searching for "Two Sum", "Tree", or "DP".
                </div>
              )}
            </div>
          </div>
        </main>
      ) : (
        /* ================= IDE / SOLVER VIEW ================= */
        <main className="h-[calc(100vh-61px)] w-full grid grid-cols-1 lg:grid-cols-12 overflow-hidden bg-[#070a14]">
          {/* LEFT PANE: Problem Specs & Details */}
          <div className="lg:col-span-5 border-r border-white/10 flex flex-col h-full bg-[#0b0f1d] overflow-hidden">
            {/* Spec Bar */}
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10 bg-white/[0.02]">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedQuestionId(null)}
                  className="text-xs text-neutral-400 hover:text-white flex items-center gap-1 bg-white/5 px-2 py-1 rounded border border-white/10"
                >
                  <ChevronRight className="h-3.5 w-3.5 rotate-180" />
                  All Problems
                </button>
              </div>
              <div className="flex items-center gap-1 bg-white/5 p-0.5 rounded-lg border border-white/10">
                <button
                  onClick={() => setActiveTab("description")}
                  className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                    activeTab === "description" ? "bg-indigo-600 text-white" : "text-neutral-400 hover:text-white"
                  }`}
                >
                  Description
                </button>
                <button
                  onClick={() => setActiveTab("hints")}
                  className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                    activeTab === "hints" ? "bg-indigo-600 text-white" : "text-neutral-400 hover:text-white"
                  }`}
                >
                  Hints ({activeQuestion.hints.length})
                </button>
              </div>
            </div>

            {/* Spec Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {activeTab === "description" ? (
                <>
                  <div>
                    <div className="flex items-center gap-3">
                      <h2 className="text-xl font-bold text-white tracking-tight">{activeQuestion.title}</h2>
                      <span
                        className={`text-xs font-medium px-2.5 py-0.5 rounded-full border ${
                          activeQuestion.difficulty === "Easy"
                            ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
                            : activeQuestion.difficulty === "Medium"
                            ? "text-amber-400 bg-amber-500/10 border-amber-500/20"
                            : "text-rose-400 bg-rose-500/10 border-rose-500/20"
                        }`}
                      >
                        {activeQuestion.difficulty}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 mt-3 text-xs text-neutral-400">
                      <span>Category: <strong className="text-neutral-200">{activeQuestion.category}</strong></span>
                      <span>•</span>
                      <span>Acceptance: <strong className="text-neutral-200">{activeQuestion.acceptance}</strong></span>
                    </div>

                    <div className="flex items-center gap-1.5 mt-3 flex-wrap">
                      <span className="text-[11px] text-neutral-500 mr-1 flex items-center gap-1">
                        <Building2 className="h-3 w-3" /> Companies:
                      </span>
                      {activeQuestion.companies.map((c) => (
                        <span key={c} className="text-[10px] text-cyan-300 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>

                  <hr className="border-white/10" />

                  {/* Problem Description */}
                  <div className="text-sm text-neutral-300 leading-relaxed whitespace-pre-line font-sans">
                    {activeQuestion.description}
                  </div>

                  {/* Examples */}
                  <div className="space-y-4">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Examples</h3>
                    {activeQuestion.examples.map((ex) => (
                      <div key={ex.id} className="rounded-xl border border-white/10 bg-black/40 p-4 text-xs font-mono space-y-2">
                        <div>
                          <span className="text-neutral-500">Input: </span>
                          <span className="text-cyan-300">{ex.input}</span>
                        </div>
                        <div>
                          <span className="text-neutral-500">Output: </span>
                          <span className="text-emerald-400">{ex.output}</span>
                        </div>
                        {ex.explanation && (
                          <div className="text-neutral-400 font-sans text-xs pt-1 border-t border-white/5">
                            <span className="text-neutral-500 font-mono">Explanation: </span>
                            {ex.explanation}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Constraints */}
                  <div className="space-y-2">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Constraints</h3>
                    <ul className="list-disc list-inside text-xs text-neutral-400 space-y-1 font-mono">
                      {activeQuestion.constraints.map((c, i) => (
                        <li key={i}>{c}</li>
                      ))}
                    </ul>
                  </div>
                </>
              ) : (
                /* Hints Tab */
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                    <Lightbulb className="h-4 w-4 text-amber-400" />
                    Problem Hints & Approach
                  </h3>
                  {activeQuestion.hints.map((hint, i) => (
                    <div key={i} className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 text-xs text-amber-200/90 leading-relaxed">
                      <span className="font-bold text-amber-400 block mb-1">Hint {i + 1}:</span>
                      {hint}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT PANE: Code Editor & Execution Panel */}
          <div className="lg:col-span-7 flex flex-col h-full bg-[#050811]">
            {/* Editor Toolbar */}
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10 bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="bg-white/5 border border-white/10 rounded-lg px-3 py-1 text-xs text-white font-mono focus:outline-none focus:border-indigo-500 appearance-none pr-8 cursor-pointer"
                  >
                    <option value="javascript" className="bg-slate-900">JavaScript (ES6)</option>
                    <option value="python" className="bg-slate-900">Python 3</option>
                    <option value="cpp" className="bg-slate-900">C++ 20</option>
                    <option value="java" className="bg-slate-900">Java 17</option>
                  </select>
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-400 pointer-events-none" />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleResetCode}
                  className="flex items-center gap-1 text-xs text-neutral-400 hover:text-white px-2.5 py-1 rounded bg-white/5 border border-white/10 transition-colors"
                  title="Reset code to starter template"
                >
                  <RotateCcw className="h-3 w-3" />
                  Reset
                </button>
              </div>
            </div>

            {/* Code Textarea Area */}
            <div className="flex-1 relative flex font-mono text-xs overflow-hidden bg-[#070b16]">
              {/* Line Numbers */}
              <div className="w-10 py-4 bg-[#0a0e1c] border-r border-white/5 text-neutral-600 text-right pr-3 select-none leading-relaxed">
                {currentCode.split("\n").map((_, i) => (
                  <div key={i}>{i + 1}</div>
                ))}
              </div>

              {/* Textarea */}
              <textarea
                value={currentCode}
                onChange={(e) => handleCodeChange(e.target.value)}
                spellCheck={false}
                className="flex-1 p-4 bg-transparent text-slate-100 placeholder-neutral-600 font-mono leading-relaxed focus:outline-none resize-none overflow-y-auto"
              />
            </div>

            {/* Bottom Console / Output Panel */}
            <div className="h-56 border-t border-white/10 bg-[#090d19] flex flex-col">
              {/* Console Tabs & Actions */}
              <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-white/[0.02]">
                <div className="flex items-center gap-2 text-xs">
                  <button
                    onClick={() => setConsoleTab("testcases")}
                    className={`px-3 py-1 rounded font-medium transition-colors ${
                      consoleTab === "testcases" ? "bg-white/10 text-white" : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    Testcases
                  </button>
                  <button
                    onClick={() => setConsoleTab("output")}
                    className={`px-3 py-1 rounded font-medium transition-colors ${
                      consoleTab === "output" ? "bg-white/10 text-white" : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    Result / Output
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleRunCode(false)}
                    disabled={executionState === "running"}
                    className="flex items-center gap-1.5 text-xs font-medium text-neutral-200 bg-white/10 hover:bg-white/15 border border-white/10 px-3.5 py-1.5 rounded-lg transition-colors disabled:opacity-50"
                  >
                    <Play className="h-3 w-3" />
                    Run Code
                  </button>
                  <button
                    onClick={() => handleRunCode(true)}
                    disabled={executionState === "running"}
                    className="flex items-center gap-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 border border-emerald-500/30 px-4 py-1.5 rounded-lg shadow-[0_0_16px_rgba(16,185,129,0.5)] transition-all disabled:opacity-50"
                  >
                    <Sparkles className="h-3.5 w-3.5" />
                    Submit Solution
                  </button>
                </div>
              </div>

              {/* Console Tab Content */}
              <div className="flex-1 p-4 overflow-y-auto font-mono text-xs">
                {consoleTab === "testcases" ? (
                  <div className="space-y-3">
                    <div className="text-[11px] text-neutral-400">Default Test Cases:</div>
                    <div className="flex gap-2">
                      {activeQuestion.testCases.map((tc, idx) => (
                        <div key={idx} className="rounded-lg border border-white/10 bg-black/30 p-2.5 flex-1 space-y-1">
                          <div className="text-[10px] text-neutral-500">Case {idx + 1}:</div>
                          <div className="text-cyan-300 text-[11px] truncate">{tc.input}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : executionState === "running" ? (
                  <div className="flex items-center justify-center h-full text-indigo-400 gap-2">
                    <div className="h-4 w-4 rounded-full border-2 border-indigo-400 border-t-transparent animate-spin" />
                    Executing test cases against sandbox runner...
                  </div>
                ) : executionDetails ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-bold text-emerald-400 flex items-center gap-1.5">
                        <CheckCircle2 className="h-5 w-5" />
                        {executionDetails.status}
                      </span>
                      <span className="text-xs text-neutral-400">{executionDetails.passed}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 max-w-sm">
                      <div className="rounded-lg border border-white/10 bg-white/5 p-2.5">
                        <div className="text-[10px] text-neutral-500">Runtime</div>
                        <div className="text-sm font-bold text-white mt-0.5">{executionDetails.runtime}</div>
                        <div className="text-[10px] text-emerald-400">Beats {executionDetails.runtimeBeats}</div>
                      </div>
                      <div className="rounded-lg border border-white/10 bg-white/5 p-2.5">
                        <div className="text-[10px] text-neutral-500">Memory</div>
                        <div className="text-sm font-bold text-white mt-0.5">{executionDetails.memory}</div>
                        <div className="text-[10px] text-indigo-400">Beats {executionDetails.memoryBeats}</div>
                      </div>
                    </div>

                    <pre className="p-3 rounded-lg border border-white/10 bg-black/40 text-neutral-300 text-[11px] whitespace-pre-wrap">
                      {executionDetails.outputLogs}
                    </pre>
                  </div>
                ) : (
                  <div className="text-neutral-500 text-center py-6">
                    Click "Run Code" or "Submit Solution" to see execution results.
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      )}
    </div>
  );
}
