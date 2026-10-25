import React, { useState } from "react";
import {
  ArrowLeft,
  Trophy,
  Medal,
  Award,
  Flame,
  Search,
  TrendingUp,
  Sparkles,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Filter,
  RotateCcw
} from "lucide-react";
import "./LeaderboardView.css";

const LEADERBOARD_USERS = [
  {
    rank: 1,
    name: "Aarav Sharma",
    handle: "@aarav_codes",
    company: "Google",
    category: "Google",
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
    category: "Meta",
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
    category: "Apple",
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
    category: "Uber",
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
    category: "Amazon",
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
    category: "Netflix",
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
    category: "Stripe",
    points: 2280,
    solved: 198,
    streak: 22,
    badge: "Candidate Master"
  },
  {
    rank: 8,
    name: "Elena Rostova",
    handle: "@elena_r",
    company: "Google",
    category: "Google",
    points: 2850,
    solved: 260,
    streak: 45,
    badge: "Master"
  },
  {
    rank: 9,
    name: "Marcus Vance",
    handle: "@mvance",
    company: "Meta",
    category: "Meta",
    points: 2620,
    solved: 238,
    streak: 34,
    badge: "Expert"
  },
  {
    rank: 10,
    name: "Aisha Khan",
    handle: "@akhan",
    company: "Amazon",
    category: "Amazon",
    points: 2490,
    solved: 222,
    streak: 29,
    badge: "Candidate Master"
  },
  {
    rank: 42,
    name: "Deepanshu A. (You)",
    handle: "@deepanshu_prepos",
    company: "PrepOS",
    category: "PrepOS",
    points: 1950,
    solved: 142,
    streak: 12,
    isUser: true,
    badge: "Knight"
  }
];

