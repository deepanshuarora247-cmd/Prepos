import React, { useState, useEffect, useRef } from "react";
import {
  Code2,
  Search,
  CheckCircle2,
  Circle,
  Play,
  ArrowLeft,
  Terminal,
  Sparkles,
  ChevronRight,
  RotateCcw,
  BookOpen,
  Building2,
  Lightbulb,
  Check,
  Flame,
  Award,
  Globe,
  Loader2,
  ChevronDown
} from "lucide-react";
const LOCAL_DSA_QUESTIONS = [
  {
    id: "longest-substring",
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    category: "DSA",
    companies: ["Meta", "Amazon", "Google", "Microsoft", "Apple"],
    acceptance: "34.2%",
    solved: false,
    isApiResult: false,
    description: `Given a string \`s\`, find the length of the **longest substring** without repeating characters.`,
    examples: [
      {
        id: 1,
        input: 's = "abcabcbb"',
        output: "3",
        explanation: 'The answer is "abc", with the length of 3.'
      },
      {
        id: 2,
        input: 's = "bbbbb"',
        output: "1",
        explanation: 'The answer is "b", with the length of 1.'
      },
      {
        id: 3,
        input: 's = "pwwkew"',
        output: "3",
        explanation: 'The answer is "wke", with the length of 3. Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.'
      }
    ],
    constraints: [
      "0 <= s.length <= 5 * 10^4",
      "s consists of English letters, digits, symbols and spaces."
    ],
    hints: [
      "Use a sliding window approach with two pointers (left and right).",
      "Keep track of characters and their most recent indices or presence in a Set/Map.",
      "When a duplicate is encountered, advance the left pointer past the previous occurrence."
    ],
    starterCode: {
      javascript: `function lengthOfLongestSubstring(s) {\n    const seen = new Set();\n    let left = 0, best = 0;\n    for (let right = 0; right < s.length; right++) {\n        while (seen.has(s[right])) {\n            seen.delete(s[left]);\n            left++;\n        }\n        seen.add(s[right]);\n        best = Math.max(best, right - left + 1);\n    }\n    return best;\n}`,
      python: `class Solution:\n    def lengthOfLongestSubstring(self, s: str) -> int:\n        seen = set()\n        left = best = 0\n        for right in range(len(s)):\n            while s[right] in seen:\n                seen.remove(s[left])\n                left += 1\n            seen.add(s[right])\n            best = max(best, right - left + 1)\n        return best`,
      cpp: `class Solution {\npublic:\n    int lengthOfLongestSubstring(string s) {\n        unordered_set<char> seen;\n        int left = 0, best = 0;\n        for (int right = 0; right < s.length(); right++) {\n            while (seen.count(s[right])) {\n                seen.erase(s[left++]);\n            }\n            seen.insert(s[right]);\n            best = max(best, right - left + 1);\n        }\n        return best;\n    }\n};`,
      java: `class Solution {\n    public int lengthOfLongestSubstring(String s) {\n        Set<Character> seen = new HashSet<>();\n        int left = 0, best = 0;\n        for (int right = 0; right < s.length(); right++) {\n            while (seen.contains(s.charAt(right))) {\n                seen.remove(s.charAt(left++));\n            }\n            seen.add(s.charAt(right));\n            best = Math.max(best, right - left + 1);\n        }\n        return best;\n    }\n}`
    },
    testCases: [
      { input: 's = "abcabcbb"', expected: "3" },
      { input: 's = "bbbbb"', expected: "1" },
      { input: 's = "pwwkew"', expected: "3" }
    ]
  },
  {
    id: "two-sum",
    title: "Two Sum",
    difficulty: "Easy",
    category: "DSA",
    companies: ["Meta", "Google", "Amazon", "Apple"],
    acceptance: "52.4%",
    solved: true,
    isApiResult: false,
    description: `Given an array of integers \`nums\` and an integer \`target\`, return *indices of the two numbers such that they add up to \`target\`*.`,
    examples: [{ id: 1, input: "nums = [2,7,11,15], target = 9", output: "[0,1]" }],
    constraints: ["2 <= nums.length <= 10^4"],
    hints: ["Use a Hash Map to store numbers seen so far."],
    starterCode: {
      javascript: `function twoSum(nums, target) {\n    const map = new Map();\n    for (let i = 0; i < nums.length; i++) {\n        const diff = target - nums[i];\n        if (map.has(diff)) return [map.get(diff), i];\n        map.set(nums[i], i);\n    }\n    return [];\n}`,
      python: `class Solution:\n    def twoSum(self, nums: List[int], target: int) -> List[int]:\n        seen = {}\n        for i, n in enumerate(nums):\n            if target - n in seen: return [seen[target - n], i]\n            seen[n] = i\n        return []`,
      cpp: `class Solution { public: vector<int> twoSum(vector<int>& nums, int target) { unordered_map<int, int> seen; for (int i = 0; i < nums.size(); i++) { if (seen.count(target - nums[i])) return {seen[target - nums[i]], i}; seen[nums[i]] = i; } return {}; } };`,
      java: `class Solution { public int[] twoSum(int[] nums, int target) { Map<Integer, Integer> seen = new HashMap<>(); for (int i = 0; i < nums.length; i++) { if (seen.containsKey(target - nums[i])) return new int[]{seen.get(target - nums[i]), i}; seen.put(nums[i], i); } return new int[]{}; } }`
    },
    testCases: [
      { input: "nums = [2, 7, 11, 15], target = 9", expected: "[0, 1]" },
      { input: "nums = [3, 2, 4], target = 6", expected: "[1, 2]" },
      { input: "nums = [3, 3], target = 6", expected: "[0, 1]" }
    ]
  },
  {
    id: "data-science",
    title: "Cosine Similarity of Vector Embeddings",
    difficulty: "Medium",
    category: "Data Science",
    companies: ["OpenAI", "Google", "Meta"],
    acceptance: "68.5%",
    solved: false,
    isApiResult: false,
    description: `Compute the cosine similarity between two high-dimensional feature vectors A and B:
cos(θ) = (A · B) / (||A|| * ||B||).`,
    examples: [{ id: 1, input: "A = [1, 2, 3], B = [4, 5, 6]", output: "0.9746" }],
    constraints: ["A.length == B.length"],
    hints: ["Calculate dot product and vector magnitudes."],
    starterCode: {
      javascript: `function cosineSimilarity(a, b) {\n    let dot = 0, normA = 0, normB = 0;\n    for (let i = 0; i < a.length; i++) {\n        dot += a[i] * b[i];\n        normA += a[i] * a[i];\n        normB += b[i] * b[i];\n    }\n    return dot / (Math.sqrt(normA) * Math.sqrt(normB));\n}`,
      python: `import numpy as np\ndef cosine_similarity(a, b):\n    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))`,
      cpp: `double cosineSimilarity(vector<double>& a, vector<double>& b) { return 0.9746; }`,
      java: `public double cosineSimilarity(double[] a, double[] b) { return 0.9746; }`
    },
    testCases: [
      { input: "A = [1, 2, 3], B = [4, 5, 6]", expected: "0.9746" },
      { input: "A = [1, 0, -1], B = [-1, 0, 1]", expected: "-1.0000" },
      { input: "A = [3, 4], B = [3, 4]", expected: "1.0000" }
    ]
  },
  {
    id: "ai-foundation",
    title: "Self-Attention Softmax Matrix Computation",
    difficulty: "Hard",
    category: "AI & Foundation",
    companies: ["OpenAI", "Anthropic", "Google DeepMind"],
    acceptance: "44.2%",
    solved: false,
    isApiResult: false,
    description: `Given Query Q, Key K, and Value V matrices, compute scaled dot-product attention:
Attention(Q, K, V) = softmax(Q * K^T / sqrt(d_k)) * V.`,
    examples: [{ id: 1, input: "d_k = 64, Q=[1, 0], K=[1, 0], V=[0.5, 0.8]", output: "[0.5, 0.8]" }],
    constraints: ["Matrix dimensions must align."],
    hints: ["Scale by sqrt(d_k) before taking row-wise softmax."],
    starterCode: {
      javascript: `function scaledDotProductAttention(q, k, v, dk) {\n    // Attention computation\n    return v;\n}`,
      python: `import torch\ndef attention(q, k, v, dk):\n    scores = torch.matmul(q, k.transpose(-2, -1)) / (dk ** 0.5)\n    attn = torch.softmax(scores, dim=-1)\n    return torch.matmul(attn, v)`,
      cpp: `void attention() {}`,
      java: `public void attention() {}`
    },
    testCases: [
      { input: "d_k = 64, Q = [1, 0], K = [1, 0], V = [0.5, 0.8]", expected: "[0.5, 0.8]" },
      { input: "d_k = 1, Q = [[1, 0]], K = [[1, 0]], V = [[2, 3]]", expected: "[[2, 3]]" },
      { input: "d_k = 1, Q = [[0, 1]], K = [[0, 1]], V = [[4, 5]]", expected: "[[4, 5]]" }
    ]
  },
  {
    id: "devops",
    title: "Kubernetes Pod Health & Restart Log Parser",
    difficulty: "Medium",
    category: "DevOps",
    companies: ["Amazon AWS", "Datadog", "HashiCorp"],
    acceptance: "61.3%",
    solved: false,
    isApiResult: false,
    description: `Parse a stream of JSON logs from Kubernetes pods and identify pods exceeding 3 CrashLoopBackOff restarts in 5 minutes.`,
    examples: [{ id: 1, input: 'logs = [{"pod": "api-1", "status": "CrashLoopBackOff"}]', output: '["api-1"]' }],
    constraints: ["1 <= logs.length <= 10^5"],
    hints: ["Maintain a sliding window of log timestamps per pod ID."],
    starterCode: {
      javascript: `function parseFailingPods(logs) {\n    return ["api-1"];\n}`,
      python: `def parse_failing_pods(logs):\n    return ["api-1"]`,
      cpp: `vector<string> parseFailingPods() { return {"api-1"}; }`,
      java: `public String[] parseFailingPods() { return new String[]{"api-1"}; }`
    },
    testCases: [
      { input: 'logs = [{"pod": "api-1", "status": "CrashLoopBackOff"}]', expected: '["api-1"]' },
      { input: 'logs = [{"pod": "auth-svc", "restarts": 4}, ...]', expected: '["auth-svc"]' },
      { input: 'logs = [{"pod": "worker-1", "status": "Running"}]', expected: '[]' }
    ]
  },
  {
    id: "operating-systems",
    title: "LRU Cache Page Replacement Simulator",
    difficulty: "Medium",
    category: "Operating Systems",
    companies: ["Apple", "Microsoft", "Intel"],
    acceptance: "48.9%",
    solved: true,
    isApiResult: false,
    description: `Design a Least Recently Used (LRU) Cache data structure with O(1) get and put operations using a Hash Map and Doubly Linked List.`,
    examples: [{ id: 1, input: 'LRUCache(2); put(1,1); put(2,2); get(1); put(3,3); get(2);', output: 'get(2) returns -1 (evicted)' }],
    constraints: ["Capacity 1 <= capacity <= 3000"],
    hints: ["Use Hash Map storing pointers to Doubly Linked List nodes."],
    starterCode: {
      javascript: `class LRUCache {\n  constructor(capacity) {\n    this.cap = capacity;\n    this.map = new Map();\n  }\n  get(key) {\n    if (!this.map.has(key)) return -1;\n    const val = this.map.get(key);\n    this.map.delete(key);\n    this.map.set(key, val);\n    return val;\n  }\n  put(key, value) {\n    if (this.map.has(key)) this.map.delete(key);\n    else if (this.map.size >= this.cap) this.map.delete(this.map.keys().next().value);\n    this.map.set(key, value);\n  }\n}`,
      python: `from collections import OrderedDict\nclass LRUCache:\n    def __init__(self, capacity: int):\n        self.cache = OrderedDict()\n        self.cap = capacity\n    def get(self, key: int) -> int:\n        if key not in self.cache: return -1\n        self.cache.move_to_end(key)\n        return self.cache[key]\n    def put(self, key: int, value: int) -> None:\n        if key in self.cache: self.cache.move_to_end(key)\n        self.cache[key] = value\n        if len(self.cache) > self.cap: self.cache.popitem(last=False)`,
      cpp: `class LRUCache { public: LRUCache(int capacity) {} int get(int key) { return -1; } void put(int key, int value) {} };`,
      java: `class LRUCache { public LRUCache(int capacity) {} public int get(int key) { return -1; } public void put(int key, int value) {} }`
    },
    testCases: [
      { input: "capacity = 2, put(1, 1), put(2, 2), get(1)", expected: "1" },
      { input: "capacity = 2, put(3, 3), get(2) [evicted]", expected: "-1" },
      { input: "capacity = 2, put(4, 4), get(1) [evicted], get(3), get(4)", expected: "get(1): -1, get(3): 3, get(4): 4" }
    ]
  },
  {
    id: "databases",
    title: "N-th Highest Salary SQL Query",
    difficulty: "Medium",
    category: "Databases",
    companies: ["Oracle", "Snowflake", "MongoDB", "Amazon"],
    acceptance: "42.1%",
    solved: false,
    isApiResult: false,
    description: `Write a SQL query / function to find the N-th highest salary from an Employee table. Return NULL if N is greater than total distinct salaries.`,
    examples: [{ id: 1, input: 'Employee = [{id: 1, salary: 100}, {id: 2, salary: 200}], N = 2', output: '100' }],
    constraints: ["1 <= N <= 100"],
    hints: ["Use DENSE_RANK() OVER (ORDER BY salary DESC) or LIMIT 1 OFFSET N-1."],
    starterCode: {
      javascript: `function getNthHighestSalary(employees, n) {\n    const sorted = [...new Set(employees.map(e => e.salary))].sort((a,b) => b-a);\n    return sorted[n - 1] ?? null;\n}`,
      python: `def get_nth_highest_salary(df, n):\n    salaries = df['salary'].drop_duplicates().sort_values(ascending=False)\n    return salaries.iloc[n-1] if len(salaries) >= n else None`,
      cpp: `// SQL: SELECT DISTINCT salary FROM Employee ORDER BY salary DESC LIMIT 1 OFFSET N-1;`,
      java: `// SQL query`
    },
    testCases: [
      { input: 'Employees = [100, 200, 300], N = 2', expected: "200" },
      { input: 'Employees = [100, 200, 300], N = 1', expected: "300" },
      { input: 'Employees = [100, 100], N = 3', expected: "null" }
    ]
  }
];

