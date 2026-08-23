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
import "./CoursesView.css";

function StreakRing({ value, goal }) {
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(value / goal, 1);
  const strokeDashoffset = circumference - progress * circumference;

  return (
    <div className="streak-ring-container">
      <svg className="streak-ring-svg">
        <circle cx="48" cy="48" r={radius} className="streak-ring-circle-bg" />
        <circle
          cx="48"
          cy="48"
          r={radius}
          className="streak-ring-circle-fill"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
        />
      </svg>
      <div className="streak-ring-text">
        <span className="streak-ring-value">{value}%</span>
        <span className="streak-ring-label">complete</span>
      </div>
    </div>
  );
}

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
                "When the number of unique elements exceeds K.",
                "Every time the right pointer moves.",
                "Only when the sum is even.",
                "Never, left pointer is static."
              ],
              correctIndex: 0,
              explanation: "You must contract the window (move left pointer) when unique elements in the map exceed the limit K."
            }
          }
        ]
      }
    ]
  },
  {
    id: "system-design-master",
    title: "System Design & Distributed Architectures",
    instructor: "Principal Architect @ AWS",
    instructorRole: "Systems Architecture Designer",
    level: "Advanced",
    duration: "18 hours • 54 lessons",
    rating: 4.8,
    enrolled: "9.8k students",
    category: "System Design",
    description: "Design massive systems with 99.999% uptime. Master load balancers, database scaling, consistent hashing, and Kafka queue pipelines.",
    topics: ["Scalability & SLAs", "Caches & Load Balancers", "NoSQL vs RDBMS Sharding", "Eventual Consistency"],
    modules: [
      {
        id: "mod-2",
        title: "Module 1: Load Balancers & Caching Layer",
        lessons: [
          {
            id: "les-2-1",
            title: "Nginx Load Balancing Algorithms",
            duration: "22 min",
            type: "video",
            summary: "Study Round Robin, Least Connections, and IP Hash algorithms under real traffic profiles.",
            videoUrl: "https://www.youtube.com/embed/aKMLgFVxZYk",
            sampleMp4: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
            theory: "### Load Balancer Algorithms\n- Round Robin\n- Least Connections\n- IP Hash"
          }
        ]
      }
    ]
  }
];

export const localCourseApi = {
  getCourses: async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const enrolledMap = JSON.parse(localStorage.getItem(STORAGE_KEY_PROGRESS) || "{}");
    return FALLBACK_COURSES.map((course) => {
      const isEnrolled = !!enrolledMap[course.id];
      const completedIds = Array.isArray(enrolledMap[course.id]) ? enrolledMap[course.id] : [];
      const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);
      return {
        ...course,
        enrolled: isEnrolled,
        completedCount: completedIds.length,
        totalLessons
      };
    });
  },

  enrollCourse: async (courseId) => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const enrolledMap = JSON.parse(localStorage.getItem(STORAGE_KEY_PROGRESS) || "{}");
    if (!enrolledMap[courseId]) {
      enrolledMap[courseId] = [];
      localStorage.setItem(STORAGE_KEY_PROGRESS, JSON.stringify(enrolledMap));
    }
  }
};