export default function LeaderboardView({ onBackToDashboard }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("high"); // "high" (descending) or "low" (ascending)
  const [sortBy, setSortBy] = useState("points"); // "points" | "rank" | "solved" | "streak" | "name"

  // Dynamically extract categories from leaderboard users
  const categories = [
    "All",
    ...Array.from(new Set(LEADERBOARD_USERS.map((u) => u.category || u.company)))
  ];

  // Sorting and filtering algorithm:
  // 1. Copy array
  // 2. Filter by search string
  // 3. Filter by category
  // 4. Sort based on sortOrder ("low" ascending or "high" descending)
  const result = [...LEADERBOARD_USERS]
    .filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.handle.toLowerCase().includes(search.toLowerCase()) ||
      p.company.toLowerCase().includes(search.toLowerCase())
    )
    .filter((p) =>
      category === "All" || p.category === category
    )
    .sort((a, b) => {
      if (sortBy === "points") {
        return sortOrder === "low"
          ? a.points - b.points
          : b.points - a.points;
      }
      if (sortBy === "solved") {
        return sortOrder === "low"
          ? a.solved - b.solved
          : b.solved - a.solved;
      }
      if (sortBy === "rank") {
        return sortOrder === "low"
          ? a.rank - b.rank
          : b.rank - a.rank;
      }
      if (sortBy === "streak") {
        return sortOrder === "low"
          ? a.streak - b.streak
          : b.streak - a.streak;
      }
      if (sortBy === "name") {
        return sortOrder === "low"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      }
      if (sortBy === "company") {
        return sortOrder === "low"
          ? a.company.localeCompare(b.company)
          : b.company.localeCompare(a.company);
      }
      // Default: sort by points
      return sortOrder === "low"
        ? a.points - b.points
        : b.points - a.points;
    });

  const handleSortColumn = (field) => {
    if (sortBy === field) {
      setSortOrder((prev) => (prev === "low" ? "high" : "low"));
    } else {
      setSortBy(field);
      // for rank or name, ascending (low) is standard first; for points/solved, descending (high)
      setSortOrder(field === "rank" || field === "name" || field === "company" ? "low" : "high");
    }
  };

  const handleReset = () => {
    setSearch("");
    setCategory("All");
    setSortBy("points");
    setSortOrder("high");
  };

  const renderSortIcon = (field) => {
    if (sortBy !== field) {
      return <ArrowUpDown className="leaderboard-sort-icon" />;
    }
    return sortOrder === "low" ? (
      <ArrowUp className="leaderboard-sort-icon text-amber-400" />
    ) : (
      <ArrowDown className="leaderboard-sort-icon text-amber-400" />
    );
  };

  // Top 3 for Podium
  const topRankers = result.slice(0, 3);
  const showPodium = result.length >= 3 && category === "All" && !search;

  return (
    <div className="leaderboard-container">
      <div className="glow-bg-1" style={{ backgroundColor: "rgba(245, 158, 11, 0.06)" }} />

      <header className="leaderboard-header">
        <div className="leaderboard-header-left">
          <button onClick={onBackToDashboard} className="leaderboard-back-btn">
            <ArrowLeft className="h-3.5 w-3.5" />
            Dashboard
          </button>
          <span className="leaderboard-header-divider">/</span>
          <div className="leaderboard-header-title">
            <div
              className="q-solve-btn"
              style={{
                padding: "0.25rem 0.5rem",
                borderRadius: "0.375rem",
                backgroundColor: "var(--amber-bg)",
                color: "var(--amber-accent)",
                borderColor: "var(--amber-border)"
              }}
            >
              <Trophy className="h-4 w-4" />
            </div>
            <span>Global Leaderboard</span>
          </div>
        </div>
      </header>

      <main className="leaderboard-main">
        {/* Top 3 Podium (shown when viewing all rankers with no search filter) */}
        {showPodium && (
          <div className="podium-grid">
            {/* Silver #2 */}
            {topRankers[1] && (
              <div className="podium-card silver-tier">
                <div className="podium-card-rank-badge">🥈 #2</div>
                <div className="podium-avatar-wrapper">
                  <div className="podium-avatar-circle">
                    {topRankers[1].name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div className="podium-medal-ribbon">SILVER</div>
                </div>
                <div className="podium-card-name">{topRankers[1].name}</div>
                <div className="podium-card-company">{topRankers[1].company}</div>
                <div className="podium-card-points-row">
                  <span className="val">{topRankers[1].points.toLocaleString()}</span>
                  <span className="lbl">POINTS</span>
                </div>
              </div>
            )}

            {/* Gold #1 */}
            {topRankers[0] && (
              <div className="podium-card gold-tier">
                <div className="podium-card-rank-badge">
                  <Sparkles className="h-4 w-4" /> 🥇 #1
                </div>
                <div className="podium-avatar-wrapper">
                  <div className="podium-avatar-circle">
                    {topRankers[0].name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div className="podium-medal-ribbon">CHAMPION</div>
                </div>
                <div className="podium-card-name">{topRankers[0].name}</div>
                <div className="podium-card-company">{topRankers[0].company}</div>
                <div className="podium-card-points-row">
                  <span className="val">{topRankers[0].points.toLocaleString()}</span>
                  <span className="lbl">POINTS</span>
                </div>
              </div>
            )}

            {/* Bronze #3 */}
            {topRankers[2] && (
              <div className="podium-card bronze-tier">
                <div className="podium-card-rank-badge">🥉 #3</div>
                <div className="podium-avatar-wrapper">
                  <div className="podium-avatar-circle">
                    {topRankers[2].name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div className="podium-medal-ribbon">BRONZE</div>
                </div>
                <div className="podium-card-name">{topRankers[2].name}</div>
                <div className="podium-card-company">{topRankers[2].company}</div>
                <div className="podium-card-points-row">
                  <span className="val">{topRankers[2].points.toLocaleString()}</span>
                  <span className="lbl">POINTS</span>
                </div>
              </div>
            )}
          </div>
        )}

        <div
          className="ide-split-pane"
          style={{
            border: "1px solid var(--panel-border)",
            borderRadius: "1rem",
            flexDirection: "column",
            height: "auto"
          }}
        >
          {/* Toolbar with Search, Category Filter, and Sort Controls */}
          <div className="leaderboard-toolbar no-print">
            <div className="leaderboard-toolbar-left">
              {/* Search filter */}
              <div className="search-input-wrapper" style={{ minWidth: "220px", flex: 1 }}>
                <Search className="search-input-icon" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by name, handle, company..."
                  className="search-input-field"
                />
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    style={{ fontSize: "11px", color: "var(--text-muted)", cursor: "pointer", paddingRight: "0.5rem" }}
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Category filter */}
              <div className="leaderboard-filter-group">
                <Filter className="h-3.5 w-3.5 text-amber-400" />
                <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>Company:</span>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="leaderboard-select"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat === "All" ? "All Companies" : cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort selector */}
              <div className="leaderboard-filter-group">
                <TrendingUp className="h-3.5 w-3.5 text-amber-400" />
                <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>Sort:</span>
                <select
                  value={`${sortBy}-${sortOrder}`}
                  onChange={(e) => {
                    const [newBy, newOrder] = e.target.value.split("-");
                    setSortBy(newBy);
                    setSortOrder(newOrder);
                  }}
                  className="leaderboard-select"
                >
                  <option value="points-high">Points: High → Low</option>
                  <option value="points-low">Points: Low → High</option>
                  <option value="solved-high">Solved: Most → Least</option>
                  <option value="solved-low">Solved: Least → Most</option>
                  <option value="rank-low">Rank: #1 First</option>
                  <option value="rank-high">Rank: Lowest First</option>
                  <option value="streak-high">Streak: Longest First</option>
                  <option value="streak-low">Streak: Shortest First</option>
                  <option value="name-low">Name: A → Z</option>
                  <option value="name-high">Name: Z → A</option>
                </select>
              </div>
            </div>

            <div className="leaderboard-toolbar-right">
              {/* Sort Order Toggle */}
              <button
                onClick={() => setSortOrder((prev) => (prev === "low" ? "high" : "low"))}
                className="leaderboard-sort-toggle-btn"
                title={`Order is ${sortOrder === "low" ? "Low (Ascending)" : "High (Descending)"}. Click to toggle.`}
              >
                <ArrowUpDown className="h-3.5 w-3.5" />
                <span>{sortOrder === "low" ? "Order: Low" : "Order: High"}</span>
              </button>

              {/* Reset button */}
              {(search || category !== "All" || sortBy !== "points" || sortOrder !== "high") && (
                <button onClick={handleReset} className="leaderboard-reset-btn" title="Reset all filters">
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>Reset</span>
                </button>
              )}

              <span className="ide-example-label" style={{ whiteSpace: "nowrap" }}>
                Showing {result.length} of {LEADERBOARD_USERS.length}
              </span>
            </div>
          </div>

          {/* Table Column Headers (Clickable to Sort) */}
          <div className="table-header-cols" style={{ padding: "0.75rem 1.5rem" }}>
            <div style={{ gridColumn: "span 2" }}>
              <button
                type="button"
                onClick={() => handleSortColumn("rank")}
                className={`leaderboard-sortable-th ${sortBy === "rank" ? "active-sort" : ""}`}
              >
                <span>Rank</span>
                {renderSortIcon("rank")}
              </button>
            </div>
            <div style={{ gridColumn: "span 4" }}>
              <button
                type="button"
                onClick={() => handleSortColumn("name")}
                className={`leaderboard-sortable-th ${sortBy === "name" ? "active-sort" : ""}`}
              >
                <span>Engineer</span>
                {renderSortIcon("name")}
              </button>
            </div>
            <div style={{ gridColumn: "span 2" }}>
              <button
                type="button"
                onClick={() => handleSortColumn("company")}
                className={`leaderboard-sortable-th ${sortBy === "company" ? "active-sort" : ""}`}
              >
                <span>Company</span>
                {renderSortIcon("company")}
              </button>
            </div>
            <div style={{ gridColumn: "span 2" }}>
              <button
                type="button"
                onClick={() => handleSortColumn("solved")}
                className={`leaderboard-sortable-th ${sortBy === "solved" ? "active-sort" : ""}`}
              >
                <span>Solved</span>
                {renderSortIcon("solved")}
              </button>
            </div>
            <div style={{ gridColumn: "span 2", textAlign: "right", display: "flex", justifyContent: "flex-end" }}>
              <button
                type="button"
                onClick={() => handleSortColumn("points")}
                className={`leaderboard-sortable-th ${sortBy === "points" ? "active-sort" : ""}`}
              >
                <span>Points</span>
                {renderSortIcon("points")}
              </button>
            </div>
          </div>

          {/* Table Body Rows */}
          <div className="table-body-rows">
            {result.length === 0 ? (
              <div className="leaderboard-empty-state">
                <Search className="leaderboard-empty-icon" />
                <div>
                  <p style={{ fontWeight: 600, color: "#fff", marginBottom: "0.25rem" }}>No rankers found</p>
                  <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                    No participants match "{search}" {category !== "All" ? `in ${category}` : ""}.
                  </p>
                </div>
                <button onClick={handleReset} className="leaderboard-reset-btn" style={{ marginTop: "0.5rem" }}>
                  <RotateCcw className="h-3.5 w-3.5" />
                  Reset search & filters
                </button>
              </div>
            ) : (
              result.map((user) => (
                <div
                  key={user.handle}
                  className={`table-row-item ${user.isUser ? "leaderboard-user-row" : ""}`}
                  style={{ padding: "0.75rem 1.5rem" }}
                >
                  <div
                    style={{ gridColumn: "span 2", fontFamily: "var(--font-mono)", fontWeight: "bold" }}
                    className={user.isUser ? "leaderboard-user-rank-val" : ""}
                  >
                    {user.rank === 1
                      ? "🥇 #1"
                      : user.rank === 2
                      ? "🥈 #2"
                      : user.rank === 3
                      ? "🥉 #3"
                      : `#${user.rank}`}
                  </div>

                  <div style={{ gridColumn: "span 4", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <div
                      className="sandbox-back-btn"
                      style={{
                        padding: "0.25rem 0.5rem",
                        borderRadius: "50%",
                        minWidth: "1.75rem",
                        height: "1.75rem",
                        fontSize: "10px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                    >
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <span
                        style={{ fontSize: "12px", color: "#fff" }}
                        className={user.isUser ? "leaderboard-user-name-val" : ""}
                      >
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

                  <div
                    style={{
                      gridColumn: "span 2",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.25rem",
                      fontSize: "11px",
                      color: "var(--text-muted)"
                    }}
                  >
                    <span>{user.solved}</span>
                    <Flame className="h-3.5 w-3.5 text-orange-500" />
                    <span>{user.streak}d</span>
                  </div>

                  <div
                    style={{
                      gridColumn: "span 2",
                      textAlign: "right",
                      fontFamily: "var(--font-mono)",
                      fontWeight: "bold",
                      color: "var(--amber-accent)",
                      fontSize: "12px"
                    }}
                  >
                    {user.points.toLocaleString()} pts
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      {/* User's Fixed Floating Rank Bar */}
      <div className="fixed-bottom-user-bar" style={{ borderColor: "var(--cyan-border)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <span
            className="popover-header-badge"
            style={{
              color: "var(--cyan-accent)",
              backgroundColor: "var(--cyan-bg)",
              borderColor: "var(--cyan-border)",
              margin: 0
            }}
          >
            YOUR RANK
          </span>
          <span style={{ fontSize: "16px", fontWeight: "black", color: "#fff" }}>#42</span>
          <span style={{ fontSize: "11px", color: "var(--emerald-accent)" }}>Top 5% Globally</span>
        </div>

        <div style={{ display: "flex", gap: "1.5rem", fontSize: "11px", fontFamily: "var(--font-mono)" }}>
          <div>
            Solved: <strong style={{ color: "#fff" }}>142</strong>
          </div>
          <div>
            Points: <strong style={{ color: "var(--amber-accent)" }}>1,950 pts</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