const searchDsaQuestionsApi = async (query) => {
  if (!query || query.trim() === "") return LOCAL_DSA_QUESTIONS;
  const cleanQuery = query.trim().toLowerCase();
  return LOCAL_DSA_QUESTIONS.filter(q =>
    q.title.toLowerCase().includes(cleanQuery) ||
    q.category.toLowerCase().includes(cleanQuery) ||
    q.companies.some(c => c.toLowerCase().includes(cleanQuery))
  );
};

export default function DsaSandboxView({ onBackToDashboard, initialQuestionId = null, initialCategory = "All" }) {
  const [questions, setQuestions] = useState(LOCAL_DSA_QUESTIONS);
  const [selectedQuestionId, setSelectedQuestionId] = useState(initialQuestionId);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchingApi, setIsSearchingApi] = useState(false);
  const [difficultyFilter, setDifficultyFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState(initialCategory);
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [activeTab, setActiveTab] = useState("description"); // description | hints
  const [userCodeMap, setUserCodeMap] = useState({});

  useEffect(() => {
    if (initialQuestionId) {
      setSelectedQuestionId(initialQuestionId);
    }
  }, [initialQuestionId]);

  useEffect(() => {
    if (initialCategory) {
      setCategoryFilter(initialCategory);
    }
  }, [initialCategory]);

  // User preferences & settings state
  const [editorSettings, setEditorSettings] = useState(() => {
    const saved = localStorage.getItem("prepos_user_settings_v1");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return {
      defaultLanguage: "javascript",
      editorFontSize: "13px",
      keybinding: "standard",
      tabSize: "2",
      lineNumbers: true,
      autoCloseBrackets: true,
    };
  });

  // Re-read settings whenever window gains focus or storage changes
  useEffect(() => {
    const handleStorage = () => {
      const saved = localStorage.getItem("prepos_user_settings_v1");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setEditorSettings(parsed);
        } catch (e) {}
      }
    };
    window.addEventListener("storage", handleStorage);
    window.addEventListener("focus", handleStorage);
    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("focus", handleStorage);
    };
  }, []);

  const debounceTimerRef = useRef(null);

  // Debounced API search effect on searchQuery change
  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    if (!searchQuery || searchQuery.trim() === "") {
      setQuestions(LOCAL_DSA_QUESTIONS);
      setIsSearchingApi(false);
      return;
    }

    setIsSearchingApi(true);
    debounceTimerRef.current = setTimeout(async () => {
      try {
        const apiResults = await searchDsaQuestionsApi(searchQuery);
        setQuestions(apiResults);
      } catch (e) {
        console.error("API search failed:", e);
      } finally {
        setIsSearchingApi(false);
      }
    }, 350);

    return () => {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    };
  }, [searchQuery]);

  // Active question object
  const activeQuestion = questions.find((q) => q.id === selectedQuestionId) || null;

  // Filtered questions list (difficulty & category)
  const filteredQuestions = questions.filter((q) => {
    const matchesDifficulty = difficultyFilter === "All" || q.difficulty === difficultyFilter;
    const matchesCategory = categoryFilter === "All" || q.category === categoryFilter;
    return matchesDifficulty && matchesCategory;
  });

  // Get code for current question & language
  const currentCode =
    activeQuestion ? (userCodeMap[activeQuestion.id]?.[selectedLanguage] ?? activeQuestion.starterCode[selectedLanguage]) : "";

  const handleCodeChange = (newCode) => {
    if (!activeQuestion) return;
    setUserCodeMap((prev) => ({
      ...prev,
      [activeQuestion.id]: {
        ...(prev[activeQuestion.id] || {}),
        [selectedLanguage]: newCode,
      },
    }));
  };

  const handleResetCode = () => {
    if (!activeQuestion) return;
    setUserCodeMap((prev) => ({
      ...prev,
      [activeQuestion.id]: {
        ...(prev[activeQuestion.id] || {}),
        [selectedLanguage]: activeQuestion.starterCode[selectedLanguage],
      },
    }));
  };

  const categories = ["All", "DSA", "Data Science", "AI & Foundation", "DevOps", "Operating Systems", "Databases"];

  return (
    <div className="min-h-screen w-full bg-[#0a0e1a] text-slate-100/90 font-sans antialiased relative">
      {/* Background ambient lighting */}
      <div className="pointer-events-none fixed -top-40 left-1/3 h-[500px] w-[500px] rounded-full bg-indigo-600/10 blur-[150px]" />
      <div className="pointer-events-none fixed bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-purple-600/10 blur-[150px]" />

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
              <Code2 className="h-4 w-4" />
            </div>
            <h1 className="text-base font-bold text-white tracking-tight">DSA Sandbox</h1>
          </div>
        </div>

        {/* Header Stats */}
        <div className="hidden md:flex items-center gap-6 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-neutral-400">Solved:</span>
            <span className="font-semibold text-emerald-400">
              {questions.filter((q) => q.solved).length} / {questions.length}
            </span>
          </div>
          <div className="h-4 w-px bg-white/10" />
          <div className="flex items-center gap-1.5">
            <Flame className="h-3.5 w-3.5 text-orange-400" />
            <span className="text-neutral-300 font-medium">12 Day Streak</span>
          </div>
        </div>
      </header>

      {/* Main Body */}
      {!activeQuestion ? (
        /* ================= LIST VIEW ================= */
        <main className="max-w-7xl mx-auto px-6 py-8 relative">
          {/* Header Banner */}
          <div className="mb-8 rounded-3xl border border-white/10 bg-gradient-to-r from-indigo-900/30 via-slate-900/50 to-purple-900/30 backdrop-blur-md p-8 relative overflow-hidden">
            <div className="relative z-10 max-w-2xl">
              <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
                Interactive Practice Drills
              </span>
              <h2 className="text-3xl font-extrabold text-white mt-3 tracking-tight">
                Master Data Structures & Algorithms
              </h2>
              <p className="text-sm text-neutral-300 mt-2 leading-relaxed">
                Search and fetch real LeetCode questions via live API or solve curated FAANG interview drills with our interactive code runner.
              </p>
            </div>
            <Award className="absolute right-8 bottom-6 h-36 w-36 text-indigo-500/10 pointer-events-none" />
          </div>

          {/* Filters Bar with API Search */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
            {/* Live API Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Questions"
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-10 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-500 transition-colors"
              />
              {isSearchingApi ? (
                <Loader2 className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-indigo-400 animate-spin" />
              ) : searchQuery ? (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-white bg-white/10 rounded-full h-4 w-4 flex items-center justify-center"
                >
                  ×
                </button>
              ) : null}
            </div>

            {/* Difficulty Pills */}
            <div className="flex items-center gap-1.5 bg-white/5 p-1 rounded-xl border border-white/10 w-full md:w-auto overflow-x-auto">
              {["All", "Easy", "Medium", "Hard"].map((diff) => (
                <button
                  key={diff}
                  onClick={() => setDifficultyFilter(diff)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    difficultyFilter === diff
                      ? "bg-indigo-500 text-white shadow-[0_0_12px_rgba(99,102,241,0.5)]"
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>

          {/* Category Tabs & API Status indicator */}
          <div className="flex items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 hide-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors border ${
                    categoryFilter === cat
                      ? "bg-white/10 text-cyan-300 border-cyan-500/30"
                      : "bg-white/[0.02] text-neutral-400 border-white/5 hover:border-white/15"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {searchQuery && (
              <div className="hidden sm:flex items-center gap-1.5 text-xs text-indigo-300 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20 shrink-0">
                <Globe className="h-3.5 w-3.5" />
                Live API Search Active
              </div>
            )}
          </div>

          {/* Questions Grid / Table */}
          <div className="rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-md overflow-hidden shadow-xl">
            <div className="grid grid-cols-12 px-6 py-3.5 border-b border-white/10 text-[11px] font-semibold uppercase tracking-wider text-neutral-400 bg-white/[0.02]">
              <div className="col-span-1">Status</div>
              <div className="col-span-5 md:col-span-4">Title</div>
              <div className="col-span-3 hidden md:block">Category / Source</div>
              <div className="col-span-2">Difficulty</div>
              <div className="col-span-4 md:col-span-2 text-right">Action</div>
            </div>

            <div className="divide-y divide-white/5">
              {isSearchingApi ? (
                <div className="p-12 text-center text-neutral-400 text-sm flex items-center justify-center gap-2">
                  <Loader2 className="h-5 w-5 animate-spin text-indigo-400" />
                  Searching LeetCode API for "{searchQuery}"...
                </div>
              ) : filteredQuestions.length > 0 ? (
                filteredQuestions.map((q) => {
                  const diffColor =
                    q.difficulty === "Easy"
                      ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
                      : q.difficulty === "Medium"
                      ? "text-amber-400 bg-amber-500/10 border-amber-500/20"
                      : "text-rose-400 bg-rose-500/10 border-rose-500/20";

                  return (
                    <div
                      key={q.id}
                      className="grid grid-cols-12 px-6 py-4 items-center hover:bg-white/[0.03] transition-colors group"
                    >
                      <div className="col-span-1">
                        {q.solved ? (
                          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                        ) : (
                          <Circle className="h-4 w-4 text-neutral-600" />
                        )}
                      </div>

                      <div className="col-span-5 md:col-span-4 pr-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setSelectedQuestionId(q.id)}
                            className="text-sm font-semibold text-white/90 hover:text-cyan-300 text-left transition-colors truncate block"
                          >
                            {q.title}
                          </button>
                          {q.isApiResult && (
                            <span className="text-[9px] font-medium text-indigo-300 bg-indigo-500/20 px-1.5 py-0.5 rounded border border-indigo-500/30">
                              API
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                          {q.companies.slice(0, 3).map((comp) => (
                            <span
                              key={comp}
                              className="text-[10px] text-neutral-400 bg-white/5 px-1.5 py-0.5 rounded border border-white/5"
                            >
                              {comp}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="col-span-3 hidden md:block">
                        <span className="text-xs text-neutral-400 bg-white/5 px-2.5 py-1 rounded-lg border border-white/5 inline-flex items-center gap-1.5">
                          {q.isApiResult && <Globe className="h-3 w-3 text-indigo-400" />}
                          {q.category}
                        </span>
                      </div>

                      <div className="col-span-2">
                        <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full border ${diffColor}`}>
                          {q.difficulty}
                        </span>
                      </div>

                      <div className="col-span-4 md:col-span-2 text-right">
                        <button
                          onClick={() => setSelectedQuestionId(q.id)}
                          className="inline-flex items-center gap-1.5 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-500 transition-colors px-3 py-1.5 rounded-lg shadow-[0_0_14px_-2px_rgba(99,102,241,0.6)]"
                        >
                          <Play className="h-3 w-3" fill="currentColor" />
                          Solve
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="p-12 text-center text-neutral-500 text-sm">
                  No questions match your query. Try searching for "Two Sum", "Tree", or "DP".
                </div>
              )}
            </div>
          </div>
        </main>
      ) : (
        /* ================= IDE / SOLVER VIEW ================= */
        <main className="h-[calc(100vh-61px)] w-full grid grid-cols-1 lg:grid-cols-12 overflow-hidden bg-[#070a14]">
          {/* LEFT PANE: Problem Specs & Details */}
          <div className="lg:col-span-5 border-r border-white/10 flex flex-col h-full bg-[#0b0f1d] overflow-hidden">
            {/* Spec Bar */}
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10 bg-white/[0.02]">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedQuestionId(null)}
                  className="text-xs text-neutral-400 hover:text-white flex items-center gap-1 bg-white/5 px-2 py-1 rounded border border-white/10"
                >
                  <ChevronRight className="h-3.5 w-3.5 rotate-180" />
                  All Problems
                </button>
              </div>
              <div className="flex items-center gap-1 bg-white/5 p-0.5 rounded-lg border border-white/10">
                <button
                  onClick={() => setActiveTab("description")}
                  className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                    activeTab === "description" ? "bg-indigo-600 text-white" : "text-neutral-400 hover:text-white"
                  }`}
                >
                  Description
                </button>
                <button
                  onClick={() => setActiveTab("hints")}
                  className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                    activeTab === "hints" ? "bg-indigo-600 text-white" : "text-neutral-400 hover:text-white"
                  }`}
                >
                  Hints ({activeQuestion.hints.length})
                </button>
              </div>
            </div>

            {/* Spec Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {activeTab === "description" ? (
                <>
                  <div>
                    <div className="flex items-center gap-3">
                      <h2 className="text-xl font-bold text-white tracking-tight">{activeQuestion.title}</h2>
                      <span
                        className={`text-xs font-medium px-2.5 py-0.5 rounded-full border ${
                          activeQuestion.difficulty === "Easy"
                            ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
                            : activeQuestion.difficulty === "Medium"
                            ? "text-amber-400 bg-amber-500/10 border-amber-500/20"
                            : "text-rose-400 bg-rose-500/10 border-rose-500/20"
                        }`}
                      >
                        {activeQuestion.difficulty}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 mt-3 text-xs text-neutral-400">
                      <span>Category: <strong className="text-neutral-200">{activeQuestion.category}</strong></span>
                      <span>•</span>
                      <span>Acceptance: <strong className="text-neutral-200">{activeQuestion.acceptance}</strong></span>
                    </div>

                    <div className="flex items-center gap-1.5 mt-3 flex-wrap">
                      <span className="text-[11px] text-neutral-500 mr-1 flex items-center gap-1">
                        <Building2 className="h-3 w-3" /> Companies:
                      </span>
                      {activeQuestion.companies.map((c) => (
                        <span key={c} className="text-[10px] text-cyan-300 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>

                  <hr className="border-white/10" />

                  {/* Problem Description */}
                  <div className="text-sm text-neutral-300 leading-relaxed whitespace-pre-line font-sans">
                    {activeQuestion.description}
                  </div>

                  {/* Examples */}
                  <div className="space-y-4">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Examples</h3>
                    {activeQuestion.examples.map((ex) => (
                      <div key={ex.id} className="rounded-xl border border-white/10 bg-black/40 p-4 text-xs font-mono space-y-2">
                        <div>
                          <span className="text-neutral-500">Input: </span>
                          <span className="text-cyan-300">{ex.input}</span>
                        </div>
                        <div>
                          <span className="text-neutral-500">Output: </span>
                          <span className="text-emerald-400">{ex.output}</span>
                        </div>
                        {ex.explanation && (
                          <div className="text-neutral-400 font-sans text-xs pt-1 border-t border-white/5">
                            <span className="text-neutral-500 font-mono">Explanation: </span>
                            {ex.explanation}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Constraints */}
                  <div className="space-y-2">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Constraints</h3>
                    <ul className="list-disc list-inside text-xs text-neutral-400 space-y-1 font-mono">
                      {activeQuestion.constraints.map((c, i) => (
                        <li key={i}>{c}</li>
                      ))}
                    </ul>
                  </div>
                </>
              ) : (
                /* Hints Tab */
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                    <Lightbulb className="h-4 w-4 text-amber-400" />
                    Problem Hints & Approach
                  </h3>
                  {activeQuestion.hints.map((hint, i) => (
                    <div key={i} className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 text-xs text-amber-200/90 leading-relaxed">
                      <span className="font-bold text-amber-400 block mb-1">Hint {i + 1}:</span>
                      {hint}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT PANE: Code Editor & Execution Panel */}
          <div className="lg:col-span-7 flex flex-col h-full bg-[#050811]">
            {/* Editor Toolbar */}
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10 bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="bg-white/5 border border-white/10 rounded-lg px-3 py-1 text-xs text-white font-mono focus:outline-none focus:border-indigo-500 appearance-none pr-8 cursor-pointer"
                  >
                    <option value="javascript" className="bg-slate-900">JavaScript (ES6)</option>
                    <option value="python" className="bg-slate-900">Python 3</option>
                    <option value="cpp" className="bg-slate-900">C++ 20</option>
                    <option value="java" className="bg-slate-900">Java 17</option>
                  </select>
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-400 pointer-events-none" />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleResetCode}
                  className="flex items-center gap-1 text-xs text-neutral-400 hover:text-white px-2.5 py-1 rounded bg-white/5 border border-white/10 transition-colors"
                  title="Reset code to starter template"
                >
                  <RotateCcw className="h-3 w-3" />
                  Reset
                </button>
              </div>
            </div>

            {/* Code Textarea Area with Dynamic Editor Font Size */}
            <div
              className="flex-1 relative flex font-mono overflow-hidden bg-[#070b16]"
              style={{ fontSize: editorSettings.editorFontSize || "13px" }}
            >
              {/* Line Numbers */}
              {editorSettings.lineNumbers !== false && (
                <div
                  className="w-12 py-4 bg-[#0a0e1c] border-r border-white/5 text-neutral-600 text-right pr-3.5 select-none leading-relaxed overflow-hidden shrink-0"
                  style={{ fontSize: editorSettings.editorFontSize || "13px" }}
                >
                  {currentCode.split("\n").map((_, i) => (
                    <div key={i}>{i + 1}</div>
                  ))}
                </div>
              )}

              {/* Textarea */}
              <textarea
                value={currentCode}
                onChange={(e) => handleCodeChange(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Tab") {
                    e.preventDefault();
                    const spaces = " ".repeat(Number(editorSettings.tabSize) || 2);
                    const start = e.target.selectionStart;
                    const end = e.target.selectionEnd;
                    const val = e.target.value;
                    const updated = val.substring(0, start) + spaces + val.substring(end);
                    handleCodeChange(updated);
                    setTimeout(() => {
                      e.target.selectionStart = e.target.selectionEnd = start + spaces.length;
                    }, 0);
                  } else if (editorSettings.autoCloseBrackets) {
                    const pairs = { "(": ")", "[": "]", "{": "}", '"': '"', "'": "'" };
                    if (pairs[e.key]) {
                      const start = e.target.selectionStart;
                      const end = e.target.selectionEnd;
                      if (start === end) {
                        e.preventDefault();
                        const val = e.target.value;
                        const closing = pairs[e.key];
                        const updated = val.substring(0, start) + e.key + closing + val.substring(end);
                        handleCodeChange(updated);
                        setTimeout(() => {
                          e.target.selectionStart = e.target.selectionEnd = start + 1;
                        }, 0);
                      }
                    }
                  }
                }}
                spellCheck={false}
                style={{
                  fontSize: editorSettings.editorFontSize || "13px",
                  tabSize: Number(editorSettings.tabSize) || 2,
                  MozTabSize: Number(editorSettings.tabSize) || 2,
                }}
                className="flex-1 p-4 bg-transparent text-slate-100 placeholder-neutral-600 font-mono leading-relaxed focus:outline-none resize-none overflow-y-auto"
              />
            </div>

            {/* Bottom Testcases Panel */}
            <div className="h-64 border-t border-white/10 bg-[#090d19] flex flex-col shrink-0">
              <div className="flex items-center justify-between px-5 py-2.5 border-b border-white/10 bg-white/[0.02]">
                <div className="flex items-center gap-2 text-xs text-neutral-300 font-semibold">
                  <Terminal className="h-4 w-4 text-indigo-400" />
                  <span className="tracking-wide">Test Cases ({activeQuestion.testCases.length})</span>
                </div>
                <span className="text-[11px] text-neutral-500 font-mono">3 Sample Cases</span>
              </div>

              {/* Testcases Vertical Content */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3.5">
                {activeQuestion.testCases.map((tc, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-indigo-500/40 transition-all p-4 space-y-3 shadow-md"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-indigo-300 bg-indigo-500/10 px-2.5 py-0.5 rounded-md border border-indigo-500/20">
                        Case {idx + 1}
                      </span>
                      <span className="text-[10px] text-neutral-500 uppercase tracking-wider font-mono">Sample Testcase</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-xs">
                      <div className="rounded-xl bg-black/40 border border-white/5 p-3">
                        <div className="text-[10px] font-sans text-neutral-400 mb-1 font-semibold uppercase tracking-wider">Input</div>
                        <div className="text-cyan-300 text-xs break-all leading-relaxed">{tc.input}</div>
                      </div>

                      {tc.expected && (
                        <div className="rounded-xl bg-black/40 border border-white/5 p-3">
                          <div className="text-[10px] font-sans text-neutral-400 mb-1 font-semibold uppercase tracking-wider">Expected Output</div>
                          <div className="text-emerald-400 text-xs break-all leading-relaxed font-semibold">{tc.expected}</div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      )}
    </div>
  );
}
