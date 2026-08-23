import React, { useState, useEffect } from "react";
import { 
  ArrowLeft, BookOpen, Clock, Tag, ChevronRight, FileText, Search, 
  Key, ShieldCheck, RefreshCw, Eye, EyeOff, ExternalLink, ThumbsUp, Sparkles, Check, Loader2 
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
  }
];

const fetchLiveTutorials = async (apiKey = "", query = "programming") => {
  try {
    const headers = { "Content-Type": "application/json" };
    if (apiKey) headers["api-key"] = apiKey;

    const devToRes = await fetch(`https://dev.to/api/articles?tag=${encodeURIComponent(query)}&per_page=9`, { headers });
    if (!devToRes.ok) throw new Error("Direct Dev.to fetch failed");

    const data = await devToRes.json();
    const tutorials = data.map((item) => ({
      id: `devto-${item.id}`,
      title: item.title,
      category: item.tag_list && item.tag_list.length > 0 ? item.tag_list[0].toUpperCase() : "GUIDE",
      readTime: `${item.reading_time_minutes || 5} min read`,
      type: "Live Article",
      summary: item.description || "Developer article and tutorial guide.",
      tags: item.tag_list ? item.tag_list.slice(0, 4) : ["Tutorial"],
      url: item.url,
      author: item.user?.name || "Tech Author",
      likes: item.public_reactions_count || 0,
      publishedAt: item.readable_publish_date || "Recent"
    }));

    return {
      status: 200,
      source: apiKey ? "Dev.to Direct (API Key Authenticated)" : "Dev.to Direct (Public)",
      tutorials
    };
  } catch (err) {
    return {
      status: 500,
      source: "Fallback Local Database",
      tutorials: DEFAULT_TUTORIALS
    };
  }
};

export default function TutorialsView({ onBackToDashboard }) {
  const [apiKey, setApiKey] = useState(() => localStorage.getItem("prepos_tutorials_api_key") || "");
  const [tempApiKey, setTempApiKey] = useState(apiKey);
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const [showKeyVisible, setShowKeyVisible] = useState(false);
  const [keySavedToast, setKeySavedToast] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [tutorials, setTutorials] = useState(DEFAULT_TUTORIALS);
  const [loading, setLoading] = useState(false);
  const [apiSource, setApiSource] = useState("Local Cache");

  
  const loadTutorials = async (keyToUse = apiKey, query = searchQuery) => {
    setLoading(true);
    try {
      const res = await fetchLiveTutorials(keyToUse, query || "programming");
      if (res && res.tutorials && res.tutorials.length > 0) {
        setTutorials(res.tutorials);
        setApiSource(res.source);
      } else {
        setTutorials(DEFAULT_TUTORIALS);
        setApiSource("Local Fallback Cache");
      }
    } catch (e) {
      setTutorials(DEFAULT_TUTORIALS);
      setApiSource("Local Fallback Cache");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTutorials(apiKey, searchQuery);
  }, [apiKey]);

  const handleSaveApiKey = (e) => {
    e.preventDefault();
    localStorage.setItem("prepos_tutorials_api_key", tempApiKey);
    setApiKey(tempApiKey);
    setKeySavedToast(true);
    setTimeout(() => setKeySavedToast(false), 2000);
    setShowApiKeyInput(false);
  };

  const handleClearApiKey = () => {
    localStorage.removeItem("prepos_tutorials_api_key");
    setApiKey("");
    setTempApiKey("");
    setShowApiKeyInput(false);
  };

  const filteredTutorials = tutorials.filter((tut) => {
    const matchesSearch = tut.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tut.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (tut.tags && tut.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchesSearch;
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

        <div className="player-header-right">
          <button
            onClick={() => setShowApiKeyInput(!showApiKeyInput)}
            className="tutorials-back-btn"
            style={{ display: "inline-flex", gap: "0.375rem" }}
          >
            <Key className="h-3.5 w-3.5" />
            {apiKey ? "Update Dev.to API Key" : "Add Dev.to API Key"}
          </button>
        </div>
      </header>

      
      <main className="tutorials-main">
        
        {showApiKeyInput && (
          <div className="tutorials-api-card">
            <div className="tutorials-api-card-header">
              <Key className="h-5 w-5 text-indigo-400" />
              <div>
                <h3 className="tutorials-api-card-title">Dev.to API Key (Optional Integration)</h3>
                <p className="tutorials-api-card-desc">Inject your Dev.to profile API key to scan, query, and cache custom article queries.</p>
              </div>
            </div>

            <form onSubmit={handleSaveApiKey} style={{ display: "flex", flexDirection: "column", gap: "0.75rem", width: "100%" }}>
              <div className="tutorials-api-form-row">
                <div className="tutorials-api-input-box">
                  <ShieldCheck className="tutorials-api-input-icon" />
                  <input
                    type={showKeyVisible ? "text" : "password"}
                    value={tempApiKey}
                    onChange={(e) => setTempApiKey(e.target.value)}
                    placeholder="Enter your Dev.to API Key..."
                    className="tutorials-api-input-field"
                  />
                  <button
                    type="button"
                    onClick={() => setShowKeyVisible(!showKeyVisible)}
                    className="tutorials-api-input-reveal-btn"
                  >
                    {showKeyVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>

                <button
                  type="submit"
                  className="sysdesign-audit-btn"
                >
                  Save API Key
                </button>

                {apiKey && (
                  <button
                    type="button"
                    onClick={handleClearApiKey}
                    className="tutorials-back-btn"
                  >
                    Remove Key
                  </button>
                )}
              </div>
            </form>
          </div>
        )}

        
        <div className="tutorials-content-header-row">
          <div>
            <div className="tutorials-content-title-area">
              <h2>Developer Tutorials & Blueprints</h2>
              <span className="popover-header-badge" style={{ display: "flex", gap: "0.25rem", width: "fit-content", backgroundColor: "var(--indigo-bg)", color: "var(--indigo-accent)", borderColor: "var(--indigo-border)" }}>
                <Sparkles className="h-3 w-3" /> {apiSource}
              </span>
            </div>
            <p className="tutorials-content-subtitle">
              Deep dives into patterns, architecture blueprints, and interview strategies.
              {apiKey ? " (Authenticated API key active)" : " (Public API fetch mode)"}
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

            <button
              onClick={() => loadTutorials(apiKey, searchQuery)}
              disabled={loading}
              className="tutorials-back-btn"
              style={{ padding: "0.5rem" }}
            >
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin text-indigo-400" : ""}`} />
            </button>
          </div>
        </div>

        
        {loading ? (
          <div className="popover-body" style={{ color: "var(--indigo-accent)" }}>
            <Loader2 className="search-loader" style={{ position: "static", margin: "1rem" }} />
            Fetching live tutorials via Dev.to API...
          </div>
        ) : filteredTutorials.length === 0 ? (
          <div className="popover-body" style={{ color: "var(--text-muted)", padding: "3rem" }}>
            <BookOpen className="h-10 w-10 mb-3" />
            <h3 style={{ fontWeight: "bold" }}>No tutorials found</h3>
            <p style={{ marginTop: "0.25rem" }}>Try refining your search query or updating your API Key.</p>
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
