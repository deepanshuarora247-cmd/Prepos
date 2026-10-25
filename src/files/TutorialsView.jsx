import React, { useState } from "react";
import { 
  ArrowLeft, BookOpen, Clock, Search, 
  ThumbsUp, Sparkles, ExternalLink, Share2, Check, X 
} from "lucide-react";
import "./TutorialsView.css";

const DEFAULT_TUTORIALS = [
  {
    id: "sliding-window-pattern",
    title: "The Ultimate 5-Step Sliding Window Pattern Guide",
    category: "Algorithms",
    readTime: "8 min read",
    type: "Article + Code",
    summary: "Learn how to solve variable and fixed-length sliding window problems in O(N) time with minimal auxiliary space.",
    tags: ["Sliding Window", "Two Pointers", "DSA"],
    url: "https://leetcode.com/discuss/study-guide/3588753/Sliding-Window-Technique-or-A-Complete-Guide-with-Code",
    author: "PrepOS Algorithms Guild",
    likes: 142
  },
  {
    id: "system-design-back-of-envelope",
    title: "Back of the Envelope Estimation Cheatsheet 2026",
    category: "System Design",
    readTime: "12 min read",
    type: "Cheatsheet",
    summary: "Quick reference for QPS calculations, latency numbers (L1 cache vs SSD vs Network), and storage estimations.",
    tags: ["Capacity Planning", "Architecture", "SLA"],
    url: "https://github.com/donnemartin/system-design-primer#latency-numbers-every-programmer-should-know",
    author: "PrepOS Architecture Guild",
    likes: 289
  },
  {
    id: "star-method-behavioral",
    title: "Mastering the STAR Method for Behavioral Rounds",
    category: "Career & Mock",
    readTime: "10 min read",
    type: "Video Walkthrough",
    summary: "How to frame technical trade-offs, leadership conflict, and production outage stories with concrete metrics.",
    tags: ["STAR Method", "Behavioral", "FAANG"],
    url: "https://www.techinterviewhandbook.org/behavioral-interview/",
    author: "PrepOS Career Coach",
    likes: 98
  },
  {
    id: "dp-patterns-guide",
    title: "Dynamic Programming Decoded: Top 5 Patterns",
    category: "Algorithms",
    readTime: "15 min read",
    type: "Deep Dive",
    summary: "Master Knapsack, LCS, LIS, and Grid-based DP. Includes transition state formulations and optimization recipes.",
    tags: ["Dynamic Programming", "Memoization", "Tabulation"],
    url: "https://leetcode.com/discuss/general-discussion/458695/dynamic-programming-patterns",
    author: "PrepOS Algorithms Guild",
    likes: 184
  },
  {
    id: "url-shortener-design",
    title: "System Design: Scaling a TinyURL Service to 10M DAU",
    category: "System Design",
    readTime: "14 min read",
    type: "Architecture Blueprint",
    summary: "Full blueprint on base62 encoding, custom hash generation collision avoidance, database partitioning, and Redis caching.",
    tags: ["System Design", "Scalability", "NoSQL", "Redis"],
    url: "https://github.com/donnemartin/system-design-primer/blob/master/solutions/system_design/pastebin/README.md",
    author: "PrepOS Architecture Guild",
    likes: 312
  },
  {
    id: "concurrency-cheatsheet",
    title: "Concurrency & Deadlocks: Thread Safety Guide",
    category: "Languages",
    readTime: "9 min read",
    type: "Cheatsheet",
    summary: "Common concurrency race conditions, mutex locking guidelines, and semaphore patterns in modern backend environments.",
    tags: ["Concurrency", "Multithreading", "Go", "Java"],
    url: "https://docs.oracle.com/javase/tutorial/essential/concurrency/deadlock.html",
    author: "PrepOS Systems Guild",
    likes: 215
  },
  {
    id: "tree-graph-traversals",
    title: "Binary Trees & Graph Traversals: BFS vs DFS Blueprint",
    category: "Algorithms",
    readTime: "11 min read",
    type: "Deep Dive",
    summary: "Master recursion templates, queue vs stack traversals, Dijkstra shortest path, and cycle detection in undirected graphs.",
    tags: ["Trees", "Graphs", "BFS", "DFS"],
    url: "https://leetcode.com/discuss/study-guide/1072548/A-Guide-to-Tree-and-Graph-Traversals-BFS-DFS",
    author: "PrepOS Algorithms Guild",
    likes: 264
  },
  {
    id: "sql-indexing-performance",
    title: "SQL Indexing & Query Optimization Deep Dive",
    category: "Database",
    readTime: "13 min read",
    type: "Cheatsheet",
    summary: "B-Tree vs Hash indexes, composite index order, query execution plans, and eliminating slow table scans.",
    tags: ["SQL", "Postgres", "Indexing", "Performance"],
    url: "https://use-the-index-luke.com/",
    author: "PrepOS Database Guild",
    likes: 198
  },
  {
    id: "distributed-cache-redis",
    title: "Distributed Caching Strategies: Redis, Cache-Aside & Eviction",
    category: "System Design",
    readTime: "12 min read",
    type: "Architecture Blueprint",
    summary: "Cache-aside, write-through, write-behind, LRU/LFU eviction algorithms, and thundering herd mitigations.",
    tags: ["Redis", "Caching", "Distributed Systems"],
    url: "https://redis.io/docs/latest/develop/reference/lru-cache/",
    author: "PrepOS Architecture Guild",
    likes: 341
  }
];

const CATEGORIES = ["All", "Algorithms", "System Design", "Career & Mock", "Languages", "Database"];

