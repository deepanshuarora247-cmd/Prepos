import React, { useState, useEffect } from "react";
import { 
  ArrowLeft, BookOpen, Clock, Tag, ChevronRight, FileText, Search, 
  Key, ShieldCheck, RefreshCw, Eye, EyeOff, ExternalLink, ThumbsUp, Sparkles, Check 
} from "lucide-react";
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

  // Load tutorials from API on mount & whenever searchQuery or active apiKey changes
  const loadTutorials = async (keyToUse = apiKey, query = searchQuery) => {
    setLoading(true);
    try {
      const res = await fetchLiveTutorials(keyToUse, query || "programming");
      if (res && res.tutorials && res.tutorials.length > 0) {
        setTutorials(res.tutorials);
        setApiSource(res.source || "Dev.to API");
      } else {
        setTutorials(DEFAULT_TUTORIALS);
        setApiSource("Fallback Local Data");
      }
    } catch (err) {
      console.error("Error fetching live tutorials with API key:", err);
      setTutorials(DEFAULT_TUTORIALS);
      setApiSource("Fallback Local Data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTutorials(apiKey, searchQuery);
  }, [apiKey]);

  const handleSaveApiKey = (e) => {
    e.preventDefault();
    const cleanKey = tempApiKey.trim();
    setApiKey(cleanKey);
    if (cleanKey) {
      localStorage.setItem("prepos_tutorials_api_key", cleanKey);
    } else {
      localStorage.removeItem("prepos_tutorials_api_key");
    }
    setKeySavedToast(true);
    setTimeout(() => setKeySavedToast(false), 2500);
    loadTutorials(cleanKey, searchQuery);
  };

  const handleClearApiKey = () => {
    setApiKey("");
    setTempApiKey("");
    localStorage.removeItem("prepos_tutorials_api_key");
    loadTutorials("", searchQuery);
  };

  const filteredTutorials = tutorials.filter((t) =>
    t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (t.tags && t.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))
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

        {/* API Key Configuration Toggle Header Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowApiKeyInput(!showApiKeyInput)}
            className={`flex items-center gap-2 text-xs font-semibold px-3.5 py-1.5 rounded-xl border transition-all ${
              apiKey 
                ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/20" 
                : "bg-indigo-600/20 text-indigo-300 border-indigo-500/30 hover:bg-indigo-600/30"
            }`}
          >
            <Key className="h-3.5 w-3.5" />
            {apiKey ? "API Key Connected" : "Configure API Key"}
            {apiKey && <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />}
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 relative space-y-8">
        
        {/* API Key Config Modal / Banner Panel */}
        {showApiKeyInput && (
          <div className="p-6 rounded-2xl border border-indigo-500/30 bg-slate-900/90 backdrop-blur-xl shadow-2xl space-y-4 transition-all animate-fadeIn">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                  <Key className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    Developer API Key Settings
                    <span className="text-[10px] font-medium bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-md border border-indigo-500/30">
                      Dev.to / Technical Article API
                    </span>
                  </h3>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Add your developer API key to fetch real-time authenticated technical tutorials, guides, and blueprints directly.
                  </p>
                </div>
              </div>
              
              {keySavedToast && (
                <span className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-lg">
                  <Check className="h-3.5 w-3.5" />
                  Key Saved Successfully
                </span>
              )}
            </div>

            <form onSubmit={handleSaveApiKey} className="flex flex-col sm:flex-row gap-3 pt-2">
              <div className="relative flex-1">
                <input
                  type={showKeyVisible ? "text" : "password"}
                  value={tempApiKey}
                  onChange={(e) => setTempApiKey(e.target.value)}
                  placeholder="Enter your API Key (e.g. devto_api_xxxx or custom key)..."
                  className="w-full bg-black/40 border border-white/10 rounded-xl pl-4 pr-10 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-500"
                />
                <button
                  type="button"
                  onClick={() => setShowKeyVisible(!showKeyVisible)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
                >
                  {showKeyVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>

              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex items-center gap-1.5 text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2.5 rounded-xl transition-all shadow-[0_0_12px_rgba(99,102,241,0.4)]"
                >
                  <Key className="h-3.5 w-3.5" />
                  Save & Fetch
                </button>
                {apiKey && (
                  <button
                    type="button"
                    onClick={handleClearApiKey}
                    className="text-xs font-medium bg-red-500/10 hover:bg-red-500/20 text-red-300 border border-red-500/20 px-3.5 py-2.5 rounded-xl transition-colors"
                  >
                    Clear Key
                  </button>
                )}
              </div>
            </form>
          </div>
        )}

        {/* Search & Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold text-white">Developer Tutorials & Blueprints</h2>
              <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-white/5 text-neutral-300 border border-white/10 flex items-center gap-1">
                <Sparkles className="h-3 w-3 text-indigo-400" />
                {apiSource}
              </span>
            </div>
            <p className="text-xs text-neutral-400 mt-1">
              Deep dives into patterns, architecture blueprints, and interview strategies.
              {apiKey ? " (Authenticated API key active)" : " (Public API fetch mode)"}
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tutorials or tags..."
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <button
              onClick={() => loadTutorials(apiKey, searchQuery)}
              disabled={loading}
              className="p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-neutral-300 hover:text-white transition-colors"
              title="Refresh tutorials"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin text-indigo-400" : ""}`} />
            </button>
          </div>
        </div>

        {/* Tutorials Grid */}
        {loading ? (
          <div className="py-20 text-center flex flex-col items-center justify-center gap-3">
            <RefreshCw className="h-8 w-8 text-indigo-400 animate-spin" />
            <p className="text-xs text-neutral-400">Fetching live tutorials via API...</p>
          </div>
        ) : filteredTutorials.length === 0 ? (
          <div className="py-16 text-center border border-white/10 rounded-2xl bg-white/[0.02]">
            <BookOpen className="h-10 w-10 text-neutral-600 mx-auto mb-3" />
            <h3 className="text-sm font-semibold text-white">No tutorials found</h3>
            <p className="text-xs text-neutral-400 mt-1">Try refining your search query or updating your API Key.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredTutorials.map((tut) => (
              <div
                key={tut.id}
                className="rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-md p-6 flex flex-col justify-between hover:border-indigo-500/40 hover:-translate-y-1 transition-all duration-300 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full border bg-indigo-500/10 text-indigo-300 border-indigo-500/20 uppercase tracking-wide">
                      {tut.category}
                    </span>
                    <span className="text-[11px] text-neutral-400 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {tut.readTime}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors line-clamp-2">
                    {tut.title}
                  </h3>
                  <p className="text-xs text-neutral-400 mt-2 leading-relaxed line-clamp-3">{tut.summary}</p>

                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {tut.tags && tut.tags.map((tg) => (
                      <span key={tg} className="text-[10px] text-neutral-400 bg-white/5 px-2 py-0.5 rounded border border-white/5">
                        #{tg}
                      </span>
                    ))}
                  </div>

                  {tut.author && (
                    <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-neutral-400">
                      <span>By <strong className="text-neutral-200">{tut.author}</strong></span>
                      {tut.likes !== undefined && tut.likes > 0 && (
                        <span className="flex items-center gap-1 text-indigo-400">
                          <ThumbsUp className="h-3 w-3" />
                          {tut.likes}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <a
                  href={tut.url || "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 w-full inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-all py-2.5 rounded-xl shadow-[0_0_16px_rgba(99,102,241,0.5)]"
                >
                  Read Tutorial
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

