import React, { useState } from "react";
import { ArrowLeft, Briefcase, MapPin, DollarSign, Building2, ExternalLink, UserCheck, Sparkles } from "lucide-react";

const JOBS = [
  {
    id: 1,
    title: "Senior Fullstack Engineer (React & Go)",
    company: "Meta",
    location: "Menlo Park, CA (Hybrid)",
    salary: "$195,000 - $260,000 + Equity",
    tags: ["React", "Golang", "Distributed Systems", "Fullstack"],
    referralAvailable: true,
    referrerName: "Siddharth N. (Staff Engineer @ Meta)",
    posted: "2 days ago"
  },
  {
    id: 2,
    title: "Staff Systems Architect",
    company: "Google",
    location: "Mountain View, CA / Remote",
    salary: "$240,000 - $340,000 + GSU",
    tags: ["C++", "Distributed Systems", "Kubernetes", "Linux Kernel"],
    referralAvailable: true,
    referrerName: "Elena V. (Principal Engineer @ Google)",
    posted: "1 day ago"
  },
  {
    id: 3,
    title: "Lead AI Infra Engineer",
    company: "OpenAI",
    location: "San Francisco, CA",
    salary: "$280,000 - $420,000 + Equity",
    tags: ["PyTorch", "CUDA", "GPU Clusters", "Distributed Training"],
    referralAvailable: true,
    referrerName: "Marcus K. (Research Lead @ OpenAI)",
    posted: "3 hours ago"
  }
];

export default function JobsView({ onBackToDashboard }) {
  const [requestedJobId, setRequestedJobId] = useState(null);

  return (
    <div className="min-h-screen w-full bg-[#0a0e1a] text-slate-100/90 font-sans antialiased relative">
      <div className="pointer-events-none fixed -top-40 left-1/3 h-[500px] w-[500px] rounded-full bg-amber-600/10 blur-[150px]" />

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
              <Briefcase className="h-4 w-4" />
            </div>
            <h1 className="text-base font-bold text-white tracking-tight">Tech Job Board & Peer Referrals</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 relative space-y-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white">Curated Tech Roles & Peer Referrals</h2>
          <p className="text-xs text-neutral-400 mt-1">Direct referral access to verified staff engineers at top tech companies.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {JOBS.map((job) => (
            <div
              key={job.id}
              className="rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-md p-6 flex flex-col justify-between hover:border-amber-500/40 hover:-translate-y-1 transition-all duration-300 group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold text-amber-300 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                    {job.company}
                  </span>
                  <span className="text-[10px] text-neutral-400">{job.posted}</span>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                  {job.title}
                </h3>

                <div className="mt-3 space-y-1.5 text-xs text-neutral-400">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-neutral-500" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-mono text-emerald-400">
                    <DollarSign className="h-3.5 w-3.5" />
                    <span>{job.salary}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 mt-4">
                  {job.tags.map((tg) => (
                    <span key={tg} className="text-[10px] text-neutral-400 bg-white/5 px-2 py-0.5 rounded border border-white/5">
                      {tg}
                    </span>
                  ))}
                </div>

                {job.referralAvailable && (
                  <div className="mt-4 p-3 rounded-xl border border-amber-500/20 bg-amber-500/5 text-[11px] text-amber-300/90 flex items-center gap-2">
                    <UserCheck className="h-4 w-4 text-amber-400 shrink-0" />
                    <span>Referral by {job.referrerName}</span>
                  </div>
                )}
              </div>

              <div className="mt-6 flex gap-2">
                <button
                  onClick={() => setRequestedJobId(job.id)}
                  className="flex-1 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-500 border border-amber-500/30 py-2.5 rounded-xl shadow-[0_0_16px_rgba(245,158,11,0.5)] transition-all"
                >
                  {requestedJobId === job.id ? "Referral Requested!" : "Request Referral"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
