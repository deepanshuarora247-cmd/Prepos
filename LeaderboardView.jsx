import React, { useState, useEffect } from "react";
import {
  ArrowLeft, Trophy, Flame, Search, TrendingUp, TrendingDown,
  Sparkles, Shield, Target, Code2, Zap, Crown, Star,
  ChevronUp, ChevronDown, Minus, Award, Users, Globe,
  Activity, BarChart3, Cpu, Brain, GitBranch, Clock
} from "lucide-react";

// ─── Data ──────────────────────────────────────────────────────────────────
const BADGE_CONFIG = {
  "Grandmaster": { color: "text-rose-400", bg: "bg-rose-500/10", border: "border-rose-500/30", glow: "shadow-[0_0_20px_rgba(244,63,94,0.4)]", icon: Crown },
  "Master":      { color: "text-violet-400", bg: "bg-violet-500/10", border: "border-violet-500/30", glow: "shadow-[0_0_16px_rgba(167,139,250,0.3)]", icon: Shield },
  "Expert":      { color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/30", glow: "", icon: Star },
  "Candidate Master": { color: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/30", glow: "", icon: Award },
  "Knight":      { color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/30", glow: "", icon: Zap },
  "Apprentice":  { color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/30", glow: "", icon: Target },
};

const LEADERBOARD_USERS = [
  { rank: 1, prev: 1, name: "Aarav Sharma",    handle: "@aarav_codes",   company: "Google",    points: 3450, solved: 312, streak: 64, badge: "Grandmaster", dsa: 94, system: 88, behavioral: 76, country: "🇮🇳" },
  { rank: 2, prev: 3, name: "Sophia Chen",     handle: "@sophia_dev",    company: "Meta",      points: 3210, solved: 294, streak: 48, badge: "Master",      dsa: 90, system: 82, behavioral: 80, country: "🇺🇸" },
  { rank: 3, prev: 2, name: "Rohan Patel",     handle: "@rohan_p",       company: "Apple",     points: 2980, solved: 275, streak: 52, badge: "Master",      dsa: 87, system: 91, behavioral: 70, country: "🇮🇳" },
  { rank: 4, prev: 4, name: "Maya Lin",        handle: "@mayacodes",     company: "Uber",      points: 2740, solved: 248, streak: 39, badge: "Expert",      dsa: 82, system: 78, behavioral: 85, country: "🇨🇳" },
  { rank: 5, prev: 7, name: "David Kim",       handle: "@dkim_algo",     company: "Amazon",    points: 2590, solved: 230, streak: 31, badge: "Expert",      dsa: 79, system: 74, behavioral: 78, country: "🇰🇷" },
  { rank: 6, prev: 5, name: "Priya Sundaram",  handle: "@priya_tech",    company: "Netflix",   points: 2410, solved: 215, streak: 28, badge: "Candidate Master", dsa: 74, system: 70, behavioral: 88, country: "🇮🇳" },
  { rank: 7, prev: 6, name: "Lucas Rossi",     handle: "@lucas_r",       company: "Stripe",    points: 2280, solved: 198, streak: 22, badge: "Candidate Master", dsa: 70, system: 65, behavioral: 72, country: "🇧🇷" },
  { rank: 8, prev: 10,name: "Yuki Tanaka",     handle: "@yuki_dev",      company: "DeepMind",  points: 2100, solved: 180, streak: 18, badge: "Candidate Master", dsa: 68, system: 72, behavioral: 65, country: "🇯🇵" },
  { rank: 9, prev: 8, name: "Fatima Al-Hassan",handle: "@fatima_h",      company: "Microsoft", points: 1990, solved: 165, streak: 15, badge: "Knight",      dsa: 62, system: 60, behavioral: 74, country: "🇦🇪" },
  { rank: 42, prev: 45, name: "Arjun S. (You)", handle: "@arjun_prepos", company: "PrepOS",    points: 1950, solved: 142, streak: 12, badge: "Knight", dsa: 58, system: 55, behavioral: 70, country: "🇮🇳", isUser: true },
];

const ACTIVITY_FEED = [
  { name: "Aarav Sharma",   action: "solved Hard: Longest Consecutive Sequence",  time: "2m ago",  icon: Code2,  color: "text-rose-400" },
  { name: "Sophia Chen",    action: "completed System Design: Design Uber",         time: "8m ago",  icon: Brain,  color: "text-violet-400" },
  { name: "David Kim",      action: "achieved 31-day streak 🔥",                   time: "15m ago", icon: Flame,  color: "text-orange-400" },
  { name: "Maya Lin",       action: "aced Behavioral Mock: Amazon LP",              time: "22m ago", icon: Zap,    color: "text-amber-400" },
  { name: "Lucas Rossi",    action: "solved Medium: LRU Cache",                    time: "34m ago", icon: Cpu,    color: "text-cyan-400" },
  { name: "Yuki Tanaka",    action: "submitted Resume to DeepMind",                time: "1h ago",  icon: Target, color: "text-emerald-400" },
];

const STAT_CARDS = [
  { label: "Active Coders",  value: "12,847", sub: "+248 today",  icon: Users,    color: "text-cyan-400",   bg: "from-cyan-500/10" },
  { label: "Problems Solved",value: "89,204", sub: "this week",   icon: Code2,    color: "text-violet-400", bg: "from-violet-500/10" },
  { label: "Mock Interviews",value: "3,512",  sub: "this month",  icon: Activity, color: "text-emerald-400",bg: "from-emerald-500/10" },
  { label: "Offers Received",value: "1,204",  sub: "all time",    icon: Trophy,   color: "text-amber-400",  bg: "from-amber-500/10" },
];

const TIMEFRAMES = ["Daily", "Weekly", "Monthly", "All Time"];

// ─── Avatar ─────────────────────────────────────────────────────────────────
function Avatar({ name, size = "md", glow = false }) {
  const initials = name.split(" ").slice(0,2).map(n => n[0]).join("").toUpperCase();
  const colors = [
    "from-rose-500 to-pink-600",
    "from-violet-500 to-purple-600",
    "from-cyan-500 to-blue-600",
    "from-emerald-500 to-teal-600",
    "from-amber-500 to-orange-600",
    "from-indigo-500 to-blue-600",
  ];
  const colorIdx = name.charCodeAt(0) % colors.length;
  const sizeClasses = { sm: "h-8 w-8 text-xs", md: "h-11 w-11 text-sm", lg: "h-20 w-20 text-2xl" };
  return (
    <div className={`rounded-full bg-gradient-to-br ${colors[colorIdx]} flex items-center justify-center font-black text-white shrink-0 ${sizeClasses[size]} ${glow ? "ring-4 ring-amber-400/70 shadow-[0_0_24px_rgba(251,191,36,0.6)]" : ""}`}>
      {initials}
    </div>
  );
}

// ─── Rank Delta ──────────────────────────────────────────────────────────────
function RankDelta({ rank, prev }) {
  const delta = prev - rank;
  if (delta > 0) return <span className="flex items-center gap-0.5 text-[10px] font-bold text-emerald-400"><ChevronUp className="h-3 w-3" />{delta}</span>;
  if (delta < 0) return <span className="flex items-center gap-0.5 text-[10px] font-bold text-rose-400"><ChevronDown className="h-3 w-3" />{Math.abs(delta)}</span>;
  return <span className="flex items-center gap-0.5 text-[10px] font-bold text-neutral-500"><Minus className="h-3 w-3" /></span>;
}

// ─── Skill Bar ───────────────────────────────────────────────────────────────
function SkillBar({ label, value, color }) {
  return (
    <div className="flex items-center gap-2 text-[10px]">
      <span className="text-neutral-500 w-16 shrink-0">{label}</span>
      <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${value}%` }} />
      </div>
      <span className="text-neutral-400 font-mono w-6 text-right">{value}</span>
    </div>
  );
}

// ─── Badge Chip ──────────────────────────────────────────────────────────────
function BadgeChip({ badge }) {
  const cfg = BADGE_CONFIG[badge] || BADGE_CONFIG["Apprentice"];
  const Icon = cfg.icon;
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${cfg.color} ${cfg.bg} ${cfg.border} ${cfg.glow}`}>
      <Icon className="h-2.5 w-2.5" />
      {badge}
    </span>
  );
}

// ─── Podium Card ─────────────────────────────────────────────────────────────
function PodiumCard({ user, position }) {
  const configs = {
    1: { height: "pt-6 pb-8", avatarSize: "lg", ring: "ring-4 ring-amber-400/80 shadow-[0_0_40px_rgba(251,191,36,0.5)]", border: "border-amber-400/40", bg: "from-amber-500/10 via-slate-900/60 to-slate-900/80", label: "GOLD", labelBg: "bg-amber-400 text-slate-950", crown: true, nameColor: "text-amber-300", pointColor: "text-amber-400", scale: "-translate-y-6", rankColor: "text-amber-400" },
    2: { height: "pt-4 pb-6", avatarSize: "md", ring: "ring-2 ring-slate-300/60", border: "border-slate-400/20", bg: "from-slate-400/5 via-slate-900/60 to-slate-900/80", label: "SILVER", labelBg: "bg-slate-300 text-slate-950", crown: false, nameColor: "text-slate-200", pointColor: "text-slate-300", scale: "", rankColor: "text-slate-400" },
    3: { height: "pt-4 pb-6", avatarSize: "md", ring: "ring-2 ring-amber-700/60", border: "border-amber-700/30", bg: "from-amber-800/10 via-slate-900/60 to-slate-900/80", label: "BRONZE", labelBg: "bg-amber-700 text-slate-100", crown: false, nameColor: "text-amber-600", pointColor: "text-amber-600", scale: "-translate-y-2", rankColor: "text-amber-700" },
  };
  const c = configs[position];

  return (
    <div className={`flex flex-col items-center rounded-2xl border ${c.border} bg-gradient-to-b ${c.bg} backdrop-blur-md p-5 relative overflow-hidden shadow-xl ${c.scale} transition-transform`}>
      {c.crown && (
        <Crown className="absolute top-3 left-1/2 -translate-x-1/2 h-5 w-5 text-amber-400 fill-amber-400 opacity-80" />
      )}
      <span className={`absolute top-3 right-3 text-xs font-black ${c.rankColor} font-mono`}>#{position}</span>

      <div className="relative mt-4">
        <Avatar name={user.name} size={c.avatarSize} glow={position === 1} />
        <span className={`absolute -bottom-2 left-1/2 -translate-x-1/2 ${c.labelBg} text-[9px] font-black px-2 py-0.5 rounded-full shadow whitespace-nowrap`}>
          {c.label}
        </span>
      </div>

      <div className="mt-5 text-center space-y-1">
        <h3 className={`text-sm font-bold ${c.nameColor} truncate max-w-[120px]`}>{user.name}</h3>
        <p className="text-[10px] text-neutral-500 font-mono">{user.country} {user.company}</p>
        <BadgeChip badge={user.badge} />
      </div>

      <div className="mt-3 text-center">
        <span className={`text-lg font-black font-mono ${c.pointColor}`}>{user.points.toLocaleString()}</span>
        <span className="text-[10px] text-neutral-500 block">points</span>
      </div>

      <div className="mt-3 flex items-center gap-3 text-[10px] text-neutral-400 font-mono">
        <span className="flex items-center gap-1"><Code2 className="h-2.5 w-2.5" />{user.solved} solved</span>
        <span className="flex items-center gap-1 text-orange-400"><Flame className="h-2.5 w-2.5" />{user.streak}d</span>
      </div>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────
export default function LeaderboardView({ onBackToDashboard }) {
  const [timeframe, setTimeframe] = useState("Weekly");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("overall");
  const [expandedRow, setExpandedRow] = useState(null);
  const [activityIdx, setActivityIdx] = useState(0);

  // Cycle live activity ticker
  useEffect(() => {
    const timer = setInterval(() => setActivityIdx(i => (i + 1) % ACTIVITY_FEED.length), 3500);
    return () => clearInterval(timer);
  }, []);

  const filtered = LEADERBOARD_USERS.filter(u =>
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.handle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const top1 = LEADERBOARD_USERS[0];
  const top2 = LEADERBOARD_USERS[1];
  const top3 = LEADERBOARD_USERS[2];
  const currentUser = LEADERBOARD_USERS.find(u => u.isUser);

  const activity = ACTIVITY_FEED[activityIdx];
  const ActivityIcon = activity.icon;

  return (
    <div className="min-h-screen w-full bg-[#070b16] text-slate-100/90 font-sans antialiased relative overflow-x-hidden">

      {/* Ambient Blobs */}
      <div className="pointer-events-none fixed -top-32 left-1/4 h-[600px] w-[600px] rounded-full bg-amber-600/8 blur-[160px]" />
      <div className="pointer-events-none fixed top-1/2 -right-40 h-[500px] w-[500px] rounded-full bg-violet-700/8 blur-[160px]" />
      <div className="pointer-events-none fixed bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-cyan-700/8 blur-[160px]" />

      {/* ─── Header ─────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 border-b border-white/8 bg-[#070b16]/90 backdrop-blur-xl px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onBackToDashboard}
            className="flex items-center gap-2 text-xs font-medium text-neutral-400 hover:text-white bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg border border-white/8 transition-all"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Dashboard
          </button>
          <span className="text-neutral-700">/</span>
          <div className="flex items-center gap-2.5">
            <div className="h-7 w-7 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center shadow-[0_0_12px_rgba(245,158,11,0.3)]">
              <Trophy className="h-3.5 w-3.5 text-amber-400 fill-amber-400/40" />
            </div>
            <h1 className="text-sm font-bold text-white tracking-tight">Global Leaderboard</h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Live activity ticker */}
          <div className="hidden lg:flex items-center gap-2 bg-emerald-500/8 border border-emerald-500/20 rounded-xl px-3 py-1.5 max-w-xs overflow-hidden">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <span className={`text-[10px] font-mono text-emerald-300 truncate`}>
              <span className="font-bold">{activity.name.split(" ")[0]}</span> {activity.action}
            </span>
          </div>

          {/* Timeframe tabs */}
          <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/8">
            {TIMEFRAMES.map(tf => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-3 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                  timeframe === tf
                    ? "bg-amber-500 text-slate-950 shadow-[0_0_12px_rgba(245,158,11,0.5)]"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-8 space-y-8 pb-28">

        {/* ─── Stat Cards ──────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {STAT_CARDS.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className={`rounded-2xl border border-white/8 bg-gradient-to-br ${s.bg} to-slate-900/50 backdrop-blur-md p-4 flex items-start gap-3`}>
                <div className={`h-9 w-9 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center shrink-0 ${s.color}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[11px] text-neutral-500 font-medium">{s.label}</p>
                  <p className="text-xl font-black text-white font-mono tracking-tight">{s.value}</p>
                  <p className="text-[10px] text-neutral-500">{s.sub}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* ─── Podium ──────────────────────────────────────────────────────── */}
        <div className="relative">
          <div className="absolute inset-0 flex items-end justify-center pointer-events-none">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
          </div>

          <p className="text-[11px] uppercase tracking-widest font-bold text-neutral-500 text-center mb-6 flex items-center justify-center gap-2">
            <Sparkles className="h-3 w-3 text-amber-400" /> {timeframe} Top 3 Podium <Sparkles className="h-3 w-3 text-amber-400" />
          </p>

          <div className="grid grid-cols-3 gap-3 md:gap-5 items-end max-w-2xl mx-auto">
            <PodiumCard user={top2} position={2} />
            <PodiumCard user={top1} position={1} />
            <PodiumCard user={top3} position={3} />
          </div>
        </div>

        {/* ─── Tab + Table ─────────────────────────────────────────────────── */}
        <div className="rounded-2xl border border-white/8 bg-slate-900/50 backdrop-blur-md overflow-hidden shadow-2xl">

          {/* Table toolbar */}
          <div className="px-5 py-4 border-b border-white/8 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              {["overall","dsa","system","behavioral"].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 rounded-xl text-[11px] font-semibold transition-all capitalize ${
                    activeTab === tab
                      ? "bg-amber-500/15 border border-amber-500/30 text-amber-300"
                      : "text-neutral-500 hover:text-neutral-300"
                  }`}
                >
                  {tab === "dsa" ? "DSA" : tab === "overall" ? "Overall" : tab === "system" ? "System Design" : "Behavioral"}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search engineers..."
                  className="bg-white/5 border border-white/8 rounded-xl pl-9 pr-4 py-1.5 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-amber-500/50 w-48 transition-colors"
                />
              </div>
              <span className="text-[11px] text-neutral-500 font-mono whitespace-nowrap">{filtered.length} rankers</span>
            </div>
          </div>

          {/* Table header */}
          <div className="grid grid-cols-12 px-5 py-2.5 border-b border-white/5 text-[10px] font-bold uppercase tracking-widest text-neutral-600 bg-white/[0.015]">
            <div className="col-span-1 flex items-center gap-1"><BarChart3 className="h-3 w-3" /> Rank</div>
            <div className="col-span-4">Engineer</div>
            <div className="col-span-2 hidden md:block">Company</div>
            <div className="col-span-2 hidden md:block text-center">Skills</div>
            <div className="col-span-2 text-center">Streak</div>
            <div className="col-span-3 md:col-span-1 text-right">Points</div>
          </div>

          {/* Table rows */}
          <div className="divide-y divide-white/[0.04]">
            {filtered.map((user) => {
              const isExpanded = expandedRow === user.rank;
              const isTop3 = user.rank <= 3;
              const topColors = ["border-l-amber-400","border-l-slate-400","border-l-amber-700"];

              return (
                <div key={user.rank}>
                  <div
                    onClick={() => setExpandedRow(isExpanded ? null : user.rank)}
                    className={`grid grid-cols-12 px-5 py-3.5 items-center cursor-pointer transition-all ${
                      user.isUser
                        ? "bg-cyan-500/8 border-l-4 border-l-cyan-400 hover:bg-cyan-500/12"
                        : isTop3
                        ? `border-l-4 ${topColors[user.rank - 1]} bg-white/[0.02] hover:bg-white/[0.04]`
                        : "hover:bg-white/[0.025]"
                    } ${isExpanded ? "bg-white/[0.03]" : ""}`}
                  >
                    {/* Rank */}
                    <div className="col-span-1">
                      <div className="flex flex-col items-start gap-0.5">
                        <span className={`font-black font-mono text-sm ${
                          user.rank === 1 ? "text-amber-400" :
                          user.rank === 2 ? "text-slate-300" :
                          user.rank === 3 ? "text-amber-600" :
                          user.isUser ? "text-cyan-400" : "text-neutral-400"
                        }`}>
                          {user.rank <= 3
                            ? ["🥇","🥈","🥉"][user.rank - 1]
                            : `#${user.rank}`
                          }
                        </span>
                        <RankDelta rank={user.rank} prev={user.prev} />
                      </div>
                    </div>

                    {/* Engineer */}
                    <div className="col-span-4 flex items-center gap-3 min-w-0">
                      <Avatar name={user.name} size="sm" />
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-white truncate flex items-center gap-1.5">
                          {user.name}
                          {user.isUser && (
                            <span className="text-[9px] bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 px-1.5 py-0.5 rounded-full font-bold shrink-0">YOU</span>
                          )}
                        </p>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="text-[10px] text-neutral-500 font-mono">{user.handle}</span>
                          <span className="text-neutral-700">·</span>
                          <BadgeChip badge={user.badge} />
                        </div>
                      </div>
                    </div>

                    {/* Company */}
                    <div className="col-span-2 hidden md:flex items-center gap-1.5">
                      <span className="text-base">{user.country}</span>
                      <span className="text-[11px] text-neutral-300 bg-white/5 border border-white/8 px-2.5 py-0.5 rounded-lg font-mono truncate">
                        {user.company}
                      </span>
                    </div>

                    {/* Skills mini bars */}
                    <div className="col-span-2 hidden md:flex flex-col gap-1 pr-2">
                      <div className="flex items-center gap-1.5">
                        <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-cyan-500 rounded-full" style={{ width: `${user.dsa}%` }} />
                        </div>
                        <span className="text-[9px] text-neutral-500 font-mono w-5">{user.dsa}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-violet-500 rounded-full" style={{ width: `${user.system}%` }} />
                        </div>
                        <span className="text-[9px] text-neutral-500 font-mono w-5">{user.system}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${user.behavioral}%` }} />
                        </div>
                        <span className="text-[9px] text-neutral-500 font-mono w-5">{user.behavioral}</span>
                      </div>
                    </div>

                    {/* Streak & solved */}
                    <div className="col-span-2 flex flex-col items-center gap-1">
                      <div className="flex items-center gap-1 text-orange-400">
                        <Flame className="h-3.5 w-3.5" />
                        <span className="text-xs font-bold font-mono">{user.streak}d</span>
                      </div>
                      <span className="text-[10px] text-neutral-500 font-mono">{user.solved} solved</span>
                    </div>

                    {/* Points */}
                    <div className="col-span-3 md:col-span-1 text-right">
                      <span className={`font-black font-mono text-sm ${
                        user.rank === 1 ? "text-amber-400" :
                        user.isUser ? "text-cyan-400" : "text-neutral-200"
                      }`}>
                        {(user.points / 1000).toFixed(1)}k
                      </span>
                    </div>
                  </div>

                  {/* Expanded row detail */}
                  {isExpanded && (
                    <div className="px-5 py-4 bg-white/[0.02] border-t border-white/5 grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2.5">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 flex items-center gap-1.5"><Code2 className="h-3 w-3 text-cyan-400" /> DSA Mastery</p>
                        <SkillBar label="Arrays" value={user.dsa} color="bg-cyan-500" />
                        <SkillBar label="Graphs" value={Math.max(40, user.dsa - 12)} color="bg-cyan-400" />
                        <SkillBar label="DP" value={Math.max(30, user.dsa - 20)} color="bg-cyan-300" />
                      </div>
                      <div className="space-y-2.5">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 flex items-center gap-1.5"><Brain className="h-3 w-3 text-violet-400" /> System Design</p>
                        <SkillBar label="Scalability" value={user.system} color="bg-violet-500" />
                        <SkillBar label="DB Design" value={Math.max(40, user.system - 8)} color="bg-violet-400" />
                        <SkillBar label="API Design" value={Math.max(35, user.system - 15)} color="bg-violet-300" />
                      </div>
                      <div className="space-y-2.5">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 flex items-center gap-1.5"><Zap className="h-3 w-3 text-emerald-400" /> Behavioral</p>
                        <SkillBar label="Leadership" value={user.behavioral} color="bg-emerald-500" />
                        <SkillBar label="Conflict" value={Math.max(40, user.behavioral - 10)} color="bg-emerald-400" />
                        <SkillBar label="Ownership" value={Math.max(35, user.behavioral - 5)} color="bg-emerald-300" />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ─── Live Activity Feed ───────────────────────────────────────────── */}
        <div className="rounded-2xl border border-white/8 bg-slate-900/40 backdrop-blur-md overflow-hidden">
          <div className="px-5 py-3 border-b border-white/8 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <p className="text-xs font-bold text-white">Live Activity Feed</p>
            </div>
            <span className="text-[10px] text-neutral-600 font-mono">Real-time</span>
          </div>
          <div className="divide-y divide-white/[0.04]">
            {ACTIVITY_FEED.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="flex items-center gap-3 px-5 py-3 hover:bg-white/[0.02] transition-colors">
                  <div className={`h-7 w-7 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center shrink-0 ${item.color}`}>
                    <Icon className="h-3.5 w-3.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-neutral-200 truncate">
                      <span className="font-bold text-white">{item.name}</span>{" "}
                      <span className="text-neutral-400">{item.action}</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-neutral-600 font-mono shrink-0">
                    <Clock className="h-3 w-3" />{item.time}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </main>

      {/* ─── Pinned User Bar ─────────────────────────────────────────────────── */}
      {currentUser && (
        <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-cyan-500/20 bg-[#070b16]/96 backdrop-blur-xl px-6 py-3">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Avatar name={currentUser.name} size="sm" />
              <div>
                <p className="text-xs font-bold text-white flex items-center gap-1.5">
                  Arjun S.
                  <span className="text-[9px] bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 px-1.5 py-0.5 rounded-full font-bold">YOU</span>
                </p>
                <p className="text-[10px] text-neutral-500">@arjun_prepos · PrepOS</p>
              </div>
              <div className="hidden sm:flex items-center gap-2 bg-cyan-500/8 border border-cyan-500/20 px-3 py-1 rounded-xl">
                <span className="text-lg font-black text-cyan-400 font-mono">#42</span>
                <div>
                  <p className="text-[9px] font-bold text-cyan-300">Global Rank</p>
                  <p className="text-[9px] text-emerald-400">Top 5% Globally</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-[11px] font-mono">
              <div className="text-center hidden sm:block">
                <p className="text-neutral-500 text-[10px]">Solved</p>
                <p className="font-bold text-white">{currentUser.solved}</p>
              </div>
              <div className="text-center hidden sm:block">
                <p className="text-neutral-500 text-[10px]">Streak</p>
                <p className="font-bold text-orange-400 flex items-center gap-1"><Flame className="h-3 w-3" />{currentUser.streak}d</p>
              </div>
              <div className="text-center">
                <p className="text-neutral-500 text-[10px]">Points</p>
                <p className="font-black text-amber-400">{currentUser.points.toLocaleString()}</p>
              </div>
              <BadgeChip badge={currentUser.badge} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
