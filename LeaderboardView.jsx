import React, { useState } from "react";
import { ArrowLeft, Trophy, Medal, Award, Flame, Search, TrendingUp, Sparkles, UserCheck, Shield } from "lucide-react";

const LEADERBOARD_USERS = [
  {
    rank: 1,
    name: "Aarav Sharma",
    handle: "@aarav_codes",
    company: "Google",
    points: 3450,
    solved: 312,
    streak: 64,
    badge: "Grandmaster"
  },
  {
    rank: 2,
    name: "Sophia Chen",
    handle: "@sophia_dev",
    company: "Meta",
    points: 3210,
    solved: 294,
    streak: 48,
    badge: "Master"
  },
  {
    rank: 3,
    name: "Rohan Patel",
    handle: "@rohan_p",
    company: "Apple",
    points: 2980,
    solved: 275,
    streak: 52,
    badge: "Master"
  },
  {
    rank: 4,
    name: "Maya Lin",
    handle: "@mayacodes",
    company: "Uber",
    points: 2740,
    solved: 248,
    streak: 39,
    badge: "Expert"
  },
  {
    rank: 5,
    name: "David Kim",
    handle: "@dkim_algo",
    company: "Amazon",
    points: 2590,
    solved: 230,
    streak: 31,
    badge: "Expert"
  },
  {
    rank: 6,
    name: "Priya Sundaram",
    handle: "@priya_tech",
    company: "Netflix",
    points: 2410,
    solved: 215,
    streak: 28,
    badge: "Candidate Master"
  },
  {
    rank: 7,
    name: "Lucas Rossi",
    handle: "@lucas_r",
    company: "Stripe",
    points: 2280,
    solved: 198,
    streak: 22,
    badge: "Candidate Master"
  },
  {
    rank: 42,
    name: "Arjun S. (You)",
    handle: "@arjun_prepos",
    company: "PrepOS",
    points: 1950,
    solved: 142,
    streak: 12,
    isUser: true,
    badge: "Knight"
  }
];

