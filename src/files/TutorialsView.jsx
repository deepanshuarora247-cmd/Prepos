import React, { useState } from "react";
import { 
  ArrowLeft, BookOpen, Clock, Search, 
  ThumbsUp, Sparkles, ExternalLink 
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
    url: "https://dev.to",
    author: "PrepOS Staff",
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
    url: "https://dev.to",
    author: "PrepOS Staff",
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
    url: "https://dev.to",
    author: "PrepOS Staff",
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
    url: "https://dev.to",
    author: "PrepOS Staff",
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
    url: "https://dev.to",
    author: "PrepOS Staff",
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
    url: "https://dev.to",
    author: "PrepOS Staff",
    likes: 215
  }
];

export default function TutorialsView({ onBackToDashboard }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTutorials = DEFAULT_TUTORIALS.filter((tut) => {
    const query = searchQuery.toLowerCase();
    return (
      tut.title.toLowerCase().includes(query) ||
      tut.summary.toLowerCase().includes(query) ||
      (tut.tags && tut.tags.some(t => t.toLowerCase().includes(query)))
    );
  });

  return (
    <div className="tutorials-container">
      
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

      
      <main className="tutorials-main">
        


        
        <div className="tutorials-content-header-row">
          <div>
            <div className="tutorials-content-title-area">
              <h2>Developer Tutorials & Blueprints</h2>
              <span className="popover-header-badge" style={{ display: "flex", gap: "0.25rem", width: "fit-content", backgroundColor: "var(--indigo-bg)", color: "var(--indigo-accent)", borderColor: "var(--indigo-border)" }}>
                <Sparkles className="h-3 w-3" /> Local Database
              </span>
            </div>
            <p className="tutorials-content-subtitle">
              Deep dives into patterns, architecture blueprints, and interview strategies.
            </p>
          </div>

          <div className="tutorials-actions-bar">
            <div className="search-input-wrapper">
              <Search className="search-input-icon" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tutorials or tags..."
                className="search-input-field"
              />
            </div>
          </div>
        </div>

        
        {filteredTutorials.length === 0 ? (
          <div className="popover-body" style={{ color: "var(--text-muted)", padding: "3rem" }}>
            <BookOpen className="h-10 w-10 mb-3" />
            <h3 style={{ fontWeight: "bold" }}>No tutorials found</h3>
            <p style={{ marginTop: "0.25rem" }}>Try refining your search query.</p>
          </div>
        ) : (
          <div className="tutorials-grid-3">
            {filteredTutorials.map((tut) => (
              <div key={tut.id} className="tutorial-card">
                <div>
                  <div className="tutorial-card-header">
                    <span className="tutorial-card-badge">{tut.category}</span>
                    <span className="tutorial-card-readtime">
                      <Clock className="h-3 w-3" /> {tut.readTime}
                    </span>
                  </div>

                  <h3 className="tutorial-card-title">{tut.title}</h3>
                  <p className="tutorial-card-desc">{tut.summary}</p>

                  <div className="tutorial-card-tags-list">
                    {tut.tags && tut.tags.map((tg) => (
                      <span key={tg} className="tutorial-card-tag-item">#{tg}</span>
                    ))}
                  </div>

                  {tut.author && (
                    <div className="tutorial-card-footer">
                      <span>By <strong>{tut.author}</strong></span>
                      {tut.likes !== undefined && tut.likes > 0 && (
                        <span style={{ display: "inline-flex", gap: "0.125rem", color: "var(--indigo-accent)" }}>
                          <ThumbsUp className="h-3 w-3" /> {tut.likes}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <a
                  href="#"
                  onClick={function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  className="tutorial-card-read-btn"
                  style={{ textDecoration: "none", opacity: 0.5, cursor: "not-allowed" }}
                >
                  Read Tutorial <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