export default function TutorialsView({ onBackToDashboard, initialSearch = "" }) {
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [copiedId, setCopiedId] = useState(null);

  const filteredTutorials = DEFAULT_TUTORIALS.filter((tut) => {
    const query = searchQuery.trim().toLowerCase();
    const matchesCategory = selectedCategory === "All" || tut.category === selectedCategory;
    const matchesQuery = !query || (
      tut.title.toLowerCase().includes(query) ||
      tut.summary.toLowerCase().includes(query) ||
      (tut.tags && tut.tags.some(t => t.toLowerCase().includes(query)))
    );
    return matchesCategory && matchesQuery;
  });

  const handleCopyLink = (e, tut) => {
    e.stopPropagation();
    navigator.clipboard.writeText(tut.url);
    setCopiedId(tut.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="tutorials-container">
      {/* Header */}
      <header className="tutorials-header">
        <div className="tutorials-header-left">
          <button onClick={onBackToDashboard} className="tutorials-back-btn">
            <ArrowLeft className="h-3.5 w-3.5" />
            Dashboard
          </button>
          <span className="tutorials-header-divider">/</span>
          <div className="tutorials-header-title">
            <div className="q-solve-btn" style={{ padding: "0.25rem 0.5rem", borderRadius: "0.375rem", backgroundColor: "var(--indigo-bg)", color: "var(--indigo-accent)", borderColor: "var(--indigo-border)" }}>
              <BookOpen className="h-4 w-4" />
            </div>
            <span>Developer Blueprints & Guides</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="tutorials-main">
        {/* Title row */}
        <div className="tutorials-content-header-row">
          <div>
            <div className="tutorials-content-title-area">
              <h2>Developer Tutorials & Blueprints</h2>
              <span className="popover-header-badge" style={{ display: "flex", gap: "0.25rem", width: "fit-content", backgroundColor: "var(--indigo-bg)", color: "var(--indigo-accent)", borderColor: "var(--indigo-border)" }}>
                <Sparkles className="h-3 w-3" /> Live Curated
              </span>
            </div>
            <p className="tutorials-content-subtitle">
              Deep dives into patterns, architecture blueprints, and interview strategies with direct reference guides.
            </p>
          </div>

          <div className="tutorials-actions-bar">
            <div className="search-input-wrapper">
              <Search className="search-input-icon" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tutorials, topics or #tags..."
                className="search-input-field"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="tutorials-search-clear-btn"
                  title="Clear search"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Category Pills Filter */}
        <div className="tutorials-category-pills">
          {CATEGORIES.map((cat) => (
            <button
              type="button"
              key={cat}
              className={`tutorials-cat-pill ${selectedCategory === cat ? "active" : ""}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
          <span className="tutorials-count-badge">
            {filteredTutorials.length} {filteredTutorials.length === 1 ? "guide" : "guides"}
          </span>
        </div>

        {/* Tutorials Grid */}
        {filteredTutorials.length === 0 ? (
          <div className="popover-body" style={{ color: "var(--text-muted)", padding: "3rem", textAlign: "center" }}>
            <BookOpen className="h-10 w-10 mb-3" style={{ margin: "0 auto", color: "var(--indigo-accent)" }} />
            <h3 style={{ fontWeight: "bold", color: "#fff" }}>No tutorials found</h3>
            <p style={{ marginTop: "0.25rem" }}>
              {searchQuery ? `No guides matching "${searchQuery}".` : "No guides in this category."}
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="tutorials-reset-btn"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="tutorials-grid-3">
            {filteredTutorials.map((tut) => (
              <div 
                key={tut.id} 
                className="tutorial-card"
                onClick={() => window.open(tut.url, "_blank", "noopener,noreferrer")}
                role="link"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    window.open(tut.url, "_blank", "noopener,noreferrer");
                  }
                }}
                title={`Click to read: ${tut.title}`}
              >
                <div>
                  <div className="tutorial-card-header">
                    <span className="tutorial-card-badge">{tut.category}</span>
                    <div className="tutorial-card-header-actions">
                      <span className="tutorial-card-readtime">
                        <Clock className="h-3 w-3" /> {tut.readTime}
                      </span>
                      <a
                        href={tut.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="tutorial-card-header-link"
                        title="Open external tutorial link"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </div>

                  <a
                    href={tut.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tutorial-card-title-link"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <h3 className="tutorial-card-title">{tut.title}</h3>
                  </a>

                  <p className="tutorial-card-desc">{tut.summary}</p>

                  <div className="tutorial-card-tags-list">
                    {tut.tags && tut.tags.map((tg) => (
                      <button
                        type="button"
                        key={tg}
                        className="tutorial-card-tag-item"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSearchQuery(tg);
                        }}
                        title={`Filter by #${tg}`}
                      >
                        #{tg}
                      </button>
                    ))}
                  </div>

                  {tut.author && (
                    <div className="tutorial-card-footer">
                      <span>By <strong>{tut.author}</strong></span>
                      <div className="tutorial-card-footer-right">
                        {tut.likes !== undefined && tut.likes > 0 && (
                          <span className="tutorial-card-likes">
                            <ThumbsUp className="h-3 w-3" /> {tut.likes}
                          </span>
                        )}
                        <button
                          type="button"
                          className="tutorial-copy-btn"
                          title="Copy link"
                          onClick={(e) => handleCopyLink(e, tut)}
                        >
                          {copiedId === tut.id ? (
                            <span className="tutorial-copied-badge">
                              <Check className="h-3 w-3" /> Copied
                            </span>
                          ) : (
                            <Share2 className="h-3.5 w-3.5" />
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <a
                  href={tut.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tutorial-card-read-btn"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span>Read Tutorial</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
