import React, { useState, useEffect, useRef } from "react";
import {
  ArrowLeft,
  Brain,
  CheckCircle2,
  XCircle,
  Award,
  Sparkles,
  Clock,
  HelpCircle,
  Play,
  RotateCcw,
  BookOpen,
  FileText,
  BarChart3,
  Calculator,
  ChevronRight,
  Bookmark,
  Check,
  AlertCircle
} from "lucide-react";

// ===========================================================================
// QUESTION BANK (12 Questions across Quantitative, Logical, DI)
// ===========================================================================
const APTITUDE_QUESTIONS = [
  {
    id: 1,
    category: "Quantitative Ability",
    question: "A train running at 72 km/hr crosses a platform 160m long in 18 seconds. What is the length of the train in meters?",
    options: ["200m", "240m", "180m", "320m"],
    correctIndex: 0,
    explanation: "Speed in m/s = 72 * (5/18) = 20 m/s. Total distance crossed in 18s = 20 * 18 = 360m. Train length = Total distance - Platform length = 360 - 160 = 200m."
  },
  {
    id: 2,
    category: "Quantitative Ability",
    question: "A and B can complete a project in 15 days and 10 days respectively. They started the work together but A left after 2 days. In how many days will B finish the remaining work?",
    options: ["6 days", "6 2/3 days", "7 days", "8 days"],
    correctIndex: 1,
    explanation: "A's 1-day work = 1/15, B's 1-day work = 1/10.\nCombined 1-day work = 1/15 + 1/10 = 5/30 = 1/6.\nWork done in 2 days = 2 * (1/6) = 1/3.\nRemaining work = 1 - 1/3 = 2/3.\nTime taken by B to finish = (2/3) / (1/10) = 20/3 = 6 2/3 days."
  },
  {
    id: 3,
    category: "Quantitative Ability",
    question: "A bag contains 4 white, 5 red, and 6 blue balls. Three balls are drawn at random. What is the probability that they are of different colors?",
    options: ["24/91", "20/91", "12/91", "4/7"],
    correctIndex: 0,
    explanation: "Total balls = 4 + 5 + 6 = 15.\nTotal ways to choose 3 balls = 15C3 = (15 * 14 * 13) / (3 * 2 * 1) = 455.\nWays to draw one of each color = 4 * 5 * 6 = 120.\nProbability = 120 / 455 = 24 / 91."
  },
  {
    id: 4,
    category: "Quantitative Ability",
    question: "A dealer sells an item at a profit of 20%. If he had bought it at 10% less and sold it for $18 less, he would have gained 25%. What is the cost price of the item?",
    options: ["$200", "$240", "$280", "$320"],
    correctIndex: 1,
    explanation: "Let original CP = 100x. Original SP = 120x.\nNew CP = 90x.\nNew SP at 25% profit = 90x * 1.25 = 112.5x.\nDifference in SP = 120x - 112.5x = 7.5x.\nGiven 7.5x = $18 => x = 2.4.\nOriginal CP = 100x = 100 * 2.4 = $240."
  },
  {
    id: 5,
    category: "Logical Reasoning",
    question: "Find the next term in the sequence: 3, 7, 15, 31, 63, ?",
    options: ["127", "125", "128", "129"],
    correctIndex: 0,
    explanation: "The pattern is (x * 2) + 1. Specifically:\n7 = (3 * 2) + 1\n15 = (7 * 2) + 1\n31 = (15 * 2) + 1\n63 = (31 * 2) + 1\nNext term = (63 * 2) + 1 = 127."
  },
  {
    id: 6,
    category: "Logical Reasoning",
    question: "Pointing to a photograph, Rohit said, 'She is the mother of my father's only granddaughter'. How is the woman in the photograph related to Rohit?",
    options: ["Sister", "Mother", "Wife", "Aunt"],
    correctIndex: 2,
    explanation: "Rohit's father's only granddaughter refers to Rohit's daughter (assuming Rohit is an only son). The mother of Rohit's daughter is Rohit's wife."
  },
  {
    id: 7,
    category: "Logical Reasoning",
    question: "Statements:\nI. All mangoes are golden.\nII. No golden things are sour.\n\nConclusions:\n1. No mangoes are sour.\n2. Some golden things are mangoes.",
    options: [
      "Only conclusion 1 follows",
      "Only conclusion 2 follows",
      "Both conclusions 1 and 2 follow",
      "Neither conclusion follows"
    ],
    correctIndex: 2,
    explanation: "All mangoes are subset of golden. No golden is sour, so no mango can be sour. Thus, conclusion 1 follows. Since all mangoes are golden, some golden items must be mangoes. Thus, conclusion 2 also follows."
  },
  {
    id: 8,
    category: "Logical Reasoning",
    question: "If in a certain code language, STABLE is coded as TUBCMF, how is TARGET written in that code?",
    options: ["UDUIHV", "UBSHFU", "UBUHFS", "UCSHGU"],
    correctIndex: 1,
    explanation: "The coding pattern is +1 for each letter:\nS(+1)->T, T(+1)->U, A(+1)->B, B(+1)->C, L(+1)->M, E(+1)->F.\nApplying this to TARGET:\nT(+1)->U, A(+1)->B, R(+1)->S, G(+1)->H, E(+1)->F, T(+1)->U.\nResult = UBSHFU."
  },
  {
    id: 9,
    category: "Data Interpretation",
    question: "If a company's revenue increased by 25% in Year 1 and decreased by 20% in Year 2, what is the net percentage change in revenue over 2 years?",
    options: ["0%", "+5%", "-5%", "+2%"],
    correctIndex: 0,
    explanation: "Let initial revenue = 100. Year 1 revenue (25% increase) = 125. Year 2 revenue (20% decrease) = 125 * 0.80 = 100. Net change = 0%."
  },
  {
    id: 10,
    category: "Data Interpretation",
    question: "In a pie chart representing a city's total annual budget of $12 million, the sector for Education has an angle of 72 degrees. What amount is allocated for Education?",
    options: ["$2.4 million", "$1.8 million", "$2.0 million", "$2.2 million"],
    correctIndex: 0,
    explanation: "Total angle in a pie chart = 360°.\nEducation share = 72° / 360° = 1/5 = 20%.\nAllocation = 20% of $12 million = 0.20 * 12 = $2.4 million."
  },
  {
    id: 11,
    category: "Data Interpretation",
    question: "A company sells three products: X, Y, and Z. The sales ratio of X:Y:Z in Q1 is 3:4:5. If total sales in Q1 were $240,000, what were the sales of Product Y?",
    options: ["$60,000", "$80,000", "$100,000", "$120,000"],
    correctIndex: 1,
    explanation: "Sum of ratio parts = 3 + 4 + 5 = 12.\nProduct Y's share = 4 / 12 = 1/3.\nSales of Product Y = 1/3 of $240,000 = $80,000."
  },
  {
    id: 12,
    category: "Data Interpretation",
    question: "Consider the following yearly revenue table:\n2023: $120,000\n2024: $150,000\n2025: $180,000\nWhat is the compound annual growth rate (CAGR) from 2023 to 2025?",
    options: ["22.5%", "25.0%", "20.0%", "18.5%"],
    correctIndex: 0,
    explanation: "CAGR = (End Value / Start Value)^(1/years) - 1\nCAGR = (180,000 / 120,000)^(1/2) - 1 = (1.5)^0.5 - 1\nCAGR ≈ 1.2247 - 1 = 22.47% (or approx 22.5%)."
  }
];