export default function LeaderboardView({ onBackToDashboard }) {
  const [timeframe, setTimeframe] = useState("Weekly");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = LEADERBOARD_USERS.filter(
    (u) =>
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.handle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const top1 = LEADERBOARD_USERS.find((u) => u.rank === 1);
  const top2 = LEADERBOARD_USERS.find((u) => u.rank === 2);
  const top3 = LEADERBOARD_USERS.find((u) => u.rank === 3);

  return (
    <div className="min-h-screen w-full bg-[#0a0e1a] text-slate-100/90 font-sans antialiased relative">
      {/* Ambient Lighting */}
      <div className="pointer-events-none fixed -top-40 left-1/3 h-[500px] w-[500px] rounded-full bg-amber-600/10 blur-[150px]" />
      <div className="pointer-events-none fixed bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-indigo-600/10 blur-[150px]" />

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
              <Trophy className="h-4 w-4" />
            </div>
            <h1 className="text-base font-bold text-white tracking-tight">Global Leaderboard</h1>
          </div>
        </div>

        {/* Timeframe Filters */}
        <div className="flex items-center gap-1.5 bg-white/5 p-1 rounded-xl border border-white/10">
          {["Weekly", "Monthly", "All Time"].map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                timeframe === tf
                  ? "bg-amber-500 text-slate-950 font-bold shadow-[0_0_12px_rgba(245,158,11,0.5)]"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8 relative space-y-8 pb-24">
        {/* Podium Top 3 */}
        <div className="grid grid-cols-3 gap-4 md:gap-6 items-end pt-4 max-w-3xl mx-auto">
          {/* 2nd Place */}
          {top2 && (
            <div className="flex flex-col items-center rounded-2xl border border-slate-300/20 bg-slate-900/60 backdrop-blur-md p-5 relative overflow-hidden shadow-xl">
              <div className="absolute top-2 right-2 text-slate-300 font-extrabold text-sm">#2</div>
              <div className="relative">
                <div className="h-16 w-16 rounded-full ring-2 ring-slate-300/60 bg-slate-800 flex items-center justify-center font-extrabold text-xl text-slate-200 shadow-inner">
                  {top2.name.split(" ").map(n => n[0]).join("")}
                </div>
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-slate-300 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full shadow">
                  SILVER
                </span>
              </div>
              <h3 className="text-sm font-bold text-white mt-4 truncate max-w-full">{top2.name}</h3>
              <p className="text-[11px] text-neutral-400 font-mono">{top2.company}</p>
              <div className="mt-3 text-center">
                <span className="text-base font-extrabold text-slate-200">{top2.points.toLocaleString()}</span>
                <span className="text-[10px] text-neutral-500 block">points</span>
              </div>
            </div>
          )}

          {/* 1st Place GOLD */}
          {top1 && (
            <div className="flex flex-col items-center rounded-2xl border border-amber-400/40 bg-gradient-to-b from-amber-500/10 via-slate-900/80 to-slate-900/90 backdrop-blur-md p-6 relative overflow-hidden shadow-[0_0_40px_rgba(245,158,11,0.25)] -translate-y-4">
              <div className="absolute top-2 right-2 text-amber-400 font-extrabold text-base flex items-center gap-1">
                <Trophy className="h-4 w-4 fill-current" /> #1
              </div>
              <div className="relative">
                <div className="h-20 w-20 rounded-full ring-4 ring-amber-400/80 bg-gradient-to-br from-amber-500/20 to-amber-900/40 border border-amber-400/30 flex items-center justify-center font-black text-2xl text-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.6)]">
                  {top1.name.split(" ").map(n => n[0]).join("")}
                </div>
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-amber-400 text-slate-950 text-[10px] font-black px-2.5 py-0.5 rounded-full shadow">
                  GOLD 🥇
                </span>
              </div>
              <h3 className="text-base font-bold text-white mt-4 truncate max-w-full">{top1.name}</h3>
              <p className="text-xs text-amber-300 font-mono font-medium">{top1.company}</p>
              <div className="mt-3 text-center">
                <span className="text-xl font-extrabold text-amber-400">{top1.points.toLocaleString()}</span>
                <span className="text-[10px] text-neutral-400 block">points</span>
              </div>
            </div>
          )}

          {/* 3rd Place */}
          {top3 && (
            <div className="flex flex-col items-center rounded-2xl border border-amber-700/30 bg-slate-900/60 backdrop-blur-md p-5 relative overflow-hidden shadow-xl">
              <div className="absolute top-2 right-2 text-amber-600 font-extrabold text-sm">#3</div>
              <div className="relative">
                <div className="h-16 w-16 rounded-full ring-2 ring-amber-600/60 bg-amber-950 flex items-center justify-center font-extrabold text-xl text-amber-500 shadow-inner">
                  {top3.name.split(" ").map(n => n[0]).join("")}
                </div>
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-amber-700 text-slate-100 text-[10px] font-black px-2 py-0.5 rounded-full shadow">
                  BRONZE
                </span>
              </div>
              <h3 className="text-sm font-bold text-white mt-4 truncate max-w-full">{top3.name}</h3>
              <p className="text-[11px] text-neutral-400 font-mono">{top3.company}</p>
              <div className="mt-3 text-center">
                <span className="text-base font-extrabold text-amber-500">{top3.points.toLocaleString()}</span>
                <span className="text-[10px] text-neutral-500 block">points</span>
              </div>
            </div>
          )}
        </div>

        {/* Search & List Table */}
        <div className="rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-md overflow-hidden shadow-xl">
          <div className="p-4 border-b border-white/10 flex items-center justify-between">
            <div className="relative w-72">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search rankers by name or company..."
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-1.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500"
              />
            </div>
            <span className="text-xs text-neutral-400 font-mono">Showing {filteredUsers.length} Rankers</span>
          </div>

          <div className="grid grid-cols-12 px-6 py-3 border-b border-white/10 text-[11px] font-semibold uppercase tracking-wider text-neutral-400 bg-white/[0.02]">
            <div className="col-span-1">Rank</div>
            <div className="col-span-5 md:col-span-4">Engineer</div>
            <div className="col-span-3 hidden md:block">Company / Affiliation</div>
            <div className="col-span-2">Solved</div>
            <div className="col-span-4 md:col-span-2 text-right">Points</div>
          </div>

          <div className="divide-y divide-white/5">
            {filteredUsers.map((user) => (
              <div
                key={user.rank}
                className={`grid grid-cols-12 px-6 py-3.5 items-center transition-colors ${
                  user.isUser ? "bg-cyan-500/10 border-l-4 border-l-cyan-400" : "hover:bg-white/[0.03]"
                }`}
              >
                <div className="col-span-1 font-mono font-bold text-sm">
                  {user.rank === 1 ? (
                    <span className="text-amber-400">🥇 #1</span>
                  ) : user.rank === 2 ? (
                    <span className="text-slate-300">🥈 #2</span>
                  ) : user.rank === 3 ? (
                    <span className="text-amber-600">🥉 #3</span>
                  ) : (
                    <span className="text-neutral-400">#{user.rank}</span>
                  )}
                </div>

                <div className="col-span-5 md:col-span-4 flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-white/10 border border-white/10 flex items-center justify-center font-bold text-xs text-slate-200 shrink-0 font-mono">
                    {user.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white flex items-center gap-1.5">
                      {user.name}
                      {user.isUser && (
                        <span className="text-[9px] bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 px-1.5 py-0.5 rounded font-mono">YOU</span>
                      )}
                    </p>
                    <span className="text-[10px] text-neutral-400">{user.handle}</span>
                  </div>
                </div>

                <div className="col-span-3 hidden md:block">
                  <span className="text-xs text-neutral-300 bg-white/5 px-2.5 py-1 rounded-lg border border-white/5 font-mono">
                    {user.company}
                  </span>
                </div>

                <div className="col-span-2 text-xs font-mono text-neutral-300 flex items-center gap-1">
                  <span>{user.solved}</span>
                  <Flame className="h-3 w-3 text-orange-400 ml-1" />
                  <span className="text-[10px] text-neutral-500">{user.streak}d</span>
                </div>

                <div className="col-span-4 md:col-span-2 text-right font-mono font-bold text-sm text-amber-400">
                  {user.points.toLocaleString()} pts
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Pinned Bottom User Rank Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-cyan-500/30 bg-[#0a0e1a]/95 backdrop-blur-xl px-8 py-3 flex items-center justify-between shadow-[0_-10px_30px_rgba(0,0,0,0.8)]">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-cyan-400 font-mono uppercase tracking-wider">Your Rank</span>
            <span className="text-lg font-black text-white font-mono bg-cyan-500/20 border border-cyan-500/30 px-2.5 py-0.5 rounded-lg">
              #42
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs text-neutral-300">
            <span className="font-semibold text-white">Arjun S.</span>
            <span className="text-neutral-500">•</span>
            <span className="text-emerald-400 font-mono">Top 5% Globally</span>
          </div>
        </div>

        <div className="flex items-center gap-6 text-xs font-mono">
          <div>
            <span className="text-neutral-400">Solved: </span>
            <span className="text-white font-bold">142</span>
          </div>
          <div>
            <span className="text-neutral-400">Points: </span>
            <span className="text-amber-400 font-bold">1,950 pts</span>
          </div>
        </div>
      </div>
    </div>
  );
}