export default function CoursesView({ onBackToDashboard }) {
  const [courses, setCourses] = useState([]);
  const [activeCourseId, setActiveCourseId] = useState(null);
  const [activeTab, setActiveTab] = useState("catalogue"); 
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  
  const [liveRepos, setLiveRepos] = useState([]);
  const [isGithubLoading, setIsGithubLoading] = useState(false);
  const [liveNews, setLiveNews] = useState([]);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    setIsLoading(true);
    try {
      const data = await localCourseApi.getCourses();
      setCourses(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const loadLiveGithubApi = async (query) => {
    setIsGithubLoading(true);
    try {
      const res = await fetch(`https://api.github.com/search/repositories?q=${query}+topic:interview-prep&sort=stars&order=desc`);
      const data = await res.json();
      if (data && data.items) {
        const mapped = data.items.slice(0, 4).map((item) => ({
          id: item.id,
          name: item.name,
          fullName: item.full_name,
          stars: item.stargazers_count,
          forks: item.forks_count,
          description: item.description || "No description provided.",
          url: item.html_url,
          topics: item.topics || []
        }));
        setLiveRepos(mapped);
      }
    } catch (e) {
      console.error("Github API failed:", e);
    } finally {
      setIsGithubLoading(false);
    }
  };

  const loadLiveNewsApi = async () => {
    try {
      const topStoriesRes = await fetch("https://hacker-news.firebaseio.com/v0/topstories.json");
      const ids = await topStoriesRes.json();
      const sliceIds = ids.slice(0, 4);

      const resolved = await Promise.all(
        sliceIds.map(async (storyId) => {
          const detailRes = await fetch(`https://hacker-news.firebaseio.com/v0/item/${storyId}.json`);
          const story = await detailRes.json();
          return {
            id: story.id,
            title: story.title,
            by: story.by,
            score: story.score,
            comments: story.descendants || 0,
            url: story.url || `https://news.ycombinator.com/item?id=${story.id}`,
            time: new Date(story.time * 1000).toLocaleDateString()
          };
        })
      );
      setLiveNews(resolved);
    } catch (e) {
      console.error("HN API failed:", e);
    }
  };

  const filteredCourses = courses.filter((c) => {
    const matchesCat = selectedCategory === "All" || c.category === selectedCategory;
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

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

  
  const enrolledCourses = courses.filter((c) => c.enrolled);
  const totalCompletedLessons = courses.reduce((acc, c) => acc + (c.completedCount || 0), 0);
  const totalLessons = courses.reduce((acc, c) => acc + (c.totalLessons || 0), 0);
  const overallPercent = totalLessons > 0 ? Math.round((totalCompletedLessons / totalLessons) * 100) : 0;

  return (
    <div className="courses-container">
      
      <div className="glow-bg-1" style={{ backgroundColor: "rgba(34, 211, 238, 0.08)" }} />

      
      <header className="courses-header">
        <div className="courses-header-left">
          <button onClick={onBackToDashboard} className="courses-back-btn">
            <ArrowLeft className="h-3.5 w-3.5" />
            Dashboard
          </button>
          <span className="courses-header-divider">/</span>
          <div className="courses-header-title">
            <div className="q-solve-btn" style={{ padding: "0.25rem 0.5rem", borderRadius: "0.375rem", backgroundColor: "var(--cyan-bg)", color: "var(--cyan-accent)", borderColor: "var(--cyan-border)" }}>
              <BookOpen className="h-4 w-4" />
            </div>
            <span>Tech Masterclass Library</span>
          </div>
        </div>
      </header>

      
      <main className="courses-main">
        
        <div className="courses-banner">
          <div>
            <span className="courses-banner-tag">Developer Curriculum</span>
            <h2 className="courses-banner-title">Premium Preparation Courses</h2>
            <p className="courses-banner-desc">
              Expert-led theoretical deep dives and implementation drills targeting high-frequency FAANG system benchmarks and algorithm matrices.
            </p>
          </div>

          <div className="courses-banner-stats">
            <div className="courses-stat-circle-group">
              <StreakRing value={overallPercent} goal={100} />
              <div className="courses-stat-info">
                <span className="courses-stat-title">{enrolledCourses.length}</span>
                <span className="courses-stat-lbl">Enrolled Courses</span>
              </div>
            </div>
          </div>
        </div>

        
        <div className="courses-filter-row">
          <div className="courses-tabs">
            <button
              onClick={() => setActiveTab("catalogue")}
              className={`courses-tab-btn ${activeTab === "catalogue" ? "active" : ""}`}
            >
              Course Catalogue
              {activeTab === "catalogue" && <div className="courses-tab-indicator" />}
            </button>
            <button
              onClick={() => setActiveTab("live-github")}
              className={`courses-tab-btn ${activeTab === "live-github" ? "active" : ""}`}
            >
              GitHub Project Finder
              {activeTab === "live-github" && <div className="courses-tab-indicator" />}
            </button>
            <button
              onClick={() => setActiveTab("live-news")}
              className={`courses-tab-btn ${activeTab === "live-news" ? "active" : ""}`}
            >
              Live Tech Feed
              {activeTab === "live-news" && <div className="courses-tab-indicator" />}
            </button>
          </div>

          {activeTab === "catalogue" && (
            <div className="search-input-wrapper">
              <Search className="search-input-icon" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Courses"
                className="search-input-field"
              />
            </div>
          )}
        </div>

        
        {activeTab === "catalogue" && (
          <div className="courses-grid-3">
            {filteredCourses.map((c) => (
              <div key={c.id} className="course-card">
                <div className="course-card-top">
                  <span className="category-filter-badge active" style={{ width: "fit-content" }}>{c.category}</span>
                  <h3 className="course-card-title">{c.title}</h3>
                  <p className="course-card-desc">{c.description}</p>
                </div>

                <div>
                  <p className="course-card-instructor">
                    <GraduationCap className="h-4 w-4" /> By {c.instructor}
                  </p>
                  <div className="course-card-meta">
                    <span>{c.duration}</span>
                    <span>•</span>
                    <span style={{ color: "var(--cyan-accent)", display: "inline-flex", alignItems: "center", gap: "0.25rem" }}>
                      <Star className="h-3 w-3 fill-cyan-400" /> {c.rating}
                    </span>
                  </div>

                  <button
                    onClick={() => handleEnrollOrContinue(c.id)}
                    className={`course-card-enroll-btn ${c.enrolled ? "enrolled" : ""}`}
                  >
                    {c.enrolled ? (
                      <>
                        <Play className="h-3.5 w-3.5" fill="currentColor" />
                        Continue Learning
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-3.5 w-3.5" />
                        Enroll Now
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        
        {activeTab === "live-github" && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl border border-white/10 bg-[#0c101d] flex items-center justify-between">
              <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                <Globe className="h-5 w-5 text-indigo-400" />
                <div>
                  <h3 className="text-sm font-bold text-white">Live GitHub Repositories API Search</h3>
                  <p className="text-xs text-neutral-400">Fetch real repos matching prep guides & code implementations.</p>
                </div>
              </div>
            </div>

            {isGithubLoading ? (
              <div className="popover-body" style={{ color: "var(--indigo-accent)" }}>
                <Loader2 className="search-loader" style={{ position: "static", margin: "1rem" }} />
                Fetching repos from GitHub api.github.com...
              </div>
            ) : (
              <div className="sysdesign-nodes-grid" style={{ gridTemplateColumns: "1fr 1fr" }}>
                {liveRepos.map((repo) => (
                  <div key={repo.id} className="course-card" style={{ justifyContent: "space-between" }}>
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
                        <h4 className="course-card-title" style={{ fontSize: "14px", marginTop: 0 }}>{repo.name}</h4>
                        <div style={{ display: "flex", gap: "0.5rem", fontSize: "10px", color: "var(--cyan-accent)" }}>
                          <span style={{ display: "flex", alignItems: "center", gap: "0.125rem" }}><Star className="h-3 w-3 fill-cyan-400" /> {repo.stars}</span>
                        </div>
                      </div>
                      <p className="course-card-desc" style={{ height: "3rem", overflow: "hidden" }}>{repo.description}</p>
                    </div>

                    <a
                      href="#"
                      onClick={function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      className="course-card-enroll-btn enrolled"
                      style={{ textDecoration: "none", display: "inline-flex", gap: "0.5rem", opacity: 0.5, cursor: "not-allowed" }}
                    >
                      Explore Repo <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        
        {activeTab === "live-news" && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl border border-white/10 bg-[#0c101d] flex items-center justify-between">
              <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                <TrendingUp className="h-5 w-5 text-amber-400" />
                <div>
                  <h3 className="text-sm font-bold text-white">HackerNews Live Firebase API Feed</h3>
                  <p className="text-xs text-neutral-400">Real-time developer discussions and tech industry news.</p>
                </div>
              </div>
              <button
                onClick={loadLiveNewsApi}
                className="ide-reset-btn"
                style={{ padding: "0.375rem 0.75rem", border: "1px solid var(--panel-border)", borderRadius: "0.5rem", background: "rgba(255,255,255,0.05)" }}
              >
                <RefreshCw className="h-3.5 w-3.5" /> Refresh
              </button>
            </div>

            <div className="table-body-rows" style={{ gap: "0.75rem" }}>
              {liveNews.map((news) => (
                <div
                  key={news.id}
                  className="table-row-item"
                  style={{ border: "1px solid var(--panel-border)", borderRadius: "0.75rem", padding: "1rem" }}
                >
                  <div style={{ gridColumn: "span 12" }}>
                    <a
                      href={news.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="q-title-btn"
                      style={{ display: "inline-flex", alignItems: "center", gap: "0.375rem" }}
                    >
                      {news.title}
                      <ExternalLink className="h-3.5 w-3.5 text-neutral-500" />
                    </a>
                    <div style={{ display: "flex", gap: "0.75rem", fontSize: "11px", color: "var(--text-muted)", marginTop: "0.375rem" }}>
                      <span>Posted by @{news.by}</span>
                      <span>•</span>
                      <span style={{ color: "var(--amber-accent)" }}>{news.score} points</span>
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
