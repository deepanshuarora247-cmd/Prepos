import React, { useState } from "react";
import { ArrowLeft, BookOpen, Clock, Tag, ChevronRight, Play, FileText, Search } from "lucide-react";

const TUTORIALS = [
  {
    id: "sliding-window-pattern",
    title: "The Ultimate 5-Step Sliding Window Pattern Guide",
    category: "Algorithms",
    readTime: "8 min read",
    type: "Article + Code",
    summary: "Learn how to solve variable and fixed-length sliding window problems in O(N) time with minimal auxiliary space.",
    tags: ["Sliding Window", "Two Pointers", "DSA"]
  },
  {
    id: "system-design-back-of-envelope",
    title: "Back of the Envelope Estimation Cheatsheet 2026",
    category: "System Design",
    readTime: "12 min read",
    type: "Cheatsheet",
    summary: "Quick reference for QPS calculations, latency numbers (L1 cache vs SSD vs Network), and storage estimations.",
    tags: ["Capacity Planning", "Architecture", "SLA"]
  },
  {
    id: "star-method-behavioral",
    title: "Mastering the STAR Method for Behavioral Rounds",
    category: "Career & Mock",
    readTime: "10 min read",
    type: "Video Walkthrough",
    summary: "How to frame technical trade-offs, leadership conflict, and production outage stories with concrete metrics.",
    tags: ["STAR Method", "Behavioral", "FAANG"]
  }
];

export default function TutorialsView({ onBackToDashboard }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTutorials = TUTORIALS.filter((t) =>
    t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen w-full bg-[#0a0e1a] text-slate-100/90 font-sans antialiased relative">
      <div className="pointer-events-none fixed -top-40 left-1/3 h-[500px] w-[500px] rounded-full bg-indigo-600/10 blur-[150px]" />

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
              <FileText className="h-4 w-4" />
            </div>
            <h1 className="text-base font-bold text-white tracking-tight">Tutorials & Blueprints</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 relative space-y-8">
        <div className="mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white">Developer Tutorials & Cheatsheets</h2>
            <p className="text-xs text-neutral-400 mt-1">Deep dives into patterns, architecture blueprints, and interview strategies.</p>
          </div>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tutorials..."
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredTutorials.map((tut) => (
            <div
              key={tut.id}
              className="rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-md p-6 flex flex-col justify-between hover:border-indigo-500/40 hover:-translate-y-1 transition-all duration-300 group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full border bg-indigo-500/10 text-indigo-300 border-indigo-500/20">
                    {tut.category}
                  </span>
                  <span className="text-[11px] text-neutral-400 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {tut.readTime}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
                  {tut.title}
                </h3>
                <p className="text-xs text-neutral-400 mt-2 leading-relaxed">{tut.summary}</p>

                <div className="flex flex-wrap gap-1.5 mt-4">
                  {tut.tags.map((tg) => (
                    <span key={tg} className="text-[10px] text-neutral-400 bg-white/5 px-2 py-0.5 rounded border border-white/5">
                      #{tg}
                    </span>
                  ))}
                </div>
              </div>

              <button className="mt-6 w-full inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors py-2.5 rounded-xl shadow-[0_0_16px_rgba(99,102,241,0.5)]">
                Read Tutorial
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
