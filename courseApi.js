/**
 * Course API Service
 * Connects directly to FastAPI Python Backend (http://127.0.0.1:8000)
 * with robust client-side fallback for maximum availability and zero runtime crashes.
 */

const FASTAPI_BASE_URL = "http://127.0.0.1:8000";
const STORAGE_KEY_PROGRESS = "prepos_course_progress_v1";

// Client-side fallback course database
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
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
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
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
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
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
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
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
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
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
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

export const courseApi = {
  /**
   * Fetch courses with FastAPI backend + local fallback
   */
  async fetchCourses({ category = "All", search = "" } = {}) {
    try {
      const params = new URLSearchParams();
      if (category && category !== "All") params.append("category", category);
      if (search && search.trim()) params.append("search", search.trim());

      const res = await fetch(`${FASTAPI_BASE_URL}/api/courses?${params.toString()}`);
      if (!res.ok) throw new Error("FastAPI fetch error");

      const data = await res.json();
      const progressMap = getStoredProgressMap();

      const coursesWithProgress = data.courses.map((course) => {
        const userProg = progressMap[course.id] || { completedLessons: [], enrolled: false };
        let totalLessons = 0;
        if (course.modules) {
          course.modules.forEach((m) => (totalLessons += m.lessons ? m.lessons.length : 0));
        }

        const completedCount = userProg.completedLessons ? userProg.completedLessons.length : 0;
        const computedPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

        return {
          ...course,
          enrolled: userProg.enrolled || false,
          progress: userProg.enrolled ? Math.max(course.progress || 0, computedPercent) : 0,
          completedCount,
          totalLessons,
          isFastApi: true
        };
      });

      return {
        status: 200,
        courses: coursesWithProgress,
        server: "FastAPI Backend"
      };
    } catch (e) {
      console.warn("FastAPI offline, using resilient local fallback", e);
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
          progress: userProg.enrolled ? Math.max(course.progress, computedPercent) : 0,
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

      return { status: 200, courses: list, server: "Client Cache" };
    }
  },

  /**
   * Fetch course details with FastAPI + local fallback
   */
  async fetchCourseDetails(courseId) {
    try {
      const res = await fetch(`${FASTAPI_BASE_URL}/api/courses/${courseId}`);
      if (!res.ok) throw new Error("FastAPI course detail error");

      const data = await res.json();
      const progressMap = getStoredProgressMap();
      const userProg = progressMap[courseId] || { completedLessons: [], enrolled: false };

      return {
        status: 200,
        course: {
          ...data.course,
          enrolled: userProg.enrolled,
          completedLessons: userProg.completedLessons || []
        }
      };
    } catch (e) {
      console.warn("FastAPI details offline, fallback to local", e);
      const course = FALLBACK_COURSES.find((c) => c.id === courseId);
      if (!course) throw new Error("Course not found");
      const progressMap = getStoredProgressMap();
      const userProg = progressMap[courseId] || { completedLessons: [], enrolled: false };

      return {
        status: 200,
        course: {
          ...course,
          enrolled: userProg.enrolled,
          completedLessons: userProg.completedLessons || []
        }
      };
    }
  },

  /**
   * Fetch lesson content with FastAPI + local fallback
   */
  async fetchLessonContent(courseId, lessonId) {
    try {
      const res = await fetch(`${FASTAPI_BASE_URL}/api/courses/${courseId}/lessons/${lessonId}`);
      if (!res.ok) throw new Error("FastAPI lesson content error");

      const data = await res.json();
      const progressMap = getStoredProgressMap();
      const userProg = progressMap[courseId] || { completedLessons: [] };
      const isCompleted = userProg.completedLessons.includes(lessonId);

      return {
        status: 200,
        courseId,
        moduleTitle: data.moduleTitle,
        lesson: data.lesson,
        isCompleted
      };
    } catch (e) {
      console.warn("FastAPI lesson content offline, fallback to local", e);
      const course = FALLBACK_COURSES.find((c) => c.id === courseId);
      if (!course) throw new Error("Course not found");

      let foundLesson = null;
      let parentModule = null;
      for (const m of course.modules) {
        const l = m.lessons.find((les) => les.id === lessonId);
        if (l) {
          foundLesson = l;
          parentModule = m;
          break;
        }
      }

      if (!foundLesson) throw new Error("Lesson not found");
      const progressMap = getStoredProgressMap();
      const userProg = progressMap[courseId] || { completedLessons: [] };
      const isCompleted = userProg.completedLessons.includes(lessonId);

      return {
        status: 200,
        courseId,
        moduleTitle: parentModule.title,
        lesson: foundLesson,
        isCompleted
      };
    }
  },

  /**
   * Submit quiz answer with FastAPI + local evaluation fallback
   */
  async submitQuizAnswer(courseId, lessonId, selectedOptionIndex) {
    try {
      const res = await fetch(`${FASTAPI_BASE_URL}/api/courses/${courseId}/lessons/${lessonId}/quiz`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ selected_option: selectedOptionIndex })
      });

      if (!res.ok) throw new Error("FastAPI quiz error");

      const data = await res.json();
      const progressMap = getStoredProgressMap();
      const userProg = progressMap[courseId] || { completedLessons: [], enrolled: true };

      if (data.isCorrect && !userProg.completedLessons.includes(lessonId)) {
        userProg.completedLessons.push(lessonId);
        userProg.enrolled = true;
        progressMap[courseId] = userProg;
        setStoredProgressMap(progressMap);
      }

      return {
        status: 200,
        evaluator: "FastAPI Backend Server",
        isCorrect: data.isCorrect,
        correctIndex: data.correctIndex,
        explanation: data.explanation,
        completedLessons: userProg.completedLessons
      };
    } catch (e) {
      console.warn("FastAPI quiz evaluation offline, fallback to local evaluator", e);
      const course = FALLBACK_COURSES.find((c) => c.id === courseId);
      if (!course) throw new Error("Course not found");

      let quiz = null;
      for (const m of course.modules) {
        const l = m.lessons.find((les) => les.id === lessonId);
        if (l && l.quiz) {
          quiz = l.quiz;
          break;
        }
      }

      if (!quiz) throw new Error("Quiz not found");
      const isCorrect = selectedOptionIndex === quiz.correctIndex;
      const progressMap = getStoredProgressMap();
      const userProg = progressMap[courseId] || { completedLessons: [], enrolled: true };

      if (isCorrect && !userProg.completedLessons.includes(lessonId)) {
        userProg.completedLessons.push(lessonId);
        userProg.enrolled = true;
        progressMap[courseId] = userProg;
        setStoredProgressMap(progressMap);
      }

      return {
        status: 200,
        evaluator: "Client Evaluator Fallback",
        isCorrect,
        correctIndex: quiz.correctIndex,
        explanation: quiz.explanation,
        completedLessons: userProg.completedLessons
      };
    }
  },

  /**
   * AI tutor query with FastAPI + local AI response fallback
   */
  async askCourseAiTutor(courseId, lessonId, question) {
    try {
      const res = await fetch(`${FASTAPI_BASE_URL}/api/courses/${courseId}/lessons/${lessonId}/tutor`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question })
      });

      if (!res.ok) throw new Error("FastAPI tutor error");

      const data = await res.json();
      return {
        status: 200,
        reply: data.reply
      };
    } catch (e) {
      console.warn("FastAPI AI tutor offline, using fallback AI response", e);
      const qLower = question.toLowerCase();
      let reply = "AI Assistant: ";

      if (qLower.includes("time complexity") || qLower.includes("o(n)")) {
        reply += "Because each element enters and leaves the sliding window at most once, time complexity is **O(N)**.";
      } else if (qLower.includes("space") || qLower.includes("memory")) {
        reply += "Space complexity is **O(K)** for tracking frequencies in a Map of size K.";
      } else {
        reply += "Always state your boundary conditions (empty/single element inputs) before coding in technical interviews.";
      }

      return { status: 200, reply };
    }
  },

  /**
   * Enroll course
   */
  async enrollCourse(courseId) {
    const progressMap = getStoredProgressMap();
    const userProg = progressMap[courseId] || { completedLessons: [], enrolled: true };
    userProg.enrolled = true;
    progressMap[courseId] = userProg;
    setStoredProgressMap(progressMap);
    return { status: 200, enrolled: true };
  },

  /**
   * Live GitHub API via FastAPI proxy endpoint + direct GitHub REST fallback
   */
  async fetchLiveGithubCourseRepos(query = "interview-prep") {
    try {
      const res = await fetch(`${FASTAPI_BASE_URL}/api/live/github-courses?query=${encodeURIComponent(query)}`);
      if (!res.ok) throw new Error("FastAPI proxy error");

      const data = await res.json();
      return {
        status: 200,
        source: data.source || "FastAPI Proxy",
        repos: data.repos || []
      };
    } catch (e) {
      console.warn("FastAPI GitHub proxy offline, fallback to direct GitHub REST API", e);
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
    }
  },

  /**
   * Live HackerNews API via FastAPI proxy endpoint + direct HackerNews Firebase fallback
   */
  async fetchLiveTechNewsApi() {
    try {
      const res = await fetch(`${FASTAPI_BASE_URL}/api/live/hn-news`);
      if (!res.ok) throw new Error("FastAPI HN proxy error");

      const data = await res.json();
      return {
        status: 200,
        source: data.source || "FastAPI Proxy",
        stories: data.stories || []
      };
    } catch (e) {
      console.warn("FastAPI HN proxy offline, fallback to direct HN Firebase API", e);
      try {
        const hnRes = await fetch("https://hacker-news.firebaseio.com/v0/topstories.json");
        if (!hnRes.ok) throw new Error("HN direct fetch failed");
        const ids = (await hnRes.json()).slice(0, 5);
        const storyPromises = ids.map(async (id) => {
          const itemRes = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
          return itemRes.json();
        });
        const stories = await Promise.all(storyPromises);
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
  },

  /**
   * Fetch live tutorials from FastAPI proxy or direct Dev.to API using optional API Key
   */
  async fetchLiveTutorials(apiKey = "", query = "programming") {
    try {
      const url = new URL(`${FASTAPI_BASE_URL}/api/live/tutorials`);
      if (query) url.searchParams.append("query", query);
      if (apiKey) url.searchParams.append("api_key", apiKey);

      const res = await fetch(url.toString());
      if (!res.ok) throw new Error("FastAPI tutorials proxy error");

      const data = await res.json();
      return {
        status: 200,
        source: data.source || "FastAPI Proxy",
        tutorials: data.tutorials || []
      };
    } catch (e) {
      console.warn("FastAPI proxy offline, attempting direct Dev.to fetch with API Key", e);
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
          tutorials: [
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
          ]
        };
      }
    }
  }
};
