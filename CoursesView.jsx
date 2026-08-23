import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  BookOpen,
  Play,
  CheckCircle2,
  Clock,
  Star,
  Award,
  Sparkles,
  Flame,
  Search,
  Loader2,
  Filter,
  Users,
  GraduationCap,
  Globe,
  GitBranch,
  GitFork,
  ExternalLink,
  MessageSquare,
  TrendingUp,
  RefreshCw
} from "lucide-react";
import CoursePlayerView from "./CoursePlayerView.jsx";

const STORAGE_KEY_PROGRESS = "prepos_course_progress_v1";

const FALLBACK_COURSES = [
  {
    id: "dsa-deep-dive",
    title: "Data Structures & Algorithms Deep Dive",
    instructor: "Ex-Google Staff Engineer",
    instructorRole: "Former Lead Tech Interviewer @ Google",
    level: "Intermediate to Advanced",
    duration: "24 hours • 82 lessons",
    rating: 4.9,
    enrolled: "14.2k students",
    category: "Algorithms",
    description: "Master all core patterns required for Tier-1 coding interviews: Two Pointers, Sliding Window, Dynamic Programming, and Graph Traversals.",
    topics: ["Arrays & HashMaps", "Trees & Graphs", "Dynamic Programming", "Bit Manipulation"],
    modules: [
      {
        id: "mod-1",
        title: "Module 1: Sliding Window & Two Pointers",
        lessons: [
          {
            id: "les-1-1",
            title: "Fixed vs Dynamic Window Patterns",
            duration: "18 min",
            type: "video",
            summary: "Learn when to shrink or expand windows, handling subarray constraints with O(N) complexity.",
            videoUrl: "https://www.youtube.com/embed/GcT7V3L4DG4",
            sampleMp4: "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            transcript: "In this lesson, we breakdown the fundamental difference between fixed length sliding windows and dynamic sliding windows.",
            theory: `### Sliding Window Strategy
The Sliding Window pattern is used to perform required operations on a specific window size.

#### Key Principles:
1. **Right Pointer**: Expands the window by incorporating new elements.
2. **Left Pointer**: Shrinks the window when constraints are violated.

\`\`\`javascript
function maxSubarraySum(arr, k) {
  let maxSum = 0, windowSum = 0;
  for (let i = 0; i < arr.length; i++) {
    windowSum += arr[i];
    if (i >= k - 1) {
      maxSum = Math.max(maxSum, windowSum);
      windowSum -= arr[i - k];
    }
  }
  return maxSum;
}
\`\`\``,
            quiz: {
              question: "What is the primary advantage of the Sliding Window technique over brute-force nested loops?",
              options: [
                "It reduces space complexity to O(1) in all cases.",
                "It reduces time complexity from O(N^2) to O(N) by reusing computation of overlapping subarrays.",
                "It guarantees recursive call stack safety.",
                "It works on unsorted string permutations only."
              ],
              correctIndex: 1,
              explanation: "Sliding window avoids re-calculating overlapping subproblem sums by maintaining a running state."
            }
          },
          {
            id: "les-1-2",
            title: "Fruit Into Baskets & At Most K Distinct",
            duration: "24 min",
            type: "video",
            summary: "Detailed walkthrough of two-pointer state contraction using hash maps.",
            videoUrl: "https://www.youtube.com/embed/EXzl7bLzCis",
            sampleMp4: "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
            transcript: "We analyze how to maintain at most K unique keys in a Map while moving the right pointer forward.",
            theory: "### At Most K Distinct Pattern\nUse a Map to track key frequencies.",
            quiz: {
              question: "When should the left pointer be incremented in an 'At Most K Distinct' problem?",
              options: [
                "Whenever the right pointer hits an even index.",
                "When the total number of unique keys in the hash map exceeds K.",
                "Only when the array is sorted in ascending order.",
                "Never, because left pointer is stationary."
              ],
              correctIndex: 1,
              explanation: "When map.size > K, the window is invalid, so left pointer advances."
            }
          }
        ]
      },
      {
        id: "mod-2",
        title: "Module 2: Graph Traversals & Topological Sort",
        lessons: [
          {
            id: "les-2-1",
            title: "BFS vs DFS: Cycle Detection in Directed Graphs",
            duration: "32 min",
            type: "video",
            summary: "Kahn's Algorithm vs recursion stack states for course schedule resolution.",
            videoUrl: "https://www.youtube.com/embed/mqqrf-bgkC8",
            sampleMp4: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
            transcript: "Detecting cycles in directed graphs is crucial for build dependencies.",
            theory: "### Kahn's Algorithm\nTrack in-degrees to order DAG vertices.",
            quiz: {
              question: "In Kahn's Algorithm for Topological Sort, what condition signifies that a graph contains a cycle?",
              options: [
                "The queue becomes empty before processing all graph vertices.",
                "The in-degree of the starting node is greater than 0.",
                "The adjacency list contains self-loops only.",
                "The graph is undirected."
              ],
              correctIndex: 0,
              explanation: "If processed nodes count is less than total vertices when queue empties, a cycle exists."
            }
          }
        ]
      }
    ]
  },
  {
    id: "system-design-mastery",
    title: "System Design for FAANG Tech Leads",
    instructor: "Principal Architect @ Meta",
    instructorRole: "Infrastructure Lead, Distributed Databases",
    level: "Advanced",
    duration: "18 hours • 54 lessons",
    rating: 4.95,
    enrolled: "9.8k students",
    category: "System Design",
    description: "Learn how to architect high-throughput distributed systems handling millions of QPS, database sharding, caching strategies, and event-driven queues.",
    topics: ["Microservices", "Distributed Caching", "Database Sharding", "Event-Driven Queues"],
    modules: [
      {
        id: "sysmod-1",
        title: "Module 1: Scalable Caching & Consistent Hashing",
        lessons: [
          {
            id: "sysles-1-1",
            title: "Consistent Hashing & Ring Rebalance",
            duration: "26 min",
            type: "video",
            summary: "Distribute workload without full cache keys re-hashing when servers scale out.",
            videoUrl: "https://www.youtube.com/embed/xHnA-5DpNvk",
            sampleMp4: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
            transcript: "Consistent hashing maps keys and nodes to a hash ring, moving only K/N keys.",
            theory: "### Consistent Hashing Ring\nVirtual nodes prevent hot spots.",
            quiz: {
              question: "Why are virtual nodes added to a Consistent Hashing ring?",
              options: [
                "To speed up SSL/TLS handshake latency.",
                "To prevent hot spots and achieve uniform data distribution across physical servers.",
                "To compress database index tables.",
                "To automatically encrypt cache keys at rest."
              ],
              correctIndex: 1,
              explanation: "Virtual nodes spread physical server positions, preventing key skew."
            }
          }
        ]
      }
    ]
  },
  {
    id: "llm-ai-engineering",
    title: "Fullstack AI & LLM Engineering 2026",
    instructor: "AI Research Lead @ OpenAI",
    instructorRole: "Foundational Models & RAG Architecture",
    level: "All Levels",
    duration: "16 hours • 48 lessons",
    rating: 4.88,
    enrolled: "18.5k students",
    category: "AI & ML",
    description: "Build autonomous AI agents, RAG pipelines, fine-tune models, and integrate vector databases into production web applications.",
    topics: ["RAG Architecture", "Vector DBs (Pinecone/Milvus)", "LangChain & LlamaIndex", "AI Agents"],
    modules: [
      {
        id: "aimod-1",
        title: "Module 1: Vector Embeddings & Hybrid Search",
        lessons: [
          {
            id: "ailes-1-1",
            title: "Cosine Similarity vs Dot Product in Vector DBs",
            duration: "20 min",
            type: "video",
            summary: "Understanding vector distance metrics for semantic document retrieval.",
            videoUrl: "https://www.youtube.com/embed/FSTrj-TuikE",
            sampleMp4: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
            transcript: "Choosing distance metrics impacts vector index search latency.",
            theory: "### Distance Metrics in Vector Space",
            quiz: {
              question: "When are Dot Product and Cosine Similarity mathematical equivalents in vector search?",
              options: [
                "When vector dimensions are less than 128.",
                "When all vectors are L2-normalized (length of 1.0).",
                "When using HNSW index without quantization.",
                "Only when querying sparse keyword matrices."
              ],
              correctIndex: 1,
              explanation: "When vectors are L2-normalized, dot product equals cosine similarity."
            }
          }
        ]
      }
    ]
  }
];

