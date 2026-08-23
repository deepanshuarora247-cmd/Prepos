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
import "./AptitudeView.css";

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
    explanation: "Let original revenue = 100.\nYear 1 revenue = 100 * 1.25 = 125.\nYear 2 revenue = 125 * 0.80 = 100.\nNet change = 0%."
  }
];

export default function AptitudeView({ onBackToDashboard }) {
  const [viewState, setViewState] = useState("dashboard"); // "dashboard" | "quiz" | "results"
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [quizMode, setQuizMode] = useState("practice"); // "practice" | "test"
  
  const [userAnswers, setUserAnswers] = useState({});
  const [submittedAnswers, setSubmittedAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [flaggedQuestions, setFlaggedQuestions] = useState(new Set());
  
  // Timer states
  const [timeLeft, setTimeLeft] = useState(60);
  const [timeSpent, setTimeSpent] = useState(0);
  const [scratchpadOpen, setScratchpadOpen] = useState(false);
  const [scratchpadText, setScratchpadText] = useState("");
  const [overallAttempts, setOverallAttempts] = useState([]);

  const timerRef = useRef(null);
  const totalTimerRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem("prepos_aptitude_attempts");
    if (saved) {
      try {
        setOverallAttempts(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  const filteredQuestions = React.useMemo(() => {
    return APTITUDE_QUESTIONS.filter(
      (q) => selectedCategory === "All" || q.category === selectedCategory
    );
  }, [selectedCategory]);

  const activeQuestion = filteredQuestions[currentQuestionIndex] || null;

  // Timed session handler
  useEffect(() => {
    if (viewState === "quiz") {
      totalTimerRef.current = setInterval(() => {
        setTimeSpent((t) => t + 1);
      }, 1000);
    } else {
      if (totalTimerRef.current) clearInterval(totalTimerRef.current);
    }
    return () => {
      if (totalTimerRef.current) clearInterval(totalTimerRef.current);
    };
  }, [viewState]);

  useEffect(() => {
    if (viewState === "quiz" && quizMode === "test") {
      setTimeLeft(60);
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleTimeExpiry();
            return 60;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [viewState, currentQuestionIndex, quizMode]);

  const handleTimeExpiry = () => {
    handleNextQuestion();
  };

  const handleStartQuiz = () => {
    setUserAnswers({});
    setSubmittedAnswers({});
    setCurrentQuestionIndex(0);
    setFlaggedQuestions(new Set());
    setTimeSpent(0);
    setViewState("quiz");
  };

  const handleSelectOption = (idx) => {
    if (!activeQuestion) return;
    setUserAnswers((prev) => ({
      ...prev,
      [activeQuestion.id]: idx
    }));
  };

  const handleSubmitPracticeAnswer = () => {
    if (!activeQuestion) return;
    setSubmittedAnswers((prev) => ({
      ...prev,
      [activeQuestion.id]: true
    }));
  };

  const handleToggleFlag = () => {
    if (!activeQuestion) return;
    setFlaggedQuestions((prev) => {
      const updated = new Set(prev);
      if (updated.has(activeQuestion.id)) {
        updated.delete(activeQuestion.id);
      } else {
        updated.add(activeQuestion.id);
      }
      return updated;
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < filteredQuestions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      handleFinishQuiz();
    }
  };

  const handleFinishQuiz = () => {
    setViewState("results");
    
    // Save attempts to local history
    let score = 0;
    filteredQuestions.forEach((q) => {
      if (userAnswers[q.id] === q.correctIndex) {
        score++;
      }
    });

    const newAttempt = {
      category: selectedCategory,
      mode: quizMode,
      score,
      total: filteredQuestions.length,
      timeTaken: timeSpent,
      date: new Date().toLocaleDateString()
    };

    const updatedAttempts = [newAttempt, ...overallAttempts].slice(0, 10);
    setOverallAttempts(updatedAttempts);
    localStorage.setItem("prepos_aptitude_attempts", JSON.stringify(updatedAttempts));
  };

  const totalCorrect = React.useMemo(() => {
    let score = 0;
    filteredQuestions.forEach((q) => {
      if (userAnswers[q.id] === q.correctIndex) {
        score++;
      }
    });
    return score;
  }, [filteredQuestions, userAnswers]);

  const accuracy = filteredQuestions.length > 0 ? Math.round((totalCorrect / filteredQuestions.length) * 100) : 0;

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="aptitude-container">
      {/* Top Navbar */}
      <header className="aptitude-header">
        <div className="aptitude-header-left">
          <button
            onClick={() => {
              if (viewState !== "dashboard") {
                setViewState("dashboard");
              } else {
                onBackToDashboard();
              }
            }}
            className="aptitude-back-btn"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            {viewState === "dashboard" ? "Dashboard" : "Back to Setup"}
          </button>
          <span className="aptitude-header-divider">/</span>
          <div className="aptitude-header-title">
            <div className="q-solve-btn" style={{ padding: "0.25rem 0.5rem", borderRadius: "0.375rem", backgroundColor: "var(--emerald-bg)", color: "var(--emerald-accent)", borderColor: "var(--emerald-border)" }}>
              <Brain className="h-4 w-4" />
            </div>
            <span>Aptitude & Logical Suite</span>
          </div>
        </div>

        {viewState === "quiz" && (
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            {quizMode === "test" && (
              <div className="popover-header-badge" style={{ color: "var(--rose-accent)", backgroundColor: "var(--rose-bg)", borderColor: "var(--rose-border)", display: "flex", gap: "0.25rem" }}>
                <Clock className="h-3.5 w-3.5 animate-pulse" />
                <span>Timer: {timeLeft}s</span>
              </div>
            )}
            <span style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: "var(--text-secondary)" }}>
              Session Time: <strong style={{ color: "#fff" }}>{formatTime(timeSpent)}</strong>
            </span>
            <button
              onClick={() => setScratchpadOpen(!scratchpadOpen)}
              className="sandbox-back-btn"
              style={{ display: "inline-flex", gap: "0.25rem" }}
            >
              <Calculator className="h-3.5 w-3.5" /> Notepad
            </button>
          </div>
        )}
      </header>

      {/* Main Body Layout */}
      <main className="aptitude-main">
        <div className="aptitude-layout-split">
          {/* Left Side: Active Core View */}
          <div className="aptitude-layout-left">
            {/* VIEW 1: DASHBOARD / SETTINGS */}
            {viewState === "dashboard" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                <div className="aptitude-banner">
                  <span className="courses-banner-tag" style={{ color: "var(--emerald-accent)", backgroundColor: "var(--emerald-bg)", borderColor: "var(--emerald-border)" }}>Aptitude Assessment Center</span>
                  <h2 className="courses-banner-title">Upgrade Your Logical Thinking</h2>
                  <p className="courses-banner-desc">
                    Prepare for technical coding interviews, HR aptitude rounds, and system scaling mathematics with our premium interactive mocks.
                  </p>
                </div>

                <div className="sysdesign-nodes-grid" style={{ gridTemplateColumns: "1fr" }}>
                  <div className="aptitude-card">
                    <h3 className="aptitude-card-header">Configure Assessment Plan</h3>

                    {/* Topic Category Selection */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                      <label className="resume-field-lbl">Select Topic Category</label>
                      <div className="sysdesign-nodes-grid" style={{ gap: "0.75rem" }}>
                        {[
                          { id: "All", label: "All Topics Combined", desc: "Comprehensive mix of quant, logic, and metrics", count: APTITUDE_QUESTIONS.length },
                          { id: "Quantitative Ability", label: "Quantitative Ability", desc: "Speed, work time, ratios, profit calculations", count: APTITUDE_QUESTIONS.filter((q) => q.category === "Quantitative Ability").length },
                          { id: "Logical Reasoning", label: "Logical Reasoning", desc: "Sequences, relations, syllogisms, and patterns", count: APTITUDE_QUESTIONS.filter((q) => q.category === "Logical Reasoning").length },
                          { id: "Data Interpretation", label: "Data Interpretation", desc: "Pie charts, business growth tables, graphs", count: APTITUDE_QUESTIONS.filter((q) => q.category === "Data Interpretation").length }
                        ].map((cat) => (
                          <button
                            key={cat.id}
                            onClick={() => setSelectedCategory(cat.id)}
                            className={`aptitude-select-btn ${selectedCategory === cat.id ? "active emerald" : ""}`}
                          >
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
                              <span style={{ fontSize: "13px", fontWeight: "bold", color: "#fff" }}>{cat.label}</span>
                              <span className="q-api-badge" style={{ backgroundColor: "rgba(255,255,255,0.03)" }}>{cat.count} Questions</span>
                            </div>
                            <p style={{ fontSize: "11px", color: "var(--text-secondary)", marginTop: "0.25rem", margin: 0 }}>{cat.desc}</p>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Practice Mode Selector */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                      <label className="resume-field-lbl">Select Practice Mode</label>
                      <div className="sysdesign-nodes-grid" style={{ gap: "0.75rem" }}>
                        <button
                          onClick={() => setQuizMode("practice")}
                          className={`aptitude-select-btn ${quizMode === "practice" ? "active indigo" : ""}`}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
                            <BookOpen className="h-4 w-4 text-indigo-400" />
                            <span style={{ fontSize: "13px", fontWeight: "bold", color: "#fff" }}>Practice Mode</span>
                          </div>
                          <p style={{ fontSize: "11px", color: "var(--text-secondary)", marginTop: "0.25rem", margin: 0 }}>No timer. Instant step-by-step math solutions after answering.</p>
                        </button>

                        <button
                          onClick={() => setQuizMode("test")}
                          className={`aptitude-select-btn ${quizMode === "test" ? "active emerald" : ""}`}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
                            <Clock className="h-4 w-4 text-rose-400" />
                            <span style={{ fontSize: "13px", fontWeight: "bold", color: "#fff" }}>Timed Simulator</span>
                          </div>
                          <p style={{ fontSize: "11px", color: "var(--text-secondary)", marginTop: "0.25rem", margin: 0 }}>60s per-question timer. Review final scores and details at the end.</p>
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={handleStartQuiz}
                      className="sysdesign-audit-btn"
                      style={{ marginTop: "1rem", backgroundColor: "var(--emerald-accent)", borderColor: "var(--emerald-border)", color: "#000" }}
                    >
                      <Play className="h-4 w-4" fill="currentColor" /> Begin Practice Session
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* VIEW 2: ACTIVE QUIZ ARENA */}
            {viewState === "quiz" && activeQuestion && (
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div className="practice-streak-card" style={{ padding: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <span className="q-api-badge" style={{ backgroundColor: "var(--emerald-bg)", color: "var(--emerald-accent)", borderColor: "var(--emerald-border)" }}>{activeQuestion.category}</span>
                    {flaggedQuestions.has(activeQuestion.id) && (
                      <span className="q-api-badge" style={{ backgroundColor: "var(--amber-bg)", color: "var(--amber-accent)", borderColor: "var(--amber-border)" }}>Flagged</span>
                    )}
                  </div>
                  <span className="ide-example-label">Question {currentQuestionIndex + 1} of {filteredQuestions.length}</span>
                </div>

                <div className="practice-streak-card" style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                  <div>
                    <span className="ide-example-label" style={{ fontSize: "9px" }}>PROBLEM STATEMENT</span>
                    <h3 style={{ fontSize: "1.125rem", fontWeight: "bold", color: "#fff", marginTop: "0.25rem", lineHeight: "1.6" }}>{activeQuestion.question}</h3>
                  </div>

                  <div className="sysdesign-nodes-grid" style={{ gap: "0.75rem" }}>
                    {activeQuestion.options.map((opt, idx) => {
                      const isSelected = userAnswers[activeQuestion.id] === idx;
                      const hasSubmitted = submittedAnswers[activeQuestion.id];
                      const isCorrect = idx === activeQuestion.correctIndex;

                      let btnBorderColor = "var(--panel-border)";
                      let btnBg = "rgba(255,255,255,0.02)";

                      if (isSelected) {
                        btnBorderColor = "var(--indigo-border)";
                        btnBg = "rgba(99,102,241,0.15)";
                      }

                      if (quizMode === "practice" && hasSubmitted) {
                        if (isCorrect) {
                          btnBorderColor = "var(--emerald-border)";
                          btnBg = "var(--emerald-bg)";
                        } else if (isSelected) {
                          btnBorderColor = "var(--rose-border)";
                          btnBg = "var(--rose-bg)";
                        }
                      }

                      return (
                        <button
                          key={idx}
                          onClick={() => handleSelectOption(idx)}
                          disabled={quizMode === "practice" && hasSubmitted}
                          className="table-row-item"
                          style={{
                            padding: "1rem",
                            border: `1px solid ${btnBorderColor}`,
                            backgroundColor: btnBg,
                            borderRadius: "0.75rem",
                            cursor: "pointer",
                            gridTemplateColumns: "1fr"
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
                            <span style={{ fontFamily: "var(--font-mono)", color: "var(--text-muted)", marginRight: "0.75rem" }}>{String.fromCharCode(65 + idx)}.</span>
                            <span style={{ fontSize: "12px", color: "#fff", flex: 1, textAlign: "left" }}>{opt}</span>
                            {quizMode === "practice" && hasSubmitted && isCorrect && <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {quizMode === "practice" && submittedAnswers[activeQuestion.id] && (
                    <div className="behavioral-rewrite-panel" style={{ padding: "1rem" }}>
                      <span className="behavioral-rewrite-header" style={{ color: "var(--emerald-accent)" }}>
                        <Sparkles className="h-4 w-4" /> Explanation:
                      </span>
                      <p className="ide-desc-text" style={{ fontSize: "11px", marginTop: "0.25rem" }}>{activeQuestion.explanation}</p>
                    </div>
                  )}

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--panel-border)", paddingTop: "1rem" }}>
                    <button
                      onClick={handleToggleFlag}
                      className="sandbox-back-btn"
                    >
                      <Bookmark className="h-4 w-4" />
                      {flaggedQuestions.has(activeQuestion.id) ? "Remove flag" : "Flag for review"}
                    </button>

                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      {quizMode === "practice" && !submittedAnswers[activeQuestion.id] && (
                        <button
                          onClick={handleSubmitPracticeAnswer}
                          disabled={userAnswers[activeQuestion.id] === undefined}
                          className="sysdesign-audit-btn"
                          style={{ backgroundColor: "var(--emerald-accent)", borderColor: "var(--emerald-border)", color: "#000" }}
                        >
                          Submit & Validate
                        </button>
                      )}

                      {(quizMode === "test" || submittedAnswers[activeQuestion.id]) && (
                        <button
                          onClick={handleNextQuestion}
                          className="sysdesign-audit-btn"
                        >
                          {currentQuestionIndex + 1 < filteredQuestions.length ? "Next Question" : "Finish Assessment"}
                          <ChevronRight className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* VIEW 3: RESULTS SUMMARY */}
            {viewState === "results" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div className="practice-streak-card" style={{ padding: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <span className="popover-header-badge" style={{ color: "var(--emerald-accent)", backgroundColor: "var(--emerald-bg)", borderColor: "var(--emerald-border)" }}>Assessment Completed</span>
                    <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#fff", marginTop: "0.5rem" }}>Assessment Report Card</h2>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <div className="streak-ring-container">
                      <span style={{ fontSize: "1.5rem", fontWeight: "bold", color: "var(--emerald-accent)" }}>{accuracy}%</span>
                    </div>
                    <div>
                      <span className="ide-example-label">ACCURACY</span>
                      <p style={{ color: "#fff", fontWeight: "bold", margin: 0 }}>{totalCorrect} / {filteredQuestions.length} Correct</p>
                    </div>
                  </div>
                </div>

                <div className="practice-streak-card" style={{ padding: "1rem" }}>
                  <h3 className="behavioral-rewrite-header" style={{ color: "var(--indigo-accent)", marginBottom: "0.75rem" }}>Question Diagnostics</h3>

                  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    {filteredQuestions.map((q, idx) => {
                      const userSel = userAnswers[q.id];
                      const isCorrect = userSel === q.correctIndex;

                      return (
                        <div
                          key={q.id}
                          className="table-row-item"
                          style={{
                            padding: "1rem",
                            border: `1px solid ${isCorrect ? "var(--emerald-border)" : "var(--rose-border)"}`,
                            backgroundColor: isCorrect ? "var(--emerald-bg)" : "var(--rose-bg)",
                            borderRadius: "0.75rem",
                            gridTemplateColumns: "1fr",
                            gap: "0.5rem"
                          }}
                        >
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                            <div>
                              <span className="ide-example-label">Question {idx + 1} · {q.category}</span>
                              <p style={{ fontSize: "12px", color: "#fff", fontWeight: "bold", margin: 0 }}>{q.question}</p>
                            </div>
                            <span className="q-api-badge" style={{ backgroundColor: isCorrect ? "var(--emerald-bg)" : "var(--rose-bg)" }}>
                              {isCorrect ? "Correct" : "Incorrect"}
                            </span>
                          </div>

                          <div className="behavioral-rewrite-panel" style={{ marginTop: "0.5rem" }}>
                            <span className="behavioral-rewrite-header" style={{ color: "var(--emerald-accent)" }}>Formula Explanation:</span>
                            <p className="ide-desc-text" style={{ fontSize: "11px", margin: 0 }}>{q.explanation}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem" }}>
                  <button
                    onClick={() => setViewState("dashboard")}
                    className="sandbox-back-btn"
                  >
                    Back to Setup
                  </button>
                  <button
                    onClick={handleStartQuiz}
                    className="sysdesign-audit-btn"
                  >
                    Retry Simulator
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Side Notepad Scratchpad */}
          {viewState === "quiz" && scratchpadOpen && (
            <aside className="aptitude-layout-right">
              <div className="aptitude-notepad-card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--panel-border)", paddingBottom: "0.5rem" }}>
                  <span className="behavioral-rewrite-header" style={{ color: "var(--emerald-accent)" }}><Calculator className="h-4 w-4" /> Scratchpad</span>
                  <button
                    onClick={() => setScratchpadOpen(false)}
                    className="popover-header-badge"
                    style={{ border: "none", cursor: "pointer" }}
                  >
                    Close
                  </button>
                </div>

                <textarea
                  value={scratchpadText}
                  onChange={(e) => setScratchpadText(e.target.value)}
                  placeholder="Use this space for formulas..."
                  className="aptitude-notepad-textarea"
                />

                <button
                  onClick={() => setScratchpadText("")}
                  className="ide-reset-btn"
                  style={{ border: "none", background: "none", fontSize: "10px", color: "var(--rose-accent)", alignSelf: "flex-end" }}
                >
                  Clear Notes
                </button>
              </div>
            </aside>
          )}
        </div>
      </main>
    </div>
  );
}
