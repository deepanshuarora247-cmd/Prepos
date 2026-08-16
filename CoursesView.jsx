import React, { useState } from "react";
import { ArrowLeft, BookOpen, Play, CheckCircle2, Clock, Star, Award, Sparkles, Flame } from "lucide-react";

const COURSES = [
  {
    id: "dsa-deep-dive",
    title: "Data Structures & Algorithms Deep Dive",
    instructor: "Ex-Google Staff Engineer",
    level: "Intermediate to Advanced",
    duration: "24 hours • 82 lessons",
    rating: 4.9,
    enrolled: "14.2k students",
    progress: 45,
    category: "Algorithms",
    description: "Master all core patterns required for Tier-1 coding interviews: Two Pointers, Sliding Window, Dynamic Programming, and Graph Traversals.",
    topics: ["Arrays & HashMaps", "Trees & Graphs", "Dynamic Programming", "Bit Manipulation"]
  },
  {
    id: "system-design-mastery",
    title: "System Design for FAANG Tech Leads",
    instructor: "Principal Architect @ Meta",
    level: "Advanced",
    duration: "18 hours • 54 lessons",
    rating: 4.95,
    enrolled: "9.8k students",
    progress: 20,
    category: "System Design",
    description: "Learn how to architect high-throughput distributed systems handling millions of QPS, database sharding, caching strategies, and event-driven queues.",
    topics: ["Microservices", "Distributed Caching", "Database Sharding", "Event-Driven Queues"]
  },
  {
    id: "llm-ai-engineering",
    title: "Fullstack AI & LLM Engineering 2026",
    instructor: "AI Research Lead @ OpenAI",
    level: "All Levels",
    duration: "16 hours • 48 lessons",
    rating: 4.88,
    enrolled: "18.5k students",
    progress: 70,
    category: "AI & ML",
    description: "Build autonomous AI agents, RAG pipelines, fine-tune models, and integrate vector databases into production web applications.",
    topics: ["RAG Architecture", "Vector DBs (Pinecone/Milvus)", "LangChain & LlamaIndex", "AI Agents"]
  }
];

export default function CoursesView({ onBackToDashboard }) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <div className="min-h-screen w-full bg-[#0a0e1a] text-slate-100/90 font-sans antialiased relative">
      <div className="pointer-events-none fixed -top-40 left-1/3 h-[500px] w-[500px] rounded-full bg-cyan-600/10 blur-[150px]" />

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
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              <BookOpen className="h-4 w-4" />
            </div>
            <h1 className="text-base font-bold text-white tracking-tight">Structured Learning Courses</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 relative space-y-8">
        {/* Banner */}
        <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-cyan-900/30 via-slate-900/50 to-indigo-900/30 backdrop-blur-md p-8 relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
              Curated Video & Interactive Syllabi
            </span>
            <h2 className="text-3xl font-extrabold text-white mt-3 tracking-tight">
              Tech Interview Masterclasses
            </h2>
            <p className="text-sm text-neutral-300 mt-2 leading-relaxed">
              Accelerate your preparation with step-by-step structured courses created by industry staff engineers and AI experts.
            </p>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {COURSES.map((course) => (
            <div
              key={course.id}
              className="rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-md p-6 flex flex-col justify-between hover:border-cyan-500/40 hover:-translate-y-1 transition-all duration-300 group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full border bg-cyan-500/10 text-cyan-300 border-cyan-500/20">
                    {course.category}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-amber-400 font-bold">
                    <Star className="h-3.5 w-3.5 fill-current" />
                    {course.rating}
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {course.title}
                </h3>
                <p className="text-xs text-neutral-400 mt-1">Instructor: {course.instructor}</p>
                <p className="text-xs text-neutral-300 mt-3 leading-relaxed">{course.description}</p>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between text-xs text-neutral-400">
                    <span>Progress</span>
                    <span className="font-semibold text-cyan-300">{course.progress}%</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-white/5 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>
              </div>

              <button className="mt-6 w-full inline-flex items-center justify-center gap-2 text-xs font-semibold text-white bg-cyan-600 hover:bg-cyan-500 transition-colors py-2.5 rounded-xl shadow-[0_0_16px_rgba(6,182,212,0.5)]">
                <Play className="h-3.5 w-3.5" fill="currentColor" />
                {course.progress > 0 ? "Continue Course" : "Enroll Now"}
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