function getStoredProgressMap() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PROGRESS);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch (e) {
    return {};
  }
}

function setStoredProgressMap(map) {
  try {
    localStorage.setItem(STORAGE_KEY_PROGRESS, JSON.stringify(map));
  } catch (e) {}
}

const localCourseApi = {
  async fetchCourses({ category = "All", search = "" } = {}) {
    const progressMap = getStoredProgressMap();
    let list = FALLBACK_COURSES.map((course) => {
      const userProg = progressMap[course.id] || { completedLessons: [], enrolled: false };
      let totalLessons = 0;
      course.modules.forEach((m) => (totalLessons += m.lessons.length));
      const completedCount = userProg.completedLessons.length;
      const computedPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;
      return {
        ...course,
        enrolled: userProg.enrolled || false,
        progress: userProg.enrolled ? Math.max(0, computedPercent) : 0,
        completedCount,
        totalLessons,
        isFastApi: false
      };
    });

    if (category && category !== "All") {
      list = list.filter((c) => c.category.toLowerCase() === category.toLowerCase());
    }

    if (search && search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          c.instructor.toLowerCase().includes(q) ||
          c.topics.some((t) => t.toLowerCase().includes(q))
      );
    }
    return { status: 200, courses: list };
  },

  async enrollCourse(courseId) {
    const progressMap = getStoredProgressMap();
    const userProg = progressMap[courseId] || { completedLessons: [], enrolled: true };
    userProg.enrolled = true;
    progressMap[courseId] = userProg;
    setStoredProgressMap(progressMap);
    return { status: 200, enrolled: true };
  },

  async fetchLiveGithubCourseRepos(query = "interview-prep") {
    try {
      const ghRes = await fetch(`https://api.github.com/search/repositories?q=${encodeURIComponent(query)}+in:name,description&sort=stars&order=desc&per_page=6`);
      if (!ghRes.ok) throw new Error("GitHub API direct fetch failed");
      const data = await ghRes.json();
      const repos = (data.items || []).map((r) => ({
        id: `gh-${r.id}`,
        title: r.name.replace(/-/g, " ").toUpperCase(),
        fullName: r.full_name,
        instructor: `@${r.owner.login}`,
        description: r.description || "Open source course repository.",
        stars: r.stargazers_count,
        forks: r.forks_count,
        language: r.language || "Code",
        url: r.html_url,
        topics: r.topics ? r.topics.slice(0, 4) : []
      }));
      return { status: 200, source: "GitHub API Direct", repos };
    } catch (err) {
      return { status: 500, repos: [] };
    }
  },

  async fetchLiveTechNewsApi() {
    try {
      const hnRes = await fetch("https://hacker-news.firebaseio.com/v0/topstories.json");
      if (!hnRes.ok) throw new Error("HN direct fetch failed");
      const ids = (await hnRes.json()).slice(0, 5);
      const storyPromises = ids.map(async (id) => {
        const itemRes = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
        return itemRes.json();
      });
      const stories = (await Promise.all(storyPromises)).filter(Boolean);
      return {
        status: 200,
        source: "HN Firebase Direct",
        stories: stories.map((s) => ({
          id: s.id,
          title: s.title,
          url: s.url || `https://news.ycombinator.com/item?id=${s.id}`,
          by: s.by,
          score: s.score || 0,
          comments: s.descendants || 0
        }))
      };
    } catch (err) {
      return { status: 500, stories: [] };
    }
  }
};