export default function AptitudeView({ onBackToDashboard }) {
  // Navigation & Sub-views State
  // 'dashboard' | 'quiz' | 'results'
  const [viewState, setViewState] = useState("dashboard");

  // Selection & Quiz Configuration
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [quizMode, setQuizMode] = useState("practice"); // 'practice' | 'test'

  // Quiz Play States
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({}); // { questionId: selectedIndex }
  const [submittedAnswers, setSubmittedAnswers] = useState({}); // { questionId: boolean } (only for practice mode)
  const [flaggedQuestions, setFlaggedQuestions] = useState(new Set()); // Set of questionIds
  const [timeSpent, setTimeSpent] = useState(0); // in seconds
  const [timeLeft, setTimeLeft] = useState(60); // 60 seconds per question in Timed Test

  // Scratchpad State
  const [scratchpadOpen, setScratchpadOpen] = useState(false);
  const [scratchpadText, setScratchpadText] = useState("");

  // Stats / History (Saved in localStorage or Session)
  const [overallAttempts, setOverallAttempts] = useState(() => {
    const saved = localStorage.getItem("prepos_aptitude_attempts");
    return saved ? JSON.parse(saved) : [];
  });

  const timerRef = useRef(null);
  const totalTimeRef = useRef(null);

  // Filter questions whenever category changes
  const handleStartQuiz = () => {
    const questions = APTITUDE_QUESTIONS.filter(
      (q) => selectedCategory === "All" || q.category === selectedCategory
    );
    setFilteredQuestions(questions);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setSubmittedAnswers({});
    setFlaggedQuestions(new Set());
    setTimeSpent(0);
    setViewState("quiz");

    if (quizMode === "test") {
      setTimeLeft(60); // 60s per question
    }
  };

  // Timer Handlers
  useEffect(() => {
    if (viewState === "quiz") {
      // Total elapsed timer
      totalTimeRef.current = setInterval(() => {
        setTimeSpent((prev) => prev + 1);
      }, 1000);

      // Question countdown timer (Timed Test Mode only)
      if (quizMode === "test") {
        timerRef.current = setInterval(() => {
          setTimeLeft((prev) => {
            if (prev <= 1) {
              // Time's up for current question: skip or auto-submit
              handleNextQuestion();
              return 60;
            }
            return prev - 1;
          });
        }, 1000);
      }
    }

    return () => {
      clearInterval(totalTimeRef.current);
      clearInterval(timerRef.current);
    };
  }, [viewState, currentQuestionIndex, quizMode]);

  const activeQuestion = filteredQuestions[currentQuestionIndex];

  const handleSelectOption = (idx) => {
    if (!activeQuestion) return;
    // In practice mode, don't allow change after checking answer
    if (quizMode === "practice" && submittedAnswers[activeQuestion.id]) return;
    setUserAnswers((prev) => ({ ...prev, [activeQuestion.id]: idx }));
  };

  const handleToggleFlag = () => {
    if (!activeQuestion) return;
    setFlaggedQuestions((prev) => {
      const next = new Set(prev);
      if (next.has(activeQuestion.id)) {
        next.delete(activeQuestion.id);
      } else {
        next.add(activeQuestion.id);
      }
      return next;
    });
  };

  const handleSubmitPracticeAnswer = () => {
    if (!activeQuestion || userAnswers[activeQuestion.id] === undefined) return;
    setSubmittedAnswers((prev) => ({ ...prev, [activeQuestion.id]: true }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < filteredQuestions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
      if (quizMode === "test") {
        setTimeLeft(60);
      }
    } else {
      // Complete quiz
      handleFinishQuiz();
    }
  };

  const handleFinishQuiz = () => {
    clearInterval(totalTimeRef.current);
    clearInterval(timerRef.current);

    // Calculate score
    let score = 0;
    filteredQuestions.forEach((q) => {
      if (userAnswers[q.id] === q.correctIndex) {
        score += 1;
      }
    });

    const newAttempt = {
      date: new Date().toISOString(),
      category: selectedCategory,
      mode: quizMode,
      score,
      total: filteredQuestions.length,
      timeTaken: timeSpent
    };

    const updatedAttempts = [newAttempt, ...overallAttempts].slice(0, 20); // Keep last 20 attempts
    setOverallAttempts(updatedAttempts);
    localStorage.setItem("prepos_aptitude_attempts", JSON.stringify(updatedAttempts));

    setViewState("results");
  };

  // Stats calculation
  const totalCorrect = filteredQuestions.reduce((acc, q) => {
    return userAnswers[q.id] === q.correctIndex ? acc + 1 : acc;
  }, 0);

  const accuracy = filteredQuestions.length > 0 ? Math.round((totalCorrect / filteredQuestions.length) * 100) : 0;

  // Formatting seconds to MM:SS
  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins.toString().padStart(2, "0")}:${remainingSecs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen w-full bg-[#0a0e1a] text-slate-100/90 font-sans antialiased relative overflow-x-hidden">
      {/* Background ambient lighting */}
      <div className="pointer-events-none fixed -top-40 left-1/3 h-[500px] w-[500px] rounded-full bg-emerald-600/10 blur-[150px]" />
      <div className="pointer-events-none fixed bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-indigo-600/10 blur-[150px]" />

      {/* Header bar */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0a0e1a]/90 backdrop-blur-md px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              if (viewState !== "dashboard") {
                setViewState("dashboard");
              } else {
                onBackToDashboard();
              }
            }}
            className="flex items-center gap-2 text-xs font-medium text-neutral-400 hover:text-slate-100 bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg border border-white/10 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            {viewState === "dashboard" ? "Dashboard" : "Back to Settings"}
          </button>
          <span className="text-neutral-600">/</span>
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <Brain className="h-4 w-4" />
            </div>
            <h1 className="text-base font-bold text-white tracking-tight">Aptitude & Logical Suite</h1>
          </div>
        </div>

        {viewState === "quiz" && (
          <div className="flex items-center gap-4">
            {quizMode === "test" && (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-300 font-mono text-xs">
                <Clock className="h-3.5 w-3.5 animate-pulse" />
                <span>Question Limit: {timeLeft}s</span>
              </div>
            )}
            <div className="text-xs font-mono text-neutral-400">
              Session Time: <span className="text-slate-100 font-semibold">{formatTime(timeSpent)}</span>
            </div>
            <button
              onClick={() => setScratchpadOpen(!scratchpadOpen)}
              className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border transition-all ${
                scratchpadOpen
                  ? "bg-emerald-500/20 border-emerald-500 text-emerald-300"
                  : "bg-white/5 border-white/10 text-neutral-400 hover:text-slate-100 hover:bg-white/10"
              }`}
            >
              <Calculator className="h-3.5 w-3.5" />
              Notepad
            </button>
          </div>
        )}
      </header>

      {/* Main Body Grid */}
      <main className="max-w-7xl mx-auto px-6 py-8 relative flex gap-6">
        {/* Left Side: Active Core View */}
        <div className="flex-1 min-w-0">
          {/* ================= VIEW 1: DASHBOARD / SETTINGS ================= */}
          {viewState === "dashboard" && (
            <div className="space-y-8">
              {/* Hero Banner */}
              <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-emerald-950/20 via-slate-900/40 to-indigo-950/20 backdrop-blur-md p-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:30px_30px]" />
                <div className="relative z-10 max-w-2xl">
                  <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                    Aptitude Assessment Center
                  </span>
                  <h2 className="text-3xl font-extrabold text-white mt-4 tracking-tight leading-tight">
                    Upgrade Your Logical Thinking & Analytical Ability
                  </h2>
                  <p className="text-sm text-neutral-400 mt-2.5">
                    Prepare for technical coding interviews, HR aptitude rounds, and system scaling mathematics with our premium interactive mocks.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Settings & Categories Card */}
                <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-slate-900/50 backdrop-blur-md p-6 space-y-6">
                  <h3 className="text-sm font-bold text-white tracking-wide border-b border-white/5 pb-3">
                    Configure Assessment Plan
                  </h3>

                  {/* Category Grid */}
                  <div className="space-y-3">
                    <label className="text-xs font-medium text-neutral-400 uppercase tracking-wider">
                      Select Topic Category
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        {
                          id: "All",
                          label: "All Topics Combined",
                          desc: "Comprehensive mix of quant, logic, and data metrics",
                          count: APTITUDE_QUESTIONS.length
                        },
                        {
                          id: "Quantitative Ability",
                          label: "Quantitative Ability",
                          desc: "Speed, work time, ratios, profit calculations",
                          count: APTITUDE_QUESTIONS.filter((q) => q.category === "Quantitative Ability").length
                        },
                        {
                          id: "Logical Reasoning",
                          label: "Logical Reasoning",
                          desc: "Sequences, relations, syllogisms, and patterns",
                          count: APTITUDE_QUESTIONS.filter((q) => q.category === "Logical Reasoning").length
                        },
                        {
                          id: "Data Interpretation",
                          label: "Data Interpretation",
                          desc: "Pie charts, business growth tables, bar graphs",
                          count: APTITUDE_QUESTIONS.filter((q) => q.category === "Data Interpretation").length
                        }
                      ].map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => setSelectedCategory(cat.id)}
                          className={`p-4 rounded-xl border text-left transition-all relative overflow-hidden group ${
                            selectedCategory === cat.id
                              ? "bg-emerald-500/10 border-emerald-500/80 shadow-[0_0_24px_-8px_rgba(16,185,129,0.4)]"
                              : "bg-white/5 border-white/10 hover:bg-white/[0.08]"
                          }`}
                        >
                          <div className="flex justify-between items-start">
                            <span className="text-sm font-bold text-slate-100">{cat.label}</span>
                            <span className="text-[10px] text-neutral-500 font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10">
                              {cat.count} Questions
                            </span>
                          </div>
                          <p className="text-xs text-neutral-400 mt-1">{cat.desc}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Mode Selection */}
                  <div className="space-y-3 pt-2">
                    <label className="text-xs font-medium text-neutral-400 uppercase tracking-wider block">
                      Select Practice Mode
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <button
                        onClick={() => setQuizMode("practice")}
                        className={`p-4 rounded-xl border text-left transition-all ${
                          quizMode === "practice"
                            ? "bg-indigo-500/10 border-indigo-500/80 shadow-[0_0_24px_-8px_rgba(99,102,241,0.4)]"
                            : "bg-white/5 border-white/10 hover:bg-white/[0.08]"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <BookOpen className="h-4 w-4 text-indigo-400" />
                          <span className="text-sm font-bold text-slate-100">Practice Mode</span>
                        </div>
                        <p className="text-xs text-neutral-400 mt-1.5">
                          No timer. Review step-by-step mathematical explanations instantly after answering each question.
                        </p>
                      </button>

                      <button
                        onClick={() => setQuizMode("test")}
                        className={`p-4 rounded-xl border text-left transition-all ${
                          quizMode === "test"
                            ? "bg-rose-500/10 border-rose-500/80 shadow-[0_0_24px_-8px_rgba(244,63,94,0.4)]"
                            : "bg-white/5 border-white/10 hover:bg-white/[0.08]"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-rose-400" />
                          <span className="text-sm font-bold text-slate-100">Timed Test Mode</span>
                        </div>
                        <p className="text-xs text-neutral-400 mt-1.5">
                          Strict 60s per-question timer. Review final scores and detailed math explanations at the end.
                        </p>
                      </button>
                    </div>
                  </div>

                  {/* Start Button */}
                  <div className="flex justify-end pt-4 border-t border-white/5">
                    <button
                      onClick={handleStartQuiz}
                      className="inline-flex items-center gap-2 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 border border-emerald-500/30 px-6 py-3 rounded-xl shadow-[0_0_24px_-6px_rgba(16,185,129,0.8)] transition-all hover:scale-[1.02]"
                    >
                      <Play className="h-4 w-4" fill="currentColor" />
                      Begin Practice Session
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Right Column: Performance analytics */}
                <div className="space-y-6">
                  {/* General Stats Card */}
                  <div className="rounded-2xl border border-white/10 bg-slate-900/50 backdrop-blur-md p-6 space-y-4">
                    <h3 className="text-sm font-bold text-white tracking-wide border-b border-white/5 pb-3">
                      Performance Summary
                    </h3>

                    {overallAttempts.length === 0 ? (
                      <div className="text-center py-8 text-neutral-500 space-y-2">
                        <BarChart3 className="h-10 w-10 text-neutral-600 mx-auto" />
                        <p className="text-xs">No simulation stats found.</p>
                        <p className="text-[10px] text-neutral-600 max-w-[180px] mx-auto">
                          Complete your first mock session to compile accuracy tracking metrics.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {/* Overall Average Accuracy */}
                        <div className="bg-white/5 rounded-xl p-4 flex items-center justify-between">
                          <div>
                            <span className="text-[10px] uppercase text-neutral-500 tracking-wider font-semibold">
                              Avg. Accuracy
                            </span>
                            <div className="text-3xl font-extrabold text-white mt-0.5">
                              {Math.round(
                                (overallAttempts.reduce((acc, att) => acc + att.score, 0) /
                                  overallAttempts.reduce((acc, att) => acc + att.total, 0)) *
                                  100
                              )}
                              <span className="text-xs text-neutral-500 font-medium ml-0.5">%</span>
                            </div>
                          </div>
                          <Award className="h-10 w-10 text-emerald-400 opacity-80" />
                        </div>

                        {/* Recent Attempts list */}
                        <div className="space-y-2.5">
                          <span className="text-[10px] uppercase text-neutral-400 tracking-wider font-semibold block">
                            Recent Attempts
                          </span>
                          <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                            {overallAttempts.map((attempt, index) => (
                              <div
                                key={index}
                                className="text-xs flex items-center justify-between p-2.5 rounded-lg border border-white/5 bg-white/[0.02]"
                              >
                                <div>
                                  <p className="font-semibold text-slate-100 truncate max-w-[140px]">
                                    {attempt.category === "All" ? "Combined Drill" : attempt.category}
                                  </p>
                                  <span className="text-[10px] text-neutral-500 font-mono">
                                    {attempt.mode === "test" ? "Timed Test" : "Practice"} · {formatTime(attempt.timeTaken)}
                                  </span>
                                </div>
                                <div className="text-right">
                                  <span className="font-bold text-emerald-400">
                                    {attempt.score} / {attempt.total}
                                  </span>
                                  <p className="text-[9px] text-neutral-500 font-mono">
                                    {Math.round((attempt.score / attempt.total) * 100)}% Acc
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================= VIEW 2: ACTIVE QUIZ ARENA ================= */}
          {viewState === "quiz" && activeQuestion && (
            <div className="space-y-6">
              {/* Question header progress */}
              <div className="rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-md p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                    {activeQuestion.category}
                  </span>
                  {flaggedQuestions.has(activeQuestion.id) && (
                    <span className="text-[10px] font-semibold text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 flex items-center gap-1">
                      <Bookmark className="h-3 w-3" fill="currentColor" />
                      Flagged for review
                    </span>
                  )}
                </div>
                <div className="text-xs text-neutral-400 font-mono">
                  Question <strong className="text-white">{currentQuestionIndex + 1}</strong> of {filteredQuestions.length}
                </div>
              </div>

              {/* Core question card */}
              <div className="rounded-2xl border border-white/10 bg-slate-900/40 backdrop-blur-md p-6 space-y-6">
                <div className="space-y-4">
                  <p className="text-[13px] text-neutral-500 font-semibold uppercase tracking-widest font-mono">
                    Problem Statement
                  </p>
                  <h3 className="text-lg font-bold text-white leading-relaxed whitespace-pre-line">
                    {activeQuestion.question}
                  </h3>
                </div>

                {/* Options grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeQuestion.options.map((opt, idx) => {
                    const isSelected = userAnswers[activeQuestion.id] === idx;
                    const hasSubmitted = submittedAnswers[activeQuestion.id];
                    const isCorrect = idx === activeQuestion.correctIndex;

                    let btnStyle = "bg-white/5 border-white/10 text-neutral-200 hover:border-white/20 hover:bg-white/[0.08]";

                    if (isSelected) {
                      btnStyle = "bg-indigo-600/20 border-indigo-500 text-white shadow-[0_0_12px_-4px_rgba(99,102,241,0.5)]";
                    }

                    if (quizMode === "practice" && hasSubmitted) {
                      if (isCorrect) {
                        btnStyle = "bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold";
                      } else if (isSelected) {
                        btnStyle = "bg-rose-500/20 border-rose-500 text-rose-300";
                      } else {
                        btnStyle = "bg-white/5 border-white/10 text-neutral-500 opacity-60 pointer-events-none";
                      }
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelectOption(idx)}
                        disabled={quizMode === "practice" && hasSubmitted}
                        className={`p-4 rounded-xl border text-left text-xs font-semibold transition-all relative flex items-center ${btnStyle}`}
                      >
                        <span className="font-mono text-neutral-500 mr-3 text-sm shrink-0">
                          {String.fromCharCode(65 + idx)}.
                        </span>
                        <span className="flex-1">{opt}</span>
                        {quizMode === "practice" && hasSubmitted && isCorrect && (
                          <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 ml-2" />
                        )}
                        {quizMode === "practice" && hasSubmitted && isSelected && !isCorrect && (
                          <XCircle className="h-4 w-4 text-rose-500 shrink-0 ml-2" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Instant explanation (Practice mode only) */}
                {quizMode === "practice" && submittedAnswers[activeQuestion.id] && (
                  <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-xs text-emerald-200/90 leading-relaxed space-y-1.5 animate-fadeIn">
                    <span className="font-bold text-emerald-400 block text-sm flex items-center gap-1.5">
                      <Sparkles className="h-3.5 w-3.5" />
                      Mathematical Explanation:
                    </span>
                    <p className="whitespace-pre-line">{activeQuestion.explanation}</p>
                  </div>
                )}

                {/* Action buttons */}
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <button
                    onClick={handleToggleFlag}
                    className={`flex items-center gap-1.5 text-xs font-semibold px-4 py-2.5 rounded-xl border transition-all ${
                      flaggedQuestions.has(activeQuestion.id)
                        ? "bg-amber-500/10 border-amber-500 text-amber-300"
                        : "bg-white/5 border-white/10 text-neutral-400 hover:text-slate-100 hover:border-white/20"
                    }`}
                  >
                    <Bookmark className="h-3.5 w-3.5" />
                    {flaggedQuestions.has(activeQuestion.id) ? "Remove flag" : "Flag for review"}
                  </button>

                  <div className="flex gap-3">
                    {/* Submit Answer (only practice mode when not submitted) */}
                    {quizMode === "practice" && !submittedAnswers[activeQuestion.id] && (
                      <button
                        onClick={handleSubmitPracticeAnswer}
                        disabled={userAnswers[activeQuestion.id] === undefined}
                        className="text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 border border-emerald-500/30 px-5 py-2.5 rounded-xl shadow-[0_0_16px_rgba(16,185,129,0.5)] transition-all disabled:opacity-50"
                      >
                        Submit & Validate
                      </button>
                    )}

                    {/* Next Question / Finish */}
                    {(quizMode === "test" || submittedAnswers[activeQuestion.id]) && (
                      <button
                        onClick={handleNextQuestion}
                        className="text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 border border-indigo-500/30 px-5 py-2.5 rounded-xl shadow-[0_0_16px_rgba(99,102,241,0.5)] transition-all flex items-center gap-1.5"
                      >
                        {currentQuestionIndex + 1 < filteredQuestions.length ? (
                          <>
                            Next Question
                            <ChevronRight className="h-3.5 w-3.5" />
                          </>
                        ) : (
                          "Finish Assessment"
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================= VIEW 3: RESULTS SUMMARY ================= */}
          {viewState === "results" && (
            <div className="space-y-8 animate-fadeIn">
              {/* Top Results Card */}
              <div className="rounded-3xl border border-white/10 bg-slate-900/40 backdrop-blur-md p-8 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/[0.04] to-transparent pointer-events-none" />

                <div className="space-y-3 max-w-lg">
                  <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                    Simulation Completed
                  </span>
                  <h2 className="text-3xl font-extrabold text-white tracking-tight">
                    Assessment Report Card
                  </h2>
                  <p className="text-sm text-neutral-400 leading-relaxed">
                    Here is your performance breakdown for the {selectedCategory === "All" ? "Combined Practice" : selectedCategory} module. Re-read explanations below to solidify formulas.
                  </p>
                </div>

                {/* Radial/Gauge Accuracy indicator */}
                <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl px-6 py-4">
                  <div className="h-20 w-20 rounded-full border-4 border-emerald-500/30 flex items-center justify-center relative">
                    {/* Ring glow */}
                    <div className="absolute inset-0 rounded-full border-4 border-emerald-400 border-t-transparent animate-spin-slow opacity-60" />
                    <span className="text-2xl font-black text-white tabular-nums">{accuracy}%</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-500 uppercase tracking-widest block font-bold">Accuracy score</span>
                    <p className="text-sm font-bold text-slate-200 mt-0.5">
                      {totalCorrect} / {filteredQuestions.length} Correct
                    </p>
                    <span className="text-xs text-neutral-400 font-mono">
                      Elapsed Time: {formatTime(timeSpent)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Review Filter Tab bar */}
              <div className="rounded-2xl border border-white/10 bg-slate-900/50 backdrop-blur-md p-6 space-y-6">
                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                  <h3 className="text-sm font-bold text-white tracking-wide">
                    Question-by-Question Diagnostics
                  </h3>
                </div>

                <div className="space-y-6">
                  {filteredQuestions.map((q, idx) => {
                    const userSel = userAnswers[q.id];
                    const isCorrect = userSel === q.correctIndex;

                    return (
                      <div
                        key={q.id}
                        className={`rounded-xl border p-5 space-y-4 transition-all bg-white/[0.01] ${
                          isCorrect ? "border-emerald-500/20" : "border-rose-500/20"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="space-y-1">
                            <span className="text-[10px] font-mono text-neutral-500">
                              Question {idx + 1} · {q.category}
                            </span>
                            <h4 className="text-sm font-bold text-white leading-relaxed">{q.question}</h4>
                          </div>

                          {isCorrect ? (
                            <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-lg flex items-center gap-1 shrink-0">
                              <CheckCircle2 className="h-3.5 w-3.5" />
                              Correct
                            </span>
                          ) : (
                            <span className="text-xs font-semibold text-rose-400 bg-rose-500/10 border border-rose-500/20 px-2.5 py-1 rounded-lg flex items-center gap-1 shrink-0">
                              <XCircle className="h-3.5 w-3.5" />
                              Incorrect
                            </span>
                          )}
                        </div>

                        {/* Options indicators */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          {q.options.map((opt, oIdx) => {
                            let optionStyle = "border-white/5 text-neutral-400 bg-white/[0.01]";
                            if (oIdx === q.correctIndex) {
                              optionStyle = "border-emerald-500/30 text-emerald-300 bg-emerald-500/5 font-semibold";
                            } else if (oIdx === userSel) {
                              optionStyle = "border-rose-500/30 text-rose-300 bg-rose-500/5";
                            }

                            return (
                              <div
                                key={oIdx}
                                className={`p-2.5 rounded-lg border flex items-center gap-2 ${optionStyle}`}
                              >
                                <span className="font-mono text-neutral-500">
                                  {String.fromCharCode(65 + oIdx)}.
                                </span>
                                <span className="flex-1">{opt}</span>
                                {oIdx === q.correctIndex && <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0" />}
                              </div>
                            );
                          })}
                        </div>

                        {/* Explanation */}
                        <div className="p-3.5 rounded-lg border border-white/5 bg-white/[0.02] text-xs text-neutral-300 leading-relaxed">
                          <strong className="text-emerald-400 block mb-1">Mathematical Explanation:</strong>
                          <p>{q.explanation}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
                  <button
                    onClick={() => setViewState("dashboard")}
                    className="text-xs font-bold text-neutral-300 bg-white/5 hover:bg-white/10 border border-white/10 px-5 py-2.5 rounded-xl transition-all"
                  >
                    Back to Settings
                  </button>
                  <button
                    onClick={handleStartQuiz}
                    className="text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 border border-indigo-500/30 px-5 py-2.5 rounded-xl shadow-[0_0_16px_rgba(99,102,241,0.5)] transition-all"
                  >
                    Retry Simulation
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Side Notepad Scratchpad drawer */}
        {viewState === "quiz" && scratchpadOpen && (
          <aside className="w-80 shrink-0 flex flex-col rounded-2xl border border-white/10 bg-slate-900/50 backdrop-blur-md p-4 space-y-4 animate-slideLeft">
            <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
              <div className="flex items-center gap-2 text-xs font-bold text-white">
                <Calculator className="h-4 w-4 text-emerald-400" />
                <span>Scratchpad & Notes</span>
              </div>
              <button
                onClick={() => setScratchpadOpen(false)}
                className="text-[10px] text-neutral-500 hover:text-white px-1.5 py-0.5 rounded bg-white/5"
              >
                Close
              </button>
            </div>

            <textarea
              value={scratchpadText}
              onChange={(e) => setScratchpadText(e.target.value)}
              placeholder="Use this space for calculations or formulas..."
              className="flex-1 w-full bg-[#0a0e1a]/80 text-neutral-200 border border-white/10 rounded-xl p-3 text-xs font-mono focus:outline-none focus:border-emerald-500/50 resize-none placeholder-neutral-600 min-h-[300px]"
            />

            <div className="flex justify-between items-center text-[10px] text-neutral-500">
              <span>Saved in session</span>
              <button
                onClick={() => setScratchpadText("")}
                className="hover:text-rose-400 transition-colors"
              >
                Clear Scratchpad
              </button>
            </div>
          </aside>
        )}
      </main>
    </div>
  );
}
