import React, { useState } from "react";
import { ArrowLeft, Trophy, Medal, Award, Flame, Search, TrendingUp, Sparkles, UserCheck, Shield } from "lucide-react";
import "./LeaderboardView.css";

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
    <div className="leaderboard-container">
      {/* Background blurs */}
      <div className="glow-bg-1" style={{ backgroundColor: "rgba(245, 158, 11, 0.06)" }} />

      {/* Top Navbar */}
      <header className="leaderboard-header">
        <div className="leaderboard-header-left">
          <button onClick={onBackToDashboard} className="leaderboard-back-btn">
            <ArrowLeft className="h-3.5 w-3.5" />
            Dashboard
          </button>
          <span className="leaderboard-header-divider">/</span>
          <div className="leaderboard-header-title">
            <div className="q-solve-btn" style={{ padding: "0.25rem 0.5rem", borderRadius: "0.375rem", backgroundColor: "var(--amber-bg)", color: "var(--amber-accent)", borderColor: "var(--amber-border)" }}>
              <Trophy className="h-4 w-4" />
            </div>
            <span>Global Leaderboard</span>
          </div>
        </div>

        {/* Timeframe Filters */}
        <div className="resume-banner-actions" style={{ gap: "0.25rem", padding: "0.25rem", border: "1px solid var(--panel-border)", backgroundColor: "rgba(255,255,255,0.02)", borderRadius: "0.75rem" }}>
          {["Weekly", "Monthly", "All Time"].map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className="category-tab"
              style={{
                border: "none",
                fontSize: "11px",
                padding: "0.25rem 0.5rem",
                color: timeframe === tf ? "var(--amber-accent)" : "var(--text-muted)",
                backgroundColor: timeframe === tf ? "var(--amber-bg)" : "transparent",
                borderRadius: "0.5rem"
              }}
            >
              {tf}
            </button>
          ))}
        </div>
      </header>

      <main className="leaderboard-main">
        {/* Podium Top 3 */}
        <div className="podium-grid">
          {/* 2nd Place */}
          {top2 && (
            <div className="podium-card silver-tier">
              <div className="podium-card-rank-badge">#2</div>
              <div className="podium-avatar-wrapper">
                <div className="podium-avatar-circle">
                  {top2.name.split(" ").map(n => n[0]).join("")}
                </div>
                <span className="podium-medal-ribbon">
                  SILVER
                </span>
              </div>
              <h3 className="podium-card-name">{top2.name}</h3>
              <p className="podium-card-company">{top2.company}</p>
              <div className="podium-card-points-row">
                <span className="val">{top2.points.toLocaleString()}</span>
                <span className="lbl">points</span>
              </div>
            </div>
          )}

          {/* 1st Place GOLD */}
          {top1 && (
            <div className="podium-card gold-tier">
              <div className="podium-card-rank-badge">
                <Trophy className="h-4 w-4 fill-current" /> #1
              </div>
              <div className="podium-avatar-wrapper">
                <div className="podium-avatar-circle">
                  {top1.name.split(" ").map(n => n[0]).join("")}
                </div>
                <span className="podium-medal-ribbon">
                  GOLD 🥇
                </span>
              </div>
              <h3 className="podium-card-name">{top1.name}</h3>
              <p className="podium-card-company">{top1.company}</p>
              <div className="podium-card-points-row">
                <span className="val">{top1.points.toLocaleString()}</span>
                <span className="lbl">points</span>
              </div>
            </div>
          )}

          {/* 3rd Place */}
          {top3 && (
            <div className="podium-card bronze-tier">
              <div className="podium-card-rank-badge">#3</div>
              <div className="podium-avatar-wrapper">
                <div className="podium-avatar-circle">
                  {top3.name.split(" ").map(n => n[0]).join("")}
                </div>
                <span className="podium-medal-ribbon">
                  BRONZE
                </span>
              </div>
              <h3 className="podium-card-name">{top3.name}</h3>
              <p className="podium-card-company">{top3.company}</p>
              <div className="podium-card-points-row">
                <span className="val">{top3.points.toLocaleString()}</span>
                <span className="lbl">points</span>
              </div>
            </div>
          )}
        </div>

        {/* Search & List Table */}
        <div className="ide-split-pane" style={{ border: "1px solid var(--panel-border)", borderRadius: "1rem", flexDirection: "column", height: "auto" }}>
          <div className="resume-banner-row no-print" style={{ padding: "0.75rem 1.25rem", border: "none", borderBottom: "1px solid var(--panel-border)", background: "rgba(255, 255, 255, 0.02)", flexDirection: "row", justifyContent: "space-between", borderRadius: "1rem 1rem 0 0" }}>
            <div className="search-input-wrapper">
              <Search className="search-input-icon" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search rankers..."
                className="search-input-field"
              />
            </div>
            <span className="ide-example-label">Showing {filteredUsers.length} Rankers</span>
          </div>

          <div className="table-header-cols" style={{ padding: "0.75rem 1.5rem" }}>
            <div style={{ gridColumn: "span 2" }}>Rank</div>
            <div style={{ gridColumn: "span 4" }}>Engineer</div>
            <div style={{ gridColumn: "span 2" }}>Company</div>
            <div style={{ gridColumn: "span 2" }}>Solved</div>
            <div style={{ gridColumn: "span 2", textAlign: "right" }}>Points</div>
          </div>

          <div className="table-body-rows">
            {filteredUsers.map((user) => (
              <div
                key={user.rank}
                className={`table-row-item ${user.isUser ? "leaderboard-user-row" : ""}`}
                style={{ padding: "0.75rem 1.5rem" }}
              >
                <div style={{ gridColumn: "span 2", fontFamily: "var(--font-mono)", fontWeight: "bold" }} className={user.isUser ? "leaderboard-user-rank-val" : ""}>
                  {user.rank === 1 ? "🥇 #1" : user.rank === 2 ? "🥈 #2" : user.rank === 3 ? "🥉 #3" : `#${user.rank}`}
                </div>

                <div style={{ gridColumn: "span 4", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <div className="sandbox-back-btn" style={{ padding: "0.25rem 0.5rem", borderRadius: "50%", minWidth: "1.75rem", height: "1.75rem", fontSize: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {user.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <span style={{ fontSize: "12px", color: "#fff" }} className={user.isUser ? "leaderboard-user-name-val" : ""}>
                      {user.name}
                    </span>
                    <p style={{ fontSize: "10px", color: "var(--text-muted)", margin: 0 }}>{user.handle}</p>
                  </div>
                </div>

                <div style={{ gridColumn: "span 2" }}>
                  <span className="q-api-badge" style={{ backgroundColor: "rgba(255,255,255,0.03)", color: "#fff" }}>
                    {user.company}
                  </span>
                </div>

                <div style={{ gridColumn: "span 2", display: "flex", alignItems: "center", gap: "0.25rem", fontSize: "11px", color: "var(--text-muted)" }}>
                  <span>{user.solved}</span>
                  <Flame className="h-3.5 w-3.5 text-orange-500" />
                  <span>{user.streak}d</span>
                </div>

                <div style={{ gridColumn: "span 2", textAlign: "right", fontFamily: "var(--font-mono)", fontWeight: "bold", color: "var(--amber-accent)", fontSize: "12px" }}>
                  {user.points.toLocaleString()} pts
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Pinned Bottom User Rank Bar */}
      <div className="fixed-bottom-user-bar" style={{ borderColor: "var(--cyan-border)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <span className="popover-header-badge" style={{ color: "var(--cyan-accent)", backgroundColor: "var(--cyan-bg)", borderColor: "var(--cyan-border)", margin: 0 }}>YOUR RANK</span>
          <span style={{ fontSize: "16px", fontWeight: "black", color: "#fff" }}>#42</span>
          <span style={{ fontSize: "11px", color: "var(--emerald-accent)" }}>Top 5% Globally</span>
        </div>

        <div style={{ display: "flex", gap: "1.5rem", fontSize: "11px", fontFamily: "var(--font-mono)" }}>
          <div>Solved: <strong style={{ color: "#fff" }}>142</strong></div>
          <div>Points: <strong style={{ color: "var(--amber-accent)" }}>1,950 pts</strong></div>
        </div>
      </div>
    </div>
  );
}
