import React, { useState } from "react";
import { ArrowLeft, Brain, CheckCircle2, XCircle, Award, Sparkles, Clock, HelpCircle } from "lucide-react";

const APTITUDE_QUESTIONS = [
  {
    id: 1,
    category: "Quantitative Ability",
    question: "A train running at 72 km/hr crosses a platform 160m long in 18 seconds. What is the length of the train in meters?",
    options: ["200m", "240m", "180m", "320m"],
    correctIndex: 0,
    explanation: "Speed in m/s = 72 * (5/18) = 20 m/s. Total distance in 18s = 20 * 18 = 360m. Train length = 360 - 160 = 200m."
  },
  {
    id: 2,
    category: "Logical Reasoning",
    question: "Find the next term in the sequence: 3, 7, 15, 31, 63, ?",
    options: ["127", "125", "128", "129"],
    correctIndex: 0,
    explanation: "Pattern is (x * 2) + 1. 63 * 2 + 1 = 127."
  },
  {
    id: 3,
    category: "Data Interpretation",
    question: "If a company's revenue increased by 25% in Year 1 and decreased by 20% in Year 2, what is the net percentage change in revenue?",
    options: ["0%", "+5%", "-5%", "+2%"],
    correctIndex: 0,
    explanation: "Let initial revenue = 100. Year 1 = 125. Year 2 = 125 * 0.8 = 100. Net change = 0%."
  }
];

export default function AptitudeView({ onBackToDashboard }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const currentQ = APTITUDE_QUESTIONS[currentQuestionIndex];

  const handleSelectOption = (idx) => {
    if (isSubmitted) return;
    setSelectedOption(idx);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null) return;
    setIsSubmitted(true);
    if (selectedOption === currentQ.correctIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setIsSubmitted(false);
    if (currentQuestionIndex + 1 < APTITUDE_QUESTIONS.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setCurrentQuestionIndex(0); // Loop back or finish
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#0a0e1a] text-slate-100/90 font-sans antialiased relative">
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
              <Brain className="h-4 w-4" />
            </div>
            <h1 className="text-base font-bold text-white tracking-tight">Aptitude & Logical Reasoning</h1>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <span className="text-neutral-400">Score: <strong className="text-emerald-400">{score}</strong> / {APTITUDE_QUESTIONS.length}</span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8 relative space-y-6">
        <div className="rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-md p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              {currentQ.category}
            </span>
            <span className="text-xs text-neutral-400 font-mono">
              Question {currentQuestionIndex + 1} of {APTITUDE_QUESTIONS.length}
            </span>
          </div>

          <h3 className="text-lg font-bold text-white leading-relaxed">
            {currentQ.question}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentQ.options.map((opt, idx) => {
              let btnStyle = "bg-white/5 border-white/10 text-neutral-200 hover:border-white/20";
              if (selectedOption === idx) {
                btnStyle = "bg-indigo-600/30 border-indigo-500 text-white";
              }
              if (isSubmitted) {
                if (idx === currentQ.correctIndex) {
                  btnStyle = "bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold";
                } else if (selectedOption === idx) {
                  btnStyle = "bg-rose-500/20 border-rose-500 text-rose-300";
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  className={`p-4 rounded-xl border text-left text-xs font-medium transition-all ${btnStyle}`}
                >
                  <span className="font-mono text-neutral-500 mr-2">{String.fromCharCode(65 + idx)}.</span>
                  {opt}
                </button>
              );
            })}
          </div>

          {isSubmitted && (
            <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/5 text-xs text-emerald-200 leading-relaxed space-y-1">
              <span className="font-bold text-emerald-400 block">Explanation:</span>
              <p>{currentQ.explanation}</p>
            </div>
          )}

          <div className="flex justify-end gap-3 pt-2">
            {!isSubmitted ? (
              <button
                onClick={handleSubmitAnswer}
                disabled={selectedOption === null}
                className="text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 border border-emerald-500/30 px-5 py-2.5 rounded-xl shadow-[0_0_16px_rgba(16,185,129,0.5)] transition-all disabled:opacity-50"
              >
                Submit Answer
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 border border-indigo-500/30 px-5 py-2.5 rounded-xl shadow-[0_0_16px_rgba(99,102,241,0.5)] transition-all"
              >
                Next Question →
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
