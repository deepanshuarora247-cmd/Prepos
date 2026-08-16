import React, { useState } from "react";
import {
  ArrowLeft,
  FileText,
  Upload,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Award,
  Zap,
  RotateCcw,
  Target,
  FileCode
} from "lucide-react";

export default function ResumeGraderView({ onBackToDashboard }) {
  const [resumeText, setResumeText] = useState("");
  const [targetRole, setTargetRole] = useState("Full Stack Engineer");
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);

  const handleScanResume = () => {
    if (!resumeText || resumeText.trim().length < 20) return;
    setIsScanning(true);

    setTimeout(() => {
      setIsScanning(false);
      const overallScore = Math.floor(Math.random() * 12) + 82;
      setScanResult({
        overallScore,
        atsMatch: "88%",
        quantifiableImpact: "78%",
        matchedKeywords: ["React", "TypeScript", "Node.js", "Docker", "AWS", "REST APIs", "PostgreSQL", "System Design"],
        missingKeywords: ["GraphQL", "Kubernetes", "Redis", "CI/CD Pipeline"],
        actionVerbSuggestions: [
          { original: "Worked on backend APIs", suggestion: "Architected 12+ RESTful microservices processing 50k QPS, reducing P99 latency by 35%." },
          { original: "Helped improve frontend performance", suggestion: "Optimized React bundle size by 42% utilizing code-splitting and dynamic imports." }
        ]
      });
    }, 700);
  };

  return (
    <div className="min-h-screen w-full bg-[#0a0e1a] text-slate-100/90 font-sans antialiased relative">
      {/* Ambient Lighting */}
      <div className="pointer-events-none fixed -top-40 right-1/3 h-[500px] w-[500px] rounded-full bg-amber-600/10 blur-[150px]" />

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
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <FileText className="h-4 w-4" />
            </div>
            <h1 className="text-base font-bold text-white tracking-tight">Resume Grader & ATS Scanner</h1>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-5xl mx-auto px-6 py-8 relative space-y-6">
        {/* Banner */}
        <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-amber-900/30 via-slate-900/50 to-indigo-900/30 backdrop-blur-md p-8 relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
              ATS Compatibility Engine
            </span>
            <h2 className="text-3xl font-extrabold text-white mt-3 tracking-tight">
              Resume Grader & Bullet Optimizer
            </h2>
            <p className="text-sm text-neutral-300 mt-2 leading-relaxed">
              Scan your resume against top tech role keywords, calculate ATS pass rate, and rewrite weak bullet points into high-impact metrics.
            </p>
          </div>
        </div>

        {/* Form Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-1 space-y-2">
            <label className="text-xs font-semibold text-neutral-300">Target Role Title</label>
            <select
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
            >
              <option value="Full Stack Engineer">Full Stack Engineer</option>
              <option value="Backend Software Engineer">Backend Software Engineer</option>
              <option value="Frontend Lead Engineer">Frontend Lead Engineer</option>
              <option value="System Architect">System Architect</option>
            </select>
          </div>

          <div className="md:col-span-2 space-y-2">
            <label className="text-xs font-semibold text-neutral-300">Resume Content / Work Experience Bullet Points</label>
            <textarea
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              placeholder="Paste your resume work experience bullet points here..."
              className="w-full h-36 bg-black/40 border border-white/10 rounded-xl p-4 text-xs text-slate-100 placeholder-neutral-500 focus:outline-none focus:border-amber-500 leading-relaxed resize-none font-sans"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleScanResume}
            disabled={isScanning || resumeText.trim().length < 20}
            className="flex items-center gap-2 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-500 border border-amber-500/30 px-6 py-2.5 rounded-xl shadow-[0_0_16px_rgba(245,158,11,0.5)] transition-all disabled:opacity-50"
          >
            <Sparkles className="h-4 w-4" />
            Scan Resume with ATS Engine
          </button>
        </div>

        {/* Scan Results */}
        {isScanning ? (
          <div className="p-8 text-center text-xs text-amber-400 flex items-center justify-center gap-2">
            <div className="h-4 w-4 rounded-full border-2 border-amber-400 border-t-transparent animate-spin" />
            Parsing keywords, quantifying action verbs, and evaluating ATS match score...
          </div>
        ) : scanResult ? (
          <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">Overall ATS Score</span>
                <h4 className="text-xl font-bold text-white mt-0.5">Strong Candidate Profile</h4>
              </div>
              <div className="text-right">
                <span className="text-3xl font-bold text-amber-400">{scanResult.overallScore}</span>
                <span className="text-xs text-neutral-500"> / 100</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-black/30 p-4 rounded-xl border border-white/10 space-y-2">
                <span className="text-xs font-bold text-emerald-400">Matched Key Skills ({scanResult.matchedKeywords.length})</span>
                <div className="flex flex-wrap gap-1.5">
                  {scanResult.matchedKeywords.map((kw) => (
                    <span key={kw} className="text-[10px] text-emerald-300 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-black/30 p-4 rounded-xl border border-white/10 space-y-2">
                <span className="text-xs font-bold text-rose-400">Missing Keywords ({scanResult.missingKeywords.length})</span>
                <div className="flex flex-wrap gap-1.5">
                  {scanResult.missingKeywords.map((kw) => (
                    <span key={kw} className="text-[10px] text-rose-300 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                      + {kw}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bullet Point Rewriter */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">AI Bullet Point Impact Optimizer</h4>
              {scanResult.actionVerbSuggestions.map((item, i) => (
                <div key={i} className="bg-black/40 p-4 rounded-xl border border-white/10 space-y-2 text-xs">
                  <div className="text-neutral-400 line-through">Before: "{item.original}"</div>
                  <div className="text-amber-200 font-medium">After: "{item.suggestion}"</div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </main>
    </div>
  );
}