const CATEGORIES = ["All", "Algorithms", "System Design", "AI & ML", "DevOps"];

export default function CoursesView({ onBackToDashboard }) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCourseId, setActiveCourseId] = useState(null);

  // Live Web API state
  const [activeTab, setActiveTab] = useState("courses"); // "courses" | "live-api" | "live-news"
  const [liveGithubRepos, setLiveGithubRepos] = useState([]);
  const [isFetchingLiveApi, setIsFetchingLiveApi] = useState(false);
  const [liveNews, setLiveNews] = useState([]);
  const [liveApiSource, setLiveApiSource] = useState("");

  // Load local courses via API
  const loadCourses = async () => {
    setLoading(true);
    try {
      const res = await localCourseApi.fetchCourses({
        category: selectedCategory,
        search: searchQuery
      });
      setCourses(res.courses);
    } catch (e) {
      console.error("Failed to load courses from API", e);
    } finally {
      setLoading(false);
    }
  };

  // Load live GitHub API data
  const loadLiveGithubApi = async (query = "coding-interview-university") => {
    setIsFetchingLiveApi(true);
    try {
      const res = await localCourseApi.fetchLiveGithubCourseRepos(query);
      setLiveGithubRepos(res.repos || []);
      setLiveApiSource(res.source || "GitHub API");
    } catch (e) {
      console.error("Failed to fetch GitHub API data", e);
    } finally {
      setIsFetchingLiveApi(false);
    }
  };

  // Load live HackerNews Tech News API data
  const loadLiveNewsApi = async () => {
    try {
      const res = await localCourseApi.fetchLiveTechNewsApi();
      if (res.stories) setLiveNews(res.stories);
    } catch (e) {
      console.error("Failed to fetch HackerNews API data", e);
    }
  };

  useEffect(() => {
    loadCourses();
  }, [selectedCategory, searchQuery]);

  useEffect(() => {
    loadLiveGithubApi("interview-prep");
    loadLiveNewsApi();
  }, []);

  const handleEnrollOrContinue = async (courseId) => {
    try {
      await localCourseApi.enrollCourse(courseId);
      setActiveCourseId(courseId);
    } catch (e) {
      console.error("Failed to enroll course", e);
    }
  };

  if (activeCourseId) {
    return (
      <CoursePlayerView
        courseId={activeCourseId}
        onBackToCourses={() => {
          setActiveCourseId(null);
          loadCourses();
        }}
      />
    );
  }

  // Dashboard metrics
  const enrolledCourses = courses.filter((c) => c.enrolled);
  const totalCompletedLessons = courses.reduce((acc, c) => acc + (c.completedCount || 0), 0);
  const totalLessons = courses.reduce((acc, c) => acc + (c.totalLessons || 0), 0);
  const overallPercent = totalLessons > 0 ? Math.round((totalCompletedLessons / totalLessons) * 100) : 0;

  return (
    <div className="min-h-screen w-full bg-[#0a0e1a] text-slate-100/90 font-sans antialiased relative pb-12">
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
            <h1 className="text-base font-bold text-white tracking-tight">Structured Learning & Web API Hub</h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>GitHub & HackerNews APIs Connected</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 relative space-y-8">
        {/* Banner with Live Web API Indicator */}
        <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-cyan-900/30 via-slate-900/50 to-indigo-900/30 backdrop-blur-md p-8 relative overflow-hidden flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="relative z-10 max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
                Live HTTP REST API Integration
              </span>
              <span className="text-[10px] text-emerald-300 font-mono bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                Live Data Fetching
              </span>
            </div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              Tech Interview Courses & Open Source API Syllabi
            </h2>
            <p className="text-sm text-neutral-300 mt-2 leading-relaxed">
              Access structured masterclasses and fetch real-time open-source study guides directly from live web APIs (GitHub REST API & HackerNews Firebase API).
            </p>
          </div>

          {/* Interactive Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 shrink-0">
            <div className="rounded-2xl border border-white/10 bg-black/40 p-4 text-center">
              <GraduationCap className="h-5 w-5 text-cyan-400 mx-auto mb-1" />
              <div className="text-lg font-bold text-white">{enrolledCourses.length}</div>
              <div className="text-[10px] text-neutral-400 uppercase tracking-wider">Enrolled</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/40 p-4 text-center">
              <Globe className="h-5 w-5 text-emerald-400 mx-auto mb-1" />
              <div className="text-lg font-bold text-white">{liveGithubRepos.length}</div>
              <div className="text-[10px] text-neutral-400 uppercase tracking-wider">Live Web Repos</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/40 p-4 text-center col-span-2 sm:col-span-1">
              <Award className="h-5 w-5 text-amber-400 mx-auto mb-1" />
              <div className="text-lg font-bold text-white">{overallPercent}%</div>
              <div className="text-[10px] text-neutral-400 uppercase tracking-wider">Avg Progress</div>
            </div>
          </div>
        </div>

        {/* View Switcher Tabs (Course Masterclasses vs Live Web API Repos vs Tech News) */}
        <div className="flex items-center gap-3 border-b border-white/10 pb-4">
          <button
            onClick={() => setActiveTab("courses")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === "courses"
                ? "bg-cyan-500 text-black shadow-[0_0_18px_rgba(6,182,212,0.6)]"
                : "bg-white/5 hover:bg-white/10 text-neutral-400"
            }`}
          >
            <BookOpen className="h-4 w-4" />
            Curated Course Catalog ({courses.length})
          </button>
          <button
            onClick={() => setActiveTab("live-api")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === "live-api"
                ? "bg-emerald-500 text-black shadow-[0_0_18px_rgba(16,185,129,0.6)]"
                : "bg-white/5 hover:bg-white/10 text-neutral-400"
            }`}
          >
            <Globe className="h-4 w-4" />
            Live GitHub Web API Courses ({liveGithubRepos.length})
          </button>
          <button
            onClick={() => setActiveTab("live-news")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === "live-news"
                ? "bg-amber-400 text-black shadow-[0_0_18px_rgba(245,158,11,0.6)]"
                : "bg-white/5 hover:bg-white/10 text-neutral-400"
            }`}
          >
            <TrendingUp className="h-4 w-4" />
            Live Tech News API ({liveNews.length})
          </button>
        </div>

        {/* TAB 1: Curated Masterclass Courses */}
        {activeTab === "courses" && (
          <div className="space-y-6">
            {/* Filter & Search Bar */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto hide-scrollbar">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                      selectedCategory === cat
                        ? "bg-cyan-500 text-black shadow-[0_0_16px_rgba(6,182,212,0.6)]"
                        : "bg-white/5 hover:bg-white/10 text-neutral-400 border border-white/5"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="relative w-full md:w-80">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search courses, instructors..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            {loading ? (
              <div className="py-20 flex flex-col items-center justify-center gap-3">
                <Loader2 className="h-8 w-8 text-cyan-400 animate-spin" />
                <span className="text-xs text-neutral-400 font-mono">Loading API course catalog...</span>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
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

                      <div className="flex flex-wrap gap-1.5 mt-4">
                        {course.topics.map((t) => (
                          <span
                            key={t}
                            className="text-[10px] text-neutral-400 bg-white/5 px-2 py-0.5 rounded border border-white/5"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

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

                    <button
                      onClick={() => handleEnrollOrContinue(course.id)}
                      className="mt-6 w-full inline-flex items-center justify-center gap-2 text-xs font-semibold text-white bg-cyan-600 hover:bg-cyan-500 transition-colors py-2.5 rounded-xl shadow-[0_0_16px_rgba(6,182,212,0.5)]"
                    >
                      <Play className="h-3.5 w-3.5" fill="currentColor" />
                      {course.enrolled ? "Continue Course" : "Enroll & Start Learning"}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: Live GitHub REST API Courseware */}
        {activeTab === "live-api" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-emerald-950/20 border border-emerald-500/30 rounded-2xl p-4">
              <div className="flex items-center gap-3">
                <Globe className="h-6 w-6 text-emerald-400 shrink-0" />
                <div>
                  <h3 className="text-sm font-bold text-white">Live GitHub REST API Course Explorer</h3>
                  <p className="text-xs text-emerald-300/80 mt-0.5">
                    Data fetched live via <code className="bg-black/40 px-1.5 py-0.5 rounded font-mono text-[10px]">https://api.github.com/search/repositories</code>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <input
                  type="text"
                  placeholder="Search live Web API (e.g. system-design, algorithms)..."
                  onKeyDown={(e) => e.key === "Enter" && loadLiveGithubApi(e.target.value)}
                  className="bg-black/50 border border-white/10 rounded-xl px-3.5 py-1.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500 w-full"
                />
                <button
                  onClick={() => loadLiveGithubApi("interview-prep")}
                  className="p-2 bg-emerald-500 text-black rounded-xl hover:bg-emerald-400 transition-colors shrink-0"
                >
                  <RefreshCw className={`h-4 w-4 ${isFetchingLiveApi ? "animate-spin" : ""}`} />
                </button>
              </div>
            </div>

            {isFetchingLiveApi ? (
              <div className="py-20 flex flex-col items-center justify-center gap-3">
                <Loader2 className="h-8 w-8 text-emerald-400 animate-spin" />
                <span className="text-xs text-neutral-400 font-mono">Fetching live HTTP REST response from GitHub API...</span>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {liveGithubRepos.map((repo) => (
                  <div
                    key={repo.id}
                    className="rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-md p-6 flex flex-col justify-between hover:border-emerald-500/40 hover:-translate-y-1 transition-all duration-300 group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
                          {repo.language}
                        </span>
                        <div className="flex items-center gap-1.5 text-xs text-amber-300 font-bold">
                          <Star className="h-3.5 w-3.5 fill-current text-amber-400" />
                          {repo.stars > 1000 ? `${(repo.stars / 1000).toFixed(1)}k` : repo.stars} stars
                        </div>
                      </div>

                      <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                        {repo.title}
                      </h3>
                      <p className="text-xs text-neutral-400 mt-0.5">{repo.instructor}</p>
                      <p className="text-xs text-neutral-300 mt-3 leading-relaxed line-clamp-3">
                        {repo.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5 mt-4">
                        {repo.topics.map((tp) => (
                          <span key={tp} className="text-[10px] text-neutral-400 bg-white/5 px-2 py-0.5 rounded border border-white/5">
                            #{tp}
                          </span>
                        ))}
                      </div>
                    </div>

                    <a
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 w-full inline-flex items-center justify-center gap-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 transition-colors py-2.5 rounded-xl shadow-[0_0_16px_rgba(16,185,129,0.5)]"
                    >
                      <span>Explore Live API Repo</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: Live HackerNews Tech Articles API */}
        {activeTab === "live-news" && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl border border-amber-500/30 bg-amber-950/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <TrendingUp className="h-5 w-5 text-amber-400" />
                <div>
                  <h3 className="text-sm font-bold text-white">HackerNews Live Firebase API Feed</h3>
                  <p className="text-xs text-amber-300/80">Real-time developer discussions and tech industry news.</p>
                </div>
              </div>
              <button
                onClick={loadLiveNewsApi}
                className="flex items-center gap-1.5 text-xs text-amber-300 hover:text-white bg-amber-500/10 px-3 py-1.5 rounded-lg border border-amber-500/30 transition-colors"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                Refresh Feed
              </button>
            </div>

            <div className="space-y-3">
              {liveNews.map((news) => (
                <div
                  key={news.id}
                  className="rounded-xl border border-white/10 bg-slate-900/60 p-4 flex items-center justify-between hover:border-amber-500/40 transition-colors"
                >
                  <div>
                    <a
                      href={news.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-bold text-white hover:text-amber-300 transition-colors flex items-center gap-2"
                    >
                      {news.title}
                      <ExternalLink className="h-3.5 w-3.5 text-neutral-500" />
                    </a>
                    <div className="flex items-center gap-3 text-[11px] text-neutral-400 mt-1.5">
                      <span>Posted by @{news.by}</span>
                      <span>•</span>
                      <span className="text-amber-300 font-semibold">{news.score} points</span>
                      <span>•</span>
                      <span>{news.comments} comments</span>
                      <span>•</span>
                      <span>{news.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
