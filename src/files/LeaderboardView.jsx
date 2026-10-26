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
    points: 2190,
    solved: 185,
    streak: 20,
    badge: "Candidate Master"
  },
  {
    rank: 9,
    name: "Marcus Vance",
    handle: "@mvance",
    company: "Meta",
    category: "Meta",
    points: 2120,
    solved: 174,
    streak: 18,
    badge: "Expert"
  },
  {
    rank: 10,
    name: "Aisha Khan",
    handle: "@akhan",
    company: "Amazon",
    category: "Amazon",
    points: 2050,
    solved: 162,
    streak: 15,
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
  const [sortOrder, setSortOrder] = useState("high"); // "high" (High to Low) or "low" (Low to High)

  // Dynamically extract categories from leaderboard users
  const categories = [
    "All",
    ...Array.from(new Set(LEADERBOARD_USERS.map((u) => u.category || u.company)))
  ];

  // Sorting and filtering algorithm:
  // Allow ONLY sorting High to Low or Low to High (by points)
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
      return sortOrder === "low"
        ? a.points - b.points
        : b.points - a.points;
    });

  const handleReset = () => {
    setSearch("");
    setCategory("All");
    setSortOrder("high");
  };

  // Top 3 for Podium: Always the true top 3 champions
  const topRankers = [...LEADERBOARD_USERS]
    .sort((a, b) => b.points - a.points)
    .slice(0, 3);
  const showPodium = category === "All" && !search;

  // Pagination calculations (fixed 5 entries per page)
  const totalItems = filteredUsers.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

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

      {/* Main Container */}
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

              {/* Sort selector: Only High to Low or Low to High */}
              <div className="leaderboard-filter-group">
                <TrendingUp className="h-3.5 w-3.5 text-amber-400" />
                <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>Sort:</span>
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="leaderboard-select"
                >
                  <option value="high">High to Low</option>
                  <option value="low">Low to High</option>
                </select>
              </div>
            </div>

            <div className="leaderboard-toolbar-right">
              {/* Sort Order Toggle */}
              <button
                type="button"
                onClick={() => setSortOrder((prev) => (prev === "low" ? "high" : "low"))}
                className="leaderboard-sort-toggle-btn"
                title={`Currently sorted ${sortOrder === "high" ? "High to Low" : "Low to High"}. Click to toggle.`}
              >
                {sortOrder === "high" ? (
                  <ArrowDown className="h-3.5 w-3.5" />
                ) : (
                  <ArrowUp className="h-3.5 w-3.5" />
                )}
                <span>{sortOrder === "high" ? "High to Low" : "Low to High"}</span>
              </button>

              {/* Reset button */}
              {(search || category !== "All" || sortOrder !== "high") && (
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

          {/* Table Column Headers */}
          <div className="table-header-cols" style={{ padding: "0.75rem 1.5rem" }}>
            <div style={{ gridColumn: "span 2" }}>
              <button
                type="button"
                onClick={() => setSortOrder((prev) => (prev === "low" ? "high" : "low"))}
                className="leaderboard-sortable-th"
                title={`Sort: ${sortOrder === "high" ? "High to Low" : "Low to High"}. Click to toggle.`}
              >
                <span>Rank</span>
                {sortOrder === "low" ? (
                  <ArrowUp className="leaderboard-sort-icon text-amber-400" />
                ) : (
                  <ArrowDown className="leaderboard-sort-icon text-amber-400" />
                )}
              </button>
            </div>
            <div style={{ gridColumn: "span 4" }}>Engineer</div>
            <div style={{ gridColumn: "span 2" }}>Company</div>
            <div style={{ gridColumn: "span 2" }}>Solved</div>
            <div style={{ gridColumn: "span 2", textAlign: "right", display: "flex", justifyContent: "flex-end" }}>
              <button
                type="button"
                onClick={() => setSortOrder((prev) => (prev === "low" ? "high" : "low"))}
                className="leaderboard-sortable-th active-sort"
                title={`Sort: ${sortOrder === "high" ? "High to Low" : "Low to High"}. Click to toggle.`}
              >
                <span>Points</span>
                {sortOrder === "low" ? (
                  <ArrowUp className="leaderboard-sort-icon text-amber-400" />
                ) : (
                  <ArrowDown className="leaderboard-sort-icon text-amber-400" />
                )}
              </button>
            </div>
          </div>

          {/* Table Body Rows */}
          <div className="table-body-rows">
            {paginatedUsers.length > 0 ? (
              paginatedUsers.map((user) => (
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

                  <div style={{ gridColumn: "span 2", textAlign: "right", fontFamily: "var(--font-mono)", fontWeight: "bold", color: "var(--amber-accent)", fontSize: "12px" }}>
                    {user.points.toLocaleString()} pts
                  </div>
                </div>
              ))
            )}
          </div>

          {/* React Pagination Bar (Fixed 5 per page) */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            onPageChange={(page) => setCurrentPage(page)}
            itemLabel="rankers"
          />
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

